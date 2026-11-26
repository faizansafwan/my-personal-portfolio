/**
 * Single source of truth for the Motion page (/motion/), in two parallel halves:
 *
 *   Lottie UI animations   lottieCollections → items        (flat list: lottieItems)
 *   Motion graphics videos motionProjects    → cuts         (flat list: motionVideos)
 *
 * Copy lives here; Lottie technical metadata (frames, fps, canvas, layers, size) is read
 * from each JSON at runtime so it can never drift from the real file.
 */

/* ------------------------------------------------------------------ Lottie UI animations */

/**
 * Lottie collections. The first one is featured: it opens in the inspector and fills the hero
 * reel and the home-page teaser. Item ids must be unique across collections (deep-link hashes).
 *
 * Collection fields: id, title, label, isNew (optional), concept, accent (switcher colour),
 *   strip (preview image, public/motion/collections/<id>.webp), summary, intro, sizeRange, items
 * Item fields: id, title, useCase, detail, file (JSON), dotLottie (optional), sizeKb, fps, seconds,
 *   loop, tags, screen (phone-mockup copy; bar = app-bar title; theme 'dark' = dark phone screen),
 *   flowFrom (optional id of the state
 *   that precedes it)
 */
const jellyItems = [
  {
    id: 'jelly-success',
    title: 'Success',
    useCase: 'Checkout & payment confirmation',
    detail:
      'The blob squashes, springs up and morphs into a jelly tick, lands with a wobble, then stars and confetti burst. Violet → lime.',
    file: 'lottie/jelly/success.json',
    dotLottie: 'lottie/jelly/success.lottie',
    sizeKb: 18.1,
    fps: 60,
    seconds: 2.5,
    loop: false,
    tags: ['checkout', 'success', 'morph'],
    screen: { title: 'Payment successful', line: 'Rs 4,500.00 · Order #A-2041', sub: 'Receipt sent to your email', cta: 'Done' },
    flowFrom: 'jelly-loading',
  },
  {
    id: 'jelly-loading',
    title: 'Loading',
    useCase: 'Processing & waiting screens',
    detail: 'The blob wobbles and splits into three drops that orbit it, then merge back in. A seamless 2 s loop.',
    file: 'lottie/jelly/loading.json',
    dotLottie: 'lottie/jelly/loading.lottie',
    sizeKb: 18.1,
    fps: 60,
    seconds: 2,
    loop: true,
    tags: ['system', 'loop'],
    screen: { title: 'Processing payment', line: 'Please keep this screen open', sub: 'This usually takes a few seconds', cta: null },
  },
  {
    id: 'jelly-error',
    title: 'Error',
    useCase: 'Failed payments & error states',
    detail:
      'The blob morphs into a jelly X, shakes three times (no flashing), then sags and drips as if melting. Violet → coral.',
    file: 'lottie/jelly/error.json',
    dotLottie: 'lottie/jelly/error.lottie',
    sizeKb: 18.2,
    fps: 60,
    seconds: 2.5,
    loop: false,
    tags: ['errors', 'morph'],
    screen: { title: 'Payment failed', line: 'Your card was declined', sub: 'Try another card or bank', cta: 'Try again' },
    flowFrom: 'jelly-loading',
  },
  {
    id: 'jelly-add-to-cart',
    title: 'Add to cart',
    useCase: 'E-commerce add-to-cart feedback',
    detail: 'A gift spins along an arc into a jelly cart. The cart squashes and wobbles, and a “+1” bubble pops out.',
    file: 'lottie/jelly/add_to_cart.json',
    dotLottie: 'lottie/jelly/add_to_cart.lottie',
    sizeKb: 20.5,
    fps: 60,
    seconds: 2.5,
    loop: false,
    tags: ['e-commerce', 'cart'],
    screen: { title: 'Added to cart', line: 'Canvas tote · Rs 2,950.00', sub: 'Free delivery over Rs 5,000', cta: 'View cart' },
  },
];

