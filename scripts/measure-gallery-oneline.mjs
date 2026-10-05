// Reports how the gallery hero + section headings and descriptions wrap at every
// desktop width: rendered line count, box width, font-size and the natural
// single-line width of the same string in the same font (canvas measureText).
// The ratio of the two says how far the size has to come down for the string to
// fit one line.
//
// Run: node scripts/measure-gallery-oneline.mjs [widths...]
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9231
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\opencode\\gal-profile'
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
let ok = false
for (let i = 0; i < 100; i++) {
  ok = await ev(`!!document.querySelector('.gal-section-desc')`).catch(() => false)
  if (ok) break
  await sleep(300)
}
if (!ok) throw new Error('gallery not found')
await cdp('Runtime.evaluate', { expression: 'document.fonts.ready' , awaitPromise: true })
await sleep(1500)

const PROBE = `(() => {
  const targets = [
    ['hero-title', '.gal-hero-title'],
    ['hero-desc', '.gal-hero-desc'],
    ['sec-title', '.gal-section-title'],
    ['sec-desc', '.gal-section-desc'],
  ];
  const out = [];
  for (const [label, sel] of targets) {
    const els = [...document.querySelectorAll(sel)];
    els.forEach((el, i) => {
      const cs = getComputedStyle(el);
      const box = el.getBoundingClientRect();

      const lines = new Map();
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walk.nextNode())) {
        const t = n.textContent;
        for (let k = 0; k < t.length; k++) {
          const r = document.createRange();
          r.setStart(n, k); r.setEnd(n, k + 1);
          const rect = r.getBoundingClientRect();
          if (!rect.width && !rect.height) continue;
          const key = Math.round(rect.top);
          if (!lines.has(key)) lines.set(key, '');
          lines.set(key, lines.get(key) + t[k]);
        }
      }
      const rendered = [...lines.entries()].sort((a, b) => a[0] - b[0]).map((e) => e[1].replace(/\\s+/g, ' ').trim());
      const text = el.textContent.replace(/\\s+/g, ' ').trim();

      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' / ' + cs.lineHeight + ' ' + cs.fontFamily;
      const need = ctx.measureText(text).width;
      const parent = el.closest('.gal-hero-copy, .gal-section-head');
      const pbox = parent ? parent.getBoundingClientRect() : box;

      out.push({
        label, i, text,
        lines: rendered.length,
        rendered,
        fontSize: cs.fontSize,
        whiteSpace: cs.whiteSpace,
        elW: +box.width.toFixed(1),
        headW: +pbox.width.toFixed(1),
        headMaxW: parent ? getComputedStyle(parent).maxWidth : '-',
        need: +need.toFixed(1),
        fitsNow: need <= box.width,
        needRatio: +(need / box.width).toFixed(3),
        availAtHead: +pbox.width.toFixed(1),
      });
    });
  }
  const container = document.querySelector('.gal-section .container');
  return {
    vw: innerWidth,
    gutter: container ? +getComputedStyle(container).paddingLeft.replace('px','') : 0,
    containerW: container ? +container.getBoundingClientRect().width.toFixed(1) : 0,
    rows: out,
  };
})()`

const widths = process.argv.slice(2).map(Number).filter(Boolean)
for (const w of (widths.length ? widths : [1100, 1200, 1280, 1366, 1440, 1600, 1920])) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: 1000, deviceScaleFactor: 1, mobile: false })
  await sleep(500)
  const p = await ev(PROBE)
  console.log(`\n===== ${p.vw}px  container ${p.containerW}px  padding ${p.gutter}px =====`)
  for (const r of p.rows) {
    console.log(
      `  ${r.label}#${r.i}  lines=${r.lines}  font=${r.fontSize}  ws=${r.whiteSpace}  box=${r.elW}  head=${r.headW} (max ${r.headMaxW})  need=${r.need}  ratio=${r.needRatio}  ${r.fitsNow ? 'FITS' : 'WRAPS'}`
    )
    if (r.lines > 1) r.rendered.forEach((l, i) => console.log(`       ${i + 1}. "${l}"`))
  }
}

ws?.close()
chrome.kill()
await new Promise((r) => chrome.once('exit', r))
