# Portfolio Rebuild — Research, Content & Cursor Build Spec

*Compiled Tuesday, October 27, 2026. This replaces the earlier ChatGPT research doc: every technical claim below has been checked against current sources, the structure has been cut down to match what is actually working in 2026, the copy is written to be used as-is or lightly edited, and it ends with a single master prompt for Cursor.*

## 1. What I checked, and what changed from the original brief

The earlier document was broadly right in spirit but a few things were dated or needed sharper framing:

- **Create React App is past maintenance mode, not just “on its way out.”** React officially deprecated CRA on February 14, 2025. It has had no active maintainer since, and by 2026 almost nobody starts new projects on it. It still builds, so you do not have to migrate before this redesign — but I would put a Vite migration into Pass 1 rather than treat it as optional later. It is a mechanical swap: replace `react-scripts` with `vite` and `@vitejs/plugin-react`, move `public/index.html` to the project root as `index.html` with a `<script type="module" src="/src/index.js">` tag, rename any `REACT_APP_*` environment variables to `VITE_*`, and update the three npm scripts. Doing this first means you are not adding six new animated sections on top of a toolchain that gets slower every time you touch it.
- **“Framer Motion” is now called Motion.** The project went independent in 2025 and renamed itself; the npm package is now `motion`, imported from `motion/react`, and the old `framer-motion` package is kept only as a compatibility alias that still works. You are on `framer-motion@12.6.5`, which is recent enough to keep as-is for this redesign. If you touch the dependency at all, install `motion` directly — same API, same team, just the current name.
- **GSAP is no longer a reason to avoid it.** Since Webflow acquired GreenSock, GSAP and every plugin that used to be paid (ScrollTrigger, SplitText, MorphSVG, DrawSVG) became 100% free in April 2025, commercial use included. The old caution about GSAP being “the paid award-site library” has no licensing basis anymore — the only real question is whether you need timeline-level choreography beyond what Motion already gives you (see §5).
- **React Flow’s package was renamed to `@xyflow/react`.** Same team, same MIT license, major version 12+. If you build the interactive system explorer later, install `@xyflow/react`, not the old `reactflow` package name.
- **A 10-section portfolio is not what is landing with recruiters in 2026.** Current portfolio surveys and rankings agree on one pattern: fewer sections with real depth beats many shallow ones, near-black surfaces (not pure #000) read as more deliberate than pure black, and restrained motion beats constant animation. Sites with 8–10 thin sections read as template output; the ones people actually remember have 4–6 sections where two or three carry real weight. I have restructured around that below — all the content from the original brief is kept, just consolidated.
- **Lime-on-dark is not a risky palette — it is current.** Several well-regarded 2026 developer portfolios use exactly this combination (near-black surface, one acid accent). I kept your tokens from the original brief; the thing that was missing was texture and restraint in how it is used, not the palette itself (§4 covers this).

## 2. The direction: treat the portfolio itself as a shipped product

Instead of another “hero / skills grid / project cards” site, or the generic “Digital Engineering Studio” board-of-vision-words approach, build the site around one honest conceptual hook: **this portfolio is itself a versioned release.** You build SaaS products and document-processing pipelines for a living — so the site that presents that work should read like something you shipped, not a résumé with animations bolted on.

Concretely, this means:

- A small monospace version badge in the nav — `v2026.4` — that you bump when you meaningfully update the site. It is a tiny, honest detail that signals you think about versioning as a habit, not a gimmick.
- Section labels and metadata rendered in a technical, monospace register (timestamps, status tags, file-size-style counters) sitting *inside* an otherwise large-type, editorial layout — the restraint is what keeps this from reading as a novelty “terminal portfolio” theme. Terminal/IDE-aesthetic developer portfolios are, per current rankings, one of the strongest-performing styles with technical recruiters this year, precisely because they signal fluency rather than decoration.
- One real interactive centerpiece instead of three decorative ones: a **Live Request Console** (full spec in §3.2) — a small embedded console where a visitor clicks a preset “request” and watches a realistic, mocked JSON response type in. It is explicitly client-side and fake, never implying a live backend, but it is a far more specific, on-brand signature element than a generic animated network illustration, because it directly dramatizes what you actually do: take messy input, run it through a pipeline, return structured output.

This direction keeps everything useful from the original brief’s “Direction A + Direction C” idea (editorial type, dark near-black surface, restrained systems-engineering motifs) but gives it one coherent idea to hang together, instead of three separate inspiration boards.

## 3. Information architecture: 7 sections, not 10

The original 10-section outline is kept in spirit but merged into 7 sections with real depth, matching what is actually working this year. Nothing from the original content list is dropped — Selected Work and Project Deep Dives merge into one expandable Work section; Capabilities and the Technical Playground merge into one section where the capability claims and the interactive proof sit side by side; Career Timeline and Learning Lab merge into one reverse-chronological “Journey” feed that treats professional roles and personal experiments as entries in the same log; About and Contact close the site together.

| # | Section | Replaces (original brief) |
| --- | --- | --- |
| 00 | Nav & identity | Navigation & identity |
| 01 | Hero | Hero |
| 02 | Services | New — what I offer, incl. the Aqra Labs partnership |
| 03 | Work (featured projects → full case studies) | Selected work + Project deep dives |
| 04 | How I build (capabilities + live playground) | Engineering capabilities + Technical playground |
| 05 | Journey (career + experiments, one timeline) | Career timeline + Learning & experiments |
| 06 | About & contact | About me + Contact & footer |

*Added after your note below: section 02, Services — since you also want this site to pull in freelance/agency-style client work alongside job applications. Work, How I Build, Journey, and About & Contact are renumbered 03–06 accordingly.*

The next section gives section-by-section UI direction and ready-to-use copy for each of these.

## 4. Section-by-section design and copy

### 4.0 — Nav & identity

**UI.** A fixed top bar, roughly 72px tall, that picks up a blurred near-black background only once the page has scrolled past the hero, with a single 1px hairline (10% opacity warm white) underneath — not a bar that is opaque from pixel zero. Left: your wordmark in Space Grotesk with slightly open letter-tracking. Right of center: four plain text links, each with a thin underline that fills in from the left on hover or focus (a `scaleX` transform over \~160ms, not a color change — color changes are invisible to anyone using Windows high-contrast mode). Far right: a small monospace version pill (`v2026.4`) next to a status dot and label wired to one real boolean you keep honest — never a fabricated “live” availability indicator. On mobile, collapse directly to a full-height overlay menu, not a dropdown.

Copy:

- Wordmark: `FAIZAN SAFWAN`
- Links: `Work` · `How I build` · `Journey` · `Contact`
- Status chip: `● Open to roles` or `● Heads-down, but say hi` — whichever is actually true today

### 4.1 — Hero

**UI.** Two columns on desktop (roughly 56/44), stacked on mobile. Left: a small monospace eyebrow label, your name set huge (`clamp(48px, 8vw, 104px)`, Space Grotesk, tight leading), a two-line positioning statement in Inter at 20–22px, then a filled lime primary button and a ghost-bordered secondary button side by side. Right: a compact terminal card, 280–360px wide — a small, fast-loading preview of the Live Request Console (full version lives in §4.3), so the first thing a visitor sees is something that behaves like your actual work rather than a decorative illustration. Make the first project link reachable without waiting for any animation to finish; a typed-text effect should be purely cosmetic and skip straight to the final state under `prefers-reduced-motion`.

Hero terminal card content:

```
faizan@safwan:~$ whoami
> Software engineer. Full-stack + applied AI.
> Based in Mawanella, Sri Lanka. Open to remote roles.
```

Below it, three small tags with no numbers attached to them: `SaaS` `Document processing` `LLM workflows`.

Hero copy:

> SOFTWARE ENGINEER — FULL-STACK & APPLIED AI
>
> # Faizan Safwan
>
> I build the systems behind the product — APIs, data pipelines, and the AI workflows that turn messy input into something useful.
>
> Most of my work sits at the layer people don’t see: parsing documents, modelling data, wiring services together, and making sure all of it holds up once real users touch it. Lately that includes figuring out where LLMs genuinely help, and where they just add latency.

Buttons: `View the work →` · `Email me`

Small print under the buttons: `Mawanella, Sri Lanka · usually replies within a day`

### 4.2 — Services

**UI.** A new section between Hero and Work, since this site now also reads as a light service offering for freelance/agency-style client work, not only a job-search portfolio. Five compact tiles in a 3-column grid (wrapping to 2, then 1 on mobile): a Lucide icon, a title, one plain sentence, 2–3 bullet deliverables, and a small tag reading either `Solo` or `With Aqra Labs`. Reuse the same card shell as the capability tiles in §4.4 so the section doesn't introduce a fourth visual language. Close with one line and a single CTA pointing at the same contact block in §4.6 — one place to actually reach you, not two competing forms.

> Alongside full-time engineering work, I take on a limited number of client projects — solo for websites and SaaS builds, and through my partnership with [Aqra Labs](https://aqralabs.com), a Sri Lanka–based software and digital-marketing studio, for mobile apps, SEO, and Google Business Profile setup. One point of contact either way.

**Websites & web applications** — `Solo` Marketing sites, dashboards, and internal tools built on React — responsive, fast, and designed around your actual content rather than a template.

- Custom design, not a theme
- Built on your real content and data
- Deployed and documented

**SaaS web applications** — `Solo` Full products, not just pages: user accounts, data models, and the backend logic a real product needs to run day to day. [Unitel Connect](https://unitelpos.vercel.app), a live retail ERP/POS product, is the clearest example of this in the Work section below.

- API and database design
- Role-based access where it matters
- Built to add features without a rewrite

**Mobile applications** — `With Aqra Labs` Native iOS and Android apps that stay in sync with your existing web product and data, delivered through my partnership with Aqra Labs.

- Native iOS & Android
- Synced to your existing backend
- One team accountable for web and mobile together

**SEO optimization** — `With Aqra Labs` Technical and content SEO grounded in how your site is actually built, not a generic checklist, delivered through Aqra Labs.

- Technical audit and fixes
- On-page and content strategy
- Built to compound, not spike for a month and fade

**Google Business Profile setup** — `With Aqra Labs` A claimed, verified, and fully completed Google Business Profile, so local searches and Google Maps actually find your business.

- Profile claim and verification
- Categories, hours, photos, and services filled in properly
- Guidance on keeping it current after handover

Under the tiles: `In partnership with Aqra Labs — aqralabs.com ↗`

CTA line: `Have a project in mind? Get in touch →` (anchors down to §4.6).

### 4.3 — Work

**UI.** Replace the usual three-card grid with a vertical stack of full-width rows, each one a “release.” Within a row, a sticky left panel (\~38% width) carries the name, one-line pitch, tags, and links; the right \~62% holds the real screenshot(s) in a simple horizontal scroll-snap strip — no autoplaying carousel. Number each row with the version motif (`v1`, `v2`…) instead of a generic index. Clicking “Read the case study” expands an inline panel directly under that row (`AnimatePresence` + a `layout` animation), so the visitor never leaves the page to read it. This keeps the strongest section of the site doing the most work, as the original brief intended, while fitting the 2026 pattern of fewer, deeper sections rather than many thin cards.

Every project card needs: name + category, a one-sentence problem-oriented pitch, 3–5 tech tags (not a logo wall), your actual contribution, and a case-study link. Treat the bracketed placeholders below as exactly that — fill them with what you can stand behind; an honest placeholder beats an invented claim.

**v1 — CVeezi** · SaaS · Applied AI · Document processing An AI-assisted career toolkit that turns a messy résumé into a structured, editable profile, then uses that structure to power writing help and ATS-style feedback. Tags: `React` `Node.js` `LLM APIs` `Structured extraction` My contribution: *\[fill in — e.g. “built the résumé-parsing pipeline and the editor UI”\]*

**v2 — Unitel POS / Unitel Connect** · ERP/POS · Retail operations A retail ERP/POS platform connecting checkout, inventory, customer credit, returns, payments, and reporting for shops and growing retail teams. The public product site uses the Unitel Connect name. Tags: `React` `Node.js` `PostgreSQL` `Role-based access` Live: [unitelpos.vercel.app](https://unitelpos.vercel.app) My contribution: *\[fill in\]*

**v3 — EvalzNow** · Data · Analytics · Access control A candidate-assessment platform: structured evaluation workflows, behavioral assessment scoring, and analytics dashboards reviewers actually use, gated by role. Tags: `React` `SQL` `Data visualization` `RBAC` My contribution: *\[fill in\]*

**v4 — Tric Forecast** · Data visualization · Energy *(concept)* A forecasting-comparison dashboard lining up predicted versus actual UK wind generation over time, built to explore how forecast error should inform procurement decisions. Label this one honestly as a concept/demo rather than a deployed product — it still demonstrates real data-engineering judgment. Tags: `Data engineering` `Time-series alignment` `Charting` My contribution: *\[fill in\]*

**Case study template** (used for each expanded panel):

1. **The problem** — one paragraph, specific, no adjectives doing the work that facts should.
2. **My approach** — what you actually decided to build and why, in plain language.
3. **How it works** — a short numbered pipeline (e.g. Upload → extraction → structured JSON + validation → editable data → downstream feature).
4. **Engineering decisions** — the real trade-off you made and what you gave up to make it (this is the paragraph that actually convinces a technical reader; don’t skip it for a cleaner-looking card).
5. **What I’d improve** — one or two honest next steps. A fabricated metric is never a substitute for this paragraph — a clear decision, stated plainly, reads as more credible than an invented number.

### 4.4 — How I build (capabilities + the Live Request Console)

**UI, capabilities.** Skip the 2×2 bento grid — it is common enough now to read as templated. Use a single horizontal row of four compact tiles on desktop (stacked on mobile), each with a monospace index (`01`–04\`), a short label, one sentence, and 3–4 tags, connected by a thin horizontal line that reads like a pipeline rather than a grid of boxes.

`01` **Product engineering** — End-to-end web apps: interfaces wired to APIs, data models, and the business logic that actually makes a feature work. — `React` `TypeScript` `Node.js` `REST`

`02` **Backend & data** — Schemas, migrations, authentication, and the integrations that keep a system’s data trustworthy. — `PostgreSQL` `MongoDB` `Redis` `SQL`

`03` **Applied AI** — Practical LLM workflows: structured outputs, document understanding, and knowing when a model is the right tool and when it isn’t. — `Python` `LLM APIs` `LangChain`

`04` **Shipping** — Reading requirements, making trade-offs explicit, and using AI-assisted tooling without losing track of what the code actually does. — `Git` `Testing` `Cursor / Copilot` `CI`

**The Live Request Console — the signature piece.** Below the capability row, a single terminal-styled card: a left rail of 3–4 preset “requests” styled as commands, and a main pane that types out a realistic, pre-written request/response pair when one is clicked.

Preset commands:

- `POST /resume/parse`
- `GET /pos/inventory/low-stock`
- `GET /assessment/score`
- `GET /forecast/variance`

For each, after the mocked JSON finishes typing, show one plain-English line naming the real engineering decision it represents — for example, under `/resume/parse`: *“Real challenge: résumés don’t share a layout, so parsing has to separate ‘this is definitely a job title’ from ‘this might be one’ and flag the difference instead of guessing.”*

Under the card, a small honest caption: *“A simulated console, not a live backend — it mirrors the shape of requests from the real projects below.”* That line matters: it keeps the piece a design element rather than an implied claim about live infrastructure.

Build it with plain React state and Motion’s stagger/`AnimatePresence` for the typing reveal — no network calls, no dependency beyond what you already have. Store the four mock request/response pairs as a small JSON data file so adding a fifth command later is a data change, not a component change. Respect `prefers-reduced-motion`: render the final text immediately instead of animating it in.

### 4.5 — Journey

**UI.** One vertical line (left-aligned on desktop, same on mobile), dot markers, strictly reverse-chronological. Instead of two separate “Career” and “Learning” lists, interleave professional roles and personal experiments in a single feed, each entry tagged `ROLE` (solid dot) or `EXPERIMENT` (hollow dot). A reader scanning top to bottom sees the real overlap between your paid work and what you study on your own time — a more convincing growth story than two lists that never touch.

`EXPERIMENT` **Learning lab — Structured outputs for résumé parsing** *(ongoing)* Testing how far an LLM can be pushed into returning a validated JSON schema instead of free text, and what fails when a résumé breaks the expected shape.

`ROLE` **Jul 2026 — Present · Associate Software Engineer, X4 Digital Labs** Full-stack product work on SaaS features, document-processing workflows, and AI-integrated application features. *\[Expand with 2–3 specific contributions you can stand behind.\]*

`EXPERIMENT` **LangChain — Job-to-résumé matching workflow** Comparing a résumé against a job description and generating structured, traceable feedback instead of a single pass/fail score.

`ROLE` **Jul 2025 — May 2026 · Associate Full Stack Developer, Metro Coding** Contributed to EvalzNow: assessment workflows, analytics dashboards, and the backend functionality behind them. *\[Expand placeholder\]*

`EXPERIMENT` **Data engineering — Forecast vs. actual: renewable generation** Explored aligning and visualizing UK wind-generation forecasts against actual output to see what the discrepancy pattern looks like over time.

`ROLE` **Jun 2024 — Jan 2025 · Full-Stack Engineering Intern, SKYREK** Full-stack e-commerce features: product management, inventory workflows, front-end/back-end integration. *\[Expand placeholder\]*

Check every date and title against your current CV before publishing — these are carried over unchanged from the original brief and I have not verified them against a source document.

### 4.6 — About & contact

**UI.** One closing section, two halves side by side (stacked on mobile). Left: a short, specific personal paragraph and a real photograph if you have one — not a stock illustration. Right: a stacked contact block, not a form. A confident, direct “email me” converts better than a contact form on a portfolio this size, and the original brief was right to avoid one.

**About copy:**

I like problems that are more complicated than they first look. Most of my work has been in SaaS products and document-heavy workflows — places where the real difficulty isn’t the framework, it’s the edge cases: the résumé that doesn’t follow a normal layout, the inventory count that doesn’t reconcile, the assessment score that needs to be explainable, not just computed.

I’m currently spending a lot of my own time on LLMs and LangChain — specifically on the gap between “the model did something impressive in a demo” and “the output is reliable enough to ship.” That gap is where most of the actually interesting engineering work lives right now.

*\[Add one real, specific detail outside of work — a hobby, a habit, anything concrete. One true specific detail does more for how memorable this section is than any number of adjectives.\]*

**Contact copy:**

**Let’s talk.** Open to full-stack, backend, or applied-AI roles where the problems are real and the team cares about getting the details right.

`Email me ↗` · `GitHub ↗` · `LinkedIn ↗` · `Download résumé ↓`

Mawanella, Sri Lanka · usually replies within a day

Footer line: `© 2026 Faizan Safwan · Built with React, Vite, and Motion · v2026.4`

## 5. Design tokens

Kept close to the original brief’s palette — it is a genuinely current combination, not a risk — with a near-black adjustment and a fuller scale added.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#121310` | Page background (near-black, not pure `#000` — reads as more deliberate) |
| `--surface` | `#181A16` | Cards, the console, the nav once scrolled |
| `--text` | `#F5F5F0` | Primary text |
| `--text-muted` | `#A6A99E` | Secondary text, captions, metadata |
| `--accent` | `#C4F56A` | One accent only — primary buttons, the status dot, link underlines, code highlights |
| `--border` | `#2A2D26` | Hairlines, card borders (1px, never a drop shadow doing the same job) |
| `--radius` | `6px` | Cards and buttons — small and consistent, not the 16–24px “soft SaaS” radius that reads as templated |
| `--font-display` | Space Grotesk | Headlines, nav wordmark, section numbers |
| `--font-body` | Inter | Body copy, buttons, captions |
| `--font-mono` | JetBrains Mono or IBM Plex Mono | Terminal card, tags, version badge, timestamps — this is what carries the “versioned release” motif, so pick one and use it only for this register |
| `--space-unit` | `8px` | Base spacing unit; use multiples of it everywhere rather than arbitrary pixel values |
| `--max-width` | `1280px` | Content max-width |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Standard easing for reveals and hovers |
| `--duration-fast` | `160ms` | Hover/press states |
| `--duration-base` | `320ms` | Section reveals, card expansions |

**Layout rules:** generous vertical rhythm between the 6 sections (at least 96–128px on desktop); large headlines with intentional line breaks rather than letting them wrap wherever the viewport ends; thin borders and restrained shadow instead of glow; one accent color used sparingly enough that it still reads as a signal, not wallpaper.

## 6. Verified tech stack & libraries

Every version below was checked against its package registry or official source as of October 27, 2026 — use this table instead of the original brief’s version numbers.

| Tool | Current status (Oct 2026) | Use it for | Notes |
| --- | --- | --- | --- |
| **Vite** + `@vitejs/plugin-react` | Standard React build tool; CRA has had no active maintainer since its Feb 2025 deprecation | Replacing `react-scripts` | Do this in Pass 1, before adding new sections (see §8) |
| **Motion** (`npm i motion`, import from `motion/react`) | Renamed from Framer Motion in 2025; MIT licensed; v12.x/14.x lines both current | Section reveals, hover/press states, the console’s typing reveal, project-card transitions | You already have `framer-motion@12.6.5` — fine to keep as-is; install `motion` only if you touch the dependency anyway |
| **GSAP** + `@gsap/react` | 100% free since April 2025, Webflow-backed, all plugins included (ScrollTrigger, SplitText, etc.) | Optional — only if you want one advanced scroll-pinned sequence Motion can’t express cleanly | Don’t add it just because award sites use it; you already have Motion, and running two animation engines side by side is the thing the original brief correctly warned against |
| **Lucide** (`lucide-react`) | Actively maintained, lightweight outline icon set | Nav, external-link icons, tags, timeline markers | Consider replacing Font Awesome gradually for one consistent icon language; you don’t need both |
| **`@xyflow/react`** (React Flow, renamed) | MIT licensed, v12+, actively maintained | Only if the interactive capabilities/playground section grows past what static SVG can do | Start with hand-built SVG + React first; the package name changed from `reactflow` — use `@xyflow/react` if you do reach for it |
| **React Bits** | Component source you copy in, not an npm dependency | One distinctive text treatment or background effect, used once | Copy the source, adapt it to the tokens above — don’t install it wholesale |
| Three.js / React Three Fiber | Mature, but adds real rendering and performance cost | Skip for v1 | A lightweight SVG network illustration or the terminal card does the same identity work for far less risk to load time and battery life |

For the console and capability tiles specifically, you need nothing beyond React state, Motion, and a small JSON data file — resist the urge to add a dependency for something this contained.

## 7. Accessibility, performance, reliability

- Respect `prefers-reduced-motion` everywhere — the typing effect, section reveals, and any hover movement should snap to their end state rather than animate for anyone who has this set.
- No information lives only in a hover state or only inside a completed animation; everything essential renders in static HTML first.
- Explicit image dimensions, lazy-loaded below the fold, served as WebP/AVIF, to avoid layout shift.
- Animate `transform` and `opacity` only, not layout-triggering properties like `width`, `top`, or `margin`.
- Keyboard-reachable nav, visible focus states (not just a color change — an outline or ring), descriptive link text (“Read the CVeezi case study,” not “click here”), alt text on every project image.
- No custom cursor replacing the system cursor, no scroll-hijacking, no preloader that delays the first usable content, no auto-playing carousels.
- Test every link — email, GitHub, LinkedIn, résumé download — before publishing, and never fabricate an availability status, a metric, or a live-system claim anywhere on the site, including inside the console’s captions.
- Preserve the existing `homepage` field and GitHub Pages base path through the Vite migration; test a hard refresh on a nested route (if you add one) before calling the migration done, since GitHub Pages serves static files and a client-side route refresh is a common breakage point.

## 8. Implementation order

Three passes, not the original brief’s four — the Vite migration is folded into Pass 1 since it is foundational, not a separate later decision.

**Pass 1 — Foundation.** Audit the existing repo and preserve working functionality and correct personal info. Migrate off `react-scripts` to Vite. Set up the design tokens, typography, and layout rules from §5. Build the nav and hero. Confirm the production build runs and GitHub Pages deployment still works end to end.

**Pass 2 — Content & signature feature.** Build the Services section (including the Aqra Labs partnership and Google Business Profile setup), the Work section with real project rows and expandable case studies, the How I Build section including the Live Request Console, and the Journey feed. Write and proofread all copy against §4, filling every bracketed placeholder with something true.

**Pass 3 — Polish & deploy.** About & contact section. Full pass against §7 (accessibility, performance, reliability). Test on an actual phone on a slow connection, not just desktop dev tools. Verify every link, the résumé download, and the deployed GitHub Pages URL — including a direct load and a hard refresh — before calling it done.

## 9. The master prompt for Cursor

Paste the block below into Cursor from the root of your existing portfolio repo. It references this document by section number, so keep this doc open (or export it to Markdown and drop it in the repo as `PORTFOLIO_SPEC.md`) while Cursor works, and paste in the real copy from §4 as you go rather than asking Cursor to invent it.

```markdown
# Portfolio redesign — implementation prompt

Act as a senior product designer and creative frontend engineer. Redesign my existing personal portfolio — this is a redesign of the current repository, not a new project. A companion document, PORTFOLIO_SPEC.md, sits in the repo root with the full content, copy, and design tokens for every section; treat it as the source of truth for text and section order, and this prompt as the source of truth for technical execution.

## 1. Inspect before changing anything
Read package.json, the entry point, routing, components, styles, assets, and the GitHub Pages deploy config (gh-pages, the `homepage` field). List what already exists — pages, project content, links, interactions — before writing new code. Do not delete working functionality, do not invent project details or metrics that are not in PORTFOLIO_SPEC.md. Give me a short implementation plan, then proceed — do not stop after the plan.

## 2. Pass 1: migrate the build tool first
react-scripts 5.0.1 / Create React App has had no active maintainer since its February 2025 deprecation. Before building new sections, migrate the build tool to Vite:
- Install `vite` and `@vitejs/plugin-react`; remove `react-scripts`.
- Move `public/index.html` to the project root as `index.html`, add `<script type="module" src="/src/index.js"></script>`, and point any favicon/manifest paths at `/public`.
- Rename any `REACT_APP_*` environment variables to `VITE_*` and update their references.
- Replace the npm scripts: `start` → `vite`, `build` → `vite build`, add `preview` → `vite preview`.
- Preserve the `homepage` field’s base path in `vite.config.js` (`base: "/my-personal-portfolio/"`) so `gh-pages -d dist` (note: Vite’s output folder is `dist`, not `build` — update `predeploy`/`deploy` accordingly) keeps working.
- Confirm `npm run build && npm run preview` works, and that the existing site still deploys correctly, before touching any component.

## 3. Existing dependencies to keep
- React 18, `framer-motion@12.6.5` (fine as-is; if you touch it, install `motion` and import from `motion/react` instead — same API, current package name).
- Font Awesome is already installed; you may introduce `lucide-react` for new icons and migrate old ones gradually, but don’t run a one-shot mass replace that risks breaking existing icon usage.
- Do not introduce TypeScript, Next.js, Tailwind, or a second animation library (GSAP) unless a specific interaction genuinely needs it and you've confirmed Motion can't express it — justify the addition in your plan before installing it.

## 4. Information architecture (7 sections — see PORTFOLIO_SPEC.md §3–§4 for full UI + copy)
1. Nav & identity — version badge, status dot, and clear section links.
2. Hero — oversized name, positioning statement, compact terminal-card preview of the request console.
3. Services — five service cards covering websites/web applications, SaaS web applications, mobile applications, SEO optimization, and Google Business Profile setup.
4. Work — vertical stack of project “releases,” each expandable inline into a full case study. No separate case-study pages for v1.
5. How I build — four capability tiles in a connected row, plus the Live Request Console.
6. Journey — one reverse-chronological timeline interleaving professional roles and personal experiments, tagged ROLE / EXPERIMENT.
7. About & contact — closing section, direct contact block, no form.

## 5. Services section requirements
Build the Services section directly after the Hero and before Work. This section is important because the portfolio must support both engineering job applications and inbound client enquiries.

Include exactly these five service cards, using the copy and partnership labels in PORTFOLIO_SPEC.md §4.2:
- Websites & web applications — Solo.
- SaaS web applications — Solo.
- Mobile applications — With Aqra Labs.
- SEO optimization — With Aqra Labs.
- Google Business Profile setup — With Aqra Labs.

The Google Business Profile offer is a service requested by me; do not imply that it is listed on Aqra Labs' public website unless verified. Link the partnership label to https://aqralabs.com/ and identify Aqra Labs as a partner, not as a company I own. Keep service descriptions clear and practical, with deliverables rather than unsupported guarantees.

Include a visible partnership line linking to Aqra Labs and one CTA that anchors to the shared contact section. Do not create a second competing contact form.

Use Unitel POS / Unitel Connect at https://unitelpos.vercel.app as a relevant ERP/POS product example in the SaaS service card and Work section. Describe it as an ERP/POS platform, not merely a marketing website.

## 6. The signature feature: Live Request Console
Build a terminal-styled card: a left rail of 3–4 preset command buttons, a main pane that types out a pre-written mock request/response pair when one is clicked, and a one-line plain-English explanation of the real engineering decision each command represents. Store the mock pairs in a small JSON/JS data file. No network calls — this is explicitly a simulated console, and must say so in a visible caption. Build the typing reveal with Motion; skip straight to the final text under `prefers-reduced-motion`.

## 7. Design tokens
Use the exact tokens in PORTFOLIO_SPEC.md §5 (colors, type, radius, spacing, easing) as CSS custom properties on `:root`. One accent color only. Near-black background, not pure black. 6px radius, not a large soft radius.

## 8. Content rules
- Pull every section’s copy from PORTFOLIO_SPEC.md §4. Where that document has a bracketed placeholder, leave a clearly marked TODO in the code and in your summary — do not invent a replacement.
- Never fabricate metrics, user counts, revenue, testimonials, or claims that a demo project is a deployed production system.
- Keep project data, timeline entries, and capability tiles in a structured data file (e.g. `src/data/projects.js`, `src/data/timeline.js`), not hand-duplicated JSX.

## 9. Accessibility & performance (see PORTFOLIO_SPEC.md §7 for the full list)
Respect `prefers-reduced-motion`; keyboard-reachable nav with visible focus states; alt text on every project image; explicit image dimensions with lazy-loading below the fold; animate only `transform`/`opacity`; no scroll-hijacking, custom cursor, or blocking preloader.

## 10. Validation (do this before telling me it's done)
- Run the production build; fix any compile or lint errors you introduced.
- Check the browser console for errors on every section.
- Test keyboard navigation and the mobile menu.
- Toggle `prefers-reduced-motion` in devtools and confirm all content is still fully readable.
- Verify the GitHub Pages base path survives a hard refresh on the deployed URL.
- Summarize: what changed, what dependencies were added or removed, which TODO placeholders are still open, and how to redeploy.

Do not stop at a design proposal or code snippets — implement the redesign in this repository and validate it before reporting back.
```

---

*End of spec. Export this doc to Markdown (or PDF) whenever you want a static copy to drop in the repo alongside the prompt above.*
