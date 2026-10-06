/* AUDIT ONLY — static code check (Step 1).
   Reads every CSS/JS/JSX file under ./src, never modifies anything.
   Outputs ./verify-report/static.json and prints the tables. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'verify-report');
fs.mkdirSync(OUT, { recursive: true });

function walk(dir, ext, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, acc);
    else if (ext.some((x) => e.name.endsWith(x))) acc.push(p);
  }
  return acc;
}
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

/* ------------------------------------------------------------------ */
/* CSS parser: yields rules with selector, media stack, decls, lines   */
/* ------------------------------------------------------------------ */
function stripComments(src) {
  // keep newlines so line numbers stay correct
  return src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

function parseCss(src) {
  const text = stripComments(src);
  const rules = [];
  const mediaStack = [];
  let i = 0;
  const lineAt = (idx) => {
    let n = 1;
    for (let k = 0; k < idx && k < text.length; k++) if (text[k] === '\n') n++;
    return n;
  };
  // line of the first non-whitespace character at/after idx
  const lineOfContent = (idx) => {
    let j = idx;
    while (j < text.length && /\s/.test(text[j])) j++;
    return lineAt(j);
  };

  function readBlock(startIdx) {
    // from '{' at startIdx, return {body, end}
    let depth = 0;
    let j = startIdx;
    for (; j < text.length; j++) {
      const c = text[j];
      if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) return { body: text.slice(startIdx + 1, j), end: j };
      }
    }
    return { body: text.slice(startIdx + 1), end: text.length };
  }

  while (i < text.length) {
    const open = text.indexOf('{', i);
    if (open === -1) break;
    const prelude = text.slice(i, open).trim();
    const { body, end } = readBlock(open);
    const preludeLine = lineOfContent(i);

    if (prelude.startsWith('@media')) {
      mediaStack.push(prelude);
      // parse inner rules recursively by re-running on body with offset
      parseInto(body, open + 1, mediaStack);
      mediaStack.pop();
      i = end + 1;
      continue;
    }
    if (prelude.startsWith('@supports') || prelude.startsWith('@layer') || prelude.startsWith('@container')) {
      parseInto(body, open + 1, mediaStack);
      i = end + 1;
      continue;
    }
    if (prelude.startsWith('@keyframes') || prelude.startsWith('@-webkit-keyframes')) {
      i = end + 1;
      continue;
    }
    if (prelude.startsWith('@')) {
      i = end + 1;
      continue;
    }
    // plain rule
    const decls = parseDecls(body, open + 1);
    rules.push({ selector: prelude, media: [...mediaStack], decls, line: preludeLine });
    i = end + 1;
    continue;
  }

  function parseInto(body, offset, stack) {
    let k = 0;
    while (k < body.length) {
      const open = body.indexOf('{', k);
      if (open === -1) break;
      const prelude = body.slice(k, open).trim();
      const b = readBlockIn(body, open);
      const preludeLine = lineOfContent(offset + k);
      if (prelude.startsWith('@media')) {
        stack.push(prelude);
        parseInto(b.body, offset + open + 1, stack);
        stack.pop();
      } else if (prelude.startsWith('@')) {
        // ignore keyframes etc.
      } else {
        rules.push({
          selector: prelude,
          media: [...stack],
          decls: parseDecls(b.body, offset + open + 1),
          line: preludeLine,
        });
      }
      k = b.end + 1;
    }
  }
  function readBlockIn(s, startIdx) {
    let depth = 0;
    let j = startIdx;
    for (; j < s.length; j++) {
      if (s[j] === '{') depth++;
      else if (s[j] === '}') {
        depth--;
        if (depth === 0) return { body: s.slice(startIdx + 1, j), end: j };
      }
    }
    return { body: s.slice(startIdx + 1), end: s.length };
  }

  function parseDecls(body, base) {
    const out = [];
    // split on ';' not inside () or quotes, track line via index
    let cur = '';
    let startOff = 0;
    let depth = 0;
    let quote = null;
    const flush = (fromIdx) => {
      const s = cur.trim();
      if (!s) return;
      const colon = s.indexOf(':');
      if (colon === -1) return;
      const prop = s.slice(0, colon).trim();
      const value = s.slice(colon + 1).trim();
      if (!prop || prop.startsWith('/*')) return;
      const lead = cur.search(/\S/);
      out.push({ prop, value, line: lineAt(base + fromIdx + (lead < 0 ? 0 : lead)), raw: s });
      cur = '';
    };
    for (let p = 0; p < body.length; p++) {
      const c = body[p];
      if (quote) {
        if (c === quote && body[p - 1] !== '\\') quote = null;
        cur += c;
        continue;
      }
      if (c === '"' || c === "'") {
        quote = c;
        cur += c;
        continue;
      }
      if (c === '(') depth++;
      if (c === ')') depth = Math.max(0, depth - 1);
      if (c === ';' && depth === 0) {
        flush(startOff);
        startOff = p + 1;
        continue;
      }
      cur += c;
    }
    flush(startOff);
    return out;
  }

  return rules;
}

