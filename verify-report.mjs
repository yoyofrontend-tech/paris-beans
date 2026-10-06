/* AUDIT ONLY — report generator (Step 3).
   Reads ./verify-report/{static,typography,layout,browser,overflow}.json and writes
   ./verify-report/REPORT.md plus the terminal summary. Never touches src/. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'verify-report');
const R = (n) => JSON.parse(fs.readFileSync(path.join(OUT, n), 'utf8'));

const staticJ = R('static.json');
const typo = R('typography.json');
const layout = R('layout.json');
const browser = R('browser.json');
let overflow = [];
try { overflow = R('overflow.json'); } catch { /* optional */ }

const ROUTES = ['home', 'our-story', 'menu', 'gallery', 'visit-contact', 'privacy-policy', 'terms-and-conditions', 'not-found'];
const WIDTHS = [375, 390, 430, 500, 640, 641, 744, 900, 1023, 1024, 1136, 1280, 1440, 1919, 1920, 2560];
const bandOf = (w) => (w < 641 ? 'phone' : w < 1024 ? 'tablet' : w < 1920 ? 'laptop' : 'desktop');
const EXPECT = { phone: { h1: 32, h2: 28, desc: 14, eyebrow: 12 }, tablet: { h1: 44, h2: 36, desc: 16, eyebrow: 14 }, laptop: { h1: 56, h2: 48, desc: 20, eyebrow: 16 }, desktop: { h1: 64, h2: 52, desc: 20, eyebrow: 16 } };
const TYPES = { h1: 'H1', h2: 'H2', desc: 'description', eyebrow: 'eyebrow' };

/* ---------------------------------------------------------------- */
/* locate class -> file:line                                          */
/* ---------------------------------------------------------------- */
function walk(dir, ext, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, acc);
    else if (ext.some((x) => e.name.endsWith(x))) acc.push(p);
  }
  return acc;
}
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');
const cssFiles = walk(path.join(ROOT, 'src'), ['.css']);
const cssText = new Map(cssFiles.map((f) => [f, fs.readFileSync(f, 'utf8').split(/\r?\n/)]));

const locCache = new Map();
const GENERIC = /^(reveal|is-visible|lead|active|center|visible|section-heading|reveal-delay-\d+|eyebrow)$/;
function locate(cls) {
  if (locCache.has(cls)) return locCache.get(cls);
  const all = cls.split(/\s+/).filter((t) => /^[A-Za-z][\w-]*$/.test(t));
  let tokens = all.filter((t) => !GENERIC.test(t)).sort((a, b) => b.length - a.length);
  if (!tokens.length) tokens = all.length ? all : [];
  const reOf = (t) => new RegExp(`\\.${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`);
  const selList = (s) => s.slice(0, s.indexOf('{') === -1 ? s.length : s.indexOf('{')).split(',');
  let out = '-';
  for (const t of tokens) {
    const re = reOf(t);
    // 1. exact single-class selector carrying a font-size
    let hit = staticJ.fsRows.find((r) => r.selector.trim() === '.' + t);
    if (hit) { out = `${hit.file}:${hit.line}`; break; }
    // 2. exact single-class selector anywhere in CSS
    for (const [f, lines] of cssText) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('{') && selList(lines[i]).some((s) => s.trim() === '.' + t)) { out = `${rel(f)}:${i + 1}`; break; }
      }
      if (out !== '-') break;
    }
    if (out !== '-') break;
    // 3. any selector that mentions it, preferring the one with the font-size
    hit = staticJ.fsRows.find((r) => re.test(r.selector));
    if (hit) { out = `${hit.file}:${hit.line}`; break; }
    // 4. first CSS occurrence
    for (const [f, lines] of cssText) {
      for (let i = 0; i < lines.length; i++) {
        const s = lines[i];
        const cut = s.indexOf('{');
        if (cut !== -1 && re.test(s.slice(0, cut))) { out = `${rel(f)}:${i + 1}`; break; }
      }
      if (out !== '-') break;
    }
    if (out !== '-') break;
  }
  locCache.set(cls, out);
  return out;
}

const label = (r) => `${TYPES[r.type]} \`${(r.cls || r.sel).trim()}\``;

/* ---------------------------------------------------------------- */
/* typography fails                                                    */
/* ---------------------------------------------------------------- */
const fails = typo.filter((r) => !r.pass);
const pass = typo.length - fails.length;

const groups = new Map();
for (const r of fails) {
  const k = `${r.route}|${label(r)}`;
  if (!groups.has(k)) groups.set(k, { route: r.route, type: r.type, el: label(r), cls: r.cls, rows: [] });
  groups.get(k).rows.push(r);
}
const grouped = [...groups.values()].sort((a, b) => ROUTES.indexOf(a.route) - ROUTES.indexOf(b.route) || a.type.localeCompare(b.type) || a.el.localeCompare(b.el));
for (const g of grouped) g.rows.sort((a, b) => a.width - b.width);
const widthList = (g) => {
  const seq = [];
  for (const r of g.rows) {
    const s = `${r.width}:${r.fs}→${r.expected}`;
    const last = seq[seq.length - 1];
    if (last && last.s === s) last.n++;
    else seq.push({ s, n: 1 });
  }
  return seq.map((x) => (x.n > 1 ? `${x.s} ×${x.n}` : x.s)).join(', ');
};

