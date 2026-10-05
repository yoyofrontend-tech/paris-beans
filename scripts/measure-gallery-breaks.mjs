// Simulates greedy line breaking for the gallery headings and descriptions at
// the frame's type sizes (56px / 20px) and reports which measure widths put each
// string on exactly two lines. Total ink is not enough to answer that — greedy
// wrapping depends on where the words fall, so "A Corner of Paris, Inside HAIR
// RAP BY YOYO." inks 1179px and still needs a cap wide enough for its own second
// line.
//
// Run: node scripts/measure-gallery-breaks.mjs
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9234
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\opencode\\gal-break-profile'
const BASE = 'http://localhost:5173'

const chrome = spawn(
  CHROME,
  ['--headless=new', `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${PROFILE}`,
   '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
   '--window-size=1100,1000', 'about:blank'],
  { stdio: 'ignore' }
)
let ws, id = 0
const pending = new Map()
const cdp = (m, p = {}) =>
  new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method: m, params: p })) })
for (let i = 0; i < 60; i++) {
  try {
    const l = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json()
    const t = l.find((x) => x.type === 'page')
    if (t?.webSocketDebuggerUrl) { ws = new WebSocket(t.webSocketDebuggerUrl); break }
  } catch {}
  await sleep(250)
}
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j })
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result) }
}
const ev = async (expr) => {
  const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}

await cdp('Page.enable')
await cdp('Runtime.enable')
await cdp('Page.navigate', { url: `${BASE}/gallery` })
for (let i = 0; i < 100; i++) {
  if (await ev(`!!document.querySelector('.gal-section-desc')`).catch(() => false)) break
  await sleep(300)
}
await ev(`document.fonts.ready`)
await sleep(1200)

const out = await ev(`(() => {
  const readStack = (el, size) => {
    const cs = getComputedStyle(el);
    const ls = parseFloat(cs.letterSpacing) || 0;
    return {
      font: cs.fontStyle + ' ' + cs.fontWeight + ' ' + size + 'px ' + cs.fontFamily,
      ls: ls * (size / parseFloat(cs.fontSize)),
    };
  };

  // Greedy wrap, the browser's default: fill each line until the next word does
  // not fit. Word and space widths are measured with the element's real font and
  // letter-spacing, so hyphen-free breaks land where the browser lands them.
  const linesFor = (text, stack, W) => {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = stack.font;
    if ('letterSpacing' in ctx) ctx.letterSpacing = stack.ls + 'px';
    const sp = ctx.measureText(' ').width;
    const words = text.split(' ');
    const out = [];
    let line = words[0];
    for (let i = 1; i < words.length; i++) {
      const next = line + ' ' + words[i];
      if (ctx.measureText(next).width <= W) line = next;
      else { out.push(line); line = words[i]; }
    }
    out.push(line);
    return out;
  };

  const windows = (text, stack, lo, hi) => {
    const hits = [];
    for (let W = lo; W <= hi; W++) {
      if (linesFor(text, stack, W).length === 2) hits.push(W);
    }
    // Collapse to ranges.
    const ranges = [];
    for (const w of hits) {
      const last = ranges[ranges.length - 1];
      if (last && w === last[1] + 1) last[1] = w;
      else ranges.push([w, w]);
    }
    return ranges;
  };

  const grid = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const intersect = (lists) => {
    let acc = lists[0].map(([a, b]) => [a, b]);
    for (const next of lists.slice(1)) {
      acc = acc.flatMap(([a, b]) => next.filter(([c, d]) => c <= b && d >= a).map(([c, d]) => [Math.max(a, c), Math.min(b, d)]));
    }
    return acc;
  };

  const hStack = readStack(document.querySelector('.gal-section-title'), 56);
  const dStack = readStack(document.querySelector('.gal-section-desc'), 20);
  const titles = [...document.querySelectorAll('.gal-section-title')].map((el, i) => ({
    kind: 'title#' + i,
    text: el.textContent.replace(/\\s+/g, ' ').trim(),
    ranges: windows(el.textContent.replace(/\\s+/g, ' ').trim(), hStack, 520, 820),
  }));
  const descs = [...document.querySelectorAll('.gal-section-desc'), document.querySelector('.gal-hero-desc')].map((el, i) => {
    const t = el.textContent.replace(/\\s+/g, ' ').trim();
    return { kind: 'desc#' + i, text: t, ranges: windows(t, dStack, 520, 820) };
  });

  return {
    titles,
    descs,
    titleCommon: intersect(titles.filter((t) => t.kind !== 'title#2').map((t) => t.ranges)),
    descCommon: intersect(descs.map((d) => d.ranges)),
    sample: {
      hStack,
      dStack,
      t620: linesFor(titles[1].text, hStack, 620),
      t700: linesFor(titles[1].text, hStack, 700),
    },
  };
})()`)

console.log('\n===== measure windows that give exactly 2 lines =====')
out.titles.forEach((t) => console.log(`\n${t.kind}  "${t.text}"\n  windows: ${t.ranges.map((r) => r[0] === r[1] ? r[0] : `${r[0]}-${r[1]}`).join(', ') || 'none'}`))
out.descs.forEach((d) => console.log(`\n${d.kind}  "${d.text}"\n  windows: ${d.ranges.map((r) => r[0] === r[1] ? r[0] : `${r[0]}-${r[1]}`).join(', ') || 'none'}`))
console.log(`\ncommon window for the three long titles: ${out.titleCommon.map((r) => r[0] === r[1] ? r[0] : `${r[0]}-${r[1]}`).join(', ') || 'EMPTY'}`)
console.log(`common window for all five descriptions: ${out.descCommon.map((r) => r[0] === r[1] ? r[0] : `${r[0]}-${r[1]}`).join(', ') || 'EMPTY'}`)
console.log(`\ntitle#1 at 620px: ${JSON.stringify(out.sample.t620)}`)
console.log(`title#1 at 700px: ${JSON.stringify(out.sample.t700)}`)

ws?.close()
chrome.kill()
await new Promise((r) => chrome.once('exit', r))
