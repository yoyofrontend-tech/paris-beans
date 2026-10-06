# Paris Beans — Typography & Breakpoint Audit

**Run:** 2026-10-06 12:26 · **Playwright** (chromium, headless) · **Base URL** `http://localhost:5173`
**Scope:** 8 routes × 16 widths = 128 page loads · 1520 measured type samples · 48 screenshots
**Rules:** audit only — no site file was modified by this task (only `verify-static.mjs`, `verify-browser.mjs`, `verify-overflow.mjs`, `verify-report.mjs` and `./verify-report/` were added).

> The working tree at run time is commit `9242f4b` (`style: update gallery hero heading`) on top of `09ab101` (`revert: restore previous design styles`), which put the 744/1136 breakpoint system and the fluid `clamp()` type ramp back in place. Everything below measures that state.

---

## a) Summary

```
total checks : 5868
passed       : 3621
failed       : 2247
verdict      : FAIL (every route fails)
```

### Verdict per route

| route | samples | passed | failed | score* | verdict |
|---|---|---|---|---|---|
| `home` | 240 | 76 | 164 | 322 | **FAIL** |
| `our-story` | 144 | 21 | 123 | 227 | **FAIL** |
| `menu` | 160 | 58 | 102 | 198 | **FAIL** |
| `gallery` | 240 | 9 | 231 | 453 | **FAIL** |
| `visit-contact` | 112 | 14 | 98 | 178 | **FAIL** |
| `privacy-policy` | 240 | 18 | 222 | 385 | **FAIL** |
| `terms-and-conditions` | 336 | 27 | 309 | 526 | **FAIL** |
| `not-found` | 48 | 3 | 45 | 85 | **FAIL** |

\* score = failed samples + sub-12px hits + elements past viewport + unexpected size jumps on that route.

### Rule ledger

| # | rule | checks | passed | failed |
|---|---|---|---|---|
| 1 | 1a CSS width media queries = only min-width 641/1024/1920 | 96 | 13 | **83** |
| 2 | 1a JS width code (matchMedia / picture media / breakpoints) | 6 | 0 | **6** |
| 3 | 1b hardcoded font-size on the 4 text types | 98 | 39 | **59** |
| 4 | 1c no doubled .a.a selectors | 1 | 1 | 0 |
| 5 | 1c no duplicate same-selector declarations | 1 | 0 | **1** |
| 6 | 1d tokens defined once, overridden only at 641/1024/1920 | 7 | 3 | **4** |
| 7 | 1e no font-size < 12px (static) | 1 | 0 | **1** |
| 8 | 1e no visible text < 12px (browser) | 1 | 0 | **1** |
| 9 | 2 typography samples match the band scale | 1520 | 226 | **1294** |
| 10 | 2 font-size changes only at 641/1024/1920 (band test) | 2149 | 1427 | **722** |
| 11 | 2 no page-level horizontal scroll (raw) | 128 | 128 | 0 |
| 12 | 2 no page-level horizontal scroll (body overflow unmasked) | 128 | 128 | 0 |
| 13 | 2 no text clipped by overflow:hidden on the 4 types | 1520 | 1520 | 0 |
| 14 | 2 no element past the viewport | 128 | 85 | **43** |
| 15 | 3 header fits one row at 641/744/1023/1024 (nav+logo+CTA) | 32 | 0 | **32** |
| 16 | 3 hamburger only at 640 and below | 40 | 40 | 0 |
| 17 | 4 Figma line-break checks | 6 | 5 | **1** |
| 18 | 5 behaviour: menu tabs / carousel / ambient animation | 6 | 6 | 0 |

### Terminal summary

```
RESULT: FAIL   passed 3621 / 5868 · failed 2247
worst route     : terms-and-conditions (score 526)
worst 3 widths  : 1136 · 744 · 1280  (187, 184, 182)
```

Route scores: home 322 · our-story 227 · menu 198 · gallery 453 · visit-contact 178 · privacy-policy 385 · terms-and-conditions 526 · not-found 85
Width scores: 375:124 390:155 430:155 500:159 640:156 641:140 744:184 900:179 1023:179 1024:101 1136:187 1280:182 1440:178 1919:149 1920:69 2560:77

---

## b) Every FAIL — typography samples

**1294 of 1520 samples** fail the expected band scale (phone 375–640 · tablet 641–1023 · laptop 1024–1919 · desktop 1920+).

### b1. Grouped

| route | element | file:line | #fail | widths (found → expected) |
|---|---|---|---|---|
| `home` | description `experience-desc reveal reveal-delay-2 is-visible` | src/pages/home/CallToAction.css:79 | 9 | 375:12→14, 390:12→14, 430:12→14, 500:13.7→14, 641:14→16, 744:17→16, 900:17→16, 1023:17→16, 1024:17→20 |
| `home` | description `hero-desc reveal reveal-delay-2 is-visible` | src/features/home/components/Hero/Hero.css:187 | 10 | 375:14.673→14, 390:14.725→14, 430:14.865→14, 500:15.11→14, 640:15.6→14, 641:15.604→16, 744:17→16, 900:17→16, 1023:17→16, 1024:17→20 |
| `home` | description `lead cafe-paragraph reveal reveal-delay-2` | src/features/home/components/CafeMenu/CafeMenu.css:97 | 13 | 375:16.015→14, 390:16.054→14, 430:16.158→14, 500:16.34→14, 640:16.704→14, 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `home` | description `lead gallery-desc` | src/features/home/components/GalleryMood/GalleryMood.css:54 | 13 | 375:16.015→14, 390:16.054→14, 430:16.158→14, 500:16.34→14, 640:16.704→14, 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `home` | description `lead story-paragraph reveal reveal-delay-2` | src/features/home/components/StorySection/StorySection.css:286 | 9 | 375:16→14, 390:16→14, 430:16→14, 500:16→14, 640:16→14, 1024:16→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `home` | eyebrow `eyebrow hero-eyebrow` | src/features/menu/components/Menu.css:939 | 16 | 375:11→12, 390:11→12, 430:11→12, 500:11→12, 640:11→12, 641:11→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `home` | eyebrow `eyebrow reveal is-visible` | src/features/menu/components/Menu.css:939 | 11 | 641:12→14, 744:12→14, 900:12→14, 1023:12→14, 1024:12→16, 1136:12→16, 1280:12→16, 1440:12→16, 1919:12→16, 1920:12→16, 2560:12→16 |
| `home` | eyebrow `eyebrow reveal` | src/features/menu/components/Menu.css:939 | 16 | 375:10→12, 390:10→12, 430:10→12, 500:10→12, 640:10→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `home` | eyebrow `eyebrow` | src/features/menu/components/Menu.css:939 | 16 | 375:10→12, 390:10→12, 430:10→12, 500:10→12, 640:10→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `home` | eyebrow `pb-story-eyebrow eyebrow reveal` | src/features/home/components/StorySection/StorySection.css:270 | 11 | 641:12→14, 744:12→14, 900:12→14, 1023:12→14, 1024:12→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `home` | H1 `hero-title is-visible` | src/features/home/components/Hero/Hero.css:123 | 2 | 641:32→44, 1024:44→56 |
| `home` | H2 `cafe-title reveal reveal-delay-1` | src/features/home/components/CafeMenu/CafeMenu.css:83 | 11 | 641:28→36, 744:37.772→36, 900:40.19→36, 1023:42.097→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `home` | H2 `experience-title reveal reveal-delay-1 is-visible` | src/pages/home/CallToAction.css:97 | 5 | 375:22→28, 390:22→28, 430:22→28, 641:28→36, 1024:36→48 |
| `home` | H2 `gallery-title` | src/features/home/components/GalleryMood/GalleryMood.css:42 | 11 | 641:28→36, 744:37.772→36, 900:40.19→36, 1023:42.097→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `home` | H2 `story-title reveal reveal-delay-1` | src/features/home/components/StorySection/StorySection.css:28 | 11 | 641:28→36, 744:37.772→36, 900:40.19→36, 1023:42.097→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `our-story` | description `ostory-cta-desc` | src/features/story/components/OurStoryCta/OurStoryCta.css:113 | 16 | 375:16.015→14, 390:16.054→14, 430:16.158→14, 500:16.34→14, 640:16.704→14, 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:16.76→20, 1280:17.12→20, 1440:17.52→20, 1919:18.6→20, 1920:18.6→20, 2560:18.6→20 |
| `our-story` | description `ostory-desc reveal reveal-delay-2 is-visible` | src/features/story/components/OurStoryHero/OurStoryHero.css:268 | 12 | 375:16.015→14, 390:16.054→14, 430:16.158→14, 500:16.34→14, 640:16.704→14, 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:16→20, 1280:17.92→20 |
| `our-story` | description `ostory-origin-text` | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 | 16 | 375:16.015→14, 390:16.054→14, 430:16.158→14, 500:16.34→14, 640:16.704→14, 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:16.76→20, 1280:17.12→20, 1440:17.52→20, 1919:18.6→20, 1920:18.6→20, 2560:18.6→20 |
| `our-story` | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | src/features/menu/components/Menu.css:939 | 16 | 375:10→12, 390:10→12, 430:10→12, 500:10→12, 640:10→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:18→16, 1280:18→16, 1440:18→16, 1919:18→16, 1920:18→16, 2560:18→16 |
| `our-story` | eyebrow `eyebrow ostory-eyebrow` | src/features/menu/components/Menu.css:939 | 32 | 375:10→12, 375:10→12, 390:10→12, 390:10→12, 430:10→12, 430:10→12, 500:10→12, 500:10→12, 640:10→12, 640:10→12, 641:10→14, 641:10→14, 744:12.487→14, 744:12.487→14, 900:12.69→14, 900:12.69→14, 1023:12.85→14, 1023:12.85→14, 1024:12.851→16, 1024:12.851→16, 1136:12.997→16, 1136:12.997→16, 1280:13.184→16, 1280:13.184→16, 1440:13.392→16, 1440:13.392→16, 1919:14→16, 1919:14→16, 1920:14→16, 1920:14→16, 2560:14→16, 2560:14→16 |
| `our-story` | H1 `ostory-title reveal reveal-delay-1 is-visible` | src/features/story/components/OurStoryHero/OurStoryHero.css:263 | 9 | 641:32→44, 744:45.224→44, 900:48.5→44, 1023:51.083→44, 1024:51.104→56, 1136:44.304→56, 1280:49.92→56, 1920:56→64, 2560:56→64 |
| `our-story` | H2 `ostory-cta-title` | src/features/story/components/OurStoryCta/OurStoryCta.css:27 | 11 | 641:28→36, 744:37.772→36, 900:40.19→36, 1023:42.097→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `our-story` | H2 `ostory-origin-title` | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 | 11 | 641:28→36, 744:37.772→36, 900:40.19→36, 1023:42.097→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `menu` | description `menu-cafe-desc reveal reveal-delay-2` | src/features/menu/components/Menu.css:813 | 13 | 375:15→14, 390:15→14, 430:15→14, 500:15→14, 640:15→14, 641:18→16, 744:18→16, 900:18→16, 1023:18→16, 1024:17.702→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `menu` | description `menu-cta-desc` | src/features/menu/components/Menu.css:960 | 13 | 375:13→14, 390:13→14, 430:13→14, 500:13→14, 640:13→14, 641:14→16, 744:14→16, 900:14→16, 1023:14→16, 1024:17.702→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `menu` | description `menu-hero-desc` | src/features/menu/components/Menu.css:164 | 8 | 641:18→16, 744:18→16, 900:18→16, 1023:18→16, 1024:17.702→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `menu` | eyebrow `eyebrow menu-hero-eyebrow` | src/features/menu/components/Menu.css:939 | 7 | 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `menu` | eyebrow `eyebrow` | src/features/menu/components/Menu.css:939 | 11 | 641:13→14, 744:13→14, 900:13→14, 1023:13→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `menu` | H1 `menu-hero-title` | src/features/menu/components/Menu.css:145 | 12 | 375:28→32, 390:28→32, 430:28→32, 500:28→32, 640:28→32, 1024:51.104→64, 1136:53.456→64, 1280:56.48→64, 1440:59.84→64, 1919:69.899→64, 1920:69.92→64, 2560:83.36→64 |
| `menu` | H2 `menu-cafe-title reveal reveal-delay-1` | src/features/menu/components/Menu.css:800 | 11 | 641:44→36, 744:44→36, 900:44→36, 1023:44→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `menu` | H2 `menu-cta-title` | src/features/menu/components/Menu.css:944 | 16 | 375:24→28, 390:24→28, 430:24→28, 500:24→28, 640:24→28, 641:32→36, 744:32→36, 900:32→36, 1023:32→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `menu` | H2 `menu-special-title` | src/features/menu/components/Menu.css:419 | 11 | 641:44→36, 744:44→36, 900:44→36, 1023:44→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `gallery` | description `gal-hero-desc lead` | src/features/gallery/components/Gallery.css:315 | 12 | 375:15→14, 390:15→14, 430:15→14, 500:16.34→14, 640:16.704→14, 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:16→20, 1280:17.92→20 |
| `gallery` | description `gal-section-desc lead` | src/features/gallery/components/Gallery.css:315 | 64 | 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1136:16.76→20, 1136:16.76→20, 1136:16.76→20, 1136:16.76→20, 1280:17.12→20, 1280:17.12→20, 1280:17.12→20, 1280:17.12→20, 1440:17.52→20, 1440:17.52→20, 1440:17.52→20, 1440:17.52→20, 1919:18.6→20, 1919:18.6→20, 1919:18.6→20, 1919:18.6→20, 1920:18.6→20, 1920:18.6→20, 1920:18.6→20, 1920:18.6→20, 2560:18.6→20, 2560:18.6→20, 2560:18.6→20, 2560:18.6→20 |
| `gallery` | eyebrow `eyebrow gal-hero-eyebrow` | src/features/menu/components/Menu.css:939 | 16 | 375:10→12, 390:10→12, 430:10→12, 500:10→12, 640:10→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:18→16, 1280:18→16, 1440:18→16, 1919:18→16, 1920:18→16, 2560:18→16 |
| `gallery` | eyebrow `eyebrow gal-section-eyebrow` | src/features/menu/components/Menu.css:939 | 64 | 375:10→12, 375:10→12, 375:10→12, 375:10→12, 390:10→12, 390:10→12, 390:10→12, 390:10→12, 430:10→12, 430:10→12, 430:10→12, 430:10→12, 500:10→12, 500:10→12, 500:10→12, 500:10→12, 640:10→12, 640:10→12, 640:10→12, 640:10→12, 641:10→14, 641:10→14, 641:10→14, 641:10→14, 744:12.487→14, 744:12.487→14, 744:12.487→14, 744:12.487→14, 900:12.69→14, 900:12.69→14, 900:12.69→14, 900:12.69→14, 1023:12.85→14, 1023:12.85→14, 1023:12.85→14, 1023:12.85→14, 1024:12.851→16, 1024:12.851→16, 1024:12.851→16, 1024:12.851→16, 1136:12.997→16, 1136:12.997→16, 1136:12.997→16, 1136:12.997→16, 1280:13.184→16, 1280:13.184→16, 1280:13.184→16, 1280:13.184→16, 1440:13.392→16, 1440:13.392→16, 1440:13.392→16, 1440:13.392→16, 1919:14→16, 1919:14→16, 1919:14→16, 1919:14→16, 1920:14→16, 1920:14→16, 1920:14→16, 1920:14→16, 2560:14→16, 2560:14→16, 2560:14→16, 2560:14→16 |
| `gallery` | H1 `gal-hero-title` | src/features/gallery/components/Gallery.css:388 | 11 | 500:40.1→32, 640:43.04→32, 641:43.061→44, 744:45.224→44, 900:48.5→44, 1023:51.083→44, 1024:51.104→56, 1136:44.304→56, 1280:49.92→56, 1920:56→64, 2560:56→64 |
| `gallery` | H2 `gal-section-title` | src/features/gallery/components/Gallery.css:241 | 64 | 375:24→28, 375:24→28, 375:24→28, 375:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52 |
| `visit-contact` | description `visit-cta-desc` | src/features/visit/components/VisitContact.css:559 | 13 | 375:16.015→14, 390:16.054→14, 430:16.158→14, 500:16.34→14, 640:16.704→14, 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `visit-contact` | description `visit-hero-desc` | src/features/visit/components/VisitContact.css:882 | 8 | 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `visit-contact` | eyebrow `eyebrow visit-hero-eyebrow` | src/features/menu/components/Menu.css:939 | 16 | 375:14→12, 390:14→12, 430:14→12, 500:14→12, 640:14→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `visit-contact` | eyebrow `eyebrow` | src/features/menu/components/Menu.css:939 | 16 | 375:10→12, 390:10→12, 430:10→12, 500:10→12, 640:10→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `visit-contact` | H1 `visit-hero-title` | src/features/visit/components/VisitContact.css:871 | 16 | 375:28→32, 390:28→32, 430:28→32, 500:28→32, 640:28→32, 641:43.061→44, 744:45.224→44, 900:48.5→44, 1023:51.083→44, 1024:51.104→56, 1136:53.456→56, 1280:56.48→56, 1440:59.84→56, 1919:69.899→56, 1920:69.92→64, 2560:83.36→64 |
| `visit-contact` | H2 `visit-card-title` | src/features/visit/components/VisitContact.css:207 | 13 | 500:30→28, 640:38.4→28, 641:38.4→36, 744:38.4→36, 900:29.52→36, 1023:30.799→36, 1024:30.81→48, 1136:31.974→48, 1280:33.472→48, 1440:35.136→48, 1919:40→48, 1920:40→52, 2560:40→52 |
| `visit-contact` | H2 `visit-cta-title section-heading` | src/features/visit/components/VisitContact.css:130 | 16 | 375:24→28, 390:24→28, 430:24→28, 500:24→28, 640:24→28, 641:24→36, 744:37.772→36, 900:40.19→36, 1023:42.097→36, 1024:42.112→48, 1136:43.848→48, 1280:46.08→48, 1440:48.56→48, 1919:55.985→48, 1920:56→52, 2560:56→52 |
| `privacy-policy` | description `legal-lede` | src/features/legal/components/LegalPage/Legal.css:189 | 16 | 375:17.025→14, 390:17.13→14, 430:17.41→14, 500:17.9→14, 640:18.88→14, 641:18.887→16, 744:19.608→16, 900:20.7→16, 1023:21.561→16, 1024:21.568→20, 1136:22.352→20, 1280:23.36→20, 1440:24.48→20, 1919:27.833→20, 1920:27.84→20, 2560:28→20 |
| `privacy-policy` | description `p` | - | 78 | 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20 |
| `privacy-policy` | eyebrow `legal-eyebrow` | src/features/legal/components/LegalPage/Legal.css:158 | 16 | 375:10→12, 390:10→12, 430:10→12, 500:10→12, 640:10→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `privacy-policy` | H1 `legal-title` | src/features/legal/components/LegalPage/Legal.css:174 | 16 | 375:37.475→32, 390:37.79→32, 430:38.63→32, 500:40.1→32, 640:43.04→32, 641:43.061→44, 744:45.224→44, 900:48.5→44, 1023:51.083→44, 1024:51.104→56, 1136:53.456→56, 1280:56.48→56, 1440:59.84→56, 1919:69.899→56, 1920:69.92→64, 2560:83.36→64 |
| `privacy-policy` | H2 `legal-h2` | src/features/legal/components/LegalPage/Legal.css:252 | 96 | 375:24→28, 375:24→28, 375:24→28, 375:24→28, 375:24→28, 375:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52 |
| `terms-and-conditions` | description `legal-lede` | src/features/legal/components/LegalPage/Legal.css:189 | 16 | 375:17.025→14, 390:17.13→14, 430:17.41→14, 500:17.9→14, 640:18.88→14, 641:18.887→16, 744:19.608→16, 900:20.7→16, 1023:21.561→16, 1024:21.568→20, 1136:22.352→20, 1280:23.36→20, 1440:24.48→20, 1919:27.833→20, 1920:27.84→20, 2560:28→20 |
| `terms-and-conditions` | description `p` | - | 117 | 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 375:16.015→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 390:16.054→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 430:16.158→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 500:16.34→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 640:16.704→14, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 641:16.707→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 744:16.974→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 900:17.38→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1023:17.7→16, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1024:17.702→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1136:17.994→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1280:18.368→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20, 1440:18.784→20 |
| `terms-and-conditions` | eyebrow `legal-eyebrow` | src/features/legal/components/LegalPage/Legal.css:158 | 16 | 375:10→12, 390:10→12, 430:10→12, 500:10→12, 640:10→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `terms-and-conditions` | H1 `legal-title` | src/features/legal/components/LegalPage/Legal.css:174 | 16 | 375:37.475→32, 390:37.79→32, 430:38.63→32, 500:40.1→32, 640:43.04→32, 641:43.061→44, 744:45.224→44, 900:48.5→44, 1023:51.083→44, 1024:51.104→56, 1136:53.456→56, 1280:56.48→56, 1440:59.84→56, 1919:69.899→56, 1920:69.92→64, 2560:83.36→64 |
| `terms-and-conditions` | H2 `legal-h2` | src/features/legal/components/LegalPage/Legal.css:252 | 144 | 375:24→28, 375:24→28, 375:24→28, 375:24→28, 375:24→28, 375:24→28, 375:24→28, 375:24→28, 375:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 390:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 430:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 500:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 640:24→28, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 641:24→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 744:37.772→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 900:40.19→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1023:42.097→36, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1024:42.112→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1136:43.848→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1280:46.08→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1440:48.56→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1919:55.985→48, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 1920:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52, 2560:56→52 |
| `not-found` | description `lead nf-desc reveal reveal-delay-2 is-visible` | src/pages/not-found/NotFoundPage.css:73 | 13 | 375:16.015→14, 390:16.054→14, 430:16.158→14, 500:16.34→14, 640:16.704→14, 641:16.707→16, 744:16.974→16, 900:17.38→16, 1023:17.7→16, 1024:17.702→20, 1136:17.994→20, 1280:18.368→20, 1440:18.784→20 |
| `not-found` | eyebrow `eyebrow nf-eyebrow reveal is-visible` | src/features/menu/components/Menu.css:939 | 16 | 375:10→12, 390:10→12, 430:10→12, 500:10→12, 640:10→12, 641:10→14, 744:12.487→14, 900:12.69→14, 1023:12.85→14, 1024:12.851→16, 1136:12.997→16, 1280:13.184→16, 1440:13.392→16, 1919:14→16, 1920:14→16, 2560:14→16 |
| `not-found` | H1 `nf-title reveal reveal-delay-2 is-visible` | src/pages/not-found/NotFoundPage.css:64 | 16 | 375:25.6→32, 390:25.6→32, 430:25.6→32, 500:25.6→32, 640:25.6→32, 641:25.6→44, 744:26.04→44, 900:31.5→44, 1023:35.805→44, 1024:35.84→56, 1136:36.8→56, 1280:36.8→56, 1440:36.8→56, 1919:36.8→56, 1920:36.8→64, 2560:36.8→64 |

