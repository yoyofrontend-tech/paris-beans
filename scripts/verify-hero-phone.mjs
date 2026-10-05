// Phone and tablet geometry for the two hero cards whose structure changed.
//
// Both cards used to inset themselves with their own margin and neutralise the
// container inside them. They are now inset by the container and padded by
// themselves, so the numbers to confirm are the ones a viewer would see on a
// phone: the inset, the card's own padding, and where the copy lands.
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9244
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\kilo\\hero-phone'
const BASE = 'http://127.0.0.1:5173'

const chrome = spawn(
  CHROME,
  ['--headless=new', `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${PROFILE}`,
   '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
   '--window-size=430,900', 'about:blank'],
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

const go = async (path, ready) => {
  await cdp('Page.navigate', { url: `${BASE}${path}` })
  for (let i = 0; i < 100; i++) {
    if (await ev(`!!document.querySelector(${JSON.stringify(ready)})`).catch(() => false)) break
    await sleep(300)
  }
  await sleep(1400)
  await ev(`document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible')); 1`)
}
const at = async (w, h = 900) => {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: true })
  await sleep(350)
}

const probe = (card, copy) => `(() => {
  const card = document.querySelector('${card}');
  const b = card.getBoundingClientRect();
  const cs = getComputedStyle(card);
  const copyEl = document.querySelector('${copy}');
  const cb = copyEl.getBoundingClientRect();
  const de = document.documentElement;
  return {
    cardX: Math.round(b.left), cardW: Math.round(b.width), cardH: Math.round(b.height),
    radius: cs.borderTopLeftRadius, padL: cs.paddingLeft, padT: cs.paddingTop,
    copyX: Math.round(cb.left), copyW: Math.round(cb.width),
    hScroll: de.scrollWidth > de.clientWidth,
  };
})()`

for (const [path, ready, card, copy, label] of [
  ['/menu', '.menu-hero', '.menu-hero', '.menu-hero-copy', 'menu hero'],
  ['/visit-contact', '.visit-hero', '.visit-hero', '.visit-hero-copy', 'visit hero'],
]) {
  await go(path, ready)
  for (const [w, wantInset] of [[375, 16], [430, 16], [700, 24], [1024, 80]]) {
    await at(w)
    const r = await ev(probe(card, copy))
    const okInset = r.cardX === wantInset
    const okScroll = !r.hScroll
    console.log(
      `${okInset && okScroll ? 'OK  ' : 'FAIL'} ${label} @${String(w).padEnd(5)}` +
        ` card=${r.cardX}..${r.cardX + r.cardW} (w=${r.cardW} h=${r.cardH} r=${r.radius})` +
        ` pad=${r.padT}/${r.padL} copy=${r.copyX} w=${r.copyW} hScroll=${r.hScroll}`
    )
  }
}

ws.close()
chrome.kill()
