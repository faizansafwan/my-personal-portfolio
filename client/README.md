# Faizan Safwan — Portfolio

Personal portfolio of Faizan Safwan, full-stack software engineer (SaaS & applied AI) and co-founder of Aqra Labs.

**Live:** https://faizansafwan.github.io/my-personal-portfolio/ · **Motion lab:** https://faizansafwan.github.io/my-personal-portfolio/motion/

## Stack

- React 18 + Vite 6
- Plain CSS with design tokens (`src/index.css`) — no animation library; motion is CSS + a small scroll hook
- `lucide-react` icons
- Build-time pre-rendering (`react-dom/server`) so crawlers and link previews get full HTML
- GitHub Pages via `gh-pages`

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Client build → SSR build → pre-render into `dist/index.html` |
| `npm run preview` | Serve the production build locally |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages |
| `npm run icons` | Regenerate favicon, app icons and `og-image.png` (needs Python + Pillow) |

## Where things live

- `src/data/` — all content: projects, timeline, services, skills, education, blog, console mocks, site links
- `src/components/` — one component + stylesheet per section
- `src/hooks/` — scroll reveal, in-view, active nav section, reduced-motion
- `scripts/` — pre-render step and icon generator
- `public/` — favicon set, OG images, manifest, robots.txt, sitemap.xml, résumé PDF
- `motion/index.html` + `src/motion-entry.js` + `src/pages/MotionPage.js` — the separate Motion page
- `src/components/motion/` — Lottie inspector (stage, timeline, rail, phone mockup, spec, embed), video grid + lightbox, process
- `public/lottie/` — the Lottie JSON files · `public/motion/` — reel, video files, posters, captions

## Updating content

Edit the files in `src/data/`. To show a real screenshot on a project row, add an `image` field
(`{ src, alt, width, height }`) to that project in `src/data/projects.js`; otherwise the row shows its
release pipeline. Bump `SITE_VERSION` in `src/data/site.js` and `lastmod` in `public/sitemap.xml` when you
publish a meaningful update.

## Pages

Two real HTML pages are built and pre-rendered (no client-side router, so GitHub Pages serves both directly):

| URL | HTML entry | React entry | Pre-render fn |
| --- | --- | --- | --- |
| `/my-personal-portfolio/` | `index.html` | `src/index.js` → `App` | `render()` |
| `/my-personal-portfolio/motion/` | `motion/index.html` | `src/motion-entry.js` → `MotionApp` | `renderMotion()` |

To add another page, copy that pattern: an HTML entry in `vite.config.js` → `build.rollupOptions.input`, an export in
`src/entry-server.js`, and a line in `PAGES` inside `scripts/prerender.js`.

## Adding a motion video

1. Export the video as **MP4 (H.264), max 1080p, under 8 MB**, and save it as `public/motion/videos/<id>.mp4`.
2. Save a poster frame as **WebP under 150 KB** at `public/motion/posters/<id>.webp`
   (e.g. `ffmpeg -ss 1 -i video.mp4 -frames:v 1 poster.png`, then convert to WebP).
3. Optional captions: `public/motion/captions/<id>.vtt`.
4. Add one object to `motionVideos` in `src/data/motion.js`:

```js
{
  id: 'aqra-pos-promo',
  title: 'Aqra POS — launch promo',
  client: null,                 // or 'Client name'
  concept: true,                // false for paid client work
  category: 'App promo',        // 'App promo' | 'Explainer' | 'Social ad' | 'Logo'
  aspect: '16:9',               // '16:9' | '9:16' | '1:1'
  seconds: 15,
  src: 'motion/videos/aqra-pos-promo.mp4',   // or null when using embedUrl
  embedUrl: null,               // e.g. 'https://www.youtube-nocookie.com/embed/VIDEO_ID'
  poster: 'motion/posters/aqra-pos-promo.webp',
  captions: null,               // or 'motion/captions/aqra-pos-promo.vtt'
  summary: 'One line on the idea and the result.',
  tools: ['After Effects', 'Lottie'],
  languages: ['English', 'Sinhala'],
  uploadDate: '2026-11-25',
}
```

The grid, filters, lightbox, hero stat ("N videos"), section-switcher count and the page's `VideoObject` JSON-LD
all update from that data. Run `npm run build` and redeploy.

## Adding a Lottie animation

Drop the JSON into `public/lottie/`, then add an entry to `lottieItems` in `src/data/motion.js` (title, use case,
one-line detail, phone-screen copy). Frames, fps, canvas, layers and file size are read from the JSON itself.