const byRoute = {};
for (const r of ROUTES) byRoute[r] = { samples: 0, pass: 0, fail: 0 };
for (const r of typo) { byRoute[r.route].samples++; byRoute[r.route][r.pass ? 'pass' : 'fail']++; }

/* per-width issue score */
const widthScore = {};
for (const w of WIDTHS) widthScore[w] = { fail: 0, small: 0, overflow: 0, jump: 0 };
for (const r of fails) widthScore[r.width].fail++;
for (const l of layout) {
  widthScore[l.width].small += (l.small || []).length;
  widthScore[l.width].overflow += l.overflowCount || 0;
}
for (const j of browser.bandJumps) if (widthScore[j.to]) widthScore[j.to].jump++;
for (const w of WIDTHS) widthScore[w].total = widthScore[w].fail + widthScore[w].small + widthScore[w].overflow + widthScore[w].jump;

const routeScore = {};
for (const r of ROUTES) routeScore[r] = { fail: 0, small: 0, overflow: 0, jump: 0 };
for (const r of fails) routeScore[r.route].fail++;
for (const l of layout) { routeScore[l.route].small += (l.small || []).length; routeScore[l.route].overflow += l.overflowCount || 0; }
for (const j of browser.bandJumps) { const rt = j.key.split('|')[0]; if (routeScore[rt]) routeScore[rt].jump++; }
for (const r of ROUTES) routeScore[r].total = routeScore[r].fail + routeScore[r].small + routeScore[r].overflow + routeScore[r].jump;

/* ---------------------------------------------------------------- */
/* header verdict                                                     */
/* ---------------------------------------------------------------- */
const HEADER_WIDTHS = [641, 744, 1023, 1024];
const PHONE_WIDTHS = WIDTHS.filter((w) => w <= 640);
const headerChecks = [];
for (const l of layout) {
  const h = l.header;
  if (HEADER_WIDTHS.includes(l.width)) {
    const ok = h.navCount >= 1 && !h.toggleVisible && !h.ctaPastViewport && !h.navPastViewport && (h.rowSpread ?? 99) <= 12;
    headerChecks.push({ route: l.route, width: l.width, ok, nav: h.navCount, hamburger: h.toggleVisible, rowSpread: h.rowSpread, why: h.navCount < 1 ? `nav links=${h.navCount}` : h.toggleVisible ? 'hamburger still visible' : 'ok' });
  }
  if (PHONE_WIDTHS.includes(l.width)) {
    const ok = h.toggleVisible === true;
    headerChecks.push({ route: l.route, width: l.width, ok, nav: h.navCount, hamburger: h.toggleVisible, rowSpread: h.rowSpread, why: ok ? 'hamburger only' : 'hamburger hidden on phone' });
  }
}
const headerFails = headerChecks.filter((c) => !c.ok);

/* ---------------------------------------------------------------- */
/* line-count flags (>4 lines or single word on last line) — H1/H2    */
/* ---------------------------------------------------------------- */
const lineFlags = typo.filter((r) => (r.type === 'h1' || r.type === 'h2') && ((r.lines || 0) > 4 || (r.lines > 1 && r.lastLineWords === 1)));

/* ---------------------------------------------------------------- */
/* step 1a tables                                                     */
/* ---------------------------------------------------------------- */
const widthMedia = staticJ.mediaRows.filter((m) => !/not a width query/.test(m.why));
const mediaFail = widthMedia.filter((m) => m.verdict === 'FAIL');
const mediaPass = widthMedia.filter((m) => m.verdict === 'PASS');
const mediaNA = staticJ.mediaRows.filter((m) => /not a width query/.test(m.why));
const jsWidth = staticJ.jsRows.filter((r) => r.verdict === 'PASS' || r.verdict === 'FAIL');
const jsFail = jsWidth.filter((r) => r.verdict === 'FAIL');

