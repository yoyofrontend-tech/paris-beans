// Reports the computed type on /our-story at each given width: every heading,
// description and label on the page, with its rendered line count and whether it
// overflows its own box. The page has no phone scale of its own until
// --ostory-mobile-* (global.css), so this is what says whether the three
// headings, three descriptions and three labels are actually one size each.
//
// Run: node scripts/measure-ostory-mobile.mjs [widths...]
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9235
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\opencode\\ostory-profile'
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
await cdp('Page.navigate', { url: `${BASE}/our-story` })
let ok = false
for (let i = 0; i < 100; i++) {
  ok = await ev(`!!document.querySelector('.ostory-cta-desc')`).catch(() => false)
  if (ok) break
  await sleep(300)
}
if (!ok) throw new Error('/our-story not found')
await ev(`document.fonts.ready`)
await sleep(1500)

const PROBE = `(() => {
  const targets = [
    ['hero-eyebrow', '.ostory-hero .ostory-eyebrow'],
    ['hero-title', '.ostory-title'],
    ['hero-desc', '.ostory-desc'],
    ['origin-eyebrow', '.ostory-origin .ostory-eyebrow'],
    ['origin-title', '.ostory-origin-title'],
    ['origin-text', '.ostory-origin-text'],
    ['cta-eyebrow', '.ostory-cta .ostory-eyebrow'],
    ['cta-title', '.ostory-cta-title'],
    ['cta-desc', '.ostory-cta-desc'],
  ];
  const rows = [];
  for (const [label, sel] of targets) {
    const el = document.querySelector(sel);
    if (!el) { rows.push({ label, missing: true }); continue; }
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

    rows.push({
      label,
      lines: rendered.length,
      rendered,
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      tracking: cs.letterSpacing,
      weight: cs.fontWeight,
      ws: cs.whiteSpace,
      elW: +box.width.toFixed(1),
      scrollW: el.scrollWidth,
      overflow: el.scrollWidth > el.clientWidth + 0.5,
      text: el.textContent.replace(/\\s+/g, ' ').trim().slice(0, 34),
    });
  }
  return { vw: innerWidth, docOverflow: document.documentElement.scrollWidth > innerWidth + 0.5, rows };
})()`

const widths = process.argv.slice(2).map(Number).filter(Boolean)
for (const w of (widths.length ? widths : [320, 360, 390, 430, 599, 600, 700, 744, 768, 1100])) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: 1000, deviceScaleFactor: 1, mobile: false })
  await sleep(500)
  const p = await ev(PROBE)
  console.log(`\n===== ${p.vw}px  doc overflow: ${p.docOverflow ? 'YES' : 'no'} =====`)
  for (const r of p.rows) {
    if (r.missing) { console.log(`  ${r.label}  MISSING`); continue }
    console.log(
      `  ${r.label.padEnd(14)} lines=${r.lines}  font=${r.fontSize.padEnd(8)} lh=${r.lineHeight.padEnd(7)} w=${r.weight} track=${r.tracking.padEnd(7)} box=${r.elW}${r.overflow ? '  OVERFLOW' : ''}`
    )
    if (r.lines > 1) r.rendered.forEach((l, i) => console.log(`       ${i + 1}. "${l}"`))
  }
}

ws?.close()
chrome.kill()
await new Promise((r) => chrome.once('exit', r))
