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

Videos are grouped by **project** (one brief), and each project has one or more **cuts** (the formats it shipped in).
Keep the full-size masters outside the project (e.g. `D:\Portfolio\_media\`): everything in `public/` is deployed.

1. **Web file** for each cut: MP4 (H.264), max 1080p, under 8 MB, at `public/motion/videos/<cut-id>.mp4`.
   `ffmpeg -i master.mp4 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart <cut-id>.mp4`
   (add `-vf scale=720:1280` for a 9:16 reel).
2. **Hover preview**: 6 s, silent, under 100 KB, at `public/motion/videos/<cut-id>-preview.mp4`.
   `ffmpeg -ss 16 -t 6 -i master.mp4 -vf "scale=640:-2,fps=24" -an -c:v libx264 -crf 30 -pix_fmt yuv420p -movflags +faststart <cut-id>-preview.mp4`
3. **Poster**: WebP under 150 KB at `public/motion/posters/<cut-id>.webp`.
   `ffmpeg -ss 21 -i master.mp4 -frames:v 1 -vf scale=1280:-2 -c:v libwebp -quality 80 <cut-id>.webp`
4. Optional captions: `public/motion/captions/<cut-id>.vtt`.
5. Add the project to `motionProjects` in `src/data/motion.js`:

```js
{
  id: 'aqra-pos-launch',
  title: 'Aqra POS launch promo',
  category: 'App promo',                    // 'App promo' | 'Explainer' | 'Social ad' | 'Logo'
  owner: { kind: 'own', name: 'Aqra Labs', note: 'my company' },  // kind: 'client' | 'own' | 'concept'
  summary: 'What it is for and what it shows.',
  languages: ['English (on-screen text)'],
  tools: [],                                // optional: only tools really used
  link: { label: 'See Aqra POS', href: 'https://aqralabs.com/products/aqra-pos/' },  // optional
  uploadDate: '2026-11-19',
  cuts: [
    {
      id: 'aqra-pos-launch-16x9',
      label: 'Main film',                   // 'Main film' | 'Social reel' | 'Square post' …
      aspect: '16:9',                       // '16:9' | '9:16' | '1:1'
      seconds: 63,
      width: 1920,
      height: 1080,
      src: 'motion/videos/aqra-pos-launch-16x9.mp4',   // or null with embedUrl
      preview: 'motion/videos/aqra-pos-launch-16x9-preview.mp4',
      poster: 'motion/posters/aqra-pos-launch-16x9.webp',
      captions: null,                       // or 'motion/captions/aqra-pos-launch-16x9.vtt'
    },
  ],
}
```

The project blocks, format filter, lightbox (with a switch between a project's cuts), hero stat, section-switcher
count and the page's `VideoObject` JSON-LD all update from that data. Run `npm run build` and redeploy.

## Adding a Lottie animation

Drop the JSON (and optional `.lottie`) into `public/lottie/<set>/`, then add an entry to that set's item list in
`src/data/motion.js` (title, use case, one-line detail, phone-screen copy). Sets live in `lottieCollections`; the
first one is featured (inspector default, hero reel, home teaser). Frames, fps, canvas, layers and file size are read from the JSON itself.