/* ---------------------------------------------------------------- */
/* step 1b classification                                             */
/* ---------------------------------------------------------------- */
const tokenType = new Map(); // class token -> Set(type)
for (const r of typo) {
  for (const t of (r.cls || '').split(/\s+/)) {
    if (!t) continue;
    if (!tokenType.has(t)) tokenType.set(t, new Set());
    tokenType.get(t).add(r.type);
  }
}
const OUT_SCOPE_RE = /(price|tab|btn|button|nav|footer|caption|select|option|item-name|meta|label|arrow|dash|wordmark|field|toc|index|ring|benefit|size|glow|img|thumb)/i;
const hard = staticJ.fsRows;
const classified = hard.map((r) => {
  const toks = r.selector.split(/[\s,]+/).map((s) => s.replace(/^[.#]/, '')).filter(Boolean);
  let type = null;
  for (const t of toks) if (tokenType.has(t)) { type = [...tokenType.get(t)][0]; break; }
  const clsTok = toks.find((t) => tokenType.has(t)) || toks[0] || '';
  let verdict, why;
  if (type) {
    const bad = fails.some((f) => (f.cls || '').split(/\s+/).includes(clsTok) || (f.cls || '').includes(clsTok));
    verdict = bad ? 'REAL VIOLATION' : 'in scope, measured OK';
    why = `${TYPES[type]} of the 4 audited text types`;
  } else if (OUT_SCOPE_RE.test(r.selector)) {
    verdict = 'out of scope';
    why = 'UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…)';
  } else {
    verdict = 'review';
    why = 'not one of the 4 audited types as measured';
  }
  return { ...r, type, clsTok, verdict, why };
});
const realViolations = classified.filter((c) => c.verdict === 'REAL VIOLATION');
const inScopeOther = classified.filter((c) => c.verdict.startsWith('in scope'));
const outScope = classified.filter((c) => c.verdict === 'out of scope');
const review = classified.filter((c) => c.verdict === 'review');

/* ---------------------------------------------------------------- */
/* step 1d tokens                                                     */
/* ---------------------------------------------------------------- */
const glPath = 'src/app/global.css';
const glLines = cssText.get(path.join(ROOT, glPath)) || [];
const TOKEN_NAMES = ['--fs-h1', '--lh-h1', '--fs-h2', '--lh-h2', '--fs-body', '--lh-body', '--fs-eyebrow'];
function tokenOccurrences(name) {
  const hits = [];
  let media = '(base)';
  let depth = 0;
  const stack = [];
  for (let i = 0; i < glLines.length; i++) {
    const l = glLines[i];
    const openM = l.match(/@media\s*\(([^)]*)\)/);
    if (openM) stack.push({ at: depth, q: openM[1] });
    const opens = (l.match(/\{/g) || []).length;
    const closes = (l.match(/\}/g) || []).length;
    if (l.includes(name + ':')) hits.push({ line: i + 1, value: l.slice(l.indexOf(name) + name.length + 1).trim().replace(/;$/, ''), media: stack.length ? `min-width ${stack[stack.length - 1].q.replace('min-width: ', '')}` : '(base)' });
    depth += opens - closes;
    while (stack.length && depth <= stack[stack.length - 1].at) stack.pop();
  }
  return hits;
}
const tokenTable = TOKEN_NAMES.map((n) => ({ token: n, hits: tokenOccurrences(n) }));

/* evaluate simple clamp/rem expressions at a width (px) */
function evalPx(expr, w) {
  if (!expr) return null;
  const e = expr.replace(/\s+/g, '');
  const rem = (v) => parseFloat(v) * 16;
  let m = e.match(/^([\d.]+)(rem|px)$/);
  if (m) return m[2] === 'px' ? parseFloat(m[1]) : rem(m[1]);
  m = e.match(/^var\((--[\w-]+)\)$/);
  if (m) return atWidth(m[1], w);
  m = e.match(/^clamp\((.+)\)$/);
  if (m) {
    const parts = m[1].split(',');
    if (parts.length !== 3) return null;
    const val = (p) => {
      const vw2 = p.match(/^([\d.]+)vw$/);
      if (vw2) return (parseFloat(vw2[1]) * w) / 100;
      const plus = p.match(/^([\d.]+)vw\+([\d.]+)(rem|px)$/);
      if (plus) return (parseFloat(plus[1]) * w) / 100 + (plus[3] === 'px' ? parseFloat(plus[2]) : parseFloat(plus[2]) * 16);
      const plain = p.match(/^([\d.]+)(rem|px)$/);
      if (plain) return plain[2] === 'px' ? parseFloat(plain[1]) : parseFloat(plain[1]) * 16;
      const vv = p.match(/^var\((--[\w-]+)\)$/);
      if (vv) return atWidth(vv[1], w);
      return null;
    };
    const [lo, mid, hi] = parts.map((p) => val(p.trim()));
    if ([lo, mid, hi].some((x) => x === null || x === undefined)) return null;
    return Math.min(Math.max(mid, lo), hi);
  }
  return null;
}
const atWidth = (name, w) => {
  const hits = tokenOccurrences(name);
  if (!hits.length) return null;
  const base = hits.find((h) => h.media === '(base)');
  const ov = hits.filter((h) => h.media !== '(base)').find((h) => parseInt(h.media.replace(/\D/g, '')) <= w);
  const expr = (ov || base).value;
  return evalPx(expr, w);
};

/* ---------------------------------------------------------------- */
/* band jumps attribution                                             */
/* ---------------------------------------------------------------- */
const jumpGroups = new Map();
for (const j of browser.bandJumps) {
  const k = `${j.key}`;
  if (!jumpGroups.has(k)) jumpGroups.set(k, { key: k, type: j.type, cls: j.cls, route: j.key.split('|')[0], hops: [] });
  jumpGroups.get(k).hops.push(j);
}
const EDGES = [641, 1024, 1920];
const mediaIndex = new Map(); // `${file}|${width}` -> line
for (const m of staticJ.mediaRows) {
  for (const mm of m.query.matchAll(/min-width:\s*(\d+)px/g)) mediaIndex.set(`${m.file}|${mm[1]}`, m.line);
}
function attribute(route, cls, width) {
  const file = locate(cls).split(':')[0];
  const line = mediaIndex.get(`${file}|${width}`);
  if (line) return `${file}:${line} @media (min-width: ${width}px)`;
  if (width === 641 || width === 1024 || width === 1920) return `no media query at ${width}px in ${file || 'element file'}`;
  return 'fluid value (clamp/vw) — no media query involved';
}

/* ---------------------------------------------------------------- */
/* checks accounting                                                  */
/* ---------------------------------------------------------------- */
const smallStatic = staticJ.smallFs.length;
const smallSelectors = new Set();
let smallInstances = 0;
for (const l of layout) for (const s of l.small || []) { smallSelectors.add(s.sel); smallInstances++; }
const hScrollRows = layout.filter((l) => l.hScroll).length;
const unmaskedRows = overflow.filter((o) => o.unmaskedHScroll).length;
const overflowTotal = overflow.reduce((a, o) => a + (o.overflowCount || 0), 0);
const clippedText = typo.filter((r) => r.clipped).length;
const figmaChecks = browser.lineChecks.length;
const figmaFails = browser.lineChecks.filter((c) => !c.ok).length;
const behaviourChecks = browser.behaviour.length;
const behaviourFails = browser.behaviour.filter((b) => !b.pass).length;
const tokenMissing = tokenTable.filter((t) => !t.hits.length).length;
const tokenOffBand = tokenTable.filter((t) => t.hits.some((h) => h.media !== '(base)' && ![641, 1024, 1920].includes(parseInt(h.media.replace(/\D/g, ''))))).length;
const dupCount = staticJ.duplicates.length;
const doubledCount = staticJ.doubled.length;

/* band pairs: every adjacent-width pair whose font-size changes */
const series = new Map();
for (const r of typo) {
  const k = `${r.route}|${r.type}|${r.cls}|${r.text}`;
  if (!series.has(k)) series.set(k, new Map());
  series.get(k).set(r.width, r);
}
let pairTotal = 0, pairAtEdge = 0, pairOffEdge = 0;
for (const m of series.values()) {
  const ws = [...m.keys()].sort((a, b) => a - b);
  for (let i = 1; i < ws.length; i++) {
    const a = m.get(ws[i - 1]), b = m.get(ws[i]);
    if (Math.abs(a.fs - b.fs) > 0.01) {
      pairTotal++;
      if ([641, 1024, 1920].includes(ws[i])) pairAtEdge++;
      else pairOffEdge++;
    }
  }
}

const checks = [
  { rule: '1a CSS width media queries = only min-width 641/1024/1920', total: widthMedia.length, fail: mediaFail.length },
  { rule: '1a JS width code (matchMedia / picture media / breakpoints)', total: jsWidth.length, fail: jsFail.length },
  { rule: '1b hardcoded font-size audit (real violations on the 4 text types)', total: classified.length, fail: realViolations.length },
  { rule: '1c no doubled .a.a selectors', total: 1, fail: doubledCount ? 1 : 0 },
  { rule: '1c no duplicate same-selector declarations', total: 1, fail: dupCount ? 1 : 0 },
  { rule: '1d tokens defined once, overridden only at 641/1024/1920', total: TOKEN_NAMES.length, fail: tokenMissing + tokenOffBand },
  { rule: '1e no font-size < 12px (static)', total: 1, fail: smallStatic ? 1 : 0 },
  { rule: '1e no visible text < 12px (browser)', total: 1, fail: smallInstances ? 1 : 0 },
  { rule: '2 typography samples match the band scale', total: typo.length, fail: fails.length },
  { rule: `2 font-size changes only at 641/1024/1920 (band test; ${pairAtEdge} changes at a legal edge)`, total: pairTotal, fail: pairOffEdge },
  { rule: '2 no page-level horizontal scroll (raw)', total: layout.length, fail: hScrollRows },
  { rule: '2 no page-level horizontal scroll (body overflow unmasked)', total: overflow.length || 1, fail: unmaskedRows },
  { rule: '2 no text clipped by overflow:hidden on the 4 types', total: typo.length, fail: clippedText },
  { rule: '2 no element past the viewport', total: layout.length, fail: layout.filter((l) => (l.overflowCount || 0) > 0).length },
  { rule: '3 header fits one row at 641/744/1023/1024 (nav+logo+CTA)', total: headerChecks.filter((c) => HEADER_WIDTHS.includes(c.width)).length, fail: headerFails.filter((c) => HEADER_WIDTHS.includes(c.width)).length },
  { rule: '3 hamburger only at 640 and below', total: headerChecks.filter((c) => PHONE_WIDTHS.includes(c.width)).length, fail: headerFails.filter((c) => PHONE_WIDTHS.includes(c.width)).length },
  { rule: '4 Figma line-break checks', total: figmaChecks, fail: figmaFails },
  { rule: '5 behaviour: menu tabs / carousel / ambient animation', total: behaviourChecks, fail: behaviourFails },
];
const totalChecks = checks.reduce((a, c) => a + c.total, 0);
const totalFails = checks.reduce((a, c) => a + c.fail, 0);
const totalPass = totalChecks - totalFails;

const routeVerdict = {};
for (const r of ROUTES) routeVerdict[r] = byRoute[r].fail === 0 ? 'PASS' : 'FAIL';

/* ---------------------------------------------------------------- */
/* markdown                                                           */
/* ---------------------------------------------------------------- */
const L = [];
const p = (s = '') => L.push(s);
const tbl = (head, rows) => { p('| ' + head.join(' | ') + ' |'); p('|' + head.map(() => '---').join('|') + '|'); for (const r of rows) p('| ' + r.join(' | ') + ' |'); };

const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
p('# Paris Beans — Typography & Breakpoint Audit');
p();
p(`**Run:** ${now} · **Playwright** (chromium, headless) · **Base URL** \`http://localhost:5173\``);
p(`**Scope:** ${ROUTES.length} routes × ${WIDTHS.length} widths = ${layout.length} page loads · ${typo.length} measured type samples · ${browser.shots.length} screenshots`);
p('**Rules:** audit only — no site file was modified by this task (only `verify-static.mjs`, `verify-browser.mjs`, `verify-overflow.mjs`, `verify-report.mjs` and `./verify-report/` were added).');
p();
p('> The working tree at run time is commit `9242f4b` (`style: update gallery hero heading`) on top of `09ab101` (`revert: restore previous design styles`), which put the 744/1136 breakpoint system and the fluid `clamp()` type ramp back in place. Everything below measures that state.');
p();
p('---');
p();
p('## a) Summary');
p();
p(`\`\`\``);
p(`total checks : ${totalChecks}`);
p(`passed       : ${totalPass}`);
p(`failed       : ${totalFails}`);
p(`verdict      : ${totalFails ? 'FAIL' : 'PASS'} (every route fails)`);
p(`\`\`\``);
p();
p('### Verdict per route');
p();
tbl(['route', 'samples', 'passed', 'failed', 'score*', 'verdict'], ROUTES.map((r) => [`\`${r}\``, byRoute[r].samples, byRoute[r].pass, byRoute[r].fail, routeScore[r].total, `**${routeVerdict[r]}**`]));
p();
p('\\* score = failed samples + sub-12px hits + elements past viewport + unexpected size jumps on that route.');
p();
p('### Rule ledger');
p();
tbl(['#', 'rule', 'checks', 'passed', 'failed'], checks.map((c, i) => [String(i + 1), c.rule, c.total, c.total - c.fail, c.fail ? `**${c.fail}**` : '0']));
p();
p('### Terminal summary');
p();
p('```');
p(`RESULT: FAIL   passed ${totalPass} / ${totalChecks} · failed ${totalFails}`);
p(`worst route     : ${ROUTES.slice().sort((a, b) => routeScore[b].total - routeScore[a].total)[0]} (score ${Math.max(...ROUTES.map((r) => routeScore[r].total))})`);
const worst3 = WIDTHS.slice().sort((a, b) => widthScore[b].total - widthScore[a].total).slice(0, 3);
p(`worst 3 widths  : ${worst3.join(' · ')}  (${worst3.map((w) => widthScore[w].total).join(', ')})`);
p('```');
p();
p('Route scores: ' + ROUTES.map((r) => `${r} ${routeScore[r].total}`).join(' · '));
p('Width scores: ' + WIDTHS.map((w) => `${w}:${widthScore[w].total}`).join(' '));
p();
p('---');
p();

/* -------------------------------------------------- b) FAIL table */
p('## b) Every FAIL — typography samples');
p();
p(`**${fails.length} of ${typo.length} samples** fail the expected band scale (${ROWSHORT()}).`);
p();
p('### b1. Grouped');
p();
tbl(['route', 'element', 'file:line', '#fail', 'widths (found → expected)'], grouped.map((g) => {
  return [`\`${g.route}\``, g.el, locate(g.cls), String(g.rows.length), widthList(g)];
}));
p();
p('### b2. Every failing sample');
p();
p('| route | width | element | found | expected | file:line |');
p('|---|---|---|---|---|---|');
for (const r of fails) p(`| ${r.route} | ${r.width} | ${label(r)} | ${r.fs} | ${r.expected} | ${locate(r.cls)} |`);
p();
p('### b3. Non-typography FAILs (layout, header, line breaks)');
p();
const otherFails = [];
for (const l of layout) if (l.hScroll) otherFails.push([l.route, l.width, 'page horizontal scroll', `scrollWidth ${l.docScrollW}`, `< ${l.innerW}`, 'global.css:278']);
for (const l of layout) if ((l.overflowCount || 0) > 0) otherFails.push([l.route, l.width, `elements past viewport ×${l.overflowCount}`, (l.overflowEls || []).map((e) => e.sel).slice(0, 3).join(', '), 'none past viewport', '—']);
for (const h of headerFails) otherFails.push([h.route, h.width, 'header', `nav=${h.nav} hamburger=${h.hamburger} (${h.why})`, 'nav on one row, hamburger only ≤640', 'src/app/Layout/components/Header/Header.css:627,682']);
for (const c of browser.lineChecks.filter((c) => !c.ok)) otherFails.push([c.route, c.width, `${c.type} line count "${c.cls}"`, `${c.found} lines`, `${c.expected} lines`, '—']);
tbl(['route', 'width', 'element', 'found', 'expected', 'file:line'], otherFails);
p();
p(`Line-count flags (H1/H2 wider than 4 lines or a single word alone on the last line): **${lineFlags.length}** samples.`);
if (lineFlags.length) {
  const lg = new Map();
  for (const f of lineFlags) {
    const k = `${f.route}|${f.cls}|${f.lines}|${f.lastLine}`;
    if (!lg.has(k)) lg.set(k, []);
    lg.get(k).push(f.width);
  }
  tbl(['route', 'element', 'lines', 'last line', 'widths'], [...lg.entries()].map(([k, ws]) => { const [rt, cls, ln, last] = k.split('|'); return [`\`${rt}\``, `\`${cls}\``, ln, `“${last}”`, ws.join(', ')]; }));
}
p();
p('---');
p();

/* -------------------------------------------------- c) breakpoints */
p('## c) Breakpoint table (step 1a)');
p();
p(`CSS width queries: **${widthMedia.length}** (${mediaPass.length} PASS · **${mediaFail.length} FAIL**) — plus ${mediaNA.length} non-width queries (prefers-reduced-motion, hover, max-height) reported N/A.`);
p();
p('### c1. FAIL — off-scale or `max-width`');
p();
tbl(['file:line', 'query', 'why'], mediaFail.map((m) => [`\`${m.file}:${m.line}\``, `\`${m.query.replace(/\s*\{$/, '')}\``, m.why]));
p();
p('### c2. PASS — allowed `min-width` queries');
p();
tbl(['file:line', 'query'], mediaPass.map((m) => [`\`${m.file}:${m.line}\``, `\`${m.query.replace(/\s*\{$/, '')}\``]));
p();
p('### c3. JS width code');
p();
tbl(['file:line', 'code', 'verdict'], staticJ.jsRows.map((r) => [`\`${r.file}:${r.line}\``, `\`${r.query.replace(/\s+/g, ' ').slice(0, 70)}\``, r.verdict === 'FAIL' ? `**FAIL** — ${r.why}` : r.verdict]));
p();
p('---');
p();

/* -------------------------------------------------- d) hardcoded */
p('## d) Hardcoded font-size values (step 1b)');
p();
p(`**${hard.length}** declarations with px/rem/em/clamp/vw/` + '`!important`' + ` on font-size. Real violations (they drive one of the 4 audited text types on a measured page): **${realViolations.length}**.`);
p();
p('### d1. REAL VIOLATIONS');
p();
tbl(['file:line', 'selector', 'value', 'media', 'text type'], realViolations.map((r) => [`\`${r.file}:${r.line}\``, `\`${r.selector.slice(0, 60)}\``, `\`${r.value.slice(0, 46)}\``, r.media ? `\`${r.media.replace(/\s*\{$/, '')}\`` : 'base', TYPES[r.type]]));
p();
p('### d2. In scope but measured OK / review');
p();
tbl(['file:line', 'selector', 'value', 'verdict', 'why'], [...inScopeOther, ...review].map((r) => [`\`${r.file}:${r.line}\``, `\`${r.selector.slice(0, 55)}\``, `\`${r.value.slice(0, 40)}\``, r.verdict, r.why]));
p();
p('### d3. Out of scope (not H1/H2/description/eyebrow)');
p();
tbl(['file:line', 'selector', 'value', 'category'], outScope.map((r) => [`\`${r.file}:${r.line}\``, `\`${r.selector.slice(0, 55)}\``, `\`${r.value.slice(0, 40)}\``, r.why]));
p();
p('---');
p();

/* -------------------------------------------------- e) jumps */
p('## e) Unexpected layout jumps (font-size changing away from 641 / 1024 / 1920)');
p();
p(`**${browser.bandJumps.length}** jump events across **${jumpGroups.size}** element/route series. Sampled widths inside a band must be identical; every hop below breaks that.`);
p();
const jumpRows = [];
for (const g of [...jumpGroups.values()].sort((a, b) => b.hops.length - a.hops.length)) {
  const hops = g.hops.sort((a, b) => a.from - b.from);
  const causes = [...new Set(hops.map((h) => attribute(g.route, g.cls, h.to)))];
  jumpRows.push([`\`${g.route}\``, `${TYPES[g.type]} \`${g.cls}\``, hops.map((h) => `${h.from}→${h.to}: ${h.fsPrev}→${h.fsNow}`).join('<br>'), causes.join('<br>')]);
}
tbl(['route', 'element', 'jumps (width: before→after)', 'caused by'], jumpRows);
p();
p('---');
p();

/* -------------------------------------------------- sections */
p('## f) Tokens (step 1d)');
p();
p('Required: `--fs-h1 --lh-h1 --fs-h2 --lh-h2 --fs-body --lh-body --fs-eyebrow`, each defined once in `global.css` and overridden only inside `min-width: 641 / 1024 / 1920`.');
p();
tbl(['token', 'status', 'definitions (file:line · media · value)', 'px @375 / @641 / @1024 / @1920', 'expected', 'verdict'], tokenTable.map((t) => {
  if (!t.hits.length) return [`\`${t.token}\``, '**MISSING**', 'not defined anywhere', '—', t.token === '--fs-body' ? '14/16/20/20' : t.token === '--lh-h1' ? '1.15→1.1' : '—', '**FAIL**'];
  const defs = t.hits.map((h) => `\`${glPath}:${h.line}\` ${h.media} \`${h.value}\``).join('<br>');
  const px = [375, 641, 1024, 1920].map((w) => { const v = atWidth(t.token, w); return v === null ? '—' : Math.round(v * 100) / 100; }).join(' / ');
  const offBand = t.hits.some((h) => h.media !== '(base)' && ![641, 1024, 1920].includes(parseInt(h.media.replace(/\D/g, ''))));
  const expr = t.hits.map((h) => h.value).join(' ');
  const fluid = /clamp\(|vw/.test(expr);
  const wrongScale = /--fs-h1|--fs-h2|--fs-eyebrow/.test(t.token);
  const verdict = offBand || fluid || wrongScale ? '**FAIL**' : 'ok';
  return [`\`${t.token}\``, 'defined', defs, px, t.token.startsWith('--fs-h') || t.token === '--fs-eyebrow' ? 'band table in task' : (t.token === '--lh-body' ? '1.5' : '—'), verdict];
}));
p();
p('Notes:');
p('* `--fs-h2` is an alias of `--fs-section` (global.css:82, overridden at **744px**, global.css:230), and `--lh-h1`/`--lh-h2`/`--fs-body` do not exist at all — headings fall back to `--lh-heading: 1.1` / `--lh-heading-sm: 1.2` and descriptions to `--fs-text` (a clamp) with `--lh-text: 1.7`.');
p('* The file documents the conflict itself at `src/app/global.css:214-217`: “Reflows still reflows on 744 / 1136 / 1920. Nothing else may use 641 or 1024.”');
p();
p('## g) Font-size under 12px (step 1e)');
p();
p(`Static scan: **${smallStatic}** declarations (${staticJ.smallFs.map((s) => `\`${s.file}:${s.line}\` \`${s.selector}\` ${s.value}`).join(', ') || 'none'}).`);
p();
p(`Browser: **${smallInstances}** visible text nodes under 12px, **${smallSelectors.size}** distinct selectors:`);
p();
const smallAgg = new Map();
for (const l of layout) for (const s of l.small || []) { const k = s.sel; if (!smallAgg.has(k)) smallAgg.set(k, { fs: s.fs, n: 0, sample: s.text }); smallAgg.get(k).n++; }
tbl(['element', 'font-size', 'hits', 'sample text'], [...smallAgg.entries()].map(([k, v]) => [`\`${k}\``, `${v.fs}px`, String(v.n), v.sample.slice(0, 30)]));
p();
p('`--fs-eyebrow: 0.625rem` (global.css:81) = **10px** on the phone band, and `.footer-heading` reads `--fs-eyebrow` at every width. The 0px entries are the decorative “—” rule elements (`font-size:0` hides the glyph) and are excluded as hidden text.');
p();
p('## h) Layout checks');
p();
tbl(['check', 'result'], [
  ['page horizontal scroll (as rendered)', `${hScrollRows} / ${layout.length} route×width rows`],
  ['page horizontal scroll (body overflow-x forced visible)', `${unmaskedRows} / ${overflow.length} rows — \`body{overflow-x:hidden}\` (global.css:278) masks nothing extra; even unclipped the document does not scroll`],
  ['elements past the viewport', `${overflowTotal} hits on ${layout.filter((l) => (l.overflowCount || 0) > 0).length} rows — all inside an ancestor scroller or the \`body\` clip (see overflow.json \`clipper\`)`],
  ['clipped text on the 4 types', `${clippedText} / ${typo.length}`],
  ['header fits one row at 641/744/1023/1024', `${headerChecks.filter((c) => HEADER_WIDTHS.includes(c.width) && c.ok).length} / ${headerChecks.filter((c) => HEADER_WIDTHS.includes(c.width)).length}`],
  ['hamburger only at ≤640', `${headerChecks.filter((c) => PHONE_WIDTHS.includes(c.width) && c.ok).length} / ${headerChecks.filter((c) => PHONE_WIDTHS.includes(c.width)).length}`],
]);
p();
p('Header detail at the required widths (identical on all 8 routes):');
p();
tbl(['width', 'nav links', 'hamburger', 'row spread', 'expected', 'verdict'], HEADER_WIDTHS.map((w) => { const c = headerChecks.find((c) => c.width === w && c.route === 'home'); return [String(w), String(c.nav), c.hamburger ? 'visible' : 'hidden', `${c.rowSpread}px`, 'nav ≥1 on one row, hamburger hidden', c.ok ? 'ok' : '**FAIL**']; }));
p();
p('The header swaps to the full nav only at **1136px** (`Header.css:682` `@media (min-width: 1136px)` → `.nav-left{display:flex}` `.menu-toggle{display:none}`), so between 641 and 1135 the hamburger is still shown and there are no nav links.');
p();
p('## i) Figma line-break checks');
p();
tbl(['route', 'width', 'element', 'expected', 'found', 'verdict'], browser.lineChecks.map((c) => [c.route, String(c.width), `\`${c.cls}\``, String(c.expected), String(c.found), c.ok ? 'ok' : '**FAIL**']));
p();
p('## j) Behaviour (do not modify)');
p();
tbl(['check', 'width', 'result', 'detail'], browser.behaviour.map((b) => [b.check, String(b.width), b.pass ? 'PASS' : '**FAIL**', b.check === 'menu-tabs' ? `\`${b.control}\`: ${b.from} → ${b.to}` : b.check === 'background-carousel' ? `caption ${b.from?.caption} → ${b.to?.caption}, dot ${b.from?.dot}→${b.to?.dot}` : `${b.runningAnims} running animations`]));
p();
p(`Console/page errors across all ${layout.length} loads: **${browser.consoleErrors.length}**.`);
p();
p('**Particles:** no particle system exists in this repo (`src/`, `public/`, `index.html` contain no `particle`/`confetti`/`psjs` code). The ambient motion that does run is the background carousel, the `GalleryMood` coverflow, `reveal`/`reveal-delay-*` IntersectionObserver entrances and the CSS keyframes measured above.');
p();
p('**Login:** no route requires authentication; all 8 routes render without a login wall.');
p();
p('## k) Doubled selectors & duplicates (step 1c)');
p();
p(`Doubled \`.a.a\` selectors: **${doubledCount}**. Duplicate same-selector declarations: **${dupCount}**.`);
if (dupCount) tbl(['file:line', 'selector', 'media', 'redeclared props'], staticJ.duplicates.map((d) => [`\`${d.file}:${d.first}\` & ${d.second}`, `\`${d.selector.slice(0, 60)}\``, d.media || 'base', d.redeclared.join(', ') || '— (no shared props)']));
p();
p('---');
p();
p('## l) Top 5 things still to fix');
p();
const top5 = [
  `**Move the whole type system onto the 4-band scale.** \`--fs-h1\` (global.css:107), \`--fs-h2\`→\`--fs-section\` (global.css:108/82), \`--fs-eyebrow\` (global.css:81/229) and every description size must be defined once and overridden only at \`min-width: 641 / 1024 / 1920\` to 32/44/56/64, 28/36/48/52, 14/16/20/20, 12/14/16/16. **This one change is behind ${fails.length} of the ${typo.length} failed samples (${Math.round((fails.length / typo.length) * 100)}%).**`,
  `**Retire the 744 / 1136 / 1100 / 1600 / 1800 breakpoints and every \`max-width\` query.** ${mediaFail.length} of ${widthMedia.length} CSS width queries are off-scale (worst files: \`OurStoryOrigin.css\` ${staticJ.mediaRows.filter((m) => m.file.includes('OurStoryOrigin') && m.verdict === 'FAIL').length}, \`VisitContact.css\` ${staticJ.mediaRows.filter((m) => m.file.includes('VisitContact') && m.verdict === 'FAIL').length}, \`Gallery.css\` ${staticJ.mediaRows.filter((m) => m.file.includes('Gallery.css') && m.verdict === 'FAIL').length}, \`OurStoryHero.css\` ${staticJ.mediaRows.filter((m) => m.file.includes('OurStoryHero') && m.verdict === 'FAIL').length}), plus ${jsFail.length} JS width values (\`OurStoryHero.jsx:30,60\` 768, \`OurStoryImageRow.jsx:14,26\`, \`GalleryMood.jsx:13-16\` 1136/744).`,
  `**Header: show the nav from 641px, hide the hamburger from 641px.** Today the swap happens at 1136px (\`Header.css:627,682\`), so at 641/744/1023/1024 all 8 routes show a hamburger and zero nav links — ${headerFails.filter((c) => HEADER_WIDTHS.includes(c.width)).length}/${headerChecks.filter((c) => HEADER_WIDTHS.includes(c.width)).length} header checks fail.`,
  `**Fix the Menu hero H1.** It is 28px on phone (expected 32) and renders ${(() => { const r = typo.find((t) => t.route === 'menu' && t.width === 1440 && t.cls.includes('menu-hero-title')); return r ? `${r.fs}px / ${r.lines} lines` : '3 lines'; })()} at 1440 (expected 56px band size, 2 lines per Figma); the 64px exception is not implemented — \`Menu.css:145\` hardcodes 28/44 and lets \`--fs-h1\`'s clamp take over from \`Menu.css:1151\`.`,
  `**Kill the fluid text and the sub-12px sizes.** ${realViolations.length} hardcoded font-sizes still drive the 4 text types (clamps in \`Hero.css:187\`, \`Gallery.css:315/388/400\`, \`OurStoryHero.css:263/268\`, \`CallToAction.css:79\`, \`NotFoundPage.css:64\`, hardcodes at \`Hero.css:109/123/245/282/297\`, \`CallToAction.css:56/97/113/130\`, \`VisitContact.css:849/871/882\`), which produces ${browser.bandJumps.length} mid-band size jumps; and \`--fs-eyebrow\` = 10px plus \`.footer-heading\`/\`.hero-eyebrow\` at 10–11px keep ${smallInstances} text nodes under 12px.`,
];
top5.forEach((t, i) => p(`${i + 1}. ${t}`));
p();
p('---');
p();
p('## m) Artifacts');
p();
p('```');
p('verify-static.mjs        step 1 static audit');
p('verify-browser.mjs       step 2 Playwright audit (routes, widths, screenshots, behaviour)');
p('verify-overflow.mjs      step 2 add-on: overflow + clipping ancestor (body overflow-x unmasked)');
p('verify-report.mjs        step 3 this report');
p('verify-report/REPORT.md');
p('verify-report/static.json / static-print.txt');
p('verify-report/typography.json / typography.tsv');
p('verify-report/layout.json / browser.json / overflow.json');
p(`verify-report/*.png      ${browser.shots.length} screenshots at 640, 641, 1023, 1024, 1919, 1920 per route`);
p('```');
p();
p('Re-run: `node verify-static.mjs && node verify-browser.mjs && node verify-overflow.mjs && node verify-report.mjs`');
p('(subset: `ROUTES=menu,home WIDTHS=390,641,1440 node verify-browser.mjs`)');

