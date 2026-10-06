/* AUDIT ONLY — browser verification (Step 2).
   Requires the vite dev server (BASE, default http://localhost:5173).
   Writes ./verify-report/browser.json, ./verify-report/*.png and the
   typography table ./verify-report/typography.tsv. Never touches src/. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:5173';
const OUT = path.resolve('verify-report');
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/our-story', name: 'our-story' },
  { path: '/menu', name: 'menu' },
  { path: '/gallery', name: 'gallery' },
  { path: '/visit-contact', name: 'visit-contact' },
  { path: '/privacy-policy', name: 'privacy-policy' },
  { path: '/terms-and-conditions', name: 'terms-and-conditions' },
  { path: '/this-route-does-not-exist', name: 'not-found' },
];

const WIDTHS = (process.env.WIDTHS || '375,390,430,500,640,641,744,900,1023,1024,1136,1280,1440,1919,1920,2560')
  .split(',')
  .map(Number);
const SHOT_WIDTHS = [640, 641, 1023, 1024, 1919, 1920];
if (process.env.ROUTES) {
  const keep = process.env.ROUTES.split(',');
  for (let i = ROUTES.length - 1; i >= 0; i--) if (!keep.includes(ROUTES[i].name)) ROUTES.splice(i, 1);
}
const HEIGHT = 900;

const bandOf = (w) => (w < 641 ? 'phone' : w < 1024 ? 'tablet' : w < 1920 ? 'laptop' : 'desktop');
const EXPECT = {
  phone: { h1: 32, h2: 28, desc: 14, eyebrow: 12 },
  tablet: { h1: 44, h2: 36, desc: 16, eyebrow: 14 },
  laptop: { h1: 56, h2: 48, desc: 20, eyebrow: 16 },
  desktop: { h1: 64, h2: 52, desc: 20, eyebrow: 16 },
};
const expectedFs = (w, type, cls) => {
  const e = EXPECT[bandOf(w)][type];
  if (type === 'h1' && cls && cls.includes('menu-hero-title') && w >= 1024) return 64;
  return e;
};
const expectedLh = (w, type) => {
  const laptopPlus = w >= 1024;
  if (type === 'h1') return laptopPlus ? 1.1 : 1.15;
  if (type === 'h2') return laptopPlus ? 1.15 : 1.2;
  if (type === 'desc') return 1.5;
  return null;
};

/* ------------------------------------------------------------------ */
/* in-page collection                                                  */
/* ------------------------------------------------------------------ */
const COLLECT = () => {
  const vis = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const sel = (el) => {
    if (!el || !el.tagName) return String(el);
    let s = el.tagName.toLowerCase();
    if (el.classList && el.classList.length) s += '.' + [...el.classList].slice(0, 3).join('.');
    return s;
  };
  const snippet = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 48);

  const lineBoxes = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const words = [];
    let n;
    while ((n = walker.nextNode())) {
      const t = n.nodeValue || '';
      const re = /\S+/g;
      let m;
      while ((m = re.exec(t))) {
        const r = document.createRange();
        r.setStart(n, m.index);
        r.setEnd(n, m.index + m[0].length);
        const rc = r.getBoundingClientRect();
        if (rc.height > 0 && rc.width >= 0) words.push({ w: m[0], top: rc.top, left: rc.left });
      }
    }
    if (!words.length) return { lines: 0, lastLineWords: 0, lastLine: '', words: 0 };
    const groups = [];
    for (const w of words.sort((a, b) => a.top - b.top || a.left - b.left)) {
      let g = groups.find((g) => Math.abs(g.top - w.top) < 5);
      if (!g) { g = { top: w.top, words: [] }; groups.push(g); }
      g.words.push(w.w);
    }
    return {
      lines: groups.length,
      lastLineWords: groups[groups.length - 1].words.length,
      lastLine: groups[groups.length - 1].words.join(' '),
      words: words.length,
    };
  };

  const descFor = (h) => {
    let n = h.nextElementSibling;
    for (let i = 0; i < 5 && n; i++) {
      if (n.tagName === 'P') return n;
      if (/^H[1-6]$/.test(n.tagName)) return null;
      n = n.nextElementSibling;
    }
    const pn = h.parentElement ? h.parentElement.nextElementSibling : null;
    if (pn && pn.tagName === 'P') return pn;
    return null;
  };

  const mk = (el, type) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const clipped =
      el.scrollWidth > el.clientWidth + 1 &&
      (cs.overflowX === 'hidden' || cs.overflowX === 'clip');
    const out = {
      type,
      cls: (el.className || '').toString().replace(/\s+/g, ' ').trim(),
      sel: sel(el),
      text: snippet(el),
      fs: Math.round(parseFloat(cs.fontSize) * 1000) / 1000,
      lh: cs.lineHeight === 'normal' ? 'normal' : Math.round(parseFloat(cs.lineHeight) * 1000) / 1000,
      lhRatio:
        cs.lineHeight === 'normal'
          ? null
          : Math.round((parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)) * 1000) / 1000,
      w: Math.round(r.width),
      h: Math.round(r.height),
      clipped,
    };
    if (type === 'h1' || type === 'h2' || type === 'desc') Object.assign(out, lineBoxes(el));
    return out;
  };

  const items = [];
  const main = document.querySelector('main') || document.body;
  main.querySelectorAll('h1').forEach((el) => { if (vis(el)) items.push(mk(el, 'h1')); });
  main.querySelectorAll('h2').forEach((el) => { if (vis(el)) items.push(mk(el, 'h2')); });
  main.querySelectorAll('h1, h2').forEach((h) => {
    if (!vis(h)) return;
    const d = descFor(h);
    if (d && vis(d)) items.push(mk(d, 'desc'));
  });
  document.querySelectorAll('*').forEach((el) => {
    if (!el.classList) return;
    const isEb = [...el.classList].some((c) => c === 'eyebrow' || c.endsWith('-eyebrow'));
    if (!isEb) return;
    if (vis(el)) items.push(mk(el, 'eyebrow'));
  });

  /* horizontal overflow */
  const docScrollW = Math.max(document.documentElement.scrollWidth, document.body ? document.body.scrollWidth : 0);
  const overflowEls = [];
  const SKIP = '.pb-menu-drawer, .pb-menu-backdrop, .ai-widget, .ai-float, .skip-link, .preloader';
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest(SKIP)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    if (r.left < window.innerWidth - 1 && r.right > window.innerWidth + 1) {
      overflowEls.push({ sel: sel(el), left: Math.round(r.left), right: Math.round(r.right) });
    }
  }

  /* text under 12px (visible) */
  const small = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest(SKIP)) continue;
    if (!el.childNodes.length) continue;
    let txt = '';
    for (const c of el.childNodes) if (c.nodeType === 3) txt += c.nodeValue;
    txt = txt.trim();
    if (!txt) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    const fs = parseFloat(cs.fontSize);
    if (fs < 12) small.push({ sel: sel(el), fs: Math.round(fs * 100) / 100, text: txt.slice(0, 40) });
  }

  /* header */
  const one = (s) => document.querySelector(s);
  const logo = one('.site-header .header-logo');
  const navLinks = [...document.querySelectorAll('.site-header .nav-left .nav-link')].filter(vis);
  const cta = one('.site-header .header-cta');
  const toggle = one('.site-header .menu-toggle');
  const rectOf = (el) => (el ? el.getBoundingClientRect() : null);
  const lr = rectOf(logo);
  const nr = navLinks.length ? navLinks.map((n) => n.getBoundingClientRect()) : [];
  const navRight = nr.length ? Math.max(...nr.map((r) => r.right)) : null;
  const navLeft = nr.length ? Math.min(...nr.map((r) => r.left)) : null;
  const navTops = nr.map((r) => r.top);
  const cr = rectOf(cta);
  const header = {
    toggleVisible: toggle ? vis(toggle) : false,
    navCount: navLinks.length,
    logo: lr ? { left: Math.round(lr.left), right: Math.round(lr.right), top: Math.round(lr.top) } : null,
    nav: navRight !== null ? { left: Math.round(navLeft), right: Math.round(navRight), tops: navTops.map(Math.round) } : null,
    cta: cr ? { left: Math.round(cr.left), right: Math.round(cr.right), top: Math.round(cr.top) } : null,
    logoGap: lr && navRight !== null ? Math.round(lr.left - navRight) : null,
    ctaGap: cr && lr ? Math.round(cr.left - lr.right) : null,
    rowSpread: null,
    ctaPastViewport: cr ? cr.right > window.innerWidth + 1 : false,
    navPastViewport: navRight !== null ? navRight > window.innerWidth + 1 : false,
  };
  const tops = [...navTops];
  if (lr) tops.push(lr.top);
  if (cr) tops.push(cr.top);
  if (tops.length) header.rowSpread = Math.round(Math.max(...tops) - Math.min(...tops));

  return {
    url: location.pathname,
    innerW: window.innerWidth,
    docScrollW,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    items,
    overflowEls: overflowEls.slice(0, 8),
    overflowCount: overflowEls.length,
    small,
    header,
  };
};

