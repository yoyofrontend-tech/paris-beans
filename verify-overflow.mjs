/* AUDIT ONLY — supplementary overflow probe (Step 2 add-on).
   body { overflow-x: hidden } (global.css:278) masks the page-scroll check, so this
   probe measures scrollWidth twice: as-is, and with body/html overflow temporarily set
   to visible (runtime only — no file is modified). Also reports, for every element whose
   right edge passes the viewport, the ancestor that clips it.
   Writes ./verify-report/overflow.json. */
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
const HEIGHT = 900;
const SKIP = '.pb-menu-drawer, .pb-menu-backdrop, .ai-widget, .ai-float, .skip-link, .preloader';

const PROBE = () => {
  const sel = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.classList && el.classList.length) s += '.' + [...el.classList].slice(0, 3).join('.');
    return s;
  };
  const clipper = (el) => {
    let n = el.parentElement;
    while (n && n !== document.documentElement) {
      const o = getComputedStyle(n).overflowX;
      if (o === 'hidden' || o === 'auto' || o === 'scroll' || o === 'clip') return sel(n) + ' [overflow-x=' + o + ']';
      n = n.parentElement;
    }
    return document.body && getComputedStyle(document.body).overflowX !== 'visible'
      ? 'body [overflow-x=' + getComputedStyle(document.body).overflowX + ']'
      : 'none (reaches viewport)';
  };

  const rawDoc = document.documentElement.scrollWidth;
  const rawBody = document.body.scrollWidth;
  const inner = window.innerWidth;

  const overflow = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest(SKIP)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    if (r.right > inner + 1) overflow.push({ sel: sel(el), right: Math.round(r.right), past: Math.round(r.right - inner), clipper: clipper(el) });
  }

  const bStyle = document.body.style.overflowX;
  const hStyle = document.documentElement.style.overflowX;
  document.body.style.overflowX = 'visible';
  document.documentElement.style.overflowX = 'visible';
  const unmaskedDoc = document.documentElement.scrollWidth;
  const unmaskedBody = document.body.scrollWidth;
  document.body.style.overflowX = bStyle;
  document.documentElement.style.overflowX = hStyle;

  return {
    inner,
    rawDoc,
    rawBody,
    rawHScroll: rawDoc > inner + 1,
    unmaskedDoc,
    unmaskedBody,
    unmaskedHScroll: unmaskedDoc > inner + 1,
    unmaskedScroll: Math.max(unmaskedDoc, unmaskedBody) - inner,
    overflowCount: overflow.length,
    overflow: overflow.slice(0, 12),
  };
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: HEIGHT }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

const waitReady = async () => {
  await page.waitForSelector('main', { timeout: 20000 }).catch(() => {});
  await page.waitForFunction(() => !document.querySelector('.preloader'), { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => (document.fonts ? document.fonts.ready : null)).catch(() => {});
  await page.waitForTimeout(300);
};

const rows = [];
let done = 0;
const total = ROUTES.length * WIDTHS.length;
for (const route of ROUTES) {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: HEIGHT });
    await page.goto(BASE + route.path, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await waitReady();
    const d = await page.evaluate(PROBE).catch((e) => ({ error: String(e) }));
    rows.push({ route: route.name, width, ...d });
    done++;
    process.stdout.write(`\r${done}/${total} ${route.name}@${width}   `);
  }
  console.log('');
}

fs.writeFileSync(path.join(OUT, 'overflow.json'), JSON.stringify(rows, null, 2));
const bad = rows.filter((r) => r.unmaskedHScroll);
console.log(`\nrows=${rows.length} rawHScroll=${rows.filter((r) => r.rawHScroll).length} unmaskedHScroll=${bad.length}`);
for (const r of bad) console.log(`  ${r.route}@${r.width} scroll=${r.unmaskedScroll}px over=${r.overflowCount}`);

await browser.close();