### b2. Every failing sample

| route | width | element | found | expected | file:line |
|---|---|---|---|---|---|
| home | 375 | H2 `experience-title reveal reveal-delay-1 is-visible` | 22 | 28 | src/pages/home/CallToAction.css:97 |
| home | 375 | description `hero-desc reveal reveal-delay-2 is-visible` | 14.673 | 14 | src/features/home/components/Hero/Hero.css:187 |
| home | 375 | description `experience-desc reveal reveal-delay-2 is-visible` | 12 | 14 | src/pages/home/CallToAction.css:79 |
| home | 375 | description `lead story-paragraph reveal reveal-delay-2` | 16 | 14 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 375 | description `lead cafe-paragraph reveal reveal-delay-2` | 16.015 | 14 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 375 | description `lead gallery-desc` | 16.015 | 14 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 375 | eyebrow `eyebrow hero-eyebrow` | 11 | 12 | src/features/menu/components/Menu.css:939 |
| home | 375 | eyebrow `eyebrow reveal` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 375 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 390 | H2 `experience-title reveal reveal-delay-1 is-visible` | 22 | 28 | src/pages/home/CallToAction.css:97 |
| home | 390 | description `hero-desc reveal reveal-delay-2 is-visible` | 14.725 | 14 | src/features/home/components/Hero/Hero.css:187 |
| home | 390 | description `experience-desc reveal reveal-delay-2 is-visible` | 12 | 14 | src/pages/home/CallToAction.css:79 |
| home | 390 | description `lead story-paragraph reveal reveal-delay-2` | 16 | 14 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 390 | description `lead cafe-paragraph reveal reveal-delay-2` | 16.054 | 14 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 390 | description `lead gallery-desc` | 16.054 | 14 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 390 | eyebrow `eyebrow hero-eyebrow` | 11 | 12 | src/features/menu/components/Menu.css:939 |
| home | 390 | eyebrow `eyebrow reveal` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 390 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 430 | H2 `experience-title reveal reveal-delay-1 is-visible` | 22 | 28 | src/pages/home/CallToAction.css:97 |
| home | 430 | description `hero-desc reveal reveal-delay-2 is-visible` | 14.865 | 14 | src/features/home/components/Hero/Hero.css:187 |
| home | 430 | description `experience-desc reveal reveal-delay-2 is-visible` | 12 | 14 | src/pages/home/CallToAction.css:79 |
| home | 430 | description `lead story-paragraph reveal reveal-delay-2` | 16 | 14 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 430 | description `lead cafe-paragraph reveal reveal-delay-2` | 16.158 | 14 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 430 | description `lead gallery-desc` | 16.158 | 14 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 430 | eyebrow `eyebrow hero-eyebrow` | 11 | 12 | src/features/menu/components/Menu.css:939 |
| home | 430 | eyebrow `eyebrow reveal` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 430 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 500 | description `hero-desc reveal reveal-delay-2 is-visible` | 15.11 | 14 | src/features/home/components/Hero/Hero.css:187 |
| home | 500 | description `experience-desc reveal reveal-delay-2 is-visible` | 13.7 | 14 | src/pages/home/CallToAction.css:79 |
| home | 500 | description `lead story-paragraph reveal reveal-delay-2` | 16 | 14 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 500 | description `lead cafe-paragraph reveal reveal-delay-2` | 16.34 | 14 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 500 | description `lead gallery-desc` | 16.34 | 14 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 500 | eyebrow `eyebrow hero-eyebrow` | 11 | 12 | src/features/menu/components/Menu.css:939 |
| home | 500 | eyebrow `eyebrow reveal` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 500 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 640 | description `hero-desc reveal reveal-delay-2 is-visible` | 15.6 | 14 | src/features/home/components/Hero/Hero.css:187 |
| home | 640 | description `lead story-paragraph reveal reveal-delay-2` | 16 | 14 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 640 | description `lead cafe-paragraph reveal reveal-delay-2` | 16.704 | 14 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 640 | description `lead gallery-desc` | 16.704 | 14 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 640 | eyebrow `eyebrow hero-eyebrow` | 11 | 12 | src/features/menu/components/Menu.css:939 |
| home | 640 | eyebrow `eyebrow reveal` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 640 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| home | 641 | H1 `hero-title is-visible` | 32 | 44 | src/features/home/components/Hero/Hero.css:123 |
| home | 641 | H2 `experience-title reveal reveal-delay-1 is-visible` | 28 | 36 | src/pages/home/CallToAction.css:97 |
| home | 641 | H2 `story-title reveal reveal-delay-1` | 28 | 36 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 641 | H2 `cafe-title reveal reveal-delay-1` | 28 | 36 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 641 | H2 `gallery-title` | 28 | 36 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 641 | description `hero-desc reveal reveal-delay-2 is-visible` | 15.604 | 16 | src/features/home/components/Hero/Hero.css:187 |
| home | 641 | description `experience-desc reveal reveal-delay-2 is-visible` | 14 | 16 | src/pages/home/CallToAction.css:79 |
| home | 641 | description `lead cafe-paragraph reveal reveal-delay-2` | 16.707 | 16 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 641 | description `lead gallery-desc` | 16.707 | 16 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 641 | eyebrow `eyebrow hero-eyebrow` | 11 | 14 | src/features/menu/components/Menu.css:939 |
| home | 641 | eyebrow `eyebrow reveal is-visible` | 12 | 14 | src/features/menu/components/Menu.css:939 |
| home | 641 | eyebrow `pb-story-eyebrow eyebrow reveal` | 12 | 14 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 641 | eyebrow `eyebrow reveal` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| home | 641 | eyebrow `eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| home | 744 | H2 `story-title reveal reveal-delay-1` | 37.772 | 36 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 744 | H2 `cafe-title reveal reveal-delay-1` | 37.772 | 36 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 744 | H2 `gallery-title` | 37.772 | 36 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 744 | description `hero-desc reveal reveal-delay-2 is-visible` | 17 | 16 | src/features/home/components/Hero/Hero.css:187 |
| home | 744 | description `experience-desc reveal reveal-delay-2 is-visible` | 17 | 16 | src/pages/home/CallToAction.css:79 |
| home | 744 | description `lead cafe-paragraph reveal reveal-delay-2` | 16.974 | 16 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 744 | description `lead gallery-desc` | 16.974 | 16 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 744 | eyebrow `eyebrow hero-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| home | 744 | eyebrow `eyebrow reveal is-visible` | 12 | 14 | src/features/menu/components/Menu.css:939 |
| home | 744 | eyebrow `pb-story-eyebrow eyebrow reveal` | 12 | 14 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 744 | eyebrow `eyebrow reveal` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| home | 744 | eyebrow `eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| home | 900 | H2 `story-title reveal reveal-delay-1` | 40.19 | 36 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 900 | H2 `cafe-title reveal reveal-delay-1` | 40.19 | 36 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 900 | H2 `gallery-title` | 40.19 | 36 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 900 | description `hero-desc reveal reveal-delay-2 is-visible` | 17 | 16 | src/features/home/components/Hero/Hero.css:187 |
| home | 900 | description `experience-desc reveal reveal-delay-2 is-visible` | 17 | 16 | src/pages/home/CallToAction.css:79 |
| home | 900 | description `lead cafe-paragraph reveal reveal-delay-2` | 17.38 | 16 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 900 | description `lead gallery-desc` | 17.38 | 16 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 900 | eyebrow `eyebrow hero-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| home | 900 | eyebrow `eyebrow reveal is-visible` | 12 | 14 | src/features/menu/components/Menu.css:939 |
| home | 900 | eyebrow `pb-story-eyebrow eyebrow reveal` | 12 | 14 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 900 | eyebrow `eyebrow reveal` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| home | 900 | eyebrow `eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| home | 1023 | H2 `story-title reveal reveal-delay-1` | 42.097 | 36 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 1023 | H2 `cafe-title reveal reveal-delay-1` | 42.097 | 36 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 1023 | H2 `gallery-title` | 42.097 | 36 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 1023 | description `hero-desc reveal reveal-delay-2 is-visible` | 17 | 16 | src/features/home/components/Hero/Hero.css:187 |
| home | 1023 | description `experience-desc reveal reveal-delay-2 is-visible` | 17 | 16 | src/pages/home/CallToAction.css:79 |
| home | 1023 | description `lead cafe-paragraph reveal reveal-delay-2` | 17.7 | 16 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 1023 | description `lead gallery-desc` | 17.7 | 16 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 1023 | eyebrow `eyebrow hero-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| home | 1023 | eyebrow `eyebrow reveal is-visible` | 12 | 14 | src/features/menu/components/Menu.css:939 |
| home | 1023 | eyebrow `pb-story-eyebrow eyebrow reveal` | 12 | 14 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 1023 | eyebrow `eyebrow reveal` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| home | 1023 | eyebrow `eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| home | 1024 | H1 `hero-title is-visible` | 44 | 56 | src/features/home/components/Hero/Hero.css:123 |
| home | 1024 | H2 `experience-title reveal reveal-delay-1 is-visible` | 36 | 48 | src/pages/home/CallToAction.css:97 |
| home | 1024 | H2 `story-title reveal reveal-delay-1` | 42.112 | 48 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 1024 | H2 `cafe-title reveal reveal-delay-1` | 42.112 | 48 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 1024 | H2 `gallery-title` | 42.112 | 48 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 1024 | description `hero-desc reveal reveal-delay-2 is-visible` | 17 | 20 | src/features/home/components/Hero/Hero.css:187 |
| home | 1024 | description `experience-desc reveal reveal-delay-2 is-visible` | 17 | 20 | src/pages/home/CallToAction.css:79 |
| home | 1024 | description `lead story-paragraph reveal reveal-delay-2` | 16 | 20 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 1024 | description `lead cafe-paragraph reveal reveal-delay-2` | 17.702 | 20 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 1024 | description `lead gallery-desc` | 17.702 | 20 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 1024 | eyebrow `eyebrow hero-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1024 | eyebrow `eyebrow reveal is-visible` | 12 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1024 | eyebrow `pb-story-eyebrow eyebrow reveal` | 12 | 16 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 1024 | eyebrow `eyebrow reveal` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1024 | eyebrow `eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1136 | H2 `story-title reveal reveal-delay-1` | 43.848 | 48 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 1136 | H2 `cafe-title reveal reveal-delay-1` | 43.848 | 48 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 1136 | H2 `gallery-title` | 43.848 | 48 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 1136 | description `lead story-paragraph reveal reveal-delay-2` | 17.994 | 20 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 1136 | description `lead cafe-paragraph reveal reveal-delay-2` | 17.994 | 20 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 1136 | description `lead gallery-desc` | 17.994 | 20 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 1136 | eyebrow `eyebrow hero-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1136 | eyebrow `eyebrow reveal is-visible` | 12 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1136 | eyebrow `pb-story-eyebrow eyebrow reveal` | 12.997 | 16 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 1136 | eyebrow `eyebrow reveal` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1136 | eyebrow `eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1280 | H2 `story-title reveal reveal-delay-1` | 46.08 | 48 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 1280 | H2 `cafe-title reveal reveal-delay-1` | 46.08 | 48 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 1280 | H2 `gallery-title` | 46.08 | 48 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 1280 | description `lead story-paragraph reveal reveal-delay-2` | 18.368 | 20 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 1280 | description `lead cafe-paragraph reveal reveal-delay-2` | 18.368 | 20 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 1280 | description `lead gallery-desc` | 18.368 | 20 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 1280 | eyebrow `eyebrow hero-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1280 | eyebrow `eyebrow reveal is-visible` | 12 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1280 | eyebrow `pb-story-eyebrow eyebrow reveal` | 13.184 | 16 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 1280 | eyebrow `eyebrow reveal` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1280 | eyebrow `eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1440 | H2 `story-title reveal reveal-delay-1` | 48.56 | 48 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 1440 | H2 `cafe-title reveal reveal-delay-1` | 48.56 | 48 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 1440 | H2 `gallery-title` | 48.56 | 48 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 1440 | description `lead story-paragraph reveal reveal-delay-2` | 18.784 | 20 | src/features/home/components/StorySection/StorySection.css:286 |
| home | 1440 | description `lead cafe-paragraph reveal reveal-delay-2` | 18.784 | 20 | src/features/home/components/CafeMenu/CafeMenu.css:97 |
| home | 1440 | description `lead gallery-desc` | 18.784 | 20 | src/features/home/components/GalleryMood/GalleryMood.css:54 |
| home | 1440 | eyebrow `eyebrow hero-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1440 | eyebrow `eyebrow reveal is-visible` | 12 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1440 | eyebrow `pb-story-eyebrow eyebrow reveal` | 13.392 | 16 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 1440 | eyebrow `eyebrow reveal` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1440 | eyebrow `eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1919 | H2 `story-title reveal reveal-delay-1` | 55.985 | 48 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 1919 | H2 `cafe-title reveal reveal-delay-1` | 55.985 | 48 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 1919 | H2 `gallery-title` | 55.985 | 48 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 1919 | eyebrow `eyebrow hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1919 | eyebrow `eyebrow reveal is-visible` | 12 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1919 | eyebrow `pb-story-eyebrow eyebrow reveal` | 14 | 16 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 1919 | eyebrow `eyebrow reveal` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1919 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1920 | H2 `story-title reveal reveal-delay-1` | 56 | 52 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 1920 | H2 `cafe-title reveal reveal-delay-1` | 56 | 52 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 1920 | H2 `gallery-title` | 56 | 52 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 1920 | eyebrow `eyebrow hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1920 | eyebrow `eyebrow reveal is-visible` | 12 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1920 | eyebrow `pb-story-eyebrow eyebrow reveal` | 14 | 16 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 1920 | eyebrow `eyebrow reveal` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| home | 1920 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| home | 2560 | H2 `story-title reveal reveal-delay-1` | 56 | 52 | src/features/home/components/StorySection/StorySection.css:28 |
| home | 2560 | H2 `cafe-title reveal reveal-delay-1` | 56 | 52 | src/features/home/components/CafeMenu/CafeMenu.css:83 |
| home | 2560 | H2 `gallery-title` | 56 | 52 | src/features/home/components/GalleryMood/GalleryMood.css:42 |
| home | 2560 | eyebrow `eyebrow hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| home | 2560 | eyebrow `eyebrow reveal is-visible` | 12 | 16 | src/features/menu/components/Menu.css:939 |
| home | 2560 | eyebrow `pb-story-eyebrow eyebrow reveal` | 14 | 16 | src/features/home/components/StorySection/StorySection.css:270 |
| home | 2560 | eyebrow `eyebrow reveal` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| home | 2560 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 375 | description `ostory-desc reveal reveal-delay-2 is-visible` | 16.015 | 14 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 375 | description `ostory-origin-text` | 16.015 | 14 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 375 | description `ostory-cta-desc` | 16.015 | 14 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 375 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 375 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 375 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 390 | description `ostory-desc reveal reveal-delay-2 is-visible` | 16.054 | 14 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 390 | description `ostory-origin-text` | 16.054 | 14 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 390 | description `ostory-cta-desc` | 16.054 | 14 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 390 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 390 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 390 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 430 | description `ostory-desc reveal reveal-delay-2 is-visible` | 16.158 | 14 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 430 | description `ostory-origin-text` | 16.158 | 14 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 430 | description `ostory-cta-desc` | 16.158 | 14 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 430 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 430 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 430 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 500 | description `ostory-desc reveal reveal-delay-2 is-visible` | 16.34 | 14 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 500 | description `ostory-origin-text` | 16.34 | 14 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 500 | description `ostory-cta-desc` | 16.34 | 14 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 500 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 500 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 500 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 640 | description `ostory-desc reveal reveal-delay-2 is-visible` | 16.704 | 14 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 640 | description `ostory-origin-text` | 16.704 | 14 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 640 | description `ostory-cta-desc` | 16.704 | 14 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 640 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 640 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 640 | eyebrow `eyebrow ostory-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| our-story | 641 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 32 | 44 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 641 | H2 `ostory-origin-title` | 28 | 36 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 641 | H2 `ostory-cta-title` | 28 | 36 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 641 | description `ostory-desc reveal reveal-delay-2 is-visible` | 16.707 | 16 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 641 | description `ostory-origin-text` | 16.707 | 16 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 641 | description `ostory-cta-desc` | 16.707 | 16 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 641 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 641 | eyebrow `eyebrow ostory-eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 641 | eyebrow `eyebrow ostory-eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 744 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 45.224 | 44 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 744 | H2 `ostory-origin-title` | 37.772 | 36 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 744 | H2 `ostory-cta-title` | 37.772 | 36 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 744 | description `ostory-desc reveal reveal-delay-2 is-visible` | 16.974 | 16 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 744 | description `ostory-origin-text` | 16.974 | 16 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 744 | description `ostory-cta-desc` | 16.974 | 16 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 744 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 744 | eyebrow `eyebrow ostory-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 744 | eyebrow `eyebrow ostory-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 900 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 48.5 | 44 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 900 | H2 `ostory-origin-title` | 40.19 | 36 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 900 | H2 `ostory-cta-title` | 40.19 | 36 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 900 | description `ostory-desc reveal reveal-delay-2 is-visible` | 17.38 | 16 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 900 | description `ostory-origin-text` | 17.38 | 16 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 900 | description `ostory-cta-desc` | 17.38 | 16 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 900 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 900 | eyebrow `eyebrow ostory-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 900 | eyebrow `eyebrow ostory-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 1023 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 51.083 | 44 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 1023 | H2 `ostory-origin-title` | 42.097 | 36 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 1023 | H2 `ostory-cta-title` | 42.097 | 36 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 1023 | description `ostory-desc reveal reveal-delay-2 is-visible` | 17.7 | 16 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 1023 | description `ostory-origin-text` | 17.7 | 16 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 1023 | description `ostory-cta-desc` | 17.7 | 16 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 1023 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 1023 | eyebrow `eyebrow ostory-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 1023 | eyebrow `eyebrow ostory-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| our-story | 1024 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 51.104 | 56 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 1024 | H2 `ostory-origin-title` | 42.112 | 48 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 1024 | H2 `ostory-cta-title` | 42.112 | 48 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 1024 | description `ostory-desc reveal reveal-delay-2 is-visible` | 17.702 | 20 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 1024 | description `ostory-origin-text` | 17.702 | 20 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 1024 | description `ostory-cta-desc` | 17.702 | 20 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 1024 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1024 | eyebrow `eyebrow ostory-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1024 | eyebrow `eyebrow ostory-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1136 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 44.304 | 56 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 1136 | H2 `ostory-origin-title` | 43.848 | 48 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 1136 | H2 `ostory-cta-title` | 43.848 | 48 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 1136 | description `ostory-desc reveal reveal-delay-2 is-visible` | 16 | 20 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 1136 | description `ostory-origin-text` | 16.76 | 20 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 1136 | description `ostory-cta-desc` | 16.76 | 20 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 1136 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1136 | eyebrow `eyebrow ostory-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1136 | eyebrow `eyebrow ostory-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1280 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 49.92 | 56 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 1280 | H2 `ostory-origin-title` | 46.08 | 48 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 1280 | H2 `ostory-cta-title` | 46.08 | 48 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 1280 | description `ostory-desc reveal reveal-delay-2 is-visible` | 17.92 | 20 | src/features/story/components/OurStoryHero/OurStoryHero.css:268 |
| our-story | 1280 | description `ostory-origin-text` | 17.12 | 20 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 1280 | description `ostory-cta-desc` | 17.12 | 20 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 1280 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1280 | eyebrow `eyebrow ostory-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1280 | eyebrow `eyebrow ostory-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1440 | H2 `ostory-origin-title` | 48.56 | 48 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 1440 | H2 `ostory-cta-title` | 48.56 | 48 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 1440 | description `ostory-origin-text` | 17.52 | 20 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 1440 | description `ostory-cta-desc` | 17.52 | 20 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 1440 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1440 | eyebrow `eyebrow ostory-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1440 | eyebrow `eyebrow ostory-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1919 | H2 `ostory-origin-title` | 55.985 | 48 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 1919 | H2 `ostory-cta-title` | 55.985 | 48 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 1919 | description `ostory-origin-text` | 18.6 | 20 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 1919 | description `ostory-cta-desc` | 18.6 | 20 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 1919 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1919 | eyebrow `eyebrow ostory-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1919 | eyebrow `eyebrow ostory-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1920 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 56 | 64 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 1920 | H2 `ostory-origin-title` | 56 | 52 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 1920 | H2 `ostory-cta-title` | 56 | 52 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 1920 | description `ostory-origin-text` | 18.6 | 20 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 1920 | description `ostory-cta-desc` | 18.6 | 20 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 1920 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1920 | eyebrow `eyebrow ostory-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 1920 | eyebrow `eyebrow ostory-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 2560 | H1 `ostory-title reveal reveal-delay-1 is-visible` | 56 | 64 | src/features/story/components/OurStoryHero/OurStoryHero.css:263 |
| our-story | 2560 | H2 `ostory-origin-title` | 56 | 52 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:28 |
| our-story | 2560 | H2 `ostory-cta-title` | 56 | 52 | src/features/story/components/OurStoryCta/OurStoryCta.css:27 |
| our-story | 2560 | description `ostory-origin-text` | 18.6 | 20 | src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580 |
| our-story | 2560 | description `ostory-cta-desc` | 18.6 | 20 | src/features/story/components/OurStoryCta/OurStoryCta.css:113 |
| our-story | 2560 | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 2560 | eyebrow `eyebrow ostory-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| our-story | 2560 | eyebrow `eyebrow ostory-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 375 | H1 `menu-hero-title` | 28 | 32 | src/features/menu/components/Menu.css:145 |
| menu | 375 | H2 `menu-cta-title` | 24 | 28 | src/features/menu/components/Menu.css:944 |
| menu | 375 | description `menu-cafe-desc reveal reveal-delay-2` | 15 | 14 | src/features/menu/components/Menu.css:813 |
| menu | 375 | description `menu-cta-desc` | 13 | 14 | src/features/menu/components/Menu.css:960 |
| menu | 390 | H1 `menu-hero-title` | 28 | 32 | src/features/menu/components/Menu.css:145 |
| menu | 390 | H2 `menu-cta-title` | 24 | 28 | src/features/menu/components/Menu.css:944 |
| menu | 390 | description `menu-cafe-desc reveal reveal-delay-2` | 15 | 14 | src/features/menu/components/Menu.css:813 |
| menu | 390 | description `menu-cta-desc` | 13 | 14 | src/features/menu/components/Menu.css:960 |
| menu | 430 | H1 `menu-hero-title` | 28 | 32 | src/features/menu/components/Menu.css:145 |
| menu | 430 | H2 `menu-cta-title` | 24 | 28 | src/features/menu/components/Menu.css:944 |
| menu | 430 | description `menu-cafe-desc reveal reveal-delay-2` | 15 | 14 | src/features/menu/components/Menu.css:813 |
| menu | 430 | description `menu-cta-desc` | 13 | 14 | src/features/menu/components/Menu.css:960 |
| menu | 500 | H1 `menu-hero-title` | 28 | 32 | src/features/menu/components/Menu.css:145 |
| menu | 500 | H2 `menu-cta-title` | 24 | 28 | src/features/menu/components/Menu.css:944 |
| menu | 500 | description `menu-cafe-desc reveal reveal-delay-2` | 15 | 14 | src/features/menu/components/Menu.css:813 |
| menu | 500 | description `menu-cta-desc` | 13 | 14 | src/features/menu/components/Menu.css:960 |
| menu | 640 | H1 `menu-hero-title` | 28 | 32 | src/features/menu/components/Menu.css:145 |
| menu | 640 | H2 `menu-cta-title` | 24 | 28 | src/features/menu/components/Menu.css:944 |
| menu | 640 | description `menu-cafe-desc reveal reveal-delay-2` | 15 | 14 | src/features/menu/components/Menu.css:813 |
| menu | 640 | description `menu-cta-desc` | 13 | 14 | src/features/menu/components/Menu.css:960 |
| menu | 641 | H2 `menu-special-title` | 44 | 36 | src/features/menu/components/Menu.css:419 |
| menu | 641 | H2 `menu-cafe-title reveal reveal-delay-1` | 44 | 36 | src/features/menu/components/Menu.css:800 |
| menu | 641 | H2 `menu-cta-title` | 32 | 36 | src/features/menu/components/Menu.css:944 |
| menu | 641 | description `menu-hero-desc` | 18 | 16 | src/features/menu/components/Menu.css:164 |
| menu | 641 | description `menu-cafe-desc reveal reveal-delay-2` | 18 | 16 | src/features/menu/components/Menu.css:813 |
| menu | 641 | description `menu-cta-desc` | 14 | 16 | src/features/menu/components/Menu.css:960 |
| menu | 641 | eyebrow `eyebrow` | 13 | 14 | src/features/menu/components/Menu.css:939 |
| menu | 744 | H2 `menu-special-title` | 44 | 36 | src/features/menu/components/Menu.css:419 |
| menu | 744 | H2 `menu-cafe-title reveal reveal-delay-1` | 44 | 36 | src/features/menu/components/Menu.css:800 |
| menu | 744 | H2 `menu-cta-title` | 32 | 36 | src/features/menu/components/Menu.css:944 |
| menu | 744 | description `menu-hero-desc` | 18 | 16 | src/features/menu/components/Menu.css:164 |
| menu | 744 | description `menu-cafe-desc reveal reveal-delay-2` | 18 | 16 | src/features/menu/components/Menu.css:813 |
| menu | 744 | description `menu-cta-desc` | 14 | 16 | src/features/menu/components/Menu.css:960 |
| menu | 744 | eyebrow `eyebrow` | 13 | 14 | src/features/menu/components/Menu.css:939 |
| menu | 900 | H2 `menu-special-title` | 44 | 36 | src/features/menu/components/Menu.css:419 |
| menu | 900 | H2 `menu-cafe-title reveal reveal-delay-1` | 44 | 36 | src/features/menu/components/Menu.css:800 |
| menu | 900 | H2 `menu-cta-title` | 32 | 36 | src/features/menu/components/Menu.css:944 |
| menu | 900 | description `menu-hero-desc` | 18 | 16 | src/features/menu/components/Menu.css:164 |
| menu | 900 | description `menu-cafe-desc reveal reveal-delay-2` | 18 | 16 | src/features/menu/components/Menu.css:813 |
| menu | 900 | description `menu-cta-desc` | 14 | 16 | src/features/menu/components/Menu.css:960 |
| menu | 900 | eyebrow `eyebrow` | 13 | 14 | src/features/menu/components/Menu.css:939 |
| menu | 1023 | H2 `menu-special-title` | 44 | 36 | src/features/menu/components/Menu.css:419 |
| menu | 1023 | H2 `menu-cafe-title reveal reveal-delay-1` | 44 | 36 | src/features/menu/components/Menu.css:800 |
| menu | 1023 | H2 `menu-cta-title` | 32 | 36 | src/features/menu/components/Menu.css:944 |
| menu | 1023 | description `menu-hero-desc` | 18 | 16 | src/features/menu/components/Menu.css:164 |
| menu | 1023 | description `menu-cafe-desc reveal reveal-delay-2` | 18 | 16 | src/features/menu/components/Menu.css:813 |
| menu | 1023 | description `menu-cta-desc` | 14 | 16 | src/features/menu/components/Menu.css:960 |
| menu | 1023 | eyebrow `eyebrow` | 13 | 14 | src/features/menu/components/Menu.css:939 |
| menu | 1024 | H1 `menu-hero-title` | 51.104 | 64 | src/features/menu/components/Menu.css:145 |
| menu | 1024 | H2 `menu-special-title` | 42.112 | 48 | src/features/menu/components/Menu.css:419 |
| menu | 1024 | H2 `menu-cafe-title reveal reveal-delay-1` | 42.112 | 48 | src/features/menu/components/Menu.css:800 |
| menu | 1024 | H2 `menu-cta-title` | 42.112 | 48 | src/features/menu/components/Menu.css:944 |
| menu | 1024 | description `menu-hero-desc` | 17.702 | 20 | src/features/menu/components/Menu.css:164 |
| menu | 1024 | description `menu-cafe-desc reveal reveal-delay-2` | 17.702 | 20 | src/features/menu/components/Menu.css:813 |
| menu | 1024 | description `menu-cta-desc` | 17.702 | 20 | src/features/menu/components/Menu.css:960 |
| menu | 1024 | eyebrow `eyebrow menu-hero-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1024 | eyebrow `eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1136 | H1 `menu-hero-title` | 53.456 | 64 | src/features/menu/components/Menu.css:145 |
| menu | 1136 | H2 `menu-special-title` | 43.848 | 48 | src/features/menu/components/Menu.css:419 |
| menu | 1136 | H2 `menu-cafe-title reveal reveal-delay-1` | 43.848 | 48 | src/features/menu/components/Menu.css:800 |
| menu | 1136 | H2 `menu-cta-title` | 43.848 | 48 | src/features/menu/components/Menu.css:944 |
| menu | 1136 | description `menu-hero-desc` | 17.994 | 20 | src/features/menu/components/Menu.css:164 |
| menu | 1136 | description `menu-cafe-desc reveal reveal-delay-2` | 17.994 | 20 | src/features/menu/components/Menu.css:813 |
| menu | 1136 | description `menu-cta-desc` | 17.994 | 20 | src/features/menu/components/Menu.css:960 |
| menu | 1136 | eyebrow `eyebrow menu-hero-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1136 | eyebrow `eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1280 | H1 `menu-hero-title` | 56.48 | 64 | src/features/menu/components/Menu.css:145 |
| menu | 1280 | H2 `menu-special-title` | 46.08 | 48 | src/features/menu/components/Menu.css:419 |
| menu | 1280 | H2 `menu-cafe-title reveal reveal-delay-1` | 46.08 | 48 | src/features/menu/components/Menu.css:800 |
| menu | 1280 | H2 `menu-cta-title` | 46.08 | 48 | src/features/menu/components/Menu.css:944 |
| menu | 1280 | description `menu-hero-desc` | 18.368 | 20 | src/features/menu/components/Menu.css:164 |
| menu | 1280 | description `menu-cafe-desc reveal reveal-delay-2` | 18.368 | 20 | src/features/menu/components/Menu.css:813 |
| menu | 1280 | description `menu-cta-desc` | 18.368 | 20 | src/features/menu/components/Menu.css:960 |
| menu | 1280 | eyebrow `eyebrow menu-hero-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1280 | eyebrow `eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1440 | H1 `menu-hero-title` | 59.84 | 64 | src/features/menu/components/Menu.css:145 |
| menu | 1440 | H2 `menu-special-title` | 48.56 | 48 | src/features/menu/components/Menu.css:419 |
| menu | 1440 | H2 `menu-cafe-title reveal reveal-delay-1` | 48.56 | 48 | src/features/menu/components/Menu.css:800 |
| menu | 1440 | H2 `menu-cta-title` | 48.56 | 48 | src/features/menu/components/Menu.css:944 |
| menu | 1440 | description `menu-hero-desc` | 18.784 | 20 | src/features/menu/components/Menu.css:164 |
| menu | 1440 | description `menu-cafe-desc reveal reveal-delay-2` | 18.784 | 20 | src/features/menu/components/Menu.css:813 |
| menu | 1440 | description `menu-cta-desc` | 18.784 | 20 | src/features/menu/components/Menu.css:960 |
| menu | 1440 | eyebrow `eyebrow menu-hero-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1440 | eyebrow `eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1919 | H1 `menu-hero-title` | 69.899 | 64 | src/features/menu/components/Menu.css:145 |
| menu | 1919 | H2 `menu-special-title` | 55.985 | 48 | src/features/menu/components/Menu.css:419 |
| menu | 1919 | H2 `menu-cafe-title reveal reveal-delay-1` | 55.985 | 48 | src/features/menu/components/Menu.css:800 |
| menu | 1919 | H2 `menu-cta-title` | 55.985 | 48 | src/features/menu/components/Menu.css:944 |
| menu | 1919 | eyebrow `eyebrow menu-hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1919 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1920 | H1 `menu-hero-title` | 69.92 | 64 | src/features/menu/components/Menu.css:145 |
| menu | 1920 | H2 `menu-special-title` | 56 | 52 | src/features/menu/components/Menu.css:419 |
| menu | 1920 | H2 `menu-cafe-title reveal reveal-delay-1` | 56 | 52 | src/features/menu/components/Menu.css:800 |
| menu | 1920 | H2 `menu-cta-title` | 56 | 52 | src/features/menu/components/Menu.css:944 |
| menu | 1920 | eyebrow `eyebrow menu-hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 1920 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 2560 | H1 `menu-hero-title` | 83.36 | 64 | src/features/menu/components/Menu.css:145 |
| menu | 2560 | H2 `menu-special-title` | 56 | 52 | src/features/menu/components/Menu.css:419 |
| menu | 2560 | H2 `menu-cafe-title reveal reveal-delay-1` | 56 | 52 | src/features/menu/components/Menu.css:800 |
| menu | 2560 | H2 `menu-cta-title` | 56 | 52 | src/features/menu/components/Menu.css:944 |
| menu | 2560 | eyebrow `eyebrow menu-hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| menu | 2560 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 375 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 375 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 375 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 375 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 375 | description `gal-hero-desc lead` | 15 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 375 | description `gal-section-desc lead` | 16.015 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 375 | description `gal-section-desc lead` | 16.015 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 375 | description `gal-section-desc lead` | 16.015 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 375 | description `gal-section-desc lead` | 16.015 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 375 | eyebrow `eyebrow gal-hero-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 375 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 375 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 375 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 375 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 390 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 390 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 390 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 390 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 390 | description `gal-hero-desc lead` | 15 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 390 | description `gal-section-desc lead` | 16.054 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 390 | description `gal-section-desc lead` | 16.054 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 390 | description `gal-section-desc lead` | 16.054 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 390 | description `gal-section-desc lead` | 16.054 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 390 | eyebrow `eyebrow gal-hero-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 390 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 390 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 390 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 390 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 430 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 430 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 430 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 430 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 430 | description `gal-hero-desc lead` | 15 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 430 | description `gal-section-desc lead` | 16.158 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 430 | description `gal-section-desc lead` | 16.158 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 430 | description `gal-section-desc lead` | 16.158 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 430 | description `gal-section-desc lead` | 16.158 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 430 | eyebrow `eyebrow gal-hero-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 430 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 430 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 430 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 430 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 500 | H1 `gal-hero-title` | 40.1 | 32 | src/features/gallery/components/Gallery.css:388 |
| gallery | 500 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 500 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 500 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 500 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 500 | description `gal-hero-desc lead` | 16.34 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 500 | description `gal-section-desc lead` | 16.34 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 500 | description `gal-section-desc lead` | 16.34 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 500 | description `gal-section-desc lead` | 16.34 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 500 | description `gal-section-desc lead` | 16.34 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 500 | eyebrow `eyebrow gal-hero-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 500 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 500 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 500 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 500 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 640 | H1 `gal-hero-title` | 43.04 | 32 | src/features/gallery/components/Gallery.css:388 |
| gallery | 640 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 640 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 640 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 640 | H2 `gal-section-title` | 24 | 28 | src/features/gallery/components/Gallery.css:241 |
| gallery | 640 | description `gal-hero-desc lead` | 16.704 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 640 | description `gal-section-desc lead` | 16.704 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 640 | description `gal-section-desc lead` | 16.704 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 640 | description `gal-section-desc lead` | 16.704 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 640 | description `gal-section-desc lead` | 16.704 | 14 | src/features/gallery/components/Gallery.css:315 |
| gallery | 640 | eyebrow `eyebrow gal-hero-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 640 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 640 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 640 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 640 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| gallery | 641 | H1 `gal-hero-title` | 43.061 | 44 | src/features/gallery/components/Gallery.css:388 |
| gallery | 641 | H2 `gal-section-title` | 24 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 641 | H2 `gal-section-title` | 24 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 641 | H2 `gal-section-title` | 24 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 641 | H2 `gal-section-title` | 24 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 641 | description `gal-hero-desc lead` | 16.707 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 641 | description `gal-section-desc lead` | 16.707 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 641 | description `gal-section-desc lead` | 16.707 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 641 | description `gal-section-desc lead` | 16.707 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 641 | description `gal-section-desc lead` | 16.707 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 641 | eyebrow `eyebrow gal-hero-eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 641 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 641 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 641 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 641 | eyebrow `eyebrow gal-section-eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 744 | H1 `gal-hero-title` | 45.224 | 44 | src/features/gallery/components/Gallery.css:388 |
| gallery | 744 | H2 `gal-section-title` | 37.772 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 744 | H2 `gal-section-title` | 37.772 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 744 | H2 `gal-section-title` | 37.772 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 744 | H2 `gal-section-title` | 37.772 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 744 | description `gal-hero-desc lead` | 16.974 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 744 | description `gal-section-desc lead` | 16.974 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 744 | description `gal-section-desc lead` | 16.974 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 744 | description `gal-section-desc lead` | 16.974 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 744 | description `gal-section-desc lead` | 16.974 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 744 | eyebrow `eyebrow gal-hero-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 744 | eyebrow `eyebrow gal-section-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 744 | eyebrow `eyebrow gal-section-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 744 | eyebrow `eyebrow gal-section-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 744 | eyebrow `eyebrow gal-section-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 900 | H1 `gal-hero-title` | 48.5 | 44 | src/features/gallery/components/Gallery.css:388 |
| gallery | 900 | H2 `gal-section-title` | 40.19 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 900 | H2 `gal-section-title` | 40.19 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 900 | H2 `gal-section-title` | 40.19 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 900 | H2 `gal-section-title` | 40.19 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 900 | description `gal-hero-desc lead` | 17.38 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 900 | description `gal-section-desc lead` | 17.38 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 900 | description `gal-section-desc lead` | 17.38 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 900 | description `gal-section-desc lead` | 17.38 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 900 | description `gal-section-desc lead` | 17.38 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 900 | eyebrow `eyebrow gal-hero-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 900 | eyebrow `eyebrow gal-section-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 900 | eyebrow `eyebrow gal-section-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 900 | eyebrow `eyebrow gal-section-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 900 | eyebrow `eyebrow gal-section-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 1023 | H1 `gal-hero-title` | 51.083 | 44 | src/features/gallery/components/Gallery.css:388 |
| gallery | 1023 | H2 `gal-section-title` | 42.097 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1023 | H2 `gal-section-title` | 42.097 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1023 | H2 `gal-section-title` | 42.097 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1023 | H2 `gal-section-title` | 42.097 | 36 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1023 | description `gal-hero-desc lead` | 17.7 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1023 | description `gal-section-desc lead` | 17.7 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1023 | description `gal-section-desc lead` | 17.7 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1023 | description `gal-section-desc lead` | 17.7 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1023 | description `gal-section-desc lead` | 17.7 | 16 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1023 | eyebrow `eyebrow gal-hero-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 1023 | eyebrow `eyebrow gal-section-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 1023 | eyebrow `eyebrow gal-section-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 1023 | eyebrow `eyebrow gal-section-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 1023 | eyebrow `eyebrow gal-section-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| gallery | 1024 | H1 `gal-hero-title` | 51.104 | 56 | src/features/gallery/components/Gallery.css:388 |
| gallery | 1024 | H2 `gal-section-title` | 42.112 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1024 | H2 `gal-section-title` | 42.112 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1024 | H2 `gal-section-title` | 42.112 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1024 | H2 `gal-section-title` | 42.112 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1024 | description `gal-hero-desc lead` | 17.702 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1024 | description `gal-section-desc lead` | 17.702 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1024 | description `gal-section-desc lead` | 17.702 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1024 | description `gal-section-desc lead` | 17.702 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1024 | description `gal-section-desc lead` | 17.702 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1024 | eyebrow `eyebrow gal-hero-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1024 | eyebrow `eyebrow gal-section-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1024 | eyebrow `eyebrow gal-section-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1024 | eyebrow `eyebrow gal-section-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1024 | eyebrow `eyebrow gal-section-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1136 | H1 `gal-hero-title` | 44.304 | 56 | src/features/gallery/components/Gallery.css:388 |
| gallery | 1136 | H2 `gal-section-title` | 43.848 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1136 | H2 `gal-section-title` | 43.848 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1136 | H2 `gal-section-title` | 43.848 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1136 | H2 `gal-section-title` | 43.848 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1136 | description `gal-hero-desc lead` | 16 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1136 | description `gal-section-desc lead` | 16.76 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1136 | description `gal-section-desc lead` | 16.76 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1136 | description `gal-section-desc lead` | 16.76 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1136 | description `gal-section-desc lead` | 16.76 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1136 | eyebrow `eyebrow gal-hero-eyebrow` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1136 | eyebrow `eyebrow gal-section-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1136 | eyebrow `eyebrow gal-section-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1136 | eyebrow `eyebrow gal-section-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1136 | eyebrow `eyebrow gal-section-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1280 | H1 `gal-hero-title` | 49.92 | 56 | src/features/gallery/components/Gallery.css:388 |
| gallery | 1280 | H2 `gal-section-title` | 46.08 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1280 | H2 `gal-section-title` | 46.08 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1280 | H2 `gal-section-title` | 46.08 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1280 | H2 `gal-section-title` | 46.08 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1280 | description `gal-hero-desc lead` | 17.92 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1280 | description `gal-section-desc lead` | 17.12 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1280 | description `gal-section-desc lead` | 17.12 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1280 | description `gal-section-desc lead` | 17.12 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1280 | description `gal-section-desc lead` | 17.12 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1280 | eyebrow `eyebrow gal-hero-eyebrow` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1280 | eyebrow `eyebrow gal-section-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1280 | eyebrow `eyebrow gal-section-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1280 | eyebrow `eyebrow gal-section-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1280 | eyebrow `eyebrow gal-section-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1440 | H2 `gal-section-title` | 48.56 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1440 | H2 `gal-section-title` | 48.56 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1440 | H2 `gal-section-title` | 48.56 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1440 | H2 `gal-section-title` | 48.56 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1440 | description `gal-section-desc lead` | 17.52 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1440 | description `gal-section-desc lead` | 17.52 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1440 | description `gal-section-desc lead` | 17.52 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1440 | description `gal-section-desc lead` | 17.52 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1440 | eyebrow `eyebrow gal-hero-eyebrow` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1440 | eyebrow `eyebrow gal-section-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1440 | eyebrow `eyebrow gal-section-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1440 | eyebrow `eyebrow gal-section-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1440 | eyebrow `eyebrow gal-section-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1919 | H2 `gal-section-title` | 55.985 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1919 | H2 `gal-section-title` | 55.985 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1919 | H2 `gal-section-title` | 55.985 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1919 | H2 `gal-section-title` | 55.985 | 48 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1919 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1919 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1919 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1919 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1919 | eyebrow `eyebrow gal-hero-eyebrow` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1919 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1919 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1919 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1919 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1920 | H1 `gal-hero-title` | 56 | 64 | src/features/gallery/components/Gallery.css:388 |
| gallery | 1920 | H2 `gal-section-title` | 56 | 52 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1920 | H2 `gal-section-title` | 56 | 52 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1920 | H2 `gal-section-title` | 56 | 52 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1920 | H2 `gal-section-title` | 56 | 52 | src/features/gallery/components/Gallery.css:241 |
| gallery | 1920 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1920 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1920 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1920 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 1920 | eyebrow `eyebrow gal-hero-eyebrow` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1920 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1920 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1920 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 1920 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 2560 | H1 `gal-hero-title` | 56 | 64 | src/features/gallery/components/Gallery.css:388 |
| gallery | 2560 | H2 `gal-section-title` | 56 | 52 | src/features/gallery/components/Gallery.css:241 |
| gallery | 2560 | H2 `gal-section-title` | 56 | 52 | src/features/gallery/components/Gallery.css:241 |
| gallery | 2560 | H2 `gal-section-title` | 56 | 52 | src/features/gallery/components/Gallery.css:241 |
| gallery | 2560 | H2 `gal-section-title` | 56 | 52 | src/features/gallery/components/Gallery.css:241 |
| gallery | 2560 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 2560 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 2560 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 2560 | description `gal-section-desc lead` | 18.6 | 20 | src/features/gallery/components/Gallery.css:315 |
| gallery | 2560 | eyebrow `eyebrow gal-hero-eyebrow` | 18 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 2560 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 2560 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 2560 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| gallery | 2560 | eyebrow `eyebrow gal-section-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 375 | H1 `visit-hero-title` | 28 | 32 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 375 | H2 `visit-cta-title section-heading` | 24 | 28 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 375 | description `visit-cta-desc` | 16.015 | 14 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 375 | eyebrow `eyebrow visit-hero-eyebrow` | 14 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 375 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 390 | H1 `visit-hero-title` | 28 | 32 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 390 | H2 `visit-cta-title section-heading` | 24 | 28 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 390 | description `visit-cta-desc` | 16.054 | 14 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 390 | eyebrow `eyebrow visit-hero-eyebrow` | 14 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 390 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 430 | H1 `visit-hero-title` | 28 | 32 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 430 | H2 `visit-cta-title section-heading` | 24 | 28 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 430 | description `visit-cta-desc` | 16.158 | 14 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 430 | eyebrow `eyebrow visit-hero-eyebrow` | 14 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 430 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 500 | H1 `visit-hero-title` | 28 | 32 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 500 | H2 `visit-card-title` | 30 | 28 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 500 | H2 `visit-cta-title section-heading` | 24 | 28 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 500 | description `visit-cta-desc` | 16.34 | 14 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 500 | eyebrow `eyebrow visit-hero-eyebrow` | 14 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 500 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 640 | H1 `visit-hero-title` | 28 | 32 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 640 | H2 `visit-card-title` | 38.4 | 28 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 640 | H2 `visit-cta-title section-heading` | 24 | 28 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 640 | description `visit-cta-desc` | 16.704 | 14 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 640 | eyebrow `eyebrow visit-hero-eyebrow` | 14 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 640 | eyebrow `eyebrow` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| visit-contact | 641 | H1 `visit-hero-title` | 43.061 | 44 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 641 | H2 `visit-card-title` | 38.4 | 36 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 641 | H2 `visit-cta-title section-heading` | 24 | 36 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 641 | description `visit-hero-desc` | 16.707 | 16 | src/features/visit/components/VisitContact.css:882 |
| visit-contact | 641 | description `visit-cta-desc` | 16.707 | 16 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 641 | eyebrow `eyebrow visit-hero-eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| visit-contact | 641 | eyebrow `eyebrow` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| visit-contact | 744 | H1 `visit-hero-title` | 45.224 | 44 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 744 | H2 `visit-card-title` | 38.4 | 36 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 744 | H2 `visit-cta-title section-heading` | 37.772 | 36 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 744 | description `visit-hero-desc` | 16.974 | 16 | src/features/visit/components/VisitContact.css:882 |
| visit-contact | 744 | description `visit-cta-desc` | 16.974 | 16 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 744 | eyebrow `eyebrow visit-hero-eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| visit-contact | 744 | eyebrow `eyebrow` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| visit-contact | 900 | H1 `visit-hero-title` | 48.5 | 44 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 900 | H2 `visit-card-title` | 29.52 | 36 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 900 | H2 `visit-cta-title section-heading` | 40.19 | 36 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 900 | description `visit-hero-desc` | 17.38 | 16 | src/features/visit/components/VisitContact.css:882 |
| visit-contact | 900 | description `visit-cta-desc` | 17.38 | 16 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 900 | eyebrow `eyebrow visit-hero-eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| visit-contact | 900 | eyebrow `eyebrow` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1023 | H1 `visit-hero-title` | 51.083 | 44 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 1023 | H2 `visit-card-title` | 30.799 | 36 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 1023 | H2 `visit-cta-title section-heading` | 42.097 | 36 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 1023 | description `visit-hero-desc` | 17.7 | 16 | src/features/visit/components/VisitContact.css:882 |
| visit-contact | 1023 | description `visit-cta-desc` | 17.7 | 16 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 1023 | eyebrow `eyebrow visit-hero-eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1023 | eyebrow `eyebrow` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1024 | H1 `visit-hero-title` | 51.104 | 56 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 1024 | H2 `visit-card-title` | 30.81 | 48 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 1024 | H2 `visit-cta-title section-heading` | 42.112 | 48 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 1024 | description `visit-hero-desc` | 17.702 | 20 | src/features/visit/components/VisitContact.css:882 |
| visit-contact | 1024 | description `visit-cta-desc` | 17.702 | 20 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 1024 | eyebrow `eyebrow visit-hero-eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1024 | eyebrow `eyebrow` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1136 | H1 `visit-hero-title` | 53.456 | 56 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 1136 | H2 `visit-card-title` | 31.974 | 48 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 1136 | H2 `visit-cta-title section-heading` | 43.848 | 48 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 1136 | description `visit-hero-desc` | 17.994 | 20 | src/features/visit/components/VisitContact.css:882 |
| visit-contact | 1136 | description `visit-cta-desc` | 17.994 | 20 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 1136 | eyebrow `eyebrow visit-hero-eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1136 | eyebrow `eyebrow` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1280 | H1 `visit-hero-title` | 56.48 | 56 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 1280 | H2 `visit-card-title` | 33.472 | 48 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 1280 | H2 `visit-cta-title section-heading` | 46.08 | 48 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 1280 | description `visit-hero-desc` | 18.368 | 20 | src/features/visit/components/VisitContact.css:882 |
| visit-contact | 1280 | description `visit-cta-desc` | 18.368 | 20 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 1280 | eyebrow `eyebrow visit-hero-eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1280 | eyebrow `eyebrow` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1440 | H1 `visit-hero-title` | 59.84 | 56 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 1440 | H2 `visit-card-title` | 35.136 | 48 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 1440 | H2 `visit-cta-title section-heading` | 48.56 | 48 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 1440 | description `visit-hero-desc` | 18.784 | 20 | src/features/visit/components/VisitContact.css:882 |
| visit-contact | 1440 | description `visit-cta-desc` | 18.784 | 20 | src/features/visit/components/VisitContact.css:559 |
| visit-contact | 1440 | eyebrow `eyebrow visit-hero-eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1440 | eyebrow `eyebrow` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1919 | H1 `visit-hero-title` | 69.899 | 56 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 1919 | H2 `visit-card-title` | 40 | 48 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 1919 | H2 `visit-cta-title section-heading` | 55.985 | 48 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 1919 | eyebrow `eyebrow visit-hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1919 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1920 | H1 `visit-hero-title` | 69.92 | 64 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 1920 | H2 `visit-card-title` | 40 | 52 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 1920 | H2 `visit-cta-title section-heading` | 56 | 52 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 1920 | eyebrow `eyebrow visit-hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 1920 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 2560 | H1 `visit-hero-title` | 83.36 | 64 | src/features/visit/components/VisitContact.css:871 |
| visit-contact | 2560 | H2 `visit-card-title` | 40 | 52 | src/features/visit/components/VisitContact.css:207 |
| visit-contact | 2560 | H2 `visit-cta-title section-heading` | 56 | 52 | src/features/visit/components/VisitContact.css:130 |
| visit-contact | 2560 | eyebrow `eyebrow visit-hero-eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| visit-contact | 2560 | eyebrow `eyebrow` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| privacy-policy | 375 | H1 `legal-title` | 37.475 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 375 | description `legal-lede` | 17.025 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 375 | description `p` | 16.015 | 14 | - |
| privacy-policy | 375 | description `p` | 16.015 | 14 | - |
| privacy-policy | 375 | description `p` | 16.015 | 14 | - |
| privacy-policy | 375 | description `p` | 16.015 | 14 | - |
| privacy-policy | 375 | description `p` | 16.015 | 14 | - |
| privacy-policy | 375 | description `p` | 16.015 | 14 | - |
| privacy-policy | 375 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 390 | H1 `legal-title` | 37.79 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 390 | description `legal-lede` | 17.13 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 390 | description `p` | 16.054 | 14 | - |
| privacy-policy | 390 | description `p` | 16.054 | 14 | - |
| privacy-policy | 390 | description `p` | 16.054 | 14 | - |
| privacy-policy | 390 | description `p` | 16.054 | 14 | - |
| privacy-policy | 390 | description `p` | 16.054 | 14 | - |
| privacy-policy | 390 | description `p` | 16.054 | 14 | - |
| privacy-policy | 390 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 430 | H1 `legal-title` | 38.63 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 430 | description `legal-lede` | 17.41 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 430 | description `p` | 16.158 | 14 | - |
| privacy-policy | 430 | description `p` | 16.158 | 14 | - |
| privacy-policy | 430 | description `p` | 16.158 | 14 | - |
| privacy-policy | 430 | description `p` | 16.158 | 14 | - |
| privacy-policy | 430 | description `p` | 16.158 | 14 | - |
| privacy-policy | 430 | description `p` | 16.158 | 14 | - |
| privacy-policy | 430 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 500 | H1 `legal-title` | 40.1 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 500 | description `legal-lede` | 17.9 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 500 | description `p` | 16.34 | 14 | - |
| privacy-policy | 500 | description `p` | 16.34 | 14 | - |
| privacy-policy | 500 | description `p` | 16.34 | 14 | - |
| privacy-policy | 500 | description `p` | 16.34 | 14 | - |
| privacy-policy | 500 | description `p` | 16.34 | 14 | - |
| privacy-policy | 500 | description `p` | 16.34 | 14 | - |
| privacy-policy | 500 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 640 | H1 `legal-title` | 43.04 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 640 | description `legal-lede` | 18.88 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 640 | description `p` | 16.704 | 14 | - |
| privacy-policy | 640 | description `p` | 16.704 | 14 | - |
| privacy-policy | 640 | description `p` | 16.704 | 14 | - |
| privacy-policy | 640 | description `p` | 16.704 | 14 | - |
| privacy-policy | 640 | description `p` | 16.704 | 14 | - |
| privacy-policy | 640 | description `p` | 16.704 | 14 | - |
| privacy-policy | 640 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 641 | H1 `legal-title` | 43.061 | 44 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 641 | description `legal-lede` | 18.887 | 16 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 641 | description `p` | 16.707 | 16 | - |
| privacy-policy | 641 | description `p` | 16.707 | 16 | - |
| privacy-policy | 641 | description `p` | 16.707 | 16 | - |
| privacy-policy | 641 | description `p` | 16.707 | 16 | - |
| privacy-policy | 641 | description `p` | 16.707 | 16 | - |
| privacy-policy | 641 | description `p` | 16.707 | 16 | - |
| privacy-policy | 641 | eyebrow `legal-eyebrow` | 10 | 14 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 744 | H1 `legal-title` | 45.224 | 44 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 744 | description `legal-lede` | 19.608 | 16 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 744 | description `p` | 16.974 | 16 | - |
| privacy-policy | 744 | description `p` | 16.974 | 16 | - |
| privacy-policy | 744 | description `p` | 16.974 | 16 | - |
| privacy-policy | 744 | description `p` | 16.974 | 16 | - |
| privacy-policy | 744 | description `p` | 16.974 | 16 | - |
| privacy-policy | 744 | description `p` | 16.974 | 16 | - |
| privacy-policy | 744 | eyebrow `legal-eyebrow` | 12.487 | 14 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 900 | H1 `legal-title` | 48.5 | 44 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 900 | description `legal-lede` | 20.7 | 16 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 900 | description `p` | 17.38 | 16 | - |
| privacy-policy | 900 | description `p` | 17.38 | 16 | - |
| privacy-policy | 900 | description `p` | 17.38 | 16 | - |
| privacy-policy | 900 | description `p` | 17.38 | 16 | - |
| privacy-policy | 900 | description `p` | 17.38 | 16 | - |
| privacy-policy | 900 | description `p` | 17.38 | 16 | - |
| privacy-policy | 900 | eyebrow `legal-eyebrow` | 12.69 | 14 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 1023 | H1 `legal-title` | 51.083 | 44 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1023 | description `legal-lede` | 21.561 | 16 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 1023 | description `p` | 17.7 | 16 | - |
| privacy-policy | 1023 | description `p` | 17.7 | 16 | - |
| privacy-policy | 1023 | description `p` | 17.7 | 16 | - |
| privacy-policy | 1023 | description `p` | 17.7 | 16 | - |
| privacy-policy | 1023 | description `p` | 17.7 | 16 | - |
| privacy-policy | 1023 | description `p` | 17.7 | 16 | - |
| privacy-policy | 1023 | eyebrow `legal-eyebrow` | 12.85 | 14 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 1024 | H1 `legal-title` | 51.104 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1024 | description `legal-lede` | 21.568 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 1024 | description `p` | 17.702 | 20 | - |
| privacy-policy | 1024 | description `p` | 17.702 | 20 | - |
| privacy-policy | 1024 | description `p` | 17.702 | 20 | - |
| privacy-policy | 1024 | description `p` | 17.702 | 20 | - |
| privacy-policy | 1024 | description `p` | 17.702 | 20 | - |
| privacy-policy | 1024 | description `p` | 17.702 | 20 | - |
| privacy-policy | 1024 | eyebrow `legal-eyebrow` | 12.851 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 1136 | H1 `legal-title` | 53.456 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1136 | description `legal-lede` | 22.352 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 1136 | description `p` | 17.994 | 20 | - |
| privacy-policy | 1136 | description `p` | 17.994 | 20 | - |
| privacy-policy | 1136 | description `p` | 17.994 | 20 | - |
| privacy-policy | 1136 | description `p` | 17.994 | 20 | - |
| privacy-policy | 1136 | description `p` | 17.994 | 20 | - |
| privacy-policy | 1136 | description `p` | 17.994 | 20 | - |
| privacy-policy | 1136 | eyebrow `legal-eyebrow` | 12.997 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 1280 | H1 `legal-title` | 56.48 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1280 | description `legal-lede` | 23.36 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 1280 | description `p` | 18.368 | 20 | - |
| privacy-policy | 1280 | description `p` | 18.368 | 20 | - |
| privacy-policy | 1280 | description `p` | 18.368 | 20 | - |
| privacy-policy | 1280 | description `p` | 18.368 | 20 | - |
| privacy-policy | 1280 | description `p` | 18.368 | 20 | - |
| privacy-policy | 1280 | description `p` | 18.368 | 20 | - |
| privacy-policy | 1280 | eyebrow `legal-eyebrow` | 13.184 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 1440 | H1 `legal-title` | 59.84 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1440 | description `legal-lede` | 24.48 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 1440 | description `p` | 18.784 | 20 | - |
| privacy-policy | 1440 | description `p` | 18.784 | 20 | - |
| privacy-policy | 1440 | description `p` | 18.784 | 20 | - |
| privacy-policy | 1440 | description `p` | 18.784 | 20 | - |
| privacy-policy | 1440 | description `p` | 18.784 | 20 | - |
| privacy-policy | 1440 | description `p` | 18.784 | 20 | - |
| privacy-policy | 1440 | eyebrow `legal-eyebrow` | 13.392 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 1919 | H1 `legal-title` | 69.899 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1919 | description `legal-lede` | 27.833 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 1919 | eyebrow `legal-eyebrow` | 14 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 1920 | H1 `legal-title` | 69.92 | 64 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 1920 | description `legal-lede` | 27.84 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 1920 | eyebrow `legal-eyebrow` | 14 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| privacy-policy | 2560 | H1 `legal-title` | 83.36 | 64 | src/features/legal/components/LegalPage/Legal.css:174 |
| privacy-policy | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| privacy-policy | 2560 | description `legal-lede` | 28 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| privacy-policy | 2560 | eyebrow `legal-eyebrow` | 14 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 375 | H1 `legal-title` | 37.475 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 375 | description `legal-lede` | 17.025 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | description `p` | 16.015 | 14 | - |
| terms-and-conditions | 375 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 390 | H1 `legal-title` | 37.79 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 390 | description `legal-lede` | 17.13 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | description `p` | 16.054 | 14 | - |
| terms-and-conditions | 390 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 430 | H1 `legal-title` | 38.63 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 430 | description `legal-lede` | 17.41 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | description `p` | 16.158 | 14 | - |
| terms-and-conditions | 430 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 500 | H1 `legal-title` | 40.1 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 500 | description `legal-lede` | 17.9 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | description `p` | 16.34 | 14 | - |
| terms-and-conditions | 500 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 640 | H1 `legal-title` | 43.04 | 32 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | H2 `legal-h2` | 24 | 28 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 640 | description `legal-lede` | 18.88 | 14 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | description `p` | 16.704 | 14 | - |
| terms-and-conditions | 640 | eyebrow `legal-eyebrow` | 10 | 12 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 641 | H1 `legal-title` | 43.061 | 44 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | H2 `legal-h2` | 24 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 641 | description `legal-lede` | 18.887 | 16 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | description `p` | 16.707 | 16 | - |
| terms-and-conditions | 641 | eyebrow `legal-eyebrow` | 10 | 14 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 744 | H1 `legal-title` | 45.224 | 44 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | H2 `legal-h2` | 37.772 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 744 | description `legal-lede` | 19.608 | 16 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | description `p` | 16.974 | 16 | - |
| terms-and-conditions | 744 | eyebrow `legal-eyebrow` | 12.487 | 14 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 900 | H1 `legal-title` | 48.5 | 44 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | H2 `legal-h2` | 40.19 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 900 | description `legal-lede` | 20.7 | 16 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | description `p` | 17.38 | 16 | - |
| terms-and-conditions | 900 | eyebrow `legal-eyebrow` | 12.69 | 14 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 1023 | H1 `legal-title` | 51.083 | 44 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | H2 `legal-h2` | 42.097 | 36 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1023 | description `legal-lede` | 21.561 | 16 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | description `p` | 17.7 | 16 | - |
| terms-and-conditions | 1023 | eyebrow `legal-eyebrow` | 12.85 | 14 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 1024 | H1 `legal-title` | 51.104 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | H2 `legal-h2` | 42.112 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1024 | description `legal-lede` | 21.568 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | description `p` | 17.702 | 20 | - |
| terms-and-conditions | 1024 | eyebrow `legal-eyebrow` | 12.851 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 1136 | H1 `legal-title` | 53.456 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | H2 `legal-h2` | 43.848 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1136 | description `legal-lede` | 22.352 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | description `p` | 17.994 | 20 | - |
| terms-and-conditions | 1136 | eyebrow `legal-eyebrow` | 12.997 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 1280 | H1 `legal-title` | 56.48 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | H2 `legal-h2` | 46.08 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1280 | description `legal-lede` | 23.36 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | description `p` | 18.368 | 20 | - |
| terms-and-conditions | 1280 | eyebrow `legal-eyebrow` | 13.184 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 1440 | H1 `legal-title` | 59.84 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | H2 `legal-h2` | 48.56 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1440 | description `legal-lede` | 24.48 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | description `p` | 18.784 | 20 | - |
| terms-and-conditions | 1440 | eyebrow `legal-eyebrow` | 13.392 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 1919 | H1 `legal-title` | 69.899 | 56 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | H2 `legal-h2` | 55.985 | 48 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1919 | description `legal-lede` | 27.833 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 1919 | eyebrow `legal-eyebrow` | 14 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 1920 | H1 `legal-title` | 69.92 | 64 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 1920 | description `legal-lede` | 27.84 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 1920 | eyebrow `legal-eyebrow` | 14 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| terms-and-conditions | 2560 | H1 `legal-title` | 83.36 | 64 | src/features/legal/components/LegalPage/Legal.css:174 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | H2 `legal-h2` | 56 | 52 | src/features/legal/components/LegalPage/Legal.css:252 |
| terms-and-conditions | 2560 | description `legal-lede` | 28 | 20 | src/features/legal/components/LegalPage/Legal.css:189 |
| terms-and-conditions | 2560 | eyebrow `legal-eyebrow` | 14 | 16 | src/features/legal/components/LegalPage/Legal.css:158 |
| not-found | 375 | H1 `nf-title reveal reveal-delay-2 is-visible` | 25.6 | 32 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 375 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 16.015 | 14 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 375 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| not-found | 390 | H1 `nf-title reveal reveal-delay-2 is-visible` | 25.6 | 32 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 390 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 16.054 | 14 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 390 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| not-found | 430 | H1 `nf-title reveal reveal-delay-2 is-visible` | 25.6 | 32 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 430 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 16.158 | 14 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 430 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| not-found | 500 | H1 `nf-title reveal reveal-delay-2 is-visible` | 25.6 | 32 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 500 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 16.34 | 14 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 500 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| not-found | 640 | H1 `nf-title reveal reveal-delay-2 is-visible` | 25.6 | 32 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 640 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 16.704 | 14 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 640 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 10 | 12 | src/features/menu/components/Menu.css:939 |
| not-found | 641 | H1 `nf-title reveal reveal-delay-2 is-visible` | 25.6 | 44 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 641 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 16.707 | 16 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 641 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 10 | 14 | src/features/menu/components/Menu.css:939 |
| not-found | 744 | H1 `nf-title reveal reveal-delay-2 is-visible` | 26.04 | 44 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 744 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 16.974 | 16 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 744 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 12.487 | 14 | src/features/menu/components/Menu.css:939 |
| not-found | 900 | H1 `nf-title reveal reveal-delay-2 is-visible` | 31.5 | 44 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 900 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 17.38 | 16 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 900 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 12.69 | 14 | src/features/menu/components/Menu.css:939 |
| not-found | 1023 | H1 `nf-title reveal reveal-delay-2 is-visible` | 35.805 | 44 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 1023 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 17.7 | 16 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 1023 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 12.85 | 14 | src/features/menu/components/Menu.css:939 |
| not-found | 1024 | H1 `nf-title reveal reveal-delay-2 is-visible` | 35.84 | 56 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 1024 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 17.702 | 20 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 1024 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 12.851 | 16 | src/features/menu/components/Menu.css:939 |
| not-found | 1136 | H1 `nf-title reveal reveal-delay-2 is-visible` | 36.8 | 56 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 1136 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 17.994 | 20 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 1136 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 12.997 | 16 | src/features/menu/components/Menu.css:939 |
| not-found | 1280 | H1 `nf-title reveal reveal-delay-2 is-visible` | 36.8 | 56 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 1280 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 18.368 | 20 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 1280 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 13.184 | 16 | src/features/menu/components/Menu.css:939 |
| not-found | 1440 | H1 `nf-title reveal reveal-delay-2 is-visible` | 36.8 | 56 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 1440 | description `lead nf-desc reveal reveal-delay-2 is-visible` | 18.784 | 20 | src/pages/not-found/NotFoundPage.css:73 |
| not-found | 1440 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 13.392 | 16 | src/features/menu/components/Menu.css:939 |
| not-found | 1919 | H1 `nf-title reveal reveal-delay-2 is-visible` | 36.8 | 56 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 1919 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| not-found | 1920 | H1 `nf-title reveal reveal-delay-2 is-visible` | 36.8 | 64 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 1920 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 14 | 16 | src/features/menu/components/Menu.css:939 |
| not-found | 2560 | H1 `nf-title reveal reveal-delay-2 is-visible` | 36.8 | 64 | src/pages/not-found/NotFoundPage.css:64 |
| not-found | 2560 | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 14 | 16 | src/features/menu/components/Menu.css:939 |

### b3. Non-typography FAILs (layout, header, line breaks)

| route | width | element | found | expected | file:line |
|---|---|---|---|---|---|
| home | 375 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 390 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 430 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 500 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 640 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 641 | elements past viewport ×5 | img.home-menu-deco.home-menu-deco--br, figure.menu-item.reveal, div.menu-thumb | none past viewport | — |
| home | 744 | elements past viewport ×5 | img.home-menu-deco.home-menu-deco--br, figure.menu-item.reveal, div.menu-thumb | none past viewport | — |
| home | 900 | elements past viewport ×5 | img.home-menu-deco.home-menu-deco--br, figure.menu-item.reveal, div.menu-thumb | none past viewport | — |
| home | 1023 | elements past viewport ×5 | img.home-menu-deco.home-menu-deco--br, figure.menu-item.reveal, div.menu-thumb | none past viewport | — |
| home | 1024 | elements past viewport ×5 | img.home-menu-deco.home-menu-deco--br, figure.menu-item.reveal, div.menu-thumb | none past viewport | — |
| home | 1136 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 1280 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 1440 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 1919 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 1920 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| home | 2560 | elements past viewport ×1 | img.home-menu-deco.home-menu-deco--br | none past viewport | — |
| menu | 375 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 390 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 430 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 500 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 640 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 641 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 744 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 900 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 1023 | elements past viewport ×4 | figure.menu-card, div.menu-card-thumb, img | none past viewport | — |
| menu | 1280 | elements past viewport ×1 | div.menu-glow | none past viewport | — |
| menu | 1440 | elements past viewport ×1 | div.menu-glow | none past viewport | — |
| gallery | 375 | elements past viewport ×4 | div.gallery-track, div.gallery-set, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 390 | elements past viewport ×4 | div.gallery-track, div.gallery-set, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 430 | elements past viewport ×4 | div.gallery-track, div.gallery-set, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 500 | elements past viewport ×4 | div.gallery-track, div.gallery-set, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 640 | elements past viewport ×4 | div.gallery-track, div.gallery-set, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 641 | elements past viewport ×4 | div.gallery-track, div.gallery-set, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 744 | elements past viewport ×4 | div.gallery-track, div.gallery-set, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 900 | elements past viewport ×2 | div.gallery-track, div.gallery-set | none past viewport | — |
| gallery | 1023 | elements past viewport ×2 | div.gallery-track, div.gallery-set | none past viewport | — |
| gallery | 1024 | elements past viewport ×2 | div.gallery-track, div.gallery-set | none past viewport | — |
| gallery | 1136 | elements past viewport ×4 | div.gallery-track, div.gallery-set.gallery-set--loop, figure.gallery-image.image-1 | none past viewport | — |
| gallery | 1280 | elements past viewport ×4 | div.gallery-track, div.gallery-set.gallery-set--loop, figure.gallery-image.image-1 | none past viewport | — |
| gallery | 1440 | elements past viewport ×4 | div.gallery-track, div.gallery-set.gallery-set--loop, figure.gallery-image.image-1 | none past viewport | — |
| gallery | 1919 | elements past viewport ×4 | div.gallery-track, div.gallery-set.gallery-set--loop, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 1920 | elements past viewport ×4 | div.gallery-track, div.gallery-set.gallery-set--loop, figure.gallery-image.image-2 | none past viewport | — |
| gallery | 2560 | elements past viewport ×6 | div.gallery-track, div.gallery-set.gallery-set--loop, figure.gallery-image.image-3 | none past viewport | — |
| home | 641 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| home | 744 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| home | 1023 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| home | 1024 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| our-story | 641 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| our-story | 744 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| our-story | 1023 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| our-story | 1024 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| menu | 641 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| menu | 744 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| menu | 1023 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| menu | 1024 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| gallery | 641 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| gallery | 744 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| gallery | 1023 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| gallery | 1024 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| visit-contact | 641 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| visit-contact | 744 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| visit-contact | 1023 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| visit-contact | 1024 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| privacy-policy | 641 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| privacy-policy | 744 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| privacy-policy | 1023 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| privacy-policy | 1024 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| terms-and-conditions | 641 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| terms-and-conditions | 744 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| terms-and-conditions | 1023 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| terms-and-conditions | 1024 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| not-found | 641 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| not-found | 744 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| not-found | 1023 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| not-found | 1024 | header | nav=0 hamburger=true (nav links=0) | nav on one row, hamburger only ≤640 | src/app/Layout/components/Header/Header.css:627,682 |
| menu | 1440 | h1 line count "menu-hero-title" | 3 lines | 2 lines | — |

Line-count flags (H1/H2 wider than 4 lines or a single word alone on the last line): **34** samples.
| route | element | lines | last line | widths |
|---|---|---|---|---|
| `home` | `cafe-title reveal reveal-delay-1` | 4 | “Indulgences.” | 1136, 1280, 1440, 1919, 1920, 2560 |
| `our-story` | `ostory-origin-title` | 3 | “Experience.” | 375, 390, 430, 500, 1136, 1280, 1440, 1919, 1920, 2560 |
| `menu` | `menu-hero-title` | 3 | “Appointment.” | 375, 390, 430, 500, 640, 641, 744, 900, 1023 |
| `menu` | `menu-hero-title` | 4 | “Appointment.” | 1024 |
| `visit-contact` | `visit-hero-title` | 2 | “Paris.” | 430, 500 |
| `privacy-policy` | `legal-title` | 2 | “Respected.” | 375, 390, 430, 2560 |
| `privacy-policy` | `legal-h2` | 2 | “Information” | 375, 390 |

---

## c) Breakpoint table (step 1a)

CSS width queries: **96** (13 PASS · **83 FAIL**) — plus 17 non-width queries (prefers-reduced-motion, hover, max-height) reported N/A.

### c1. FAIL — off-scale or `max-width`

| file:line | query | why |
|---|---|---|
| `src/app/global.css:227` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/app/global.css:247` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/app/global.css:350` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/app/global.css:360` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/app/global.css:470` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/app/Layout/components/AiAssistant/AiAssistant.css:519` | `@media (max-width: 560px)` | max-width query (forbidden) |
| `src/app/Layout/components/Footer/Footer.css:560` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/app/Layout/components/Footer/Footer.css:615` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/app/Layout/components/Footer/Footer.css:681` | `@media (max-width: 1023px)` | max-width query (forbidden) |
| `src/app/Layout/components/Header/Header.css:627` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/app/Layout/components/Header/Header.css:682` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/app/Layout/components/Preloader/Preloader.css:305` | `@media (min-width: 768px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 768 |
| `src/app/Layout/components/Preloader/Preloader.css:322` | `@media (max-width: 767px)` | max-width query (forbidden); contains forbidden value 767 |
| `src/app/Layout/components/Preloader/Preloader.css:358` | `@media (max-width: 380px)` | max-width query (forbidden) |
| `src/features/gallery/components/Gallery.css:299` | `@media (min-width: 1100px)` | min-width 1100px not in {641,1024,1920}; contains forbidden value 1100 |
| `src/features/gallery/components/Gallery.css:344` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/gallery/components/Gallery.css:549` | `@media (min-width: 1800px)` | min-width 1800px not in {641,1024,1920} |
| `src/features/gallery/components/Gallery.css:570` | `@media (min-width: 768px) and (max-width: 1023px)` | max-width query (forbidden); contains forbidden value 768 |
| `src/features/gallery/components/Gallery.css:634` | `@media (min-width: 1024px) and (max-width: 1099px)` | max-width query (forbidden) |
| `src/features/gallery/components/Gallery.css:688` | `@media (min-width: 768px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 768 |
| `src/features/gallery/components/Gallery.css:758` | `@media (max-width: 767px)` | max-width query (forbidden); contains forbidden value 767 |
| `src/features/gallery/components/Gallery.css:873` | `@media (max-width: 767px)` | max-width query (forbidden); contains forbidden value 767 |
| `src/features/gallery/components/Gallery.css:966` | `@media (max-width: 767px)` | max-width query (forbidden); contains forbidden value 767 |
| `src/features/gallery/components/Gallery.css:1000` | `@media (max-width: 480px)` | max-width query (forbidden) |
| `src/features/home/components/BenefitsSection/BenefitsSection.css:57` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/features/home/components/BenefitsSection/BenefitsSection.css:77` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/home/components/CafeMenu/CafeMenu.css:300` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/features/home/components/CafeMenu/CafeMenu.css:319` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/home/components/GalleryMood/GalleryMood.css:324` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/features/home/components/GalleryMood/GalleryMood.css:374` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/home/components/Hero/Hero.css:230` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/features/home/components/Hero/Hero.css:272` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/home/components/StorySection/StorySection.css:247` | `@media (max-width: 1135px)` | max-width query (forbidden) |
| `src/features/home/components/StorySection/StorySection.css:305` | `@media (max-width: 640px)` | max-width query (forbidden) |
| `src/features/home/components/StorySection/StorySection.css:314` | `@media (max-width: 480px)` | max-width query (forbidden) |
| `src/features/home/components/StorySection/StorySection.css:363` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/legal/components/LegalPage/Legal.css:404` | `@media (max-width: 1099px)` | max-width query (forbidden) |
| `src/features/menu/components/Menu.css:1499` | `@media (min-width: 1100px)` | min-width 1100px not in {641,1024,1920}; contains forbidden value 1100 |
| `src/features/menu/components/Menu.css:1506` | `@media (min-width: 1600px)` | min-width 1600px not in {641,1024,1920} |
| `src/features/story/components/OurStoryCta/OurStoryCta.css:35` | `@media (min-width: 1100px)` | min-width 1100px not in {641,1024,1920}; contains forbidden value 1100 |
| `src/features/story/components/OurStoryCta/OurStoryCta.css:101` | `@media (min-width: 600px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 600 |
| `src/features/story/components/OurStoryCta/OurStoryCta.css:111` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/story/components/OurStoryCta/OurStoryCta.css:117` | `@media (max-width: 640px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:115` | `@media (max-width: 1180px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:133` | `@media (max-width: 900px)` | max-width query (forbidden); contains forbidden value 900 |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:139` | `@media (max-width: 767px)` | max-width query (forbidden); contains forbidden value 767 |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:158` | `@media (max-width: 640px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:187` | `@media (min-width: 768px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 768 |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:222` | `@media (min-width: 600px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 600 |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:248` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/story/components/OurStoryImageRow/OurStoryImageRow.css:39` | `@media (min-width: 768px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 768 |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:54` | `@media (min-width: 600px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 600 |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:132` | `@media (max-width: 599px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:273` | `@media (max-width: 1023px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:318` | `@media (min-width: 600px) and (max-width: 1023px)` | max-width query (forbidden); contains forbidden value 600 |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:333` | `@media (max-width: 1099px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:364` | `@media (min-width: 600px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 600 |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:564` | `@media (min-width: 600px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 600 |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:578` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:606` | `@media (min-width: 600px) and (max-width: 1023px)` | max-width query (forbidden); contains forbidden value 600 |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:800` | `@media (max-width: 1023px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:883` | `@media (min-width: 1024px) and (max-width: 1099px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:896` | `@media (min-width: 1100px)` | min-width 1100px not in {641,1024,1920}; contains forbidden value 1100 |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:902` | `@media (max-width: 599px)` | max-width query (forbidden) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:972` | `@media (max-width: 599px)` | max-width query (forbidden) |
| `src/features/visit/components/VisitContact.css:131` | `@media (min-width: 1100px)` | min-width 1100px not in {641,1024,1920}; contains forbidden value 1100 |
| `src/features/visit/components/VisitContact.css:205` | `@media (max-width: 767px)` | max-width query (forbidden); contains forbidden value 767 |
| `src/features/visit/components/VisitContact.css:567` | `@media (min-width: 1100px)` | min-width 1100px not in {641,1024,1920}; contains forbidden value 1100 |
| `src/features/visit/components/VisitContact.css:577` | `@media (min-width: 1600px)` | min-width 1600px not in {641,1024,1920} |
| `src/features/visit/components/VisitContact.css:599` | `@media (max-width: 767px)` | max-width query (forbidden); contains forbidden value 767 |
| `src/features/visit/components/VisitContact.css:620` | `@media (min-width: 768px) and (max-width: 1023px)` | max-width query (forbidden); contains forbidden value 768 |
| `src/features/visit/components/VisitContact.css:647` | `@media (min-width: 1024px) and (max-width: 1099px)` | max-width query (forbidden) |
| `src/features/visit/components/VisitContact.css:668` | `@media (min-width: 900px) and (max-width: 1099px)` | max-width query (forbidden); contains forbidden value 900 |
| `src/features/visit/components/VisitContact.css:678` | `@media (max-width: 1100px)` | max-width query (forbidden); contains forbidden value 1100 |
| `src/features/visit/components/VisitContact.css:684` | `@media (max-width: 900px)` | max-width query (forbidden); contains forbidden value 900 |
| `src/features/visit/components/VisitContact.css:692` | `@media (max-width: 560px)` | max-width query (forbidden) |
| `src/features/visit/components/VisitContact.css:765` | `@media (max-width: 400px)` | max-width query (forbidden) |
| `src/features/visit/components/VisitContact.css:788` | `@media (max-width: 640px)` | max-width query (forbidden) |
| `src/pages/home/CallToAction.css:91` | `@media (min-width: 744px)` | min-width 744px not in {641,1024,1920}; contains forbidden value 744 |
| `src/pages/home/CallToAction.css:107` | `@media (min-width: 1136px)` | min-width 1136px not in {641,1024,1920}; contains forbidden value 1136 |
| `src/pages/home/CallToAction.css:139` | `@media (max-width: 480px)` | max-width query (forbidden) |
| `src/pages/not-found/NotFoundPage.css:86` | `@media (max-width: 1024px)` | max-width query (forbidden) |
| `src/pages/not-found/NotFoundPage.css:94` | `@media (max-width: 640px)` | max-width query (forbidden) |

### c2. PASS — allowed `min-width` queries

| file:line | query |
|---|---|
| `src/app/global.css:220` | `@media (min-width: 641px)` |
| `src/app/global.css:240` | `@media (min-width: 1024px)` |
| `src/features/gallery/components/Gallery.css:427` | `@media (min-width: 1920px)` |
| `src/features/home/components/CafeMenu/CafeMenu.css:409` | `@media (min-width: 1920px)` |
| `src/features/home/components/GalleryMood/GalleryMood.css:448` | `@media (min-width: 1920px)` |
| `src/features/home/components/Hero/Hero.css:295` | `@media (min-width: 1920px)` |
| `src/features/menu/components/Menu.css:981` | `@media (min-width: 641px)` |
| `src/features/menu/components/Menu.css:1151` | `@media (min-width: 1024px)` |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:276` | `@media (min-width: 1920px)` |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:324` | `@media (min-width: 1024px)` |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:827` | `@media (min-width: 1024px)` |
| `src/features/visit/components/VisitContact.css:40` | `@media (min-width: 1024px)` |
| `src/pages/home/CallToAction.css:124` | `@media (min-width: 1920px)` |

### c3. JS width code

| file:line | code | verdict |
|---|---|---|
| `src/features/home/components/GalleryMood/GalleryMood.jsx:44` | `window.innerWidth)) ` | INFO |
| `src/features/home/components/GalleryMood/GalleryMood.jsx:47` | `ForWidth(window.innerWidth)) ` | INFO |
| `src/features/home/components/GalleryMood/GalleryMood.jsx:15` | `Mood.css' const VISIBLE_BREAKPOINTS = [ { edge: 1920, visible: 7 }, { ` | **FAIL** — forbidden breakpoint value 1136 |
| `src/features/home/components/GalleryMood/GalleryMood.jsx:16` | `_BREAKPOINTS = [ { edge: 1920, visible: 7 }, { edge: 1136, visible: 7 ` | **FAIL** — forbidden breakpoint value 744 |
| `src/features/story/components/OurStoryHero/OurStoryHero.jsx:60` | `(max-width: ${MOBILE_BREAKPOINT - 1}px)` | **FAIL** — max-width query (forbidden) |
| `src/features/story/components/OurStoryHero/OurStoryHero.jsx:30` | `afé corner detail', }, ] const CYCLE_INTERVAL_MS = 2600 const MOBILE_B` | **FAIL** — forbidden breakpoint value 768 |
| `src/features/story/components/OurStoryImageRow/OurStoryImageRow.jsx:14` | `(max-width: 767px)` | **FAIL** — max-width query (forbidden) |
| `src/features/story/components/OurStoryImageRow/OurStoryImageRow.jsx:26` | `(min-width: 768px) and (max-width: 1099px)` | **FAIL** — max-width query (forbidden) |
| `src/shared/hooks/useParallaxTilt.js:65` | `tener('scroll', onInvalidate, { passive: true })` | INFO |

---

## d) Hardcoded font-size values (step 1b)

**98** declarations with px/rem/em/clamp/vw/`!important` on font-size. Real violations (they drive one of the 4 audited text types on a measured page): **59**.

### d1. REAL VIOLATIONS

| file:line | selector | value | media | text type |
|---|---|---|---|---|
| `src/features/gallery/components/Gallery.css:315` | `.gal-hero-desc, .gal-section-desc` | `clamp(16px, 0.25vw + 0.87rem, 18.6px)` | `@media (min-width: 1100px)` | description |
| `src/features/gallery/components/Gallery.css:371` | `.gal-hero-eyebrow` | `18px` | `@media (min-width: 1136px)` | eyebrow |
| `src/features/gallery/components/Gallery.css:388` | `.gal-hero-title` | `clamp(40px, 3.9vw, 56px)` | `@media (min-width: 1136px)` | H1 |
| `src/features/gallery/components/Gallery.css:400` | `.gal-hero-desc` | `clamp(16px, 1.4vw, 20px)` | `@media (min-width: 1136px)` | description |
| `src/features/gallery/components/Gallery.css:433` | `.gal-hero-eyebrow` | `18px` | `@media (min-width: 1920px)` | eyebrow |
| `src/features/gallery/components/Gallery.css:437` | `.gal-hero-title` | `56px` | `@media (min-width: 1920px)` | H1 |
| `src/features/gallery/components/Gallery.css:441` | `.gal-hero-desc` | `20px` | `@media (min-width: 1920px)` | description |
| `src/features/gallery/components/Gallery.css:1015` | `.gal-hero-title` | `32px` | `@media (max-width: 480px)` | H1 |
| `src/features/gallery/components/Gallery.css:1023` | `.gal-hero-desc` | `15px` | `@media (max-width: 480px)` | description |
| `src/features/home/components/Hero/Hero.css:109` | `.hero-eyebrow` | `11px` | base | eyebrow |
| `src/features/home/components/Hero/Hero.css:123` | `.hero-title` | `32px` | base | H1 |
| `src/features/home/components/Hero/Hero.css:187` | `.hero-desc` | `clamp(0.875rem, 0.35vw + 0.835rem, 1rem)` | base | description |
| `src/features/home/components/Hero/Hero.css:245` | `.hero-title` | `44px` | `@media (min-width: 744px)` | H1 |
| `src/features/home/components/Hero/Hero.css:253` | `.hero-desc` | `17px` | `@media (min-width: 744px)` | description |
| `src/features/home/components/Hero/Hero.css:282` | `.hero-title` | `56px` | `@media (min-width: 1136px)` | H1 |
| `src/features/home/components/Hero/Hero.css:289` | `.hero-desc` | `20px` | `@media (min-width: 1136px)` | description |
| `src/features/home/components/Hero/Hero.css:297` | `.hero-title` | `64px` | `@media (min-width: 1920px)` | H1 |
| `src/features/home/components/StorySection/StorySection.css:270` | `.story-copy > .pb-story-eyebrow` | `0.75rem` | `@media (max-width: 1135px)` | eyebrow |
| `src/features/home/components/StorySection/StorySection.css:286` | `.story-copy > .story-paragraph` | `1rem` | `@media (max-width: 1135px)` | description |
| `src/features/menu/components/Menu.css:124` | `.menu-hero-eyebrow` | `12px` | base | eyebrow |
| `src/features/menu/components/Menu.css:145` | `.menu-hero-title` | `28px` | base | H1 |
| `src/features/menu/components/Menu.css:164` | `.menu-hero-desc` | `14px` | base | description |
| `src/features/menu/components/Menu.css:419` | `.menu-special-title` | `28px` | base | H2 |
| `src/features/menu/components/Menu.css:800` | `.menu-cafe-title` | `28px` | base | H2 |
| `src/features/menu/components/Menu.css:813` | `.menu-cafe-desc` | `15px` | base | description |
| `src/features/menu/components/Menu.css:939` | `.menu-cta .eyebrow` | `12px` | base | eyebrow |
| `src/features/menu/components/Menu.css:944` | `.menu-cta-title` | `24px` | base | H2 |
| `src/features/menu/components/Menu.css:960` | `.menu-cta-desc` | `13px` | base | description |
| `src/features/menu/components/Menu.css:998` | `.menu-hero-eyebrow` | `14px` | `@media (min-width: 641px)` | eyebrow |
| `src/features/menu/components/Menu.css:1002` | `.menu-hero-title` | `44px` | `@media (min-width: 641px)` | H1 |
| `src/features/menu/components/Menu.css:1011` | `.menu-hero-desc` | `18px` | `@media (min-width: 641px)` | description |
| `src/features/menu/components/Menu.css:1047` | `.menu-special-title` | `44px` | `@media (min-width: 641px)` | H2 |
| `src/features/menu/components/Menu.css:1096` | `.menu-cafe-title` | `44px` | `@media (min-width: 641px)` | H2 |
| `src/features/menu/components/Menu.css:1102` | `.menu-cafe-desc` | `18px` | `@media (min-width: 641px)` | description |
| `src/features/menu/components/Menu.css:1125` | `.menu-cta .eyebrow` | `13px` | `@media (min-width: 641px)` | eyebrow |
| `src/features/menu/components/Menu.css:1129` | `.menu-cta-title` | `32px` | `@media (min-width: 641px)` | H2 |
| `src/features/menu/components/Menu.css:1134` | `.menu-cta-desc` | `14px` | `@media (min-width: 641px)` | description |
| `src/features/story/components/OurStoryCta/OurStoryCta.css:113` | `.ostory-cta-desc` | `clamp(16px, 0.25vw + 0.87rem, 18.6px)` | `@media (min-width: 1136px)` | description |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:253` | `.ostory-hero .ostory-eyebrow` | `18px` | `@media (min-width: 1136px)` | eyebrow |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:263` | `.ostory-title` | `clamp(40px, 3.9vw, 56px)` | `@media (min-width: 1136px)` | H1 |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:268` | `.ostory-desc` | `clamp(16px, 1.4vw, 20px)` | `@media (min-width: 1136px)` | description |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:278` | `.ostory-hero .ostory-eyebrow` | `18px` | `@media (min-width: 1920px)` | eyebrow |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:282` | `.ostory-title` | `56px` | `@media (min-width: 1920px)` | H1 |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:286` | `.ostory-desc` | `20px` | `@media (min-width: 1920px)` | description |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:580` | `.ostory-origin-text` | `clamp(16px, 0.25vw + 0.87rem, 18.6px)` | `@media (min-width: 1136px)` | description |
| `src/features/visit/components/VisitContact.css:207` | `.visit-card-title` | `clamp(1.75rem, 6vw, 2.4rem)` | `@media (max-width: 767px)` | H2 |
| `src/features/visit/components/VisitContact.css:849` | `.visit-hero-eyebrow` | `14px` | `@media (max-width: 640px)` | eyebrow |
| `src/features/visit/components/VisitContact.css:871` | `.visit-hero-title` | `28px` | `@media (max-width: 640px)` | H1 |
| `src/features/visit/components/VisitContact.css:882` | `.visit-hero-desc` | `14px` | `@media (max-width: 640px)` | description |
| `src/pages/home/CallToAction.css:56` | `.experience .eyebrow` | `12px` | base | eyebrow |
| `src/pages/home/CallToAction.css:79` | `.experience-desc` | `clamp(13px, 0.28vw + 12.3px, 14px)` | base | description |
| `src/pages/home/CallToAction.css:97` | `.experience-title` | `36px` | `@media (min-width: 744px)` | H2 |
| `src/pages/home/CallToAction.css:101` | `.experience-desc` | `17px` | `@media (min-width: 744px)` | description |
| `src/pages/home/CallToAction.css:113` | `.experience-title` | `48px` | `@media (min-width: 1136px)` | H2 |
| `src/pages/home/CallToAction.css:117` | `.experience-desc` | `20px` | `@media (min-width: 1136px)` | description |
| `src/pages/home/CallToAction.css:130` | `.experience-title` | `52px` | `@media (min-width: 1920px)` | H2 |
| `src/pages/home/CallToAction.css:198` | `.experience-title` | `22px` | `@media (max-width: 480px)` | H2 |
| `src/pages/home/CallToAction.css:210` | `.experience-desc` | `12px` | `@media (max-width: 480px)` | description |
| `src/pages/not-found/NotFoundPage.css:64` | `.nf-title` | `clamp(1.6rem, 3.5vw, 2.3rem)` | base | H1 |

### d2. In scope but measured OK / review

| file:line | selector | value | verdict | why |
|---|---|---|---|---|
| `src/features/menu/components/Menu.css:795` | `.menu-cafe-eyebrow` | `12px` | in scope, measured OK | eyebrow of the 4 audited text types |
| `src/features/menu/components/Menu.css:1092` | `.menu-cafe-eyebrow` | `14px` | in scope, measured OK | eyebrow of the 4 audited text types |
| `src/app/Layout/components/Header/Header.css:556` | `.pb-menu-cta` | `16px` | review | not one of the 4 audited types as measured |
| `src/features/menu/components/Menu.css:562` | `.menu-item-desc` | `13px` | review | not one of the 4 audited types as measured |
| `src/features/menu/components/Menu.css:1069` | `.menu-item-desc` | `15px` | review | not one of the 4 audited types as measured |
| `src/features/visit/components/VisitContact.css:767` | `.visit-info-value` | `clamp(0.95rem, 4.4vw, 1.25rem)` | review | not one of the 4 audited types as measured |
| `src/features/visit/components/VisitContact.css:772` | `.visit-info-link` | `clamp(0.95rem, 4.4vw, 1.25rem)` | review | not one of the 4 audited types as measured |

### d3. Out of scope (not H1/H2/description/eyebrow)

| file:line | selector | value | category |
|---|---|---|---|
| `src/app/Layout/components/Header/Header.css:393` | `.pb-menu-index` | `12px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/app/Layout/components/Header/Header.css:402` | `.pb-menu-label` | `24px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/app/Layout/components/Header/Header.css:415` | `.pb-menu-arrow` | `15px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/app/Layout/components/Header/Header.css:524` | `.pb-menu-meta-label` | `12px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/app/Layout/components/Header/Header.css:536` | `.pb-menu-meta-value` | `16px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/app/Layout/components/Preloader/Preloader.css:312` | `.preloader-wordmark` | `clamp(2.4rem, 5.4vw, 3.6rem)` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/app/Layout/components/Preloader/Preloader.css:329` | `.preloader-wordmark` | `clamp(1.9rem, 8.4vw, 2.9rem)` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/app/Layout/components/Preloader/Preloader.css:365` | `.preloader-wordmark` | `clamp(1.6rem, 8.6vw, 2.2rem)` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/home/components/BenefitsSection/BenefitsSection.css:44` | `.benefit-title` | `20px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/home/components/BenefitsSection/BenefitsSection.css:52` | `.benefit-text` | `14px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/home/components/BenefitsSection/BenefitsSection.css:68` | `.benefit-title` | `22px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/home/components/BenefitsSection/BenefitsSection.css:72` | `.benefit-text` | `16px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/home/components/BenefitsSection/BenefitsSection.css:93` | `.benefit-title` | `24px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/home/components/BenefitsSection/BenefitsSection.css:97` | `.benefit-text` | `16px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:233` | `.menu-tab` | `14px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:242` | `.menu-tab.is-active` | `15px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:280` | `.menu-select-trigger` | `16px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:371` | `.menu-select-option` | `16px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:438` | `.menu-special-size` | `20px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:534` | `.menu-item-name` | `15px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:554` | `.menu-item-price` | `15px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:898` | `.menu-card-caption` | `20px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:1026` | `.menu-tab` | `18px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:1030` | `.menu-tab.is-active` | `20px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:1056` | `.menu-special-size` | `22px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:1065` | `.menu-item-name, .menu-item-price` | `17px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/menu/components/Menu.css:1116` | `.menu-card-caption` | `24px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:314` | `.pb-story-ring__text` | `11px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:320` | `.pb-story-ring__text` | `15px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/features/visit/components/VisitContact.css:757` | `.visit-field input, .visit-field textarea` | `16px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/pages/home/CallToAction.css:232` | `.experience-content .btn` | `17px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |
| `src/pages/home/CallToAction.css:248` | `.experience-content .btn .btn-arrow::after` | `16px` | UI/chrome text (nav, tabs, buttons, prices, captions, labels, footer…) |

---

## e) Unexpected layout jumps (font-size changing away from 641 / 1024 / 1920)

**722** jump events across **93** element/route series. Sampled widths inside a band must be identical; every hop below breaks that.

| route | element | jumps (width: before→after) | caused by |
|---|---|---|---|
| `privacy-policy` | H1 `legal-title` | 375→390: 37.475→37.79<br>390→430: 37.79→38.63<br>430→500: 38.63→40.1<br>500→640: 40.1→43.04<br>641→744: 43.061→45.224<br>744→900: 45.224→48.5<br>900→1023: 48.5→51.083<br>1024→1136: 51.104→53.456<br>1136→1280: 53.456→56.48<br>1280→1440: 56.48→59.84<br>1440→1919: 59.84→69.899<br>1920→2560: 69.92→83.36 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | description `legal-lede` | 375→390: 17.025→17.13<br>390→430: 17.13→17.41<br>430→500: 17.41→17.9<br>500→640: 17.9→18.88<br>641→744: 18.887→19.608<br>744→900: 19.608→20.7<br>900→1023: 20.7→21.561<br>1024→1136: 21.568→22.352<br>1136→1280: 22.352→23.36<br>1280→1440: 23.36→24.48<br>1440→1919: 24.48→27.833<br>1920→2560: 27.84→28 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H1 `legal-title` | 375→390: 37.475→37.79<br>390→430: 37.79→38.63<br>430→500: 38.63→40.1<br>500→640: 40.1→43.04<br>641→744: 43.061→45.224<br>744→900: 45.224→48.5<br>900→1023: 48.5→51.083<br>1024→1136: 51.104→53.456<br>1136→1280: 53.456→56.48<br>1280→1440: 56.48→59.84<br>1440→1919: 59.84→69.899<br>1920→2560: 69.92→83.36 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `legal-lede` | 375→390: 17.025→17.13<br>390→430: 17.13→17.41<br>430→500: 17.41→17.9<br>500→640: 17.9→18.88<br>641→744: 18.887→19.608<br>744→900: 19.608→20.7<br>900→1023: 20.7→21.561<br>1024→1136: 21.568→22.352<br>1136→1280: 22.352→23.36<br>1280→1440: 23.36→24.48<br>1440→1919: 24.48→27.833<br>1920→2560: 27.84→28 | fluid value (clamp/vw) — no media query involved |
| `home` | description `lead cafe-paragraph reveal reveal-delay-2` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved<br>src/features/home/components/CafeMenu/CafeMenu.css:300 @media (min-width: 744px)<br>src/features/home/components/CafeMenu/CafeMenu.css:319 @media (min-width: 1136px) |
| `home` | description `lead gallery-desc` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved<br>src/features/home/components/GalleryMood/GalleryMood.css:324 @media (min-width: 744px)<br>src/features/home/components/GalleryMood/GalleryMood.css:374 @media (min-width: 1136px) |
| `our-story` | description `ostory-origin-text` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→16.76<br>1136→1280: 16.76→17.12<br>1280→1440: 17.12→17.52<br>1440→1919: 17.52→18.6 | fluid value (clamp/vw) — no media query involved<br>src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:578 @media (min-width: 1136px) |
| `our-story` | description `ostory-cta-desc` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→16.76<br>1136→1280: 16.76→17.12<br>1280→1440: 17.12→17.52<br>1440→1919: 17.52→18.6 | fluid value (clamp/vw) — no media query involved<br>src/features/story/components/OurStoryCta/OurStoryCta.css:111 @media (min-width: 1136px) |
| `gallery` | description `gal-section-desc lead` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→16.76<br>1136→1280: 16.76→17.12<br>1280→1440: 17.12→17.52<br>1440→1919: 17.52→18.6 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `gallery` | description `gal-section-desc lead` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→16.76<br>1136→1280: 16.76→17.12<br>1280→1440: 17.12→17.52<br>1440→1919: 17.52→18.6 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `gallery` | description `gal-section-desc lead` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→16.76<br>1136→1280: 16.76→17.12<br>1280→1440: 17.12→17.52<br>1440→1919: 17.52→18.6 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `gallery` | description `gal-section-desc lead` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→16.76<br>1136→1280: 16.76→17.12<br>1280→1440: 17.12→17.52<br>1440→1919: 17.52→18.6 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `visit-contact` | description `visit-cta-desc` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved<br>src/features/visit/components/VisitContact.css:668 @media (min-width: 900px) |
| `privacy-policy` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | description `` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `not-found` | description `lead nf-desc reveal reveal-delay-2 is-visible` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `our-story` | description `ostory-desc reveal reveal-delay-2 is-visible` | 375→390: 16.015→16.054<br>390→430: 16.054→16.158<br>430→500: 16.158→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→16<br>1136→1280: 16→17.92<br>1280→1440: 17.92→20 | fluid value (clamp/vw) — no media query involved<br>src/features/story/components/OurStoryHero/OurStoryHero.css:248 @media (min-width: 1136px) |
| `gallery` | H1 `gal-hero-title` | 430→500: 32→40.1<br>500→640: 40.1→43.04<br>641→744: 43.061→45.224<br>744→900: 45.224→48.5<br>900→1023: 48.5→51.083<br>1024→1136: 51.104→44.304<br>1136→1280: 44.304→49.92<br>1280→1440: 49.92→56 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `gallery` | description `gal-hero-desc lead` | 430→500: 15→16.34<br>500→640: 16.34→16.704<br>641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→16<br>1136→1280: 16→17.92<br>1280→1440: 17.92→20 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `visit-contact` | H1 `visit-hero-title` | 641→744: 43.061→45.224<br>744→900: 45.224→48.5<br>900→1023: 48.5→51.083<br>1024→1136: 51.104→53.456<br>1136→1280: 53.456→56.48<br>1280→1440: 56.48→59.84<br>1440→1919: 59.84→69.899<br>1920→2560: 69.92→83.36 | fluid value (clamp/vw) — no media query involved<br>src/features/visit/components/VisitContact.css:668 @media (min-width: 900px) |
| `visit-contact` | H2 `visit-card-title` | 430→500: 28→30<br>500→640: 30→38.4<br>744→900: 38.4→29.52<br>900→1023: 29.52→30.799<br>1024→1136: 30.81→31.974<br>1136→1280: 31.974→33.472<br>1280→1440: 33.472→35.136<br>1440→1919: 35.136→40 | fluid value (clamp/vw) — no media query involved<br>src/features/visit/components/VisitContact.css:668 @media (min-width: 900px) |
| `home` | H2 `story-title reveal reveal-delay-1` | 641→744: 28→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved<br>src/features/home/components/StorySection/StorySection.css:363 @media (min-width: 1136px) |
| `home` | H2 `cafe-title reveal reveal-delay-1` | 641→744: 28→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | src/features/home/components/CafeMenu/CafeMenu.css:300 @media (min-width: 744px)<br>fluid value (clamp/vw) — no media query involved<br>src/features/home/components/CafeMenu/CafeMenu.css:319 @media (min-width: 1136px) |
| `home` | H2 `gallery-title` | 641→744: 28→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | src/features/home/components/GalleryMood/GalleryMood.css:324 @media (min-width: 744px)<br>fluid value (clamp/vw) — no media query involved<br>src/features/home/components/GalleryMood/GalleryMood.css:374 @media (min-width: 1136px) |
| `home` | eyebrow `eyebrow hero-eyebrow` | 641→744: 11→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `home` | eyebrow `eyebrow reveal` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `home` | eyebrow `eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `our-story` | H2 `ostory-origin-title` | 641→744: 28→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved<br>src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:578 @media (min-width: 1136px) |
| `our-story` | H2 `ostory-cta-title` | 641→744: 28→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved<br>src/features/story/components/OurStoryCta/OurStoryCta.css:111 @media (min-width: 1136px) |
| `our-story` | eyebrow `eyebrow ostory-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `our-story` | eyebrow `eyebrow ostory-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `gallery` | H2 `gal-section-title` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `gallery` | H2 `gal-section-title` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `gallery` | H2 `gal-section-title` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `gallery` | H2 `gal-section-title` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved<br>src/features/gallery/components/Gallery.css:344 @media (min-width: 1136px) |
| `gallery` | eyebrow `eyebrow gal-section-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `gallery` | eyebrow `eyebrow gal-section-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `gallery` | eyebrow `eyebrow gal-section-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `gallery` | eyebrow `eyebrow gal-section-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `visit-contact` | H2 `visit-cta-title section-heading` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved<br>src/features/visit/components/VisitContact.css:668 @media (min-width: 900px) |
| `visit-contact` | description `visit-hero-desc` | 641→744: 16.707→16.974<br>744→900: 16.974→17.38<br>900→1023: 17.38→17.7<br>1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved<br>src/features/visit/components/VisitContact.css:668 @media (min-width: 900px) |
| `visit-contact` | eyebrow `eyebrow visit-hero-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `visit-contact` | eyebrow `eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `privacy-policy` | eyebrow `legal-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | H2 `legal-h2` | 641→744: 24→37.772<br>744→900: 37.772→40.19<br>900→1023: 40.19→42.097<br>1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `terms-and-conditions` | eyebrow `legal-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `not-found` | eyebrow `eyebrow nf-eyebrow reveal is-visible` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `home` | description `hero-desc reveal reveal-delay-2 is-visible` | 375→390: 14.673→14.725<br>390→430: 14.725→14.865<br>430→500: 14.865→15.11<br>500→640: 15.11→15.6<br>641→744: 15.604→17<br>1024→1136: 17→20 | fluid value (clamp/vw) — no media query involved<br>src/features/home/components/Hero/Hero.css:230 @media (min-width: 744px)<br>src/features/home/components/Hero/Hero.css:272 @media (min-width: 1136px) |
| `our-story` | H1 `ostory-title reveal reveal-delay-1 is-visible` | 641→744: 32→45.224<br>744→900: 45.224→48.5<br>900→1023: 48.5→51.083<br>1024→1136: 51.104→44.304<br>1136→1280: 44.304→49.92<br>1280→1440: 49.92→56 | fluid value (clamp/vw) — no media query involved<br>src/features/story/components/OurStoryHero/OurStoryHero.css:248 @media (min-width: 1136px) |
| `menu` | H1 `menu-hero-title` | 1024→1136: 51.104→53.456<br>1136→1280: 53.456→56.48<br>1280→1440: 56.48→59.84<br>1440→1919: 59.84→69.899<br>1920→2560: 69.92→83.36 | fluid value (clamp/vw) — no media query involved |
| `home` | description `lead story-paragraph reveal reveal-delay-2` | 1024→1136: 16→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | src/features/home/components/StorySection/StorySection.css:363 @media (min-width: 1136px)<br>fluid value (clamp/vw) — no media query involved |
| `home` | eyebrow `pb-story-eyebrow eyebrow reveal` | 1024→1136: 12→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | src/features/home/components/StorySection/StorySection.css:363 @media (min-width: 1136px)<br>fluid value (clamp/vw) — no media query involved |
| `our-story` | eyebrow `eyebrow ostory-eyebrow reveal is-visible` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→18 | fluid value (clamp/vw) — no media query involved |
| `menu` | H2 `menu-special-title` | 1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `menu` | H2 `menu-cafe-title reveal reveal-delay-1` | 1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `menu` | H2 `menu-cta-title` | 1024→1136: 42.112→43.848<br>1136→1280: 43.848→46.08<br>1280→1440: 46.08→48.56<br>1440→1919: 48.56→55.985 | fluid value (clamp/vw) — no media query involved |
| `menu` | description `menu-hero-desc` | 1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `menu` | description `menu-cafe-desc reveal reveal-delay-2` | 1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `menu` | description `menu-cta-desc` | 1024→1136: 17.702→17.994<br>1136→1280: 17.994→18.368<br>1280→1440: 18.368→18.784<br>1440→1919: 18.784→20 | fluid value (clamp/vw) — no media query involved |
| `menu` | eyebrow `eyebrow menu-hero-eyebrow` | 1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `menu` | eyebrow `eyebrow` | 1024→1136: 12.851→12.997<br>1136→1280: 12.997→13.184<br>1280→1440: 13.184→13.392<br>1440→1919: 13.392→14 | fluid value (clamp/vw) — no media query involved |
| `gallery` | eyebrow `eyebrow gal-hero-eyebrow` | 641→744: 10→12.487<br>744→900: 12.487→12.69<br>900→1023: 12.69→12.85<br>1024→1136: 12.851→18 | fluid value (clamp/vw) — no media query involved |
| `not-found` | H1 `nf-title reveal reveal-delay-2 is-visible` | 641→744: 25.6→26.04<br>744→900: 26.04→31.5<br>900→1023: 31.5→35.805<br>1024→1136: 35.84→36.8 | fluid value (clamp/vw) — no media query involved |
| `home` | H2 `experience-title reveal reveal-delay-1 is-visible` | 430→500: 22→28<br>641→744: 28→36<br>1024→1136: 36→48 | fluid value (clamp/vw) — no media query involved<br>src/pages/home/CallToAction.css:91 @media (min-width: 744px)<br>src/pages/home/CallToAction.css:107 @media (min-width: 1136px) |
| `home` | description `experience-desc reveal reveal-delay-2 is-visible` | 430→500: 12→13.7<br>500→640: 13.7→14<br>641→744: 14→17 | fluid value (clamp/vw) — no media query involved<br>src/pages/home/CallToAction.css:91 @media (min-width: 744px) |
| `home` | H1 `hero-title is-visible` | 641→744: 32→44<br>1024→1136: 44→56 | src/features/home/components/Hero/Hero.css:230 @media (min-width: 744px)<br>src/features/home/components/Hero/Hero.css:272 @media (min-width: 1136px) |

---

## f) Tokens (step 1d)

Required: `--fs-h1 --lh-h1 --fs-h2 --lh-h2 --fs-body --lh-body --fs-eyebrow`, each defined once in `global.css` and overridden only inside `min-width: 641 / 1024 / 1920`.

| token | status | definitions (file:line · media · value) | px @375 / @641 / @1024 / @1920 | expected | verdict |
|---|---|---|---|---|---|
| `--fs-h1` | defined | `src/app/global.css:107` (base) `clamp(2.25rem, 2.1vw + 1.85rem, 5.25rem)` | 37.48 / 43.06 / 51.1 / 69.92 | band table in task | **FAIL** |
| `--lh-h1` | **MISSING** | not defined anywhere | — | 1.15→1.1 | **FAIL** |
| `--fs-h2` | defined | `src/app/global.css:108` (base) `var(--fs-section)` | 24 / 24 / 42.11 / 56 | band table in task | **FAIL** |
| `--lh-h2` | **MISSING** | not defined anywhere | — | — | **FAIL** |
| `--fs-body` | **MISSING** | not defined anywhere | — | 14/16/20/20 | **FAIL** |
| `--lh-body` | defined | `src/app/global.css:119` (base) `1.6` | — / — / — / — | 1.5 | ok |
| `--fs-eyebrow` | defined | `src/app/global.css:81` (base) `0.625rem`<br>`src/app/global.css:229` min-width 744px `clamp(0.75rem, 0.13vw + 0.72rem, 0.875rem)` | 10 / 10 / 12.85 / 14 | band table in task | **FAIL** |

Notes:
* `--fs-h2` is an alias of `--fs-section` (global.css:82, overridden at **744px**, global.css:230), and `--lh-h1`/`--lh-h2`/`--fs-body` do not exist at all — headings fall back to `--lh-heading: 1.1` / `--lh-heading-sm: 1.2` and descriptions to `--fs-text` (a clamp) with `--lh-text: 1.7`.
* The file documents the conflict itself at `src/app/global.css:214-217`: “Reflows still reflows on 744 / 1136 / 1920. Nothing else may use 641 or 1024.”

## g) Font-size under 12px (step 1e)

Static scan: **2** declarations (`src/features/home/components/Hero/Hero.css:109` `.hero-eyebrow` 11px, `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:314` `.pb-story-ring__text` 11px).

Browser: **224** visible text nodes under 12px, **18** distinct selectors:

| element | font-size | hits | sample text |
|---|---|---|---|
| `p.eyebrow.hero-eyebrow` | 11px | 6 | - Paris Beans - HAIR RAP BY YO |
| `span.experience-dash` | 0px | 3 | — |
| `span.btn-arrow` | 0px | 3 | → |
| `p.eyebrow.reveal` | 10px | 6 | — From the Café |
| `p.eyebrow` | 10px | 6 | — The ParisBeans Mood |
| `h3.footer-heading` | 10px | 96 | Explore |
| `p.eyebrow.ostory-eyebrow.reveal` | 10px | 6 | OUR STORY |
| `p.eyebrow.ostory-eyebrow` | 10px | 12 | — From Paris to HAIR RAP BY YO |
| `textpath` | 11px | 4 | Where Every Salon Visit Finds  |
| `span.menu-hero-dash` | 0px | 9 | — |
| `span.eyebrow.gal-hero-eyebrow` | 10px | 6 | PARISIAN ATMOSPHERE |
| `span.eyebrow.gal-section-eyebrow` | 10px | 24 | — PARISIAN ATMOSPHERE |
| `span.visit-hero-dash` | 0px | 6 | — |
| `span.eyebrow` | 10px | 6 | — The Paris Beans Experience |
| `span.eyebrow.visit-hero-eyebrow` | 10px | 1 | Visit ParisBeans |
| `span.legal-toc-label` | 10px | 12 | On this page |
| `span.legal-eyebrow` | 10px | 12 | — Privacy Policy |
| `p.eyebrow.nf-eyebrow.reveal` | 10px | 6 | — Page Not Found |

`--fs-eyebrow: 0.625rem` (global.css:81) = **10px** on the phone band, and `.footer-heading` reads `--fs-eyebrow` at every width. The 0px entries are the decorative “—” rule elements (`font-size:0` hides the glyph) and are excluded as hidden text.

## h) Layout checks

| check | result |
|---|---|
| page horizontal scroll (as rendered) | 0 / 128 route×width rows |
| page horizontal scroll (body overflow-x forced visible) | 0 / 128 rows — `body{overflow-x:hidden}` (global.css:278) masks nothing extra; even unclipped the document does not scroll |
| elements past the viewport | 0 hits on 43 rows — all inside an ancestor scroller or the `body` clip (see overflow.json `clipper`) |
| clipped text on the 4 types | 0 / 1520 |
| header fits one row at 641/744/1023/1024 | 0 / 32 |
| hamburger only at ≤640 | 40 / 40 |

Header detail at the required widths (identical on all 8 routes):

| width | nav links | hamburger | row spread | expected | verdict |
|---|---|---|---|---|---|
| 641 | 0 | visible | 10px | nav ≥1 on one row, hamburger hidden | **FAIL** |
| 744 | 0 | visible | 2px | nav ≥1 on one row, hamburger hidden | **FAIL** |
| 1023 | 0 | visible | 2px | nav ≥1 on one row, hamburger hidden | **FAIL** |
| 1024 | 0 | visible | 2px | nav ≥1 on one row, hamburger hidden | **FAIL** |

The header swaps to the full nav only at **1136px** (`Header.css:682` `@media (min-width: 1136px)` → `.nav-left{display:flex}` `.menu-toggle{display:none}`), so between 641 and 1135 the hamburger is still shown and there are no nav links.

## i) Figma line-break checks

| route | width | element | expected | found | verdict |
|---|---|---|---|---|---|
| home | 390 | `hero-title is-visible` | 3 | 3 | ok |
| menu | 390 | `menu-hero-title` | 3 | 3 | ok |
| menu | 1440 | `menu-hero-title` | 2 | 3 | **FAIL** |
| gallery | 1440 | `gal-hero-title` | 1 | 1 | ok |
| gallery | 1440 | `gal-hero-desc lead` | 1 | 1 | ok |
| our-story | 1440 | `ostory-title reveal reveal-delay-1 is-visible` | 1 | 1 | ok |

## j) Behaviour (do not modify)

| check | width | result | detail |
|---|---|---|---|
| menu-tabs | 390 | PASS | `clicked .menu-tab`: Hot Coffees → Cold Frappe |
| menu-tabs | 1280 | PASS | `clicked .menu-tab`: Hot Coffees → Cold Frappe |
| background-carousel | 390 | PASS | caption Warm Parisian café corner → Espresso being poured, dot 0→1 |
| ambient-animations | 390 | PASS | 36 running animations |
| background-carousel | 1280 | PASS | caption Warm Parisian café corner → Espresso being poured, dot 0→1 |
| ambient-animations | 1280 | PASS | 41 running animations |

Console/page errors across all 128 loads: **0**.

**Particles:** no particle system exists in this repo (`src/`, `public/`, `index.html` contain no `particle`/`confetti`/`psjs` code). The ambient motion that does run is the background carousel, the `GalleryMood` coverflow, `reveal`/`reveal-delay-*` IntersectionObserver entrances and the CSS keyframes measured above.

**Login:** no route requires authentication; all 8 routes render without a login wall.

## k) Doubled selectors & duplicates (step 1c)

Doubled `.a.a` selectors: **0**. Duplicate same-selector declarations: **12**.
| file:line | selector | media | redeclared props |
|---|---|---|---|
| `src/app/global.css:391` & 420 | `h1, h2, h3, h4, h5, h6, .display` | base | — (no shared props) |
| `src/features/gallery/components/Gallery.css:149` & 169 | `.image-4` | base | — (no shared props) |
| `src/features/gallery/components/Gallery.css:152` & 173 | `.image-7` | base | — (no shared props) |
| `src/features/gallery/components/Gallery.css:115` & 219 | `.gallery-image` | base | — (no shared props) |
| `src/features/gallery/components/Gallery.css:876` & 976 | `.gal-grid` | @media (max-width: 767px) | — (no shared props) |
| `src/features/home/components/GalleryMood/GalleryMood.css:104` & 123 | `.carousel-item` | base | — (no shared props) |
| `src/features/home/components/GalleryMood/GalleryMood.css:157` & 196 | `.carousel-item.center .polaroid-photo` | base | box-shadow |
| `src/features/menu/components/Menu.css:521` & 531 | `.menu-item-name` | base | — (no shared props) |
| `src/features/story/components/OurStoryHero/OurStoryHero.css:62` & 129 | `.ostory-gallery` | base | height |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:205` & 238 | `.ostory-origin-heading` | @media (max-width: 599px) | — (no shared props) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:374` & 396 | `.ostory-origin-grid` | @media (min-width: 600px) and (max-width: 1099px) | — (no shared props) |
| `src/features/story/components/OurStoryOrigin/OurStoryOrigin.css:638` & 698 | `.ostory-origin-copy > .ostory-origin-heading > .ostory-origi` | @media (min-width: 600px) and (max-width: 1023px) | — (no shared props) |

---

## l) Top 5 things still to fix

1. **Move the whole type system onto the 4-band scale.** `--fs-h1` (global.css:107), `--fs-h2`→`--fs-section` (global.css:108/82), `--fs-eyebrow` (global.css:81/229) and every description size must be defined once and overridden only at `min-width: 641 / 1024 / 1920` to 32/44/56/64, 28/36/48/52, 14/16/20/20, 12/14/16/16. **This one change is behind 1294 of the 1520 failed samples (85%).**
2. **Retire the 744 / 1136 / 1100 / 1600 / 1800 breakpoints and every `max-width` query.** 83 of 96 CSS width queries are off-scale (worst files: `OurStoryOrigin.css` 14, `VisitContact.css` 13, `Gallery.css` 10, `OurStoryHero.css` 7), plus 6 JS width values (`OurStoryHero.jsx:30,60` 768, `OurStoryImageRow.jsx:14,26`, `GalleryMood.jsx:13-16` 1136/744).
3. **Header: show the nav from 641px, hide the hamburger from 641px.** Today the swap happens at 1136px (`Header.css:627,682`), so at 641/744/1023/1024 all 8 routes show a hamburger and zero nav links — 32/32 header checks fail.
4. **Fix the Menu hero H1.** It is 28px on phone (expected 32) and renders 59.84px / 3 lines at 1440 (expected 56px band size, 2 lines per Figma); the 64px exception is not implemented — `Menu.css:145` hardcodes 28/44 and lets `--fs-h1`'s clamp take over from `Menu.css:1151`.
5. **Kill the fluid text and the sub-12px sizes.** 59 hardcoded font-sizes still drive the 4 text types (clamps in `Hero.css:187`, `Gallery.css:315/388/400`, `OurStoryHero.css:263/268`, `CallToAction.css:79`, `NotFoundPage.css:64`, hardcodes at `Hero.css:109/123/245/282/297`, `CallToAction.css:56/97/113/130`, `VisitContact.css:849/871/882`), which produces 722 mid-band size jumps; and `--fs-eyebrow` = 10px plus `.footer-heading`/`.hero-eyebrow` at 10–11px keep 224 text nodes under 12px.

---

## m) Artifacts

```
verify-static.mjs        step 1 static audit
verify-browser.mjs       step 2 Playwright audit (routes, widths, screenshots, behaviour)
verify-overflow.mjs      step 2 add-on: overflow + clipping ancestor (body overflow-x unmasked)
verify-report.mjs        step 3 this report
verify-report/REPORT.md
verify-report/static.json / static-print.txt
verify-report/typography.json / typography.tsv
verify-report/layout.json / browser.json / overflow.json
verify-report/*.png      48 screenshots at 640, 641, 1023, 1024, 1919, 1920 per route
```

Re-run: `node verify-static.mjs && node verify-browser.mjs && node verify-overflow.mjs && node verify-report.mjs`
(subset: `ROUTES=menu,home WIDTHS=390,641,1440 node verify-browser.mjs`)