# Paris Beans — Typography & Breakpoint Audit

**Run:** 2026-10-06 15:16 (final run) · **Playwright** 1.63.0 (chromium, headless) · **Base URL** `http://localhost:5173`
**Scope:** 8 routes × 16 widths = 128 page loads · 1520 measured type samples · 48 screenshots
**Rules:** audit only — no site file was modified by this task.

> NOTE: site files were being edited concurrently during this session
> (`Gallery.css` 15:00, `Menu.css` 14:34, `VisitContact.css` 13:48). All numbers below
> are from the final consecutive `verify-static` + `verify-browser` run above.

---

## 0. Terminal summary

```
RESULT: FAIL

passed : 6 rules   (token placement · no doubled selectors · no sub-12px text ·
                    typography scale on 1507/1520 samples · zero page-level horizontal
                    scroll + zero clipped text · header/hamburger behaviour ·
                    menu-tab + carousel behaviour)
failed : 3 rules   (breakpoint queries, font-size scale, Figma line count)
n/a    : particle system (does not exist), login (no auth anywhere)

worst route : visit-contact   (13 font-size FAILs, 11/11 unexpected size jumps,
                               12 of 21 off-scale media queries live in VisitContact.css)
worst 3 widths : 1023 (16) · 641 (15) · 744 (15)   [issue score = failed samples +
                               elements past viewport + small-font hits]
```

Issue score by route: `gallery 61 · menu 46 · home 35 · visit-contact 18 · our-story 0 ·
privacy-policy 0 · terms-and-conditions 0 · not-found 0`
(the gallery/menu/home scores are decorative/marquee elements that are clipped by an
ancestor scroller — see §5 — they do **not** produce page scroll).

---

## 1. Rule verdict

| # | Rule | Result |
|---|------|--------|
| 1a | Only `min-width: 641 / 1024 / 1920` media queries; no `max-width`; no forbidden values | **FAIL** — 21 of 79 CSS queries + 2 of 6 JS queries violate |
| 1b | H1/H2/description/eyebrow match the 4-band font-size scale | **FAIL** — 1 element (`.visit-cta-desc`) at 13 widths |
| 1c | Tokens defined once, only overridden at the 3 band edges | **PASS** — `--fs-*`/`--lh-*` only in `src/app/global.css` |
| 1d | No doubled `.a.a` selectors / no accidental duplicate declarations | **PASS** — 0 doubled; 16 duplicate same-selector rules (listed, benign) |
| 1e | No `font-size` under 12px | **PASS** — 0 in static scan; browser hits are 2 decorative rules with invisible text (§6) |
| 2 | No horizontal scroll, no clipped text, no overflow past viewport | **PASS** — `hScroll` 0/128, `clipped` 0/1520, every element past viewport is clipped by an ancestor scroller |
| 3 | Header fits at 641/744/1023/1024; hamburger only ≤640 | **PASS** |
| 4 | Figma line-count checks | **FAIL** — 1 of 6 (Menu hero H1 @1440) |
| 5 | Behaviour: menu tabs, background carousel, ambient animations | **PASS** — 6/6 checks |
| 6 | Particle system | **NOT FOUND** — no particle code anywhere in the repo (§7) |
| 7 | Login | **Not applicable** — no auth on any route (§7) |

---

## 2. FAIL — font sizes (rule 1b)

`13 rows / 1520` — all one element.

| Element | File:line | Got vs want |
|---|---|---|
| `.visit-cta-desc` (Visit & Contact CTA paragraph) | `src/features/visit/components/VisitContact.css:559` | see table |

| width | got | want | width | got | want |
|---|---|---|---|---|---|
| 375 | 16.015 | **14** | 1024 | 17.702 | **20** |
| 390 | 16.054 | **14** | 1136 | 17.994 | **20** |
| 430 | 16.158 | **14** | 1280 | 18.368 | **20** |
| 500 | 16.340 | **14** | 1440 | 18.784 | **20** |
| 640 | 16.704 | **14** | 1919 | 20 | 20 ✓ |
| 641 | 16.707 | **16** | 1920 | 20 | 20 ✓ |
| 744 | 16.974 | **16** | 2560 | 20 | 20 ✓ |
| 900 | 17.380 | **16** | | | |
| 1023 | 17.700 | **16** | | | |

