// Does the floating AI button cover any footer text?
//
// The button is position:fixed, so the overlap only exists when the page is
// scrolled to the end — which is where a visitor reads the copyright. Measured
// against TEXT INK (Range rects), not element boxes, because a box overlap of a
// couple of pixels says nothing about whether a glyph is covered.
//
// Run: node scripts/audit-ai-footer-overlap.mjs
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9245
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\kilo\\ai-footer'
const BASE = 'http://127.0.0.1:5173'
const WIDTHS = [375, 700, 1024, 1280, 1440, 1920, 2560]

const chrome = spawn(
  CHROME,
  ['--headless=new', `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${PROFILE}`,
   '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
   '--window-size=1440,1000', 'about:blank'],
  { stdio: 'ignore' }
)
let ws, id = 0
const pending = new Map()
const cdp = (m, p = {}) =>
  new Promise((res, rej) => {
    const n = ++id
    pending.set(n, { res, rej })
    ws.send(JSON.stringify({ id: n, method: m, params: p }))
  })
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
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id)
    pending.delete(m.id)
    m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result)
  }
}
const ev = async (expr) => {
  const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}
await cdp('Page.enable')
await cdp('Runtime.enable')

const PROBE = `(() => {
  // Kill the launcher's entry animation for the measurement. An animation beats
  // an inline style in the cascade, so transform: none alone leaves the element
  // mid-scale and understates the box by several pixels.
  const style = document.createElement('style');
  style.textContent = '.ai-float{animation:none !important;transform:none !important;transition:none !important}';
  document.head.appendChild(style);
  const float = document.querySelector('.ai-float');
  const fb = float.getBoundingClientRect();
  const vh = window.innerHeight;
  const vw = document.documentElement.clientWidth;
  // Every piece of text in the footer's bottom row, measured as ink.
  const items = [...document.querySelectorAll('.footer-bottom-inner a, .footer-bottom-inner span, .footer-bottom-inner p, .footer-bottom-inner button')]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return false;
      const t = (el.textContent || '').trim();
      if (!t) return false;
      const range = document.createRange();
      range.selectNodeContents(el);
      return [...range.getClientRects()].length > 0;
    })
    .map((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = [...range.getClientRects()];
      return {
        cls: el.className || el.tagName.toLowerCase(),
        text: el.textContent.trim().slice(0, 22),
        left: Math.round(Math.min(...rects.map((r) => r.left))),
        right: Math.round(Math.max(...rects.map((r) => r.right))),
        top: Math.round(Math.min(...rects.map((r) => r.top))),
        bottom: Math.round(Math.max(...rects.map((r) => r.bottom))),
      };
    });
  const inner = document.querySelector('.footer-bottom-inner');
  const ib = inner.getBoundingClientRect();
  const ics = getComputedStyle(inner);
  const bottom = document.querySelector('.footer-bottom');
  const bcs = getComputedStyle(bottom);
  const overlaps = items
    .filter((it) => it.right > fb.left && it.left < fb.right && it.bottom > fb.top && it.top < fb.bottom)
    .map((it) => it.text);
  // Smallest gap to the nearest piece of text: negative means covered. Measured
  // on whichever axis separates them, so a 2px side gap and a 31px gap above
  // are both reported as what they are instead of collapsing to "no overlap".
  const clearance = items.reduce((min, it) => {
    const gapX = Math.max(fb.left - it.right, it.left - fb.right);
    const gapY = Math.max(fb.top - it.bottom, it.top - fb.bottom);
    const gap = Math.max(gapX, gapY);
    return gap < min.gap ? { gap: Math.round(gap), axis: gapX >= gapY ? 'x' : 'y', text: it.text } : min;
  }, { gap: Infinity, axis: '', text: '' });
  // How much room is there between the viewport edge and the container's right
  // edge? That is all the button can ever be given.
  const contentRight = Math.round(ib.right - parseFloat(ics.paddingRight));
  return {
    vw,
    float: { left: Math.round(fb.left), right: Math.round(fb.right), top: Math.round(fb.top), bottom: Math.round(fb.bottom), w: Math.round(fb.width), h: Math.round(fb.height) },
    rightInset: Math.round(vw - fb.right),
    bottomInset: Math.round(vh - fb.bottom),
    laneFromBottom: Math.round(vh - fb.top),
    contentRight,
    roomToContent: contentRight - Math.round(fb.left),
    footerPadBottom: bcs.paddingBottom,
    rowTop: Math.round(ib.top),
    rowBottom: Math.round(ib.bottom),
    rowInView: ib.top < vh && ib.bottom > 0,
    clearance,
    overlaps,
    items,
  };
})()`

const rows = []

for (const w of WIDTHS) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 641 })
  await cdp('Page.navigate', { url: `${BASE}/` })
  for (let i = 0; i < 100; i++) {
    if (await ev(`!!document.querySelector('.ai-float')`).catch(() => false)) break
    await sleep(300)
  }
  await sleep(1500)
  await ev(`
    // html has scroll-behavior: smooth, so a plain scrollTo animates and a long
    // page is still in flight when the probe runs. Force instant for the probe.
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelector('.ai-widget').classList.add('is-visible');
    document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible'));
    window.scrollTo(0, document.documentElement.scrollHeight);
    1`)
  await sleep(1200)
  await ev(`window.scrollTo(0, document.documentElement.scrollHeight); 1`)
  await sleep(400)
  const r = await ev(PROBE)
  rows.push({ w, ...r })
  const ok = r.overlaps.length === 0
  console.log(
    `${ok ? 'OK  ' : 'FAIL'} @${String(w).padEnd(5)} float=${r.float.left}..${r.float.right} (${r.float.w}x${r.float.h})` +
      ` rightInset=${r.rightInset} bottomInset=${r.bottomInset} laneFromBottom=${r.laneFromBottom}` +
      `\n       contentRight=${r.contentRight} float.left-contentRight=${r.roomToContent}px` +
      `${ok ? ' no text covered' : `  COVERS: ${r.overlaps.join(' | ')}`}`
  )
  console.log(`       float y=${r.float.top}..${r.float.bottom}  row y=${r.rowTop}..${r.rowBottom} padBottom=${r.footerPadBottom}`)
  if (r.items.length) {
    console.log(`       nearest text: ${r.clearance.gap}px on ${r.clearance.axis}  ("${r.clearance.text}")`)
  }
}

const bad = rows.filter((r) => r.overlaps.length)
console.log(`\n${rows.length - bad.length}/${rows.length} widths clear of footer text.`)

ws.close()
chrome.kill()
