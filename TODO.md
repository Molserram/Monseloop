# Pending edits (queued 2026-07-26) — executed 2026-07-26

Backlog from user review after the EN/ES + mobile nav session. All items below have been implemented and verified in-browser (desktop, tablet, mobile, both languages, no console errors) unless flagged otherwise.

## Typography
- [x] Apply `text-wrap: balance` (headings) and `text-wrap: pretty` (body copy) wherever relevant across all 5 pages.
- [x] Hero H1 (index.html): reduced font-size (`clamp(2.6rem, 5.6vw, 5.6rem)`) and widened max-width (22ch) so the Spanish version wraps to exactly 3 lines. English version now wraps to 3 lines too (was already short).
- [x] More Work subtitle — added a `.more-work-head` max-width override (38ch) so both EN and ES fit 2 lines. Copy text itself was already correct, only needed the width fix.

## Decorative SVGs on case-study hero sections
- [x] `tomorrow-problem.html` → real `star_vector.svg` path inlined, positioned top-right per Figma (bleeds top+right edge).
- [x] `growth-process.html` → real `system_vector.svg` path inlined, positioned top-right per Figma.
- [x] `template-evolution.html` → real `spiral_vector.svg` path inlined, positioned right side per Figma.
- [x] Positioned using the 4 Figma hero screenshots as reference (not just old inset:0 treatment).
- [x] Confirmed z-index stays behind text on all 3 (svg z-index:0, .cs-hero-inner z-index:1) and shapes never overlap copy at desktop/tablet/mobile.
- [x] **Scroll-trace animation: yes, feasible, implemented.** All 3 source SVGs are single `<path>` elements, so the existing `.draw-path` `getTotalLength()`/stroke-dashoffset technique works directly — no new animation code needed, just reused the existing mechanism with the real paths instead of the generated spirograph. **Load-time cost:** negligible for star_vector (438 bytes) and spiral_vector (5KB); system_vector is larger (16KB of inline path data) but still small next to the case study's images/videos — no measurable page-weight concern. Note: the heroes are above the fold, so the existing "trace on page load" trigger looks identical to "trace on scroll into view" — there's no below-the-fold scroll-trigger benefit to add here since the shape is already visible at load.

## Micro-interaction
- [x] Added a highlight-sweep animation (lime background bar animating in under the word) to "evolve" (EN) / "evolucionar" (ES) in the index.html hero H1. Re-triggers on every language switch.

## Locale-specific images (EN/ES image swap)
- [x] `index.html` — Growth Process homepage card: `case_study_2.webp` ↔ `case_study_2_es.webp` wired via `data-img-en`/`data-img-es` + extended `setLang()`.
- [x] `growth-process.html` Step 01 audit, Step 02 before (+mobile), Step 03 after (+mobile) all wired the same way.
- [x] Refreshed EN `visual_audit.webp` was already up to date on disk. **Regenerated `visual_after_mobile.webp` from the newer PNG export** — the webp had not been regenerated after the PNG re-export (confirmed via file timestamps), so I installed Pillow locally and re-encoded it. If that re-export changes anything about the image content, let me know so it can be swapped again.
- [x] `case_study_2_mobile.webp` and `business_evolution.webp` — confirmed these don't need a Spanish version. Staying English-only by design.

## Spanish copy fixes
- [x] Case study titles now translated on index.html work cards: "Growth Process Overhaul" → "Renovación del proceso de crecimiento", "Evolution of Templates" → "Evolución de plantillas" (matches the phrase already used in the "next case study" link). "Tomorrow Problem" left untranslated (never explicitly requested — confirm if you want an ES version).
- [x] `work-card h4` (More Work titles) translated to Spanish.
  - **"Vertical text on the right" — resolved, was a misunderstanding on my end.** Confirmed with the user this referred to the folio indicator (the rotated "01 / 05 — Hero" style tags), not the work-card title. That's covered under the folio translation work below.
- [x] Evolution of Templates — reworded the opening clause on index.html's homepage card to "De diseñar alta personalización para un usuario, ...". Confirmed correct.
- [x] Evolution of Templates case-study page — the H1 ("Evolution of Templates") was static/untranslated (unlike the other two case studies' hero titles). Tagged it `data-i18n` and added the ES translation "Evolución de plantillas".
- [x] Growth Process Step 03 (ES) body shortened/simplified.
- [x] `back_link` (ES) changed from "Volver al trabajo" to "Regresar a Trabajo" across all 3 case-study pages.

## Carousel behavior
- [x] Template Evolution "Fase 04 — Prompting con Claude" carousel now shows one image at a time (added a `.single` modifier forcing `flex:0 0 100%; width:100%` on those images only), matching "Fase 02 — Open Canvas".

## Responsive fix
- [x] Case-study `process_intro` paragraph now spans the full column width on mobile/tablet on all 3 case-study pages.
  - **Root cause found:** `.process-step` (and `.process-step.full` on growth-process.html) kept `grid-column: 1/13` at every breakpoint with no mobile/tablet override, while sibling elements like `.cs-body` did get one. Since `.process-step` requested a 13th grid line from a parent that only defines 4 (mobile) or 8 (tablet) explicit columns, the browser generated extra implicit columns, which corrupted the `1fr` distribution for the *entire* shared grid — shrinking `.cs-body` (and therefore `process_intro`) down to a fraction of the intended width. Fixed by giving `.process-step` (and `.process-step.full`) matching `grid-column: 1/9` (tablet) / `1/5` (mobile) overrides. This was a real layout bug, not just a missing style tweak.

## 2026-07-29 follow-ups
- [x] Real domain confirmed: **monmolina.com**. Updated `sitemap.xml`, `robots.txt`, and every page's `og:image`/`og:url`/`twitter:image`/canonical tag from the placeholder to the real absolute URL.
- [x] Case-study videos compressed (user-provided) — total size roughly halved (~31MB → ~16MB across the 5 clips). Committed.
- [x] `template-evolution.html` hero H1 was the one case-study title still untranslated — tagged it `data-i18n` and added "Evolución de plantillas".
- [ ] **Open question, not yet decided:** the EN/ES toggle is client-side JS on one URL, so Google only ever indexes the English version. Real fix requires separate crawlable pages per language (e.g. an `/es/` copy of each page with the Spanish text server-rendered, plus `hreflang` tags linking them). This is a meaningful chunk of new work — every future edit would need to happen in two places until the Webflow rebuild. Flagged to the user to decide whether it's worth doing now vs. accepting English-only indexing for this stopgap site.
- [ ] Folio indicator (`01 / 05 — Hero` style vertical tags) is only actually present on `index.html`. `about.html` and all 3 case-study pages have the CSS/JS wired but are missing the `<div class="folio">` markup itself, so it silently shows nothing there. Not yet fixed — flagged to the user.