/* ------------------------------------------------------------------ */
const rows = [];          // typography rows
const layout = [];        // per route/width layout rows
const shots = [];
const consoleErrors = [];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: HEIGHT }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('pageerror', (e) => consoleErrors.push(String(e).slice(0, 200)));

const waitReady = async () => {
  await page.waitForSelector('main', { timeout: 20000 }).catch(() => {});
  await page.waitForFunction(
    () => !document.querySelector('.preloader'),
    { timeout: 15000 }
  ).catch(() => {});
  await page.evaluate(() => (document.fonts ? document.fonts.ready : null)).catch(() => {});
  await page.waitForTimeout(350);
};

let done = 0;
const total = ROUTES.length * WIDTHS.length;

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: HEIGHT });
    await page.goto(BASE + route.path, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await waitReady();

    const data = await page.evaluate(COLLECT).catch((e) => ({ error: String(e) }));

    if (data.error) {
      layout.push({ route: route.name, width, error: data.error });
    } else {
      for (const it of data.items) {
        const exp = expectedFs(width, it.type, it.cls);
        const lhExp = expectedLh(width, it.type);
        const pass = Math.abs(it.fs - exp) < 0.01;
        rows.push({
          route: route.name,
          width,
          band: bandOf(width),
          type: it.type,
          cls: it.cls,
          sel: it.sel,
          text: it.text,
          fs: it.fs,
          lh: it.lh,
          lhRatio: it.lhRatio,
          expected: exp,
          expectedLh: lhExp,
          lhOk: lhExp === null ? null : it.lhRatio !== null && Math.abs(it.lhRatio - lhExp) < 0.005,
          clipped: it.clipped,
          lines: it.lines,
          lastLineWords: it.lastLineWords,
          lastLine: it.lastLine,
          pass,
        });
      }
      layout.push({
        route: route.name,
        width,
        band: bandOf(width),
        hScroll: data.hScroll,
        docScrollW: data.docScrollW,
        innerW: data.innerW,
        overflowCount: data.overflowCount,
        overflowEls: data.overflowEls,
        small: data.small,
        header: data.header,
      });
    }

    if (SHOT_WIDTHS.includes(width)) {
      const file = `${route.name}-${width}.png`;
      await page.screenshot({ path: path.join(OUT, file), fullPage: true }).catch(() => {});
      shots.push(file);
    }

    done++;
    process.stdout.write(`\r${done}/${total} ${route.name}@${width}   `);
  }
  console.log('');
}