/* ------------------------------------------------------------------ */
/* 1a — media width queries                                            */
/* ------------------------------------------------------------------ */
const ALLOWED_MIN = new Set(['641px', '1024px', '1920px']);
const FORBIDDEN_VALUES = ['744', '768', '1136', '900', '1100', '767', '500', '600'];

const mediaRows = [];
const cssFiles = walk(SRC, ['.css']);
for (const f of cssFiles) {
  const lines = stripComments(fs.readFileSync(f, 'utf8')).split(/\r?\n/);
  lines.forEach((l, idx) => {
    if (!/@media/.test(l)) return;
    const q = l.trim();
    const isWidth = /min-width|max-width/.test(q);
    let verdict = 'PASS';
    let why = '';
    if (!isWidth) {
      verdict = 'N/A';
      why = 'not a width query';
    } else if (/max-width/.test(q)) {
      verdict = 'FAIL';
      why = 'max-width query (forbidden)';
    } else {
      const mins = [...q.matchAll(/min-width:\s*([\d.]+px)/g)].map((m) => m[1]);
      for (const m of mins) {
        if (!ALLOWED_MIN.has(m)) {
          verdict = 'FAIL';
          why = `min-width ${m} not in {641,1024,1920}`;
        }
      }
      if (mins.length > 1) {
        verdict = 'FAIL';
        why += ' multiple min-width conditions';
      }
    }
    for (const v of FORBIDDEN_VALUES) {
      if (new RegExp(`(^|[^\\d.])${v}(px)?[^\\d]`).test(q) && isWidth) {
        verdict = 'FAIL';
        why = (why ? why + '; ' : '') + `contains forbidden value ${v}`;
      }
    }
    mediaRows.push({ file: rel(f), line: idx + 1, query: q, verdict, why });
  });
}

