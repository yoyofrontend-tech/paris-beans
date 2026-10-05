// Screenshots the gallery hero + first section head at desktop widths, so the
// single-line headings and descriptions can be eyeballed against the frame.
//
// Run: node scripts/shoot-gallery-oneline.mjs [widths...]
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { writeFileSync, mkdirSync } from 'node:fs'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9232
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\opencode\\gal-shot-profile'
const OUT = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\opencode\\shots'
const BASE = 'http://localhost:5173'
mkdirSync(OUT, { recursive: true })

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

for (const w of [1100, 1280, 1440, 1920]) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: 1000, deviceScaleFactor: 1, mobile: false })
  await cdp('Page.navigate', { url: `${BASE}/gallery` })
  for (let i = 0; i < 100; i++) {
    if (await ev(`!!document.querySelector('.gal-section-desc') && !document.querySelector('.preloader')`).catch(() => false)) break
    await sleep(300)
  }
  await ev(`document.fonts.ready`)
  await sleep(1600)
  // Force every reveal block visible so the frames are not caught mid-fade.
  await ev(`document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))`)
  await sleep(500)
  for (const [sel, label] of [['.gal-hero-copy', 'hero'], ['.gal-section-head', 'sec1']]) {
    const { data } = await cdp('Page.captureScreenshot', { format: 'png', clip: await ev(`(() => {
      const r = document.querySelector('${sel}').getBoundingClientRect();
      return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height, scale: 1 };
    })()`) })
    writeFileSync(`${OUT}/gal-${label}-${w}.png`, Buffer.from(data, 'base64'))
    console.log('  wrote', `${OUT}/gal-${label}-${w}.png`)
  }
  // Overflow guard, leaf text elements only: the wrapper blocks' own ink is
  // meaningless here, since their textContent spans several font sizes but is
  // measured in the wrapper's inherited body font.
  console.log('  overflow check:', await ev(`(() => {
    const out = [];
    for (const el of document.querySelectorAll('.gal-hero-title, .gal-hero-desc, .gal-section-title, .gal-section-desc')) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' / ' + cs.lineHeight + ' ' + cs.fontFamily;
      const ink = ctx.measureText(el.textContent.replace(/\\s+/g, ' ').trim()).width;
      const edge = document.documentElement.clientWidth;
      const lines = Math.round(r.height / parseFloat(cs.lineHeight));
      if (r.right + 1 > edge || ink > r.width + 0.5) {
        out.push(el.className + ' right=' + r.right.toFixed(1) + '/' + edge + ' ink=' + ink.toFixed(1) + ' box=' + r.width.toFixed(1));
      } else {
        out.push(el.className + ' ok  lines=' + lines + ' ink=' + ink.toFixed(1) + ' box=' + r.width.toFixed(1) + ' clear=' + ((1 - ink / r.width) * 100).toFixed(1) + '%');
      }
    }
    return out;
  })()`))
}

ws?.close()
chrome.kill()
await new Promise((r) => chrome.once('exit', r))
