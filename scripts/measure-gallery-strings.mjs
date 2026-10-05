// One-off: measures the ink width of the gallery strings at the 56px heading and
// 20px description sizes, so the measures that force a two-line break can be
// chosen from numbers instead of guessed.
//
// Run: node scripts/measure-gallery-strings.mjs
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9233
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\opencode\\gal-strings-profile'
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

// Read the live strings and the real font stacks off the rendered page, then
// measure at the two target sizes.
const out = await ev(`(() => {
  const meas = (text, font) => {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = font;
    return +ctx.measureText(text).width.toFixed(1);
  };
  const hFont = getComputedStyle(document.querySelector('.gal-section-title'));
  const dFont = getComputedStyle(document.querySelector('.gal-section-desc'));
  const hStack = hFont.fontStyle + ' ' + hFont.fontWeight + ' 56px ' + hFont.fontFamily;
  const dStack = dFont.fontStyle + ' ' + dFont.fontWeight + ' 20px ' + dFont.fontFamily;

  const rows = [];
  const hero = document.querySelector('.gal-hero-title');
  rows.push({
    kind: 'hero-title',
    text: hero.textContent.replace(/\\s+/g, ' ').trim(),
    size: 56,
    ink: meas(hero.textContent.replace(/\\s+/g, ' ').trim(), hStack),
    parts: [
      ['A Parisian Mood. A Salon', meas('A Parisian Mood. A Salon', hStack)],
      ['Experience.', meas('Experience.', hStack)],
    ],
  });

  document.querySelectorAll('.gal-section-title').forEach((el, i) => {
    const t = el.textContent.replace(/\\s+/g, ' ').trim();
    rows.push({ kind: 'sec-title#' + i, text: t, size: 56, ink: meas(t, hStack), parts: [] });
  });
  document.querySelectorAll('.gal-section-desc').forEach((el, i) => {
    const t = el.textContent.replace(/\\s+/g, ' ').trim();
    // Widest two-word prefix that still leaves a sensible second line.
    const words = t.split(' ');
    let best = null;
    for (let k = words.length - 1; k > 1; k--) {
      const head = words.slice(0, k).join(' ');
      const w = meas(head, dStack);
      if (!best || w > best.w) best = { head, w, tail: words.slice(k).join(' ') };
    }
    rows.push({
      kind: 'sec-desc#' + i,
      text: t,
      size: 20,
      ink: meas(t, dStack),
      chars: t.length,
      parts: [[best.head, best.w], [best.tail, meas(best.tail, dStack)]],
    });
  });
  const heroDesc = document.querySelector('.gal-hero-desc');
  const hd = heroDesc.textContent.replace(/\\s+/g, ' ').trim();
  rows.push({ kind: 'hero-desc', text: hd, size: 20, ink: meas(hd, dStack), chars: hd.length, parts: [] });
  return rows;
})()`)

console.log('\n===== ink widths at the target sizes =====')
for (const r of out) {
  console.log(`\n${r.kind}  (${r.size}px, ${r.chars ? r.chars + ' chars' : ''})`)
  console.log(`  full: ${r.ink}px   "${r.text}"`)
  if (r.parts.length) {
    console.log(`  widest split that still leaves a second line:`)
    r.parts.forEach(([t, w]) => console.log(`     ${String(w).padStart(7)}px  "${t}"`))
  }
}

ws?.close()
chrome.kill()
await new Promise((r) => chrome.once('exit', r))