/* ------------------------------------------------------------------ */
/* Figma line-break checks                                             */
/* ------------------------------------------------------------------ */
const lineChecks = [];
const checkLines = (route, width, type, clsPart, wantLines, note) => {
  const hits = rows.filter(
    (r) => r.route === route && r.width === width && r.type === type && r.cls.includes(clsPart)
  );
  for (const h of hits) {
    const ok = h.lines === wantLines;
    lineChecks.push({ route, width, type, cls: h.cls, text: h.text, found: h.lines, expected: wantLines, ok, note });
  }
  if (!hits.length) lineChecks.push({ route, width, type, cls: clsPart, text: '-', found: 0, expected: wantLines, ok: false, note: 'element not found' });
};
checkLines('home', 390, 'h1', 'hero-title', 3, 'Figma: Home hero H1 = 3 lines @390');
checkLines('menu', 390, 'h1', 'menu-hero-title', 3, 'Figma: Menu hero H1 = 3 lines @390');
checkLines('menu', 1440, 'h1', 'menu-hero-title', 2, 'Figma: Menu hero H1 = 2 lines @1440');
checkLines('gallery', 1440, 'h1', 'gal-hero-title', 1, 'Figma: Gallery H1 = 1 line @1440');
checkLines('gallery', 1440, 'desc', 'gal-hero-desc', 1, 'Figma: Gallery description = 1 line @1440');
checkLines('our-story', 1440, 'h1', 'ostory-title', 1, 'Figma: Our Story H1 = 1 line @1440');