/* JS width code: matchMedia strings, <picture media="...">, viewport reads */
const jsRows = [];
const jsFiles = walk(SRC, ['.js', '.jsx']);
const stripJsComments = (src) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`\\])\/\/[^\n]*/g, (m, p1) => p1);

for (const f of jsFiles) {
  const raw = fs.readFileSync(f, 'utf8');
  const text = stripJsComments(raw);
  const lineAt = (idx) => text.slice(0, idx).split('\n').length;

  const consts = {};
  for (const m of text.matchAll(/\b([A-Z][A-Z0-9_]*)\s*=\s*(\d+)\b/g)) consts[m[1]] = m[2];
  const resolve = (q) => q.replace(/\$\{([A-Za-z_]\w*)\}/g, (_, n) => (consts[n] !== undefined ? consts[n] : `?${n}`));

  const seenIdx = new Set();
  const pushQuery = (qRaw, idx) => {
    if (seenIdx.has(idx)) return;
    seenIdx.add(idx);
    const q = resolve(qRaw).trim();
    let verdict = 'PASS';
    let why = '';
    if (/max-width/.test(q)) {
      verdict = 'FAIL';
      why = 'max-width query (forbidden)';
    } else if (/min-width/.test(q)) {
      const mm = q.match(/min-width:\s*([\d.]+px)/);
      if (!mm) {
        verdict = 'FAIL';
        why = 'unresolved min-width value';
      } else if (!ALLOWED_MIN.has(mm[1])) {
        verdict = 'FAIL';
        why = `min-width ${mm[1]} not in {641,1024,1920}`;
      }
    } else {
      verdict = 'N/A';
      why = 'not a width query';
    }
    jsRows.push({ file: rel(f), line: lineAt(idx), query: q, verdict, why });
  };

  const patterns = [
    /[`'"]([^`'"]*(?:min-width|max-width)[^`'"]*)[`'"]/g,
    /\bmedia\s*=\s*"([^"]*(?:min-width|max-width)[^"]*)"/g,
    /\bmedia\s*=\s*'([^']*(?:min-width|max-width)[^']*)'/g,
  ];
  for (const re of patterns) {
    for (const m of text.matchAll(re)) pushQuery(m[1], m.index + m[0].indexOf(m[1]));
  }

  for (const m of text.matchAll(/window\.innerWidth|document\.documentElement\.clientWidth/g)) {
    jsRows.push({
      file: rel(f),
      line: lineAt(m.index),
      query: text.slice(m.index, m.index + 70).split('\n')[0],
      verdict: 'INFO',
      why: 'reads viewport width (value must land on a band edge)',
    });
  }
  for (const m of text.matchAll(/addEventListener\(\s*['"]resize['"]/g)) {
    jsRows.push({
      file: rel(f),
      line: lineAt(m.index),
      query: text.slice(Math.max(0, m.index - 60), m.index + 40).split('\n')[0],
      verdict: 'INFO',
      why: 'resize listener',
    });
  }
  for (const m of text.matchAll(/\b(744|768|1136|900|1100|767|500|600)\b/g)) {
    const ctx = text.slice(Math.max(0, m.index - 90), m.index + 60);
    if (!/width|breakpoint|edge|query|media/i.test(ctx)) continue;
    jsRows.push({
      file: rel(f),
      line: lineAt(m.index),
      query: ctx.replace(/\s+/g, ' ').trim(),
      verdict: 'FAIL',
      why: `forbidden breakpoint value ${m[1]}`,
    });
  }
}

/* ------------------------------------------------------------------ */
/* 1b — hardcoded font-size / clamp / vw / !important                  */
/* ------------------------------------------------------------------ */
const fsRows = [];
for (const f of cssFiles) {
  const rules = parseCss(fs.readFileSync(f, 'utf8'));
  for (const r of rules) {
    for (const d of r.decls) {
      if (d.prop !== 'font-size' && d.prop !== 'font-size!' ) continue;
      const v = d.value;
      const isHardcoded = /(\d+(\.\d+)?(px|rem|em|vw|vh))|clamp\(/.test(v) && !/var\(--fs-(h1|h2|body|eyebrow)/.test(v);
      const important = /!important/.test(v);
      if (!isHardcoded && !important) continue;
      if (!isHardcoded && important && !/var\(--fs-(h1|h2|body|eyebrow)/.test(v)) continue;
      fsRows.push({
        file: rel(f),
        line: d.line,
        selector: r.selector.replace(/\s+/g, ' ').trim(),
        media: r.media.join(' '),
        value: v,
        hardcoded: isHardcoded,
        important,
      });
    }
    // !important on line-height / font-family touching the 4 types
    for (const d of r.decls) {
      if ((d.prop === 'line-height' || d.prop === 'font-size') && /!important/.test(d.value)) {
        if (!fsRows.some((x) => x.file === rel(f) && x.line === d.line)) {
          fsRows.push({
            file: rel(f),
            line: d.line,
            selector: r.selector.replace(/\s+/g, ' ').trim(),
            media: r.media.join(' '),
            value: `${d.prop}: ${d.value}`,
            hardcoded: false,
            important: true,
          });
        }
      }
    }
  }
}

/* font-size values that can render below 12px */
const smallFs = [];
for (const f of cssFiles) {
  const rules = parseCss(fs.readFileSync(f, 'utf8'));
  for (const r of rules) {
    for (const d of r.decls) {
      if (d.prop !== 'font-size') continue;
      const v = d.value.replace(/!important/, '').trim();
      let minPx = null;
      const rem = v.match(/^([\d.]+)rem$/);
      const em = v.match(/^([\d.]+)em$/);
      const px = v.match(/^([\d.]+)px$/);
      if (rem) minPx = parseFloat(rem[1]) * 16;
      else if (em) minPx = parseFloat(em[1]) * 16;
      else if (px) minPx = parseFloat(px[1]);
      else if (/^clamp\(/.test(v)) {
        const parts = v.slice(6, -1).split(',');
        const first = (parts[0] || '').trim();
        const m1 = first.match(/^([\d.]+)(rem|px|em)$/);
        if (m1) minPx = m1[2] === 'px' ? parseFloat(m1[1]) : parseFloat(m1[1]) * 16;
      }
      if (minPx !== null && minPx < 12) {
        smallFs.push({
          file: rel(f),
          line: d.line,
          selector: r.selector.replace(/\s+/g, ' ').trim(),
          media: r.media.join(' '),
          value: v,
          minPx: Math.round(minPx * 100) / 100,
        });
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* 1c — doubled selectors and duplicate declarations                   */
/* ------------------------------------------------------------------ */
const doubled = [];
const duplicates = [];
for (const f of cssFiles) {
  const rules = parseCss(fs.readFileSync(f, 'utf8'));
  const seen = new Map(); // key: media|selector
  for (const r of rules) {
    for (const part of r.selector.split(',')) {
      const s = part.trim();
      const m = s.match(/^([.#][\w-]+)((?:\s+[.#][\w-]+)*)$/);
      if (m) {
        const tokens = s.split(/\s+/);
        for (let t = 0; t < tokens.length - 1; t++) {
          if (tokens[t] === tokens[t + 1]) {
            doubled.push({ file: rel(f), line: r.line, selector: s, media: r.media.join(' ') });
          }
        }
        if (tokens.length === 1 && m[2] === '') {
          // single simple selector repeated?
        }
      }
    }
    const key = `${r.media.join(' ')}||${r.selector.replace(/\s+/g, ' ').trim()}`;
    if (seen.has(key)) {
      const props = new Set(seen.get(key).decls.map((d) => d.prop));
      const clash = r.decls.filter((d) => props.has(d.prop)).map((d) => d.prop);
      duplicates.push({
        file: rel(f),
        first: seen.get(key).line,
        second: r.line,
        selector: r.selector.replace(/\s+/g, ' ').trim(),
        media: r.media.join(' '),
        redeclared: clash,
      });
    } else {
      seen.set(key, r);
    }
  }
}

/* ------------------------------------------------------------------ */
/* 1d — typography tokens                                              */
/* ------------------------------------------------------------------ */
const TOKENS = ['--fs-h1', '--lh-h1', '--fs-h2', '--lh-h2', '--fs-body', '--lh-body', '--fs-eyebrow'];
const tokenDefs = [];
for (const f of cssFiles) {
  const rules = parseCss(fs.readFileSync(f, 'utf8'));
  for (const r of rules) {
    if (!/:root/.test(r.selector)) continue;
    for (const d of r.decls) {
      if (TOKENS.includes(d.prop)) {
        tokenDefs.push({
          file: rel(f),
          line: d.line,
          token: d.prop,
          value: d.value,
          media: r.media.join(' ') || '(base)',
        });
      }
    }
  }
}

const result = { mediaRows, jsRows, fsRows, smallFs, doubled, duplicates, tokenDefs };
fs.writeFileSync(path.join(OUT, 'static.json'), JSON.stringify(result, null, 2));

const pad = (s, n) => String(s).padEnd(n);
console.log('=== 1a. MEDIA WIDTH QUERIES (CSS) ===');
console.log(pad('file:line', 62) + pad('query', 60) + 'verdict');
for (const r of mediaRows) {
  console.log(pad(`${r.file}:${r.line}`, 62) + pad(r.query.slice(0, 58), 60) + `${r.verdict} ${r.why}`);
}
console.log('\n=== 1a. JS WIDTH CODE ===');
for (const r of jsRows) {
  console.log(pad(`${r.file}:${r.line}`, 62) + pad(r.query.slice(0, 58), 60) + `${r.verdict} ${r.why}`);
}
console.log('\n=== 1b. HARDCODED font-size ===');
for (const r of fsRows) {
  console.log(
    pad(`${r.file}:${r.line}`, 58) +
      pad(r.selector.slice(0, 46), 48) +
      pad(r.value.slice(0, 34), 36) +
      (r.media ? `[${r.media}] ` : '') +
      (r.hardcoded ? 'HARDCODED' : '') +
      (r.important ? ' !important' : '')
  );
}
console.log('\n=== 1c. DOUBLED SELECTORS ===');
for (const r of doubled) console.log(`${r.file}:${r.line} ${r.selector} ${r.media}`);
console.log('=== 1c. DUPLICATE DECLARATIONS ===');
for (const r of duplicates)
  console.log(`${r.file}:${r.first} & ${r.second} ${r.selector} ${r.media} redeclared: ${r.redeclared.join(', ')}`);
console.log('\n=== 1d. TOKENS ===');
for (const t of tokenDefs) console.log(pad(`${t.file}:${t.line}`, 40) + pad(t.token, 14) + pad(t.value, 10) + t.media);
console.log('\n=== 1e. font-size possibly < 12px ===');
for (const r of smallFs)
  console.log(pad(`${r.file}:${r.line}`, 58) + pad(r.selector.slice(0, 46), 48) + pad(r.value, 26) + `min ${r.minPx}px`);

console.log(
  `\nTotals: media(css)=${mediaRows.length} fail=${mediaRows.filter((m) => m.verdict === 'FAIL').length} | js=${jsRows.length} fail=${jsRows.filter((m) => m.verdict === 'FAIL').length} | hardcoded=${fsRows.filter((r) => r.hardcoded).length} | doubled=${doubled.length} | dup=${duplicates.length} | small=${smallFs.length}`
);
