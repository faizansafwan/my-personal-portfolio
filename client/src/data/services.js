import {
  Globe,
  Layers,
  Smartphone,
  Megaphone,
  Search,
  Cloud,
  Store,
} from 'lucide-react';

export const servicesIntro =
  'Alongside full-time product engineering, I take on a selective set of client engagements — solo for focused builds, and in partnership with Aqra Labs when you need a full studio: web, software, mobile, marketing, SEO, and hosting under one accountable team.';

export const partnershipBlock = {
  title: 'Partner delivery with Aqra Labs',
  highlights: [
    'Senior-led delivery — engineers accountable for the outcome',
    'Fixed scope or iterative milestones with weekly progress',
    'Full source ownership transferred on completion',
    'Post-launch support window included on studio engagements',
  ],
};

export const flagshipProducts = [
  {
    id: 'unitel-pos',
    icon: Store,
    name: 'Unitel POS',
    tagline: 'POS & inventory software for shops',
    description:
      'Cloud point-of-sale and shop operations — fast billing, stock and batches, customer credit, returns, multi-store reporting, subscriptions, and an in-app assistant grounded in live shop data.',
    link: 'https://unitelpos.vercel.app',
    linkLabel: 'unitelpos.vercel.app',
  },
];

/** Service catalog aligned with Aqra Labs — https://aqralabs.com/services */
export const services = [
  {
    id: 'web-systems',
    icon: Globe,
    delivery: 'Solo · Aqra Labs',
    title: 'Web system development',
    description:
      'Custom websites and web apps on React and Next.js — marketing sites, customer portals, and complex dashboards that are responsive, accessible, and fast.',
    deliverables: [
      'UX aligned to your content, not a generic theme',
      'Performance and accessibility baked in from day one',
      'Deployed, documented, and handed over in your repo',
    ],
  },
  {
    id: 'software',
    icon: Layers,
    delivery: 'Solo · Aqra Labs',
    title: 'Software development',
    description:
      'Internal tools, back-office systems, and SaaS products with maintainable architecture — agile delivery, clear APIs, and data models that match how you actually operate.',
    deliverables: [
      'Discovery → roadmap → iterative demos',
      'RBAC, integrations, and reporting where you need them',
      'Examples: assessment SaaS, Unitel POS, document/AI pipelines',
    ],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    delivery: 'Aqra Labs partner',
    title: 'Mobile application development',
    description:
      'Native iOS and Android apps that stay in sync with your web product and backend — one team accountable from design through store release.',
    deliverables: [
      'Shared data model with your existing APIs',
      'Store-ready builds and release support',
      'Documented handover for your long-term team',
    ],
  },
  {
    id: 'digital-marketing',
    icon: Megaphone,
    delivery: 'Aqra Labs partner',
    title: 'Digital marketing',
    description:
      'SEO, content, and paid campaigns aimed at durable visibility — not a one-month spike. Strategy tied to how your product and site are actually built.',
    deliverables: [
      'Channel plan aligned to your business goals',
      'Content and creative coordinated with engineering',
      'Reporting you can act on, not vanity metrics',
    ],
  },
  {
    id: 'seo',
    icon: Search,
    delivery: 'Aqra Labs partner',
    title: 'SEO optimization',
    description:
      'Ethical SEO grounded in technical fundamentals and real research — structured content, metadata, and fixes that compound as your site grows.',
    deliverables: [
      'Technical audit and implementation fixes',
      'On-page structure and content recommendations',
      'Local and industry-specific search where relevant',
    ],
  },
  {
    id: 'hosting',
    icon: Cloud,
    delivery: 'Aqra Labs partner',
    title: 'Web hosting & deployment',
    description:
      'Secure, fast hosting and deployment pipelines so your product stays available — monitoring, SSL, and sensible release practices out of the box.',
    deliverables: [
      'Production and staging environments',
      'CI/CD aligned to your stack',
      'Uptime-focused ops with a clear support path',
    ],
  },
];