const classicItems = [
  {
    id: 'payment_success',
    title: 'Payment success',
    useCase: 'Checkout & payment confirmation',
    detail: 'Ring draws on, badge pops, tick draws itself, confetti burst.',
    file: 'lottie/payment_success.json',
    sizeKb: 25,
    fps: 60,
    seconds: 2.5,
    loop: false,
    tags: ['fintech', 'checkout'],
    screen: { title: 'Payment successful', line: 'Rs 4,500.00 · Order #A-2041', sub: 'Receipt sent to your email', cta: 'Done' },
    flowFrom: 'loading',
  },
  {
    id: 'loading',
    title: 'Loading',
    useCase: 'Processing & waiting screens',
    detail: 'Chasing arc with three bouncing dots, as a seamless loop.',
    file: 'lottie/loading.json',
    sizeKb: 5,
    fps: 60,
    seconds: 1.5,
    loop: true,
    tags: ['system', 'feedback'],
    screen: { title: 'Processing payment', line: 'Please keep this screen open', sub: 'This usually takes a few seconds', cta: null },
  },
  {
    id: 'error',
    title: 'Payment failed',
    useCase: 'Error states',
    detail: 'Badge pops, cross draws in two strokes, then a gentle shake.',
    file: 'lottie/error.json',
    sizeKb: 8,
    fps: 60,
    seconds: 2.5,
    loop: false,
    tags: ['fintech', 'errors'],
    screen: { title: 'Payment failed', line: 'Your card was declined', sub: 'Try another card or bank', cta: 'Try again' },
    flowFrom: 'loading',
  },
  {
    id: 'empty_cart',
    title: 'Empty cart',
    useCase: 'E-commerce empty states',
    detail: 'Cart drops in, squashes on landing with dust puffs, then wobbles.',
    file: 'lottie/empty_cart.json',
    sizeKb: 10,
    fps: 60,
    seconds: 2.5,
    loop: false,
    tags: ['e-commerce', 'empty state'],
    screen: { title: 'Your cart is empty', line: 'Items you add will show up here', sub: 'Browse today’s deals', cta: 'Start shopping' },
  },
  {
    id: 'upload_done',
    title: 'Upload complete',
    useCase: 'Cloud, file & sync apps',
    detail: 'Cloud pops in, arrow rises and flies off, tick draws with a burst.',
    file: 'lottie/upload_done.json',
    sizeKb: 19,
    fps: 60,
    seconds: 2.5,
    loop: false,
    tags: ['cloud', 'files'],
    screen: { title: 'Upload complete', line: 'invoice_0412.pdf · 2.4 MB', sub: 'Synced to all your devices', cta: 'View file' },
    flowFrom: 'loading',
  },
];

const techPulseItems = [
  {
    id: 'tech-doc-to-data',
    title: 'Document to data',
    useCase: 'AI document extraction & OCR',
    detail:
      'A document slides in, a scan line sweeps it, and its text lifts off into structured data cards. A tick draws on the last one.',
    file: 'lottie/tech-pulse/doc_to_data.json',
    dotLottie: 'lottie/tech-pulse/doc_to_data.lottie',
    sizeKb: 20.4,
    fps: 60,
    seconds: 3,
    loop: false,
    tags: ['ai', 'documents', 'extraction'],
    screen: { theme: 'dark', bar: 'Documents', title: 'Invoice processed', line: '18 line items extracted', sub: 'Ready to review and export', cta: 'Review' },
    flowFrom: 'tech-ai-thinking',
  },
  {
    id: 'tech-ai-thinking',
    title: 'AI thinking',
    useCase: 'AI assistants & generation states',
    detail: 'A lime core gathers light from five data nodes along marching feed lines, breathing as it spins up. A seamless 2 s loop.',
    file: 'lottie/tech-pulse/ai_thinking.json',
    dotLottie: 'lottie/tech-pulse/ai_thinking.lottie',
    sizeKb: 18.9,
    fps: 60,
    seconds: 2,
    loop: true,
    tags: ['ai', 'loop'],
    screen: { theme: 'dark', bar: 'Assistant', title: 'Reading your document', line: 'Finding totals, dates and line items', sub: 'This takes a few seconds', cta: null },
  },
  {
    id: 'tech-cloud-sync',
    title: 'Cloud sync',
    useCase: 'Sync, backup & multi-device apps',
    detail: 'Packets ride curved paths both ways between a laptop and a phone while the sync ring sweeps. A seamless 2 s loop.',
    file: 'lottie/tech-pulse/cloud_sync.json',
    dotLottie: 'lottie/tech-pulse/cloud_sync.lottie',
    sizeKb: 17.4,
    fps: 60,
    seconds: 2,
    loop: true,
    tags: ['sync', 'loop'],
    screen: { theme: 'dark', bar: 'Sync', title: 'Syncing your workspace', line: '3 devices up to date', sub: 'Changes appear everywhere in seconds', cta: null },
  },
  {
    id: 'tech-biometric',
    title: 'Biometric unlock',
    useCase: 'Sign-in, payments & secure actions',
    detail: 'Fingerprint ridges draw on, a scan turns them lime, then the shield pops in and its lock opens with a mechanical click.',
    file: 'lottie/tech-pulse/biometric.json',
    dotLottie: 'lottie/tech-pulse/biometric.lottie',
    sizeKb: 16.8,
    fps: 60,
    seconds: 2.5,
    loop: false,
    tags: ['security', 'auth'],
    screen: { theme: 'dark', bar: 'Security', title: 'Unlocked', line: 'Signed in with Touch ID', sub: 'Your vault is open', cta: 'Continue' },
  },
  {
    id: 'tech-deploy',
    title: 'Deploy pipeline',
    useCase: 'CI/CD, dev tools & release status',
    detail: 'Build, Test, Review and Live light up in sequence along a lime rail, then a rocket launches on a cyan exhaust.',
    file: 'lottie/tech-pulse/deploy.json',
    dotLottie: 'lottie/tech-pulse/deploy.lottie',
    sizeKb: 22.1,
    fps: 60,
    seconds: 3,
    loop: false,
    tags: ['devtools', 'ci-cd'],
    screen: { theme: 'dark', bar: 'Pipeline', title: 'Deployed to production', line: 'Build #1042 · 38 s', sub: 'All 4 stages passed', cta: 'View logs' },
  },
  {
    id: 'tech-reconnecting',
    title: 'Reconnecting',
    useCase: 'Offline & connection-status states',
    detail: 'The signal breaks in coral, searching arcs ripple out, then the bars refill and the status turns lime. A seamless 2.5 s loop.',
    file: 'lottie/tech-pulse/reconnecting.json',
    dotLottie: 'lottie/tech-pulse/reconnecting.lottie',
    sizeKb: 14.6,
    fps: 60,
    seconds: 2.5,
    loop: true,
    tags: ['network', 'loop'],
    screen: { theme: 'dark', bar: 'Status', title: 'Reconnecting…', line: 'Your work is saved offline', sub: 'We’ll sync it when you’re back', cta: null },
  },
];

