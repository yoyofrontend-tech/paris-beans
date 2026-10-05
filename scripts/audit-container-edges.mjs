// Container edge audit.
//
// One question, asked of every page at every width: does the header's left edge,
// the page heading's left edge and the card's left edge land on the same x?
// The shared container is supposed to make that a property of the CSS rather
// than of each page, so this measures it instead of trusting it.
//
// Two kinds of target:
//   align — its left edge must equal the container's content edge. Measured as
//           CONTENT box (border box + padding) for containers, since a
//           container is 100% wide with its gutter as padding and its border box
//           starts at 0 on every page.
//   inner — inset from the edge on purpose (copy inside a card that has its own
//           padding). Reported, never failed.
//
// Run: node scripts/audit-container-edges.mjs
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const CDP_PORT = 9241
const PROFILE = 'C:\\Users\\stdlocal\\AppData\\Local\\Temp\\kilo\\container-profile'
const BASE = 'http://127.0.0.1:5173'
const WIDTHS = [1280, 1440, 1920, 2560]

// [key, selector, edge] where edge is 'content' | 'border'
const PAGES = [
  {
    name: 'home',
    path: '/',
    ready: '.story-grid',
    targets: [
      ['nav', '.header-inner', 'content'],
      ['hero', '.hero-content', 'content'],
      ['story', '.story-grid', 'content'],
      ['benefits', '.benefits-grid', 'content'],
      ['cafe', '.cafe-grid', 'content'],
      ['gallery', '.gallery .container', 'content'],
      ['cta', '.experience-content', 'content'],
    ],
  },
  {
    name: 'story',
    path: '/our-story',
    ready: '.ostory-origin-grid',
    targets: [
      ['nav', '.header-inner', 'content'],
      ['hero-title', '.ostory-title', 'border'],
      ['hero-gallery', '.ostory-gallery', 'border'],
      ['origin', '.ostory-origin-grid', 'content'],
      ['origin-title', '.ostory-origin-title', 'border'],
      ['cta', '.ostory-cta-inner', 'content'],
    ],
  },
  {
    name: 'menu',
    path: '/menu',
    ready: '.menu-hero',
    targets: [
      ['nav', '.header-inner', 'content'],
      ['hero-card', '.menu-hero-wrap', 'content'],
      ['hero-title', '.menu-hero-title', 'inner'],
      ['tabs', '.menu-cats-inner', 'content'],
      ['special-title', '.menu-special-title', 'border'],
      ['cafe', '.menu-cafe .container', 'content'],
      ['cta', '.menu-cta-content', 'content'],
    ],
  },
  {
    name: 'gallery',
    path: '/gallery',
    ready: '.gal-hero',
    targets: [
      ['nav', '.header-inner', 'content'],
      ['hero-title', '.gal-hero-title', 'border'],
      ['hero-desc', '.gal-hero-desc', 'border'],
      ['grid', '.gal-grid', 'content'],
    ],
  },
  {
    name: 'visit',
    path: '/visit-contact',
    ready: '.visit-contact-grid',
    targets: [
      ['nav', '.header-inner', 'content'],
      ['hero-card', '.visit-hero-wrap', 'content'],
      ['form-card', '.visit-form-card', 'border'],
      ['map-card', '.visit-info-card', 'inner'],
      ['cta', '.visit-cta-content', 'content'],
    ],
    // The two contact cards: 1fr 1fr with a 40px gap, spanning the container
    // exactly. The second column starts 620px in by design, so it is checked as a
    // pair rather than against the page's left edge.
    pairs: [['form-card', 'map-card', 40]],
  },
]

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
await cdp('Network.enable')
await cdp('Network.setCacheDisabled', { cacheDisabled: true })

const probe = (targets) => `(() => {
  const targets = ${JSON.stringify(targets)};
  const box = (el, edge) => {
    const b = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const pl = parseFloat(cs.paddingLeft) || 0;
    const pr = parseFloat(cs.paddingRight) || 0;
    const left = edge === 'content' ? b.left + pl : b.left;
    const right = edge === 'content' ? b.right - pr : b.right;
    return {
      x: +left.toFixed(1),
      right: +right.toFixed(1),
      w: +(right - left).toFixed(1),
      borderX: +b.left.toFixed(1),
      padL: +pl.toFixed(1),
      borderRight: +b.right.toFixed(1),
    };
  };
  const out = {};
  for (const key in targets) {
    const el = document.querySelector(targets[key][0]);
    out[key] = el ? box(el, targets[key][1]) : 'MISSING';
  }
  const cs = getComputedStyle(document.documentElement);
  out.__gutter = cs.getPropertyValue('--gutter').trim();
  const de = document.documentElement;
  out.__scrollW = de.scrollWidth;
  out.__clientW = de.clientWidth;
  // A nowrap heading that no longer fits its column does not scroll or clip — it
  // silently overlaps whatever is beside it, which is the one failure a narrower
  // container column can cause without any other symptom.
  out.__clipped = [...document.querySelectorAll('main h1, main h2, main h3, main .eyebrow')]
    .filter((el) => {
      const cs2 = getComputedStyle(el);
      if (cs2.whiteSpace !== 'nowrap') return false;
      if (cs2.overflow === 'hidden' || cs2.textOverflow === 'ellipsis') return false;
      return el.scrollWidth > el.clientWidth + 1;
    })
    .slice(0, 6)
    .map((el) => el.className + ' ' + el.scrollWidth + '>' + el.clientWidth);
  return out;
})()`

