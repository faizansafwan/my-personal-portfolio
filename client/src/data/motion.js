/**
 * Single source of truth for the Motion page (/motion/).
 * Copy lives here; technical metadata (frames, fps, canvas, layers, size) is read
 * from each Lottie JSON at runtime so it can never drift from the real file.
 */

export const lottieItems = [
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
    concept: true,
    screen: { title: 'Payment successful', line: 'Rs 4,500.00 · Order #A-2041', sub: 'Receipt sent to your email', cta: 'Done' },
    flowFrom: 'loading',
  },
  {
    id: 'loading',
    title: 'Loading',
    useCase: 'Processing & waiting screens',
    detail: 'Chasing arc with three bouncing dots — a seamless loop.',
    file: 'lottie/loading.json',
    sizeKb: 5,
    fps: 60,
    seconds: 1.5,
    loop: true,
    tags: ['system', 'feedback'],
    concept: true,
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
    concept: true,
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
    concept: true,
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
    concept: true,
    screen: { title: 'Upload complete', line: 'invoice_0412.pdf · 2.4 MB', sub: 'Synced to all your devices', cta: 'View file' },
    flowFrom: 'loading',
  },
];

/** Hero reel: a 3-second strip of the whole set, cheaper than five live players up top. */
export const heroReel = {
  src: 'motion/app-states-reel.mp4',
  poster: 'motion/posters/app-states-reel.webp',
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