**Root cause:** `font-size: var(--fs-text)` where
`--fs-text: clamp(1rem, 0.26vw + 0.94rem, 1.25rem)` (`src/app/global.css:86`).
That token is fluid 16→20px, so it never equals the 14/16/20/20 body band and it
changes at *every* width instead of at the three band edges.

---

## 3. Unexpected size jumps (rule 1b, band test)

**11 jumps** — every one is `.visit-cta-desc` (same root cause as §2):

`375→390 →430 →500 →640 | 641→744 →900 →1023 | 1024→1136 →1280 →1440 | 1440→1919`

No other element on any route changes font-size between sampled widths. All legal,
our-story, not-found, home and gallery headings move only at 641 / 1024 / 1920.

---

## 4. FAIL — breakpoints (rule 1a)

### 4a. CSS media queries — 21 FAIL of 79

| File | Line | Query | Problem |
|---|---|---|---|
| `src/app/Layout/components/AiAssistant/AiAssistant.css` | 519 | `max-width: 560px` | `max-width` forbidden |
| `src/features/gallery/components/Gallery.css` | 485 | `min-width: 1800px` | off-scale value |
| `src/features/gallery/components/Gallery.css` | 506 | `min-width: 768px and max-width: 1023px` | `max-width` + 768 |
| `src/features/gallery/components/Gallery.css` | 570 | `min-width: 1024px and max-width: 1099px` | `max-width` |
| `src/features/gallery/components/Gallery.css` | 624 | `min-width: 768px and max-width: 1099px` | `max-width` + 768 |
| `src/features/gallery/components/Gallery.css` | 694, 809, 902 | `max-width: 767px` | `max-width` + 767 |
| `src/features/gallery/components/Gallery.css` | 936 | `max-width: 480px` | `max-width` |
| `src/features/visit/components/VisitContact.css` | 131, 565, 676 | `min-width/max-width: 1100px` | off-scale + `max-width` |
| `src/features/visit/components/VisitContact.css` | 575 | `min-width: 1600px` | off-scale value |
| `src/features/visit/components/VisitContact.css` | 597, 690 | `max-width: 767px / 560px` | `max-width` |
| `src/features/visit/components/VisitContact.css` | 618 | `min-width: 768px and max-width: 1023px` | `max-width` + 768 |
| `src/features/visit/components/VisitContact.css` | 645 | `min-width: 1024px and max-width: 1099px` | `max-width` |
| `src/features/visit/components/VisitContact.css` | 666 | `min-width: 900px and max-width: 1099px` | `max-width` + 900 |
| `src/features/visit/components/VisitContact.css` | 682 | `max-width: 900px` | `max-width` + 900 |
| `src/features/visit/components/VisitContact.css` | 763 | `max-width: 400px` | `max-width` |
| `src/features/visit/components/VisitContact.css` | 786 | `max-width: 640px` | `max-width` (should be `min-width: 641px` inverted) |

Passing queries (58) are all `min-width: 641 / 1024 / 1920px` plus
`prefers-reduced-motion` / `hover: none` (non-width, reported N/A).

### 4b. JS width code — 2 FAIL of 6

| File:line | Code | Verdict |
|---|---|---|
| `src/features/story/components/OurStoryImageRow/OurStoryImageRow.jsx:18` | `media="(max-width: 640px)"` | **FAIL** — `max-width` forbidden |
| `src/features/story/components/OurStoryImageRow/OurStoryImageRow.jsx:22` | `media="(min-width: 641px) and (max-width: 1023px)"` | **FAIL** — `max-width` forbidden |
| `src/features/story/components/OurStoryHero/OurStoryHero.jsx:60` | `(min-width: 641px)` | PASS |
| `src/features/home/components/GalleryMood/GalleryMood.jsx:44,47` | `window.innerWidth` band edges 1920/1024/641 | INFO (values land on band edges) |
| `src/shared/hooks/useParallaxTilt.js:65` | `scroll` listener | INFO |

---

## 5. Layout checks (rule 2)

| Check | Result |
|---|---|
| Page-level horizontal scroll | **0 / 128** route×width combinations |
| Text clipped by `overflow:hidden` | **0 / 1520** samples |
| Elements whose box crosses the viewport edge | present, but **all** are inside an ancestor with `overflow-x: hidden/auto/scroll` (verified by ancestor walk) |