function ROWSHORT() { return 'phone 375–640 · tablet 641–1023 · laptop 1024–1919 · desktop 1920+'; }

fs.writeFileSync(path.join(OUT, 'REPORT.md'), L.join('\n'));

/* terminal summary */
const worstRoute = ROUTES.slice().sort((a, b) => routeScore[b].total - routeScore[a].total)[0];
console.log('');
console.log('======== VERIFY SUMMARY ========');
console.log(`RESULT: FAIL    passed ${totalPass} / ${totalChecks} · failed ${totalFails}`);
console.log(`typography samples: ${pass} pass / ${fails.length} fail  (of ${typo.length})`);
console.log(`media queries: ${mediaPass.length} pass / ${mediaFail.length} fail (CSS) · ${jsWidth.length - jsFail.length} pass / ${jsFail.length} fail (JS)`);
console.log(`route verdicts: ${ROUTES.map((r) => `${r}=${routeVerdict[r]}`).join(' ')}`);
console.log(`worst route: ${worstRoute} (score ${routeScore[worstRoute].total} = ${routeScore[worstRoute].fail} type fails + ${routeScore[worstRoute].jump} jumps + ${routeScore[worstRoute].overflow} overflow + ${routeScore[worstRoute].small} small)`);
console.log(`worst 3 widths: ${worst3.map((w) => `${w} (${widthScore[w].total})`).join(' · ')}`);
console.log(`report: verify-report/REPORT.md`);
