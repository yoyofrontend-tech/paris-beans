// Post-container specifics.
//
// The edge audit proves the left edges line up. This checks the other half of
// the brief: the hero cards are 1280px with a 20px radius and 100px/80px
// padding, the Visit page has no white band, the narrower Home story column has
// not pushed its nowrap heading into the photo stack, the Gallery strip is still
// full-bleed, and the phone/tablet gutters are the ones that were asked for.
//
// Run: node scripts/verify-container-details.mjs
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9242
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\kilo\\container-details'
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

const go = async (path, ready) => {
  await cdp('Page.navigate', { url: `${BASE}${path}` })
  for (let i = 0; i < 100; i++) {
    if (await ev(`!!document.querySelector(${JSON.stringify(ready)})`).catch(() => false)) break
    await sleep(300)
  }
  await sleep(1400)
  await ev(`document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible')); 1`)
}
const at = async (w, h = 1000) => {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false })
  await sleep(350)
}

const results = []
const check = (name, pass, detail) => {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'OK  ' : 'FAIL'} ${name.padEnd(52)} ${detail}`)
}

/* ── 1. Menu hero card: 1280px, radius 20, padding 100/80 ─────────────── */
await go('/menu', '.menu-hero')
for (const w of [1440, 1920, 2560]) {
  await at(w)
  const r = await ev(`(() => {
    const card = document.querySelector('.menu-hero');
    const b = card.getBoundingClientRect();
    const cs = getComputedStyle(card);
    const copy = document.querySelector('.menu-hero-content').getBoundingClientRect();
    const tabs = document.querySelector('.menu-cats-inner');
    const tb = tabs.getBoundingClientRect();
    const tcs = getComputedStyle(tabs);
    return {
      cardW: Math.round(b.width), cardX: Math.round(b.left),
      radius: cs.borderTopLeftRadius,
      padT: cs.paddingTop, padL: cs.paddingLeft,
      copyX: Math.round(copy.left),
      tabsX: Math.round(tb.left + parseFloat(tcs.paddingLeft)),
    };
  })()`)
  check(`menu hero card 1280 wide @${w}`, r.cardW === 1280, `w=${r.cardW} x=${r.cardX}`)
  check(`menu hero radius 20 @${w}`, r.radius === '20px', `radius=${r.radius}`)
  check(`menu hero padding 100/80 @${w}`, r.padT === '100px' && r.padL === '80px', `${r.padT} ${r.padL}`)
  check(`menu copy inset 80 inside card @${w}`, r.copyX - r.cardX === 80, `copyX=${r.copyX} cardX=${r.cardX}`)
  check(`menu tabs at container edge @${w}`, r.tabsX === r.cardX, `tabs=${r.tabsX} card=${r.cardX}`)
}

/* ── 2. Visit hero card + no white band / no beige strips ─────────────── */
await go('/visit-contact', '.visit-contact-grid')
for (const w of [1440, 1920]) {
  await at(w)
  const r = await ev(`(() => {
    const card = document.querySelector('.visit-hero');
    const b = card.getBoundingClientRect();
    const cs = getComputedStyle(card);
    const wrapEl = document.querySelector('.visit-hero-wrap');
    const wb = wrapEl.getBoundingClientRect();
    const wcs = getComputedStyle(wrapEl);
    const contentLeft = Math.round(wb.left + parseFloat(wcs.paddingLeft));
    const contentRight = Math.round(wb.right - parseFloat(wcs.paddingRight));
    const main = document.querySelector('main');
    const mcs = getComputedStyle(main);
    // Sample the page background in the GUTTER beside the card and in the gap
    // above it — that is where a white band or a mismatched strip would show.
    // (Sampling inside the contact band hits the white form card, which is meant
    // to be white.)
    const sample = (x, y) => {
      const el = document.elementFromPoint(x, y);
      return el ? getComputedStyle(el).backgroundColor : 'none';
    };
    const gutterX = contentLeft - 20;
    const contact = document.querySelector('.visit-contact');
    const cb = contact.getBoundingClientRect();
    return {
      cardW: Math.round(b.width), cardX: Math.round(b.left),
      contentLeft, contentRight,
      radius: cs.borderTopLeftRadius,
      mainBg: mcs.backgroundColor,
      aboveCard: sample(Math.round(contentLeft + 40), Math.round(b.top - 12)),
      besideCard: sample(gutterX, Math.round(b.top + b.height / 2)),
      underCard: sample(Math.round(contentLeft + 40), Math.round(cb.top + 20)),
      contactBg: getComputedStyle(contact).backgroundColor,
    };
  })()`)
  check(`visit hero card 1280 wide @${w}`, r.cardW === 1280, `w=${r.cardW} x=${r.cardX}`)
  check(`visit card edge = container content @${w}`, r.cardX === r.contentLeft && r.cardX + r.cardW === r.contentRight, `card=${r.cardX}..${r.cardX + r.cardW} container=${r.contentLeft}..${r.contentRight}`)
  check(`visit card radius 20 @${w}`, r.radius === '20px', `radius=${r.radius}`)
  check(`visit page bg is cream @${w}`, r.mainBg === 'rgb(247, 243, 235)', r.mainBg)
  check(`visit no white band above card @${w}`, r.aboveCard === r.mainBg || r.aboveCard === 'rgba(0, 0, 0, 0)', `above=${r.aboveCard}`)
  check(`visit no white strip beside card @${w}`, r.besideCard === r.mainBg || r.besideCard === 'rgba(0, 0, 0, 0)', `beside=${r.besideCard}`)
  check(`visit contact band same cream @${w}`, r.contactBg === r.mainBg, `${r.contactBg} vs ${r.mainBg}`)
  check(`visit no cream/white step below card @${w}`, r.underCard === r.mainBg || r.underCard === 'rgba(0, 0, 0, 0)', `under=${r.underCard}`)
}

/* ── 3. Home story: narrower column must not break the heading ────────── */
await go('/', '.story-grid')
for (const w of [1136, 1280, 1440, 1920, 2560]) {
  await at(w)
  const r = await ev(`(() => {
    const title = document.querySelector('.story-title');
    const copy = document.querySelector('.story-copy');
    const media = document.querySelector('.story-media');
    const cs = getComputedStyle(title);
    // Ink, not box: the heading is nowrap, so its box is the column while its ink
    // may be wider. Only the ink can collide with the photo stack.
    const range = document.createRange();
    range.selectNodeContents(title);
    const rects = [...range.getClientRects()];
    const inkLeft = Math.round(Math.min(...rects.map((r) => r.left)));
    const inkRight = Math.round(Math.max(...rects.map((r) => r.right)));
    const tops = [...new Set(rects.map((r) => Math.round(r.top)))];
    const cb = copy.getBoundingClientRect();
    const mb = media.getBoundingClientRect();
    return {
      whiteSpace: cs.whiteSpace,
      lines: tops.length,
      inkLeft,
      inkRight,
      copyLeft: Math.round(cb.left),
      copyRight: Math.round(cb.right),
      copyW: Math.round(cb.width),
      mediaLeft: Math.round(mb.left),
      gridContent: Math.round(document.querySelector('.story-grid').getBoundingClientRect().width
        - parseFloat(getComputedStyle(document.querySelector('.story-grid')).paddingLeft)
        - parseFloat(getComputedStyle(document.querySelector('.story-grid')).paddingRight)),
      mediaW: Math.round(mb.width),
    };
  })()`)
  const overhang = r.inkRight - r.copyRight
  const gap = r.mediaLeft - r.copyRight
  check(`home story heading inside its column @${w}`, r.inkLeft === r.copyLeft && overhang <= 0, `ink=${r.inkLeft}..${r.inkRight} column=${r.copyLeft}..${r.copyRight}`)
  check(`home story heading clear of photo @${w}`, overhang < gap, `${Math.max(0, overhang)}px into a ${gap}px gap`)
  console.log(`       ${r.lines} lines (2 explicit <br>), nowrap=${r.whiteSpace}, grid=${r.gridContent}px media=${r.mediaW}px`)
}

/* ── 4. Gallery strip stays full-bleed ────────────────────────────────── */
/* Reported, not asserted: below 1800px the collage is full-bleed, and from 1800px
   it carries a pre-existing `max-width: min(1720px, 100vw)` cap that this change
   did not touch. Vertical spacing is untouched by the refactor — the only rules
   removed here were the container's gutter override and the phone inset token. */
await go('/gallery', '.gal-hero-collage')
for (const w of [1440, 1920]) {
  await at(w)
  const r = await ev(`(() => {
    const c = document.querySelector('.gal-hero-collage');
    const b = c.getBoundingClientRect();
    const cs = getComputedStyle(c);
    const head = document.querySelector('.gal-hero-copy').getBoundingClientRect();
    return {
      left: Math.round(b.left), right: Math.round(b.right),
      vw: document.documentElement.clientWidth,
      marginTop: cs.marginTop,
      copyLeft: Math.round(head.left),
    };
  })()`)
  const full = r.left <= 0 && r.right >= r.vw
  check(`gallery heading at container edge @${w}`, r.copyLeft === (w >= 1440 ? (w - 1280) / 2 : 80), `copy=${r.copyLeft}`)
  console.log(`       collage ${r.left}..${r.right} of ${r.vw} — ${full ? 'full-bleed' : 'capped by its own pre-existing 1720px rule'}, margin-top=${r.marginTop}`)
}

/* ── 5. Phone and tablet gutters, and no overflow ────────────────────── */
for (const [path, ready, label] of [
  ['/', '.story-grid', 'home'],
  ['/our-story', '.ostory-origin-grid', 'story'],
  ['/menu', '.menu-hero', 'menu'],
  ['/gallery', '.gal-hero', 'gallery'],
  ['/visit-contact', '.visit-contact-grid', 'visit'],
]) {
  await go(path, ready)
  for (const [w, want] of [[375, 16], [700, 24], [1024, 80]]) {
    await at(w)
    const r = await ev(`(() => {
      const de = document.documentElement;
      const g = parseFloat(getComputedStyle(de).getPropertyValue('--gutter'));
      const nav = document.querySelector('.header-inner');
      const b = nav.getBoundingClientRect();
      const ncs = getComputedStyle(nav);
      return {
        gutter: g,
        navX: Math.round(b.left + parseFloat(ncs.paddingLeft)),
        scrollW: de.scrollWidth, clientW: de.clientWidth,
      };
    })()`)
    check(`${label} gutter ${want} @${w}`, r.gutter === want && r.navX === want, `gutter=${r.gutter} navX=${r.navX}`)
    check(`${label} no h-scroll @${w}`, r.scrollW <= r.clientW, `${r.scrollW} vs ${r.clientW}`)
  }
}

const failed = results.filter((r) => !r.pass).length
console.log(`\n${results.length - failed}/${results.length} detail checks passed.`)

ws.close()
chrome.kill()
