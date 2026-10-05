// Line count via Range rects, which is the only way to count wrapped lines on a
// block element — getBoundingClientRect returns the box, not the ink.
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9243
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\kilo\\story-lines'
const BASE = 'http://127.0.0.1:5173'

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
await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
await cdp('Page.navigate', { url: BASE })
for (let i = 0; i < 100; i++) {
  if (await ev(`!!document.querySelector('.story-title')`).catch(() => false)) break
  await sleep(300)
}
await sleep(1500)
await ev(`document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible')); 1`)

for (const w of [1136, 1280, 1440, 1600, 1920, 2560]) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: 1000, deviceScaleFactor: 1, mobile: false })
  await sleep(350)
  const r = await ev(`(() => {
    const t = document.querySelector('.story-title');
    const copy = document.querySelector('.story-copy');
    const media = document.querySelector('.story-media');
    const cs = getComputedStyle(t);
    const range = document.createRange();
    range.selectNodeContents(t);
    const rects = [...range.getClientRects()].map(x => ({ top: Math.round(x.top), left: Math.round(x.left), right: Math.round(x.right) }));
    // One rect per line box, but a line can split into several rects around
    // inline children (the <em>), so group by top.
    const tops = [...new Set(rects.map(x => x.top))];
    const cb = copy.getBoundingClientRect();
    const mb = media.getBoundingClientRect();
    return {
      text: t.textContent.trim().slice(0, 40),
      whiteSpace: cs.whiteSpace,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      lines: tops.length,
      inkW: Math.max(...rects.map(x => x.right)) - Math.min(...rects.map(x => x.left)),
      copyW: Math.round(cb.width),
      copyRight: Math.round(cb.right),
      inkRight: Math.round(Math.max(...rects.map(x => x.right))),
      mediaLeft: Math.round(mb.left),
    };
  })()`)
  const overhang = r.inkRight - r.copyRight
  console.log(
    `@${String(w).padEnd(5)} lines=${r.lines} ws=${r.whiteSpace.padEnd(8)} font=${r.fontSize.padEnd(8)} ` +
      `ink=${Math.round(r.inkW)}px copyColumn=${r.copyW}px overhang=${overhang}px gapToPhoto=${r.mediaLeft - r.copyRight}px ` +
      `${overhang > r.mediaLeft - r.copyRight ? '*** COLLIDES WITH PHOTO ***' : overhang > 0 ? '(ink past column, inside gap)' : ''}`
  )
  console.log(`       "${r.text}..."`)
}

ws.close()
chrome.kill()