/* ------------------------------------------------------------------ */
/* Menu tabs @390 and @1280, carousel @390 and @1280                   */
/* ------------------------------------------------------------------ */
const behaviour = [];
const testMenuTabs = async (width) => {
  await page.setViewportSize({ width, height: HEIGHT });
  await page.goto(BASE + '/menu', { waitUntil: 'domcontentloaded' });
  await waitReady();

  const read = () =>
    page.evaluate(() => {
      const active = document.querySelector('.menu-tab.is-active');
      const val = document.querySelector('.menu-select-value');
      const heading = document.querySelector('.menu-special-title');
      const rowsN = document.querySelectorAll('.menu-item').length;
      return {
        tab: active ? active.textContent.trim() : null,
        select: val ? val.textContent.trim() : null,
        heading: heading ? heading.textContent.trim().replace(/\s+/g, ' ') : null,
        rows: rowsN,
        tabsVisible: (() => {
          const t = document.querySelector('.menu-cats-tabs');
          if (!t) return false;
          const cs = getComputedStyle(t);
          const r = t.getBoundingClientRect();
          return cs.display !== 'none' && r.width > 0 && r.height > 0;
        })(),
        triggerVisible: (() => {
          const t = document.querySelector('.menu-select-trigger');
          if (!t) return false;
          const cs = getComputedStyle(t);
          const r = t.getBoundingClientRect();
          return cs.display !== 'none' && r.width > 0 && r.height > 0;
        })(),
      };
    });

  const before = await read();
  let after = null;
  let how = null;
  if (before.tabsVisible) {
    const tabs = await page.$$('.menu-tab');
    for (const t of tabs) {
      const txt = (await t.textContent()).trim();
      if (txt !== before.tab) {
        await t.click();
        how = 'clicked .menu-tab';
        break;
      }
    }
  } else if (before.triggerVisible) {
    await page.click('.menu-select-trigger');
    const opts = await page.$$('.menu-select-option');
    for (const o of opts) {
      const txt = (await o.textContent()).trim();
      if (txt !== before.select) {
        await o.click();
        how = 'opened .menu-select-trigger + clicked .menu-select-option';
        break;
      }
    }
  }
  await page.waitForTimeout(500);
  after = await read();
  const nowLabel = after.tab || after.select;
  const wasLabel = before.tab || before.select;
  const changed = nowLabel && wasLabel && nowLabel !== wasLabel;
  const contentChanged = after.heading !== before.heading;
  behaviour.push({
    check: 'menu-tabs',
    width,
    control: how || 'no control found',
    from: wasLabel,
    to: nowLabel,
    labelChanged: !!changed,
    headingBefore: before.heading,
    headingAfter: after.heading,
    headingChanged: !!contentChanged,
    pass: !!changed && !!contentChanged,
  });
};