Representative clipped-by-ancestor results:

| Element | Clipped by |
|---|---|
| `img.home-menu-deco--br` (all widths) | `section.cafe [overflow-x=hidden]` |
| `figure.menu-item` (home @641–900) | `div.menu-grid [overflow-x=auto]` (intentional scroller) |
| `figure.menu-card` (menu @375–1023) | `div.menu-cards [overflow-x=hidden]` |
| `div.gallery-track` / `gallery-set` (all widths) | `div.gal-hero-collage [overflow-x=hidden]` (marquee) |

**Header fit**

| width | hamburger | nav links | logo↔nav gap | logo↔CTA gap | row spread | past viewport |
|---|---|---|---|---|---|---|
| 375 | visible ✓ | 0 | — | — | 5px | no |
| 640 | visible ✓ | 0 | — | — | 5px | no |
| **641** | hidden ✓ | 5 | 16px | 43px | 6px | no |
| **744** | hidden ✓ | 5 | 16px | 146px | 6px | no |
| 900 | hidden ✓ | 5 | 77px | 241px | 6px | no |
| **1023** | hidden ✓ | 5 | 139px | 302px | 6px | no |
| **1024** | hidden ✓ | 5 | 32px | 221px | 10px | no |
| 1440 | hidden ✓ | 5 | 199px | 447px | 10px | no |
| 1920 | hidden ✓ | 5 | 177px | 447px | 10px | no |

Hamburger shows at 640 and below only — correct.

---

## 6. Font sizes under 12px (rule 1e)

Static scan: **0** declarations under 12px.
Browser: 18 hits, all two elements with intentionally invisible glyphs:

| Element | Size | Why it is not a violation |
|---|---|---|
| `.menu-hero-dash` (`Menu.css:132-139`, `:1206-1213`) | 0px @375–1023 | `font-size:0; line-height:0` hides the “—” glyph; the element is drawn as a 14×1px rule via `background-color`. At ≥1024 it reverts to `font-size: inherit`. |
| `.visit-hero-dash` (`VisitContact.css:857-865`) | 0px @375–640 | same trick inside the phone-only block |

Excluded as hidden text per the rule. No real text renders below 12px anywhere.

---

## 7. Particles & login

* **Particle system: NOT FOUND.** Searched `public/`, `src/`, `index.html` for
  `particle`/`psjs`/`particles`/canvas confetti in `*.html`, `*.js`, `*.jsx`, `*.mjs`,
  `*.css` — zero matches. The closest ambient motion in the codebase is
  `moodKenBurns`, `pbCompositionFloat`, `shimmerSweep`, `brandGlowBreath`,
  the `reveal`/`reveal-delay-*` IntersectionObserver system, and the
  `GalleryMood` coverflow.
* **Login: not applicable.** No route (`/`, `/our-story`, `/menu`, `/gallery`,
  `/visit-contact`, `/privacy-policy`, `/terms-and-conditions`, 404) requires auth;
  all 128 loads returned rendered content with no auth wall.

---

## 8. Figma line-count checks (rule 4)

| Route | Width | Element | Expected | Got | Result |
|---|---|---|---|---|---|
| home | 390 | `.hero-title` | 3 lines | 3 | OK |
| menu | 390 | `.menu-hero-title` | 3 lines | 3 | OK |
| **menu** | **1440** | **`.menu-hero-title`** | **2 lines** | **3** | **FAIL** |
| gallery | 1440 | `.gal-hero-title` | 1 line | 1 | OK |
| gallery | 1440 | `.gal-hero-desc.lead` | 1 line | 1 | OK |
| our-story | 1440 | `.ostory-title` | 1 line | 1 | OK |

`.menu-hero-title` also wraps to **4 lines** at 1024 and 1136 (not a Figma-checked
width, but a sign the measure is too narrow once the 64px tier kicks in —
`Menu.css:1216`).

---

## 9. Behaviour checks (rule 5) — 6/6 PASS

