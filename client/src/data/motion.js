/**
 * Single source of truth for the Motion page (/motion/).
 * Copy lives here; technical metadata (frames, fps, canvas, layers, size) is read
 * from each Lottie JSON at runtime so it can never drift from the real file.
 */

/**
 * Lottie collections. The first one is featured: it opens in the inspector and fills the hero
 * reel and the home-page teaser. Item ids must be unique across collections (deep-link hashes).
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

export const lottieCollections = [
  {
    id: 'jelly',
    title: 'Jelly set',
    label: 'Featured · v2',
    concept: 'Self-initiated concept',
    summary: 'One glossy jelly material, no character: shape and motion tell each state.',
    intro:
      'Four app states told by one clay-and-jelly material, with gradients, gloss, a soft depth layer and a holographic ' +
      'sheen. The blob splits into orbiting drops while loading, morphs into a tick or an X, and a gift drops into a ' +
      'wobbling jelly cart. Pick one to inspect it frame by frame.',
    sizeRange: '18–21 KB',
    items: jellyItems,
  },
  {
    id: 'classic',
    title: 'Classic badge set (v1)',
    label: 'v1',
    concept: 'Self-initiated concept',
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

/**
 * Motion graphics videos. Add one object per video — see README "Adding a motion video".
 *
 * {
 *   id: 'aqra-pos-promo',                     // unique, kebab-case
 *   title: 'Aqra POS — launch promo',
 *   client: null | 'Client name',             // null + concept: true for self-initiated work
 *   concept: true,
 *   category: 'App promo' | 'Explainer' | 'Social ad' | 'Logo',
 *   aspect: '16:9' | '9:16' | '1:1',
 *   seconds: 15,
 *   src: 'motion/videos/aqra-pos-promo.mp4' | null,       // self-hosted MP4 in public/
 *   embedUrl: 'https://www.youtube-nocookie.com/embed/ID' | null,
 *   poster: 'motion/posters/aqra-pos-promo.webp',         // WebP, under 150 KB
 *   captions: 'motion/captions/aqra-pos-promo.vtt' | null,
 *   summary: 'One line on the idea and the result.',
 *   tools: ['After Effects', 'Lottie'],
 *   languages: ['English', 'Sinhala', 'Tamil'],
 *   uploadDate: '2026-11-25',
 * }
 */
export const motionVideos = [];

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