const testCarousel = async (width) => {
  await page.setViewportSize({ width, height: HEIGHT });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await waitReady();
  const snap = () =>
    page.evaluate(() => {
      const cap = document.querySelector('.gallery-caption');
      const dot = document.querySelector('.gallery-dot.is-active');
      const item = document.querySelector('.carousel-item.center');
      const anims = document.getAnimations ? document.getAnimations() : [];
      const running = anims.filter((a) => a.playState === 'running').map((a) => (a.effect && a.effect.target ? (a.effect.target.className || '').toString().slice(0, 40) : '?'));
      const mood = document.querySelector('.gallery');
      const moodAnims = mood ? [...mood.getAnimations({ subtree: true })] : [];
      return {
        caption: cap ? cap.textContent.trim() : null,
        dot: dot ? [...document.querySelectorAll('.gallery-dot')].indexOf(dot) : null,
        center: item ? item.getAttribute('aria-label') : null,
        runningAnimCount: anims.length,
        runningSample: running.slice(0, 6),
        moodRunning: moodAnims.filter((a) => a.playState === 'running').length,
      };
    });
  const a = await snap();
  await page.waitForTimeout(5200);
  const b = await snap();
  behaviour.push({
    check: 'background-carousel',
    width,
    from: { caption: a.caption, dot: a.dot },
    to: { caption: b.caption, dot: b.dot },
    advanced: a.dot !== b.dot,
    runningAnims: a.runningAnimCount,
    moodRunningAnims: a.moodRunning,
    pass: a.dot !== b.dot,
  });
  behaviour.push({
    check: 'ambient-animations',
    width,
    runningAnims: a.runningAnimCount,
    sample: a.runningSample,
    pass: a.runningAnimCount > 0,
  });
};

await testMenuTabs(390);
await testMenuTabs(1280);
await testCarousel(390);
await testCarousel(1280);

/* ------------------------------------------------------------------ */
/* band test                                                           */
/* ------------------------------------------------------------------ */
const EDGES = [641, 1024, 1920];
const bandJumps = [];
const keyOf = (r) => `${r.type}|${r.cls}|${r.text}`;
const byKey = new Map();
for (const r of rows) {
  const k = `${r.route}|${keyOf(r)}`;
  if (!byKey.has(k)) byKey.set(k, new Map());
  byKey.get(k).set(r.width, r);
}
for (const [k, m] of byKey) {
  const ws = [...m.keys()].sort((a, b) => a - b);
  for (let i = 1; i < ws.length; i++) {
    const prev = m.get(ws[i - 1]);
    const cur = m.get(ws[i]);
    if (Math.abs(prev.fs - cur.fs) > 0.01) {
      const atEdge = EDGES.includes(ws[i]);
      if (!atEdge) bandJumps.push({ key: k, from: ws[i - 1], to: ws[i], fsPrev: prev.fs, fsNow: cur.fs, type: cur.type, cls: cur.cls });
    }
  }
}

/* ------------------------------------------------------------------ */
fs.writeFileSync(path.join(OUT, 'typography.json'), JSON.stringify(rows, null, 2));
fs.writeFileSync(path.join(OUT, 'layout.json'), JSON.stringify(layout, null, 2));
fs.writeFileSync(
  path.join(OUT, 'browser.json'),
  JSON.stringify({ lineChecks, behaviour, bandJumps, shots, consoleErrors }, null, 2)
);

const tsv = [
  'route\twidth\telement\ttext\tfont-size\tline-height\texpected\tpass',
  ...rows.map((r) => [r.route, r.width, `${r.type}:${r.cls || r.sel}`, r.text, r.fs, r.lh, r.expected, r.pass ? 'PASS' : 'FAIL'].join('\t')),
].join('\n');
fs.writeFileSync(path.join(OUT, 'typography.tsv'), tsv);

const fails = rows.filter((r) => !r.pass);
console.log(`\n\nTYPOGRAPHY rows=${rows.length} pass=${rows.length - fails.length} fail=${fails.length}`);
console.log(`LAYOUT rows=${layout.length}`);
console.log(`band jumps (unexpected)=${bandJumps.length}`);
console.log(`figma line checks fail=${lineChecks.filter((c) => !c.ok).length}`);
console.log(`behaviour fail=${behaviour.filter((b) => !b.pass).length}`);

await browser.close();