| Check | Width | Result |
|---|---|---|
| Menu tabs switch category | 390 | PASS — tab label `Hot Coffees → Cold Frappe`, heading `Specialty Hot Coffees (240 ml) → Cold Frappe (350 ml)` |
| Menu tabs switch category | 1280 | PASS — same transition |
| Background carousel advances | 390 | PASS — caption `Warm Parisian café corner → Espresso being poured`, active dot 0→1 after 4.5 s |
| Background carousel advances | 1280 | PASS — same |
| Ambient animations running | 390 | PASS — 36 running animations (8 inside `.mood-*`) |
| Ambient animations running | 1280 | PASS — 41 running animations (18 inside `.mood-*`) |

Console/page errors during all 128 loads: **0**.

At 390 the Menu control is the tab row (`.menu-cats-tabs` 358×48, `.menu-tab` 116×44);
`.menu-select` is not rendered and `.menu-select-trigger` is 0×0 — the dropdown is not
in play at that width, so the tab test exercised the real control.

---

## 10. WARN — line-height (informational, does not affect PASS/FAIL)

54 rows differ from the expected ratio (`h1 1.15/1.1`, `h2 1.2/1.15`, `desc 1.5`):

| Element | Got | Expected | Widths |
|---|---|---|---|
| `.visit-hero-title` (H1) | 1.25 | 1.15 | 375–640 |
| `.gal-hero-title` (H1) | 1.1 | 1.15 | 500–900, 1024+ |
| `.ostory-origin-title`, `.ostory-cta-title` (H2) | 1.1 | 1.2 | 641–1023 |
| `.visit-cta-desc` | 1.7 | 1.5 | 375–1440 |
| `.ostory-origin-text` | 1.625 | 1.5 | 641–1023 |
| `.gal-hero-desc.lead` | 1.45 / 1.4 | 1.5 | 500–900, 1024 |

---

## 11. WARN — line counts & widows

* **Max heading line count = 4** → no heading exceeds 4 lines (`home .cafe-title` @1024+,
  `menu .menu-hero-title` @1024/1136).
* Body paragraphs exceeding 4 lines: `home .cafe-paragraph` @1024 (5),
  `.visit-cta-desc` @375 (5), legal `.legal-lede` and `.legal-h2` descriptions @375–430
  (5–6). Normal for copy; listed for completeness.
* **Single word alone on the last line (widows):**

| Element | Widths |
|---|---|
| `home .cafe-title` → “Indulgences.” | 1024, 1136, 1280, 1440, 1919, 1920, 2560 |
| `home .lead` (desc) | 1024, 1136 |
| `our-story .ostory-origin-title` → “Experience.” | 375–640 and 1024–2560 |
| `menu .menu-hero-title` → “Appointment.” | 375–1136 |
| `visit-contact .visit-hero-title` → “Paris.” | 500 |
| `privacy-policy .legal-title` → “Respected.” | 375, 390, 1024 |
| `privacy-policy .legal-h2` → “Information” | 375, 390, 430, 1024 |

---

## 12. Hardcoded `font-size` declarations (37) — classified

**In scope (should use a band token) — 1:**

| File:line | Selector | Value | Note |
|---|---|---|---|
| `VisitContact.css:559` | `.visit-cta-desc` | `var(--fs-text)` | the §2 failure; switch to `var(--fs-body)` |

