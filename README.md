# Monserrat Molina Ramirez — Portfolio

Editorial-style visual designer portfolio. Continuous-stroke mark system, Instrument Serif / Space Grotesk / IBM Plex Mono, 12/8/4-column grid.

## Structure

```
portfolio/
├── index.html                  Homepage — hero, selected work, more work (Behance), philosophy, contact
├── about.html                  About page
├── case-studies/
│   ├── tomorrow-problem.html
│   ├── growth-process.html
│   └── template-evolution.html
├── assets/
│   ├── style.css               Reference copy of the shared CSS (see note below)
│   ├── site.js                 Reference copy of the shared JS (see note below)
│   ├── imagotipo.svg           Logo source file
│   └── images/behance/         Real thumbnails for the More Work section
└── README.md
```

## Important: pages are currently self-contained

Every `.html` file has its CSS and JS **inlined** directly in `<style>`/`<script>` tags rather than
linking to `assets/style.css` / `assets/site.js`. This was a deliberate fix — external references
broke when previewed outside a real web server. `assets/style.css` and `assets/site.js` are kept as
**reference copies** (synced to match the inline versions) for whenever you're ready to extract them
back out for a proper build process. If you do extract them, update every page's `<head>`/`<body>` to
link instead of inline, and test with a local server (e.g. `npx serve`) rather than opening the file
directly — `file://` + external `<link>`/`<script>` references are exactly the setup that broke before.

## Content sync status (as of this export)

All page content was synced from the Figma file's current state at time of export:
- Nav: `Work · About · Contact` across every page (Philosophy/Experiments/Notes were dropped from nav
  and from the homepage entirely — Experiments was replaced by the Behance-linked "More work" grid)
- All Process sections rebuilt to match the current case study narratives in Figma
- About page content matches the Figma About page 1:1

## Known gaps / next steps

- **Case study diagrams are simplified.** The real Figma versions of some Process steps (Growth
  Process's website audit, before/after workflow diagrams, and business evolution timeline; Template
  Evolution's designer/style picker UI) contain custom, image-heavy diagrams that couldn't be exported
  automatically (Figma's asset-export network path isn't reachable from this environment in either
  direction — uploads or downloads). Those steps currently use simplified flat-color blocks / bullet
  lists with the same copy instead. To bring in the real visuals: in Figma, select each diagram frame →
  Export as PNG → send the files over, and they can be dropped into the corresponding `.step-visual` or
  `.findings` block in the HTML.
- **One Behance thumbnail is a placeholder.** `assets/images/behance/prezi_video.webp` was never
  uploaded (only 5 of the 6 original thumbnails made it to this environment) — the "Influencer
  Presentations for Prezi Video" card on the homepage still shows the `[ THUMBNAIL ]` text placeholder.
- **Cachito Mío has no Behance link.** That card renders as a plain (non-clickable) card since no URL
  was ever provided for it.
