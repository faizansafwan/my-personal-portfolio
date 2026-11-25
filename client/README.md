# Faizan Safwan — Portfolio

Personal portfolio of Faizan Safwan, full-stack software engineer (SaaS & applied AI) and co-founder of Aqra Labs.

**Live:** https://faizansafwan.github.io/my-personal-portfolio/

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
- `public/` — favicon set, OG image, manifest, robots.txt, sitemap.xml, résumé PDF

## Updating content

Edit the files in `src/data/`. To show a real screenshot on a project row, add an `image` field
(`{ src, alt, width, height }`) to that project in `src/data/projects.js`; otherwise the row shows its
release pipeline. Bump `SITE_VERSION` in `src/data/site.js` and `lastmod` in `public/sitemap.xml` when you
publish a meaningful update.