const report = []

for (const page of PAGES) {
  await cdp('Emulation.setDeviceMetricsOverride', {
    width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false,
  })
  await cdp('Page.navigate', { url: `${BASE}${page.path}` })
  let ok = false
  for (let i = 0; i < 100; i++) {
    ok = await ev(`!!document.querySelector(${JSON.stringify(page.ready)})`).catch(() => false)
    if (ok) break
    await sleep(300)
  }
  if (!ok) throw new Error(`${page.name}: ${page.ready} never appeared`)
  await sleep(1500)
  await ev(`document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible')); 1`)

  const map = Object.fromEntries(page.targets.map(([k, s, e]) => [k, [s, e]]))

  for (const w of WIDTHS) {
    await cdp('Emulation.setDeviceMetricsOverride', {
      width: w, height: 1000, deviceScaleFactor: 1, mobile: false,
    })
    await sleep(400)
    const res = await ev(probe(map))

    const gutter = parseFloat(res.__gutter)
    // From 1440 up: the 1280px column centred, so (viewport - 1280) / 2.
    // Below that: the viewport is full width and content starts at the gutter.
    const expectedLeft = w >= 1440 ? (w - 1280) / 2 : gutter

    const innerKeys = new Set(page.targets.filter(([, , e]) => e === 'inner').map(([k]) => k))
    const alignKeys = Object.keys(res).filter((k) => !k.startsWith('__') && res[k] !== 'MISSING' && !innerKeys.has(k))
    const missing = Object.entries(res).filter(([k]) => !k.startsWith('__') && res[k] === 'MISSING').map(([k]) => k)
    const xs = alignKeys.map((k) => res[k].x)
    const rights = alignKeys.map((k) => res[k].right)

    // Container right edge, taken from the widest aligned element that should run
    // the full column (the nav bar).
    const containerRight = res.nav ? res.nav.right : Math.max(...rights)

    const pairResults = (page.pairs || []).map(([a, b, wantGap]) => {
      if (!res[a] || !res[b]) return { pair: `${a}|${b}`, ok: false, why: 'missing' }
      const gap = +(res[b].x - res[a].right).toFixed(1)
      const spanOk = Math.abs(res[b].right - containerRight) < 0.75
      const gapOk = Math.abs(gap - wantGap) < 0.75
      const evenOk = Math.abs(res[a].w - res[b].w) < 0.75
      return {
        pair: `${a}|${b}`,
        ok: gapOk && spanOk && evenOk,
        gap,
        wantGap,
        equalWidths: evenOk,
        leftAligns: Math.abs(res[a].x - res[a].x) < 0.75,
        spanRight: res[b].right,
        containerRight,
      }
    })

    report.push({
      page: page.name,
      width: w,
      gutter: res.__gutter,
      expectedLeft,
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      spreadX: +(Math.max(...xs) - Math.min(...xs)).toFixed(1),
      spreadRight: +(Math.max(...rights) - Math.min(...rights)).toFixed(1),
      hScroll: res.__scrollW > res.__clientW,
      scrollW: res.__scrollW,
      missing,
      clipped: res.__clipped,
      pairs: pairResults,
      detail: Object.entries(res)
        .filter(([k]) => !k.startsWith('__'))
        .map(([k, v]) => `${k}${innerKeys.has(k) ? '*' : ''}=${v === 'MISSING' ? 'MISSING' : `${v.x}..${v.right}`}`)
        .join('  '),
    })
  }
  console.log(`measured ${page.name}`)
}

// Written outside the repo: a measurement artefact does not belong in the tree.
writeFileSync(join(tmpdir(), 'container-edges.json'), JSON.stringify(report, null, 2))

let bad = 0
for (const r of report) {
  const leftOk = Math.abs(r.minX - r.expectedLeft) < 0.75
  const aligned = r.spreadX < 0.75
  const pairsOk = r.pairs.every((p) => p.ok)
  const ok = leftOk && aligned && pairsOk && !r.hScroll && r.missing.length === 0 && r.clipped.length === 0
  if (!ok) bad++
  console.log(
    `${ok ? 'OK  ' : 'FAIL'} ${r.page.padEnd(8)} @${String(r.width).padEnd(5)}` +
      ` gutter=${r.gutter.padEnd(5)} expectLeft=${String(r.expectedLeft).padEnd(6)}` +
      ` gotLeft=${String(r.minX).padEnd(6)} spreadX=${String(r.spreadX).padEnd(5)}` +
      ` hScroll=${r.hScroll}` +
      (r.missing.length ? ` MISSING=${r.missing.join(',')}` : '') +
      (r.clipped.length ? ` CLIPPED=${r.clipped.join(' | ')}` : '') +
      (r.pairs.length && !pairsOk
        ? ` PAIRS=${r.pairs.map((p) => `${p.pair} gap=${p.gap}/${p.wantGap} right=${p.spanRight}vs${p.containerRight}`).join(' ')}`
        : '')
  )
  console.log(`       ${r.detail}   (* = inset by design)`)
}
console.log(`\n${report.length - bad}/${report.length} page-width combinations fully aligned.`)

ws.close()
chrome.kill()