export const lottieCollections = [
  {
    id: 'jelly',
    title: 'Jelly set',
    label: 'Featured · v2',
    concept: 'Self-initiated concept',
    accent: '#a78bfa',
    strip: 'motion/collections/jelly.webp',
    summary: 'One glossy jelly material, no character: shape and motion tell each state.',
    intro:
      'Four app states told by one clay-and-jelly material, with gradients, gloss, a soft depth layer and a holographic ' +
      'sheen. The blob splits into orbiting drops while loading, morphs into a tick or an X, and a gift drops into a ' +
      'wobbling jelly cart. Pick one to inspect it frame by frame.',
    sizeRange: '18–21 KB',
    items: jellyItems,
  },
  {
    id: 'tech-pulse',
    title: 'Tech Pulse',
    label: 'New · v3',
    isNew: true,
    concept: 'Self-initiated concept',
    accent: '#38bdf8',
    strip: 'motion/collections/tech-pulse.webp',
    summary: 'Six tech moments for SaaS, AI and developer products, in frosted glass and precise light.',
    intro:
      'Six moments that SaaS, AI and developer products really have: AI thinking, document to data, cloud sync, ' +
      'biometric unlock, deploy pipeline and reconnecting. Frosted-glass panels, thin precise lines and small glowing ' +
      'accents, with crisp, engineered motion. Pick one to inspect it frame by frame.',
    sizeRange: '15–22 KB',
    items: techPulseItems,
  },
  {
    id: 'classic',
    title: 'Classic badge set (v1)',
    label: 'v1',
    concept: 'Self-initiated concept',
    accent: '#22c55e',
    strip: 'motion/collections/classic.webp',
    summary: 'The first set: five matching badges with draw-on icons.',
    intro:
      'Five matching animations for the moments every app has: success, loading, error, empty cart and upload done. ' +
      'Same badge, same motion language, all vector. Pick one to inspect it frame by frame.',
    sizeRange: '5–25 KB',
    items: classicItems,
  },
];

/** The featured collection, and every animation as one flat list (deep links, counts, JSON-LD). */
export const featuredCollection = lottieCollections[0];
export const lottieItems = lottieCollections.flatMap((c) => c.items.map((item) => ({ ...item, collectionId: c.id })));

/** Hero reel: a 3-second strip of the featured Jelly set, built from its MP4 previews. */
export const heroReel = {
  src: 'motion/jelly-reel.mp4',
  poster: 'motion/posters/jelly-reel.webp',
  fileName: 'jelly-reel.mp4',
  title: 'Jelly set: reel',
  description: 'The four Jelly set Lottie animations (loading, success, error, add to cart) playing side by side.',
  width: 1280,
  height: 330,
  seconds: 3,
  fps: 30,
  uploadDate: '2026-11-25',
};