**Harmless (hardcodes the base band's value, overridden at 641/1024) — 1:**

| File:line | Selector | Value | Note |
|---|---|---|---|
| `Menu.css:164` | `.menu-hero-desc` | `14px` | re-set to `var(--fs-body)` at `Menu.css:1008` (≥641) and `:1228` (≥1024); measured 14/16/20/20 ✓ |

**Review — 7 (fluid `clamp` or band-independent; descriptive copy, not an H1/H2/desc/eyebrow):**

| File:line | Selector | Value |
|---|---|---|
| `GalleryMood.css:263` | `.gallery-caption` | `var(--fs-text)` (clamp) |
| `CafeMenu.css:265` | `.menu-caption` | `var(--fs-text)` (clamp) |
| `Menu.css:1359` | `.menu-item-desc` | `var(--fs-text)` (clamp) |
| `VisitContact.css:765` | `.visit-info-value` | `clamp(...)` inside `max-width: 400px` (off-scale query too) |
| `VisitContact.css:770` | `.visit-info-link` | `clamp(...)` inside `max-width: 400px` (off-scale query too) |
| `Preloader.css:153` | `.preloader-wordmark` | `clamp(...)` (preloader only) |
| `Preloader.css:334` | `.preloader-wordmark` | `clamp(...)` `@min-width: 641px` (preloader only) |

**Out of scope (not H1/H2/description/eyebrow) — 28:** navigation, tabs, buttons, form
fields, prices, captions, benefit cards, story-ring labels, AI widget title — listed in
`static.json → fsRows`. Two are deliberate UI sizes: `.nav-link 13px`
(`Header.css:654`, inside the valid `min-width: 641px` block) and
`.menu-hero-title 64px` (`Menu.css:1216`, the documented Menu-hero exception at ≥1024).

---

## 13. Other static findings

* **Doubled `.a.a` selectors:** 0.
* **Duplicate same-selector rules:** 16 (e.g. `StorySection.css:1 & 255 .story`,
  `StorySection.css:12 & 259 .story-grid` redeclares `min-height, display, gap,
  align-items`, `Gallery.css:849 & 949 .gal-grid @max-width:767px`). Cosmetic / merge
  residue; none changes the font-size result.
* **Token table** (`src/app/global.css` only — no redefinition elsewhere):

| Token | base | ≥641 | ≥1024 | ≥1920 |
|---|---|---|---|---|
| `--fs-h1` | 32px (L74) | 44px (L202) | 56px (L218) | 64px (L234) |
| `--lh-h1` | 1.15 (L75) | — | 1.1 (L219) | — |
| `--fs-h2` | 28px (L76) | 36px (L203) | 48px (L220) | 52px (L235) |
| `--lh-h2` | 1.2 (L77) | — | 1.15 (L221) | — |
| `--fs-body` (descriptions) | 14px (L78) | 16px (L204) | 20px (L222) | — |
| `--lh-body` | 1.5 (L79) | — | — | — |
| `--fs-eyebrow` | 12px (L80) | 14px (L205) | 16px (L223) | — |

---

## 14. Top 5 fixes

1. **`src/features/visit/components/VisitContact.css:559`** — `font-size: var(--fs-text)`
   → `var(--fs-body)` (and `line-height: var(--lh-text)` → `var(--lh-body)` if 1.5 is
   wanted). **Clears 13 failed samples and all 11 unexpected jumps.**
2. **Remap the 21 off-scale media queries** to `min-width: 641 / 1024 / 1920` only —
   `VisitContact.css` (12), `Gallery.css` (8), `AiAssistant.css` (1).
3. **`OurStoryImageRow.jsx:18, 22`** — replace the two `max-width` `<picture>` media
   queries with `min-width` band logic (or reuse `OurStoryHero.jsx:60`'s pattern).
4. **`Menu.css` hero H1** — 1440 renders 3 lines (Figma wants 2) and 1024/1136 render 4;
   widen `.menu-hero-title` / adjust the 64px tier at `Menu.css:1216`.
5. **Line-height alignment** — `.visit-hero-title` 1.25→1.15, `.gal-hero-title`
   1.1→1.15, `.ostory-*` H2 1.1→1.2, descriptions 1.7/1.625/1.45→1.5 (§10).

---

## 15. Artifacts

```
verify-static.mjs                 Step 1 static audit (parser: media stack + decl line numbers)
verify-browser.mjs                Step 2 Playwright audit (env: ROUTES, WIDTHS for subsets)
verify-report/REPORT.md           this file
verify-report/static.json         79 media · 6 js · 37 hardcoded · 0 doubled · 16 dup · 0 small
verify-report/static-print.txt    same, human-readable
verify-report/typography.json     1520 samples (route, width, type, cls, fs, lh, lines, pass)
verify-report/typography.tsv      same, spreadsheet-friendly
verify-report/layout.json         128 rows: hScroll, overflow, clipped, small, header geometry
verify-report/browser.json        band jumps, Figma line checks, behaviour, shots, console errors
verify-report/<route>-<w>.png     48 screenshots @ 640, 641, 1023, 1024, 1919, 1920
```

Re-run: `node verify-static.mjs` then `node verify-browser.mjs`
(subset: `ROUTES=menu,home WIDTHS=390,641,1440 node verify-browser.mjs`).