/* ------------------------------------------------------------------ Motion graphics videos */

/**
 * Motion graphics, grouped by project. A project is one brief; its cuts are the formats it shipped in
 * (16:9 film, 9:16 reel, 1:1 post…). See README "Adding a motion video".
 *
 * Project fields
 *   id, title, category ('App promo' | 'Explainer' | 'Social ad' | 'Logo'), summary, uploadDate
 *   owner: { kind: 'client' | 'own' | 'concept', name, note? }   // shown as "Client · X", "Own product · X", "Concept"
 *   languages: on-screen / spoken languages · tools: optional, only what was really used
 *   link: optional { label, href } to the product or client
 * Cut fields
 *   id (unique, kebab-case), label ('Main film' | 'Social reel' …), aspect ('16:9' | '9:16' | '1:1'),
 *   seconds, width, height,
 *   src: self-hosted MP4 (H.264, ≤ 1080p, under 8 MB) or null with embedUrl,
 *   preview: short silent MP4 for hover (≈ 6 s, under 100 KB), poster: WebP under 150 KB,
 *   captions: WebVTT or null
 */
export const motionProjects = [
  {
    id: 'aqra-pos-launch',
    title: 'Aqra POS launch promo',
    category: 'App promo',
    owner: { kind: 'own', name: 'Aqra Labs', note: 'my company' },
    summary:
      'Launch film for Aqra POS, the billing and stock app for Sri Lankan shops. It sets up the old way (hand-typed ' +
      'supplier bills, credit in a notebook, profit only at month end), then shows three features: snap the bill, ' +
      'ask the AI shop assistant, and scan with your phone.',
    languages: ['English (on-screen text)'],
    link: { label: 'See Aqra POS', href: 'https://aqralabs.com/products/aqra-pos/' },
    uploadDate: '2026-11-19',
    cuts: [
      {
        id: 'aqra-pos-launch-16x9',
        label: 'Main film',
        aspect: '16:9',
        seconds: 63,
        width: 1920,
        height: 1080,
        src: 'motion/videos/aqra-pos-launch-16x9.mp4',
        preview: 'motion/videos/aqra-pos-launch-16x9-preview.mp4',
        poster: 'motion/posters/aqra-pos-launch-16x9.webp',
        captions: null,
      },
      {
        id: 'aqra-pos-launch-9x16',
        label: 'Social reel',
        aspect: '9:16',
        seconds: 30,
        width: 720,
        height: 1280,
        src: 'motion/videos/aqra-pos-launch-9x16.mp4',
        preview: 'motion/videos/aqra-pos-launch-9x16-preview.mp4',
        poster: 'motion/posters/aqra-pos-launch-9x16.webp',
        captions: null,
      },
    ],
  },
];

/** Every cut as one flat list (lightbox order, counts, JSON-LD); each cut carries its project. */
export const motionVideos = motionProjects.flatMap((project) =>
  project.cuts.map((cut) => ({ ...cut, project, title: `${project.title}: ${cut.label}` }))
);

export function ownerLabel(owner) {
  if (owner.kind === 'client') return `Client · ${owner.name}`;
  if (owner.kind === 'own') return `Own product · ${owner.name}`;
  return 'Concept';
}

/* ------------------------------------------------------------------ Shared */

export const videoCategories = ['App promo', 'Explainer', 'Social ad', 'Logo'];
export const videoAspects = ['16:9', '9:16', '1:1'];

export const processSteps = [
  { id: 'brief', title: 'Brief', text: 'Where it plays, what it must say, the platforms and file-size budget.' },
  { id: 'style', title: 'Style frame', text: 'One still frame that locks colour, shape language and timing intent.' },
  { id: 'build', title: 'Build', text: 'Vector animation built code-first with an AI-assisted workflow, then hand-tuned.' },
  { id: 'test', title: 'Test in Lottie player', text: 'Checked frame by frame, on light and dark, on real device sizes.' },
  { id: 'deliver', title: 'Deliver', text: 'Production files, previews, embed code — ready to drop into your app.' },
];

export const deliverables = {
  lottie: [
    'Lottie JSON + dotLottie',
    'MP4 / GIF previews',
    'Live preview link',
    'Embed code for Web, React Native & Flutter',
    '2 revision rounds',
  ],
  video: [
    'MP4 1080p in 16:9, 9:16 and 1:1',
    'Captions in English, Sinhala or Tamil',
    'Poster frame for every cut',
    '2 revision rounds',
  ],
};

export function formatDuration(seconds) {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
