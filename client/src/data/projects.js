import { LINKS } from './site';

/**
 * Featured releases. Every entry stays on the site whether or not it is deployed
 * or indexed online — many client and personal builds are private by nature.
 *
 * Optional fields:
 *   role        — short badge shown next to the name
 *   highlights  — distinctive features, shown as a list on the row
 *   image       — { src, alt, width, height } real screenshot; replaces the pipeline visual
 *   liveUrl / liveLabel, secondaryUrl / secondaryLabel, githubUrl
 */
export const projects = [
  {
    version: 'v1',
    name: 'Aqra POS',
    role: 'Co-founder · Aqra Labs',
    categories: ['Retail POS', 'Subscription SaaS', 'Applied AI'],
    context:
      'Who it helps: retail and wholesale shops in Sri Lanka that have outgrown the cash book and spreadsheets.',
    pitch:
      'A cloud POS and inventory system that bills fast, tracks every rupee, and answers questions about the shop — in English, Sinhala, or Tamil.',
    outcome:
      'Live subscription SaaS on four plans (Starter → Enterprise), automating billing, stock, and supplier workflows to cut manual operations by about 60%.',
    highlights: [
      'AI shop assistant in English, Sinhala & Tamil — even typed in English letters',
      'Snap a supplier bill (photo, PDF, or Excel) → item lines, batches & expiry filled in',
      'Your phone becomes the barcode scanner',
      'Offline selling — bills sync when the connection returns',
      'Weighed items & scale labels (PLU), thermal receipts via a print bridge',
      'Loyalty points, expenses & P&L, branch stock transfer, practice mode for new staff',
    ],
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma', 'Supabase', 'GraphQL', 'OpenAI APIs'],
    contribution:
      'As co-founder I build the product end to end: data model and GraphQL API, POS and inventory flows, subscriptions, the role-aware AI assistant, supplier bill extraction, multi-tenant RBAC, and GitHub Actions CI/CD.',
    liveUrl: LINKS.aqraPos,
    liveLabel: 'pos.aqralabs.com',
    secondaryUrl: LINKS.aqraPosProduct,
    secondaryLabel: 'Product page on aqralabs.com',
    caseStudy: {
      problem:
        'Shops outgrow spreadsheets fast: checkout, customer credit, supplier bills, and branch stock drift apart, and owners cannot answer simple questions like “what is running low this week?” without digging.',
      approach:
        'One transactional core for counter, back office, and reporting — every sale, return, and supplier bill moves the same stock and ledger. AI features read that same data instead of a copy.',
      pipeline: [
        'Bill, hold, return or quote at the counter',
        'Stock, batches & expiry update per branch',
        'Customer credit & supplier accounts',
        'Reports, P&L + AI assistant on live data',
      ],
      decisions:
        'AI is advisory by design: the assistant only answers questions and respects staff roles, and scanned supplier bills pre-fill lines for a quick check instead of moving stock blindly. Offline bills queue on the device so a dropped connection never stops a sale.',
      improve:
        'Broader automated tests on checkout and offline-sync edge cases, and self-serve online payments for subscriptions instead of bank-transfer approval.',
    },
  },
  {
    version: 'v2',
    name: 'CVeezi',
    categories: ['SaaS', 'ATS', 'Applied AI'],
    context: 'Who it helps: job seekers and teams tired of juggling separate resume, ATS, and prep tools.',
    pitch:
      'One AI-assisted hiring workspace — build a CV, improve it, score it for ATS, and prepare for interviews from the same profile.',
    outcome:
      'Guided workflow designed to cut a multi-hour prep routine to roughly ten minutes, with referrals and payouts built in.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'LLM', 'Redis', 'Stripe'],
    contribution:
      'At X4 Digital Labs I build full-stack features: document parsing to JSON, editor and AI writing flows, ATS scoring, referral/QR earnings, and Stripe payouts.',
    liveUrl: null,
    caseStudy: {
      problem:
        'Candidates repeat the same information across tools that do not share data. Recruiters lose trust when profiles are inconsistent or manually retyped.',
      approach:
        'Treat the structured profile as the single source of truth — parse uploads once, let users correct ambiguities, then reuse that object everywhere else.',
      pipeline: [
        'Upload resume (PDF/Word)',
        'Extract + validate JSON profile',
        'Edit & AI-assisted writing',
        'ATS score, letters, interview prep',
      ],
      decisions:
        'Invest in parsing confidence flags instead of silent guesses — slower first import, fewer wrong profiles downstream.',
      improve: 'Evaluation sets per resume layout and clearer reviewer UX for ambiguous fields.',
    },
  },
  {
    version: 'v3',
    name: 'EvalzNow',
    categories: ['SaaS', 'Analytics', 'Human capital'],
    context: 'Who it helps: schools and organizations running behavioral and competency assessments at scale.',
    pitch:
      'Assessment platform where reviewers see growth, scores, and competency trends — not just a single test result.',
    outcome:
      'Institutions evaluate and track 1000+ candidate performance metrics with structured growth insights, with role-appropriate access to sensitive data.',
    tags: ['Next.js', 'Node.js', 'MySQL', 'Context API', 'Recharts'],
    contribution:
      'At Metro Coding I built Recharts dashboards, competency views, and multi-level RBAC (admin, client, staff) across frontend and backend.',
    liveUrl: null,
    caseStudy: {
      problem:
        'Institutions need to compare candidates over time, but raw scores without context are useless — and the wrong role must never see the wrong row.',
      approach:
        'Separate delivery, scoring, and analytics layers; every dashboard query checks organization and role on the server.',
      pipeline: ['Deliver assessments', 'Score & store competencies', 'Authorize by role', 'Dashboards & exports'],
      decisions:
        'Server-enforced RBAC on each analytics endpoint instead of hiding rows only in the browser — more API work, safer audits.',
      improve: 'Drill from chart to item-level evidence without loading entire assessments upfront.',
    },
  },
  {
    version: 'v4',
    name: 'Shakkya Holidays',
    categories: ['Travel', 'Booking'],
    context: 'Who it helps: travelers booking Sri Lankan and regional tours, visas, and hotels in one place.',
    pitch:
      'Public travel site where visitors discover packages and move through tour, visa, and hotel journeys without a clunky template feel.',
    outcome: 'Live production site with SEO-oriented pages and motion-rich UI, co-built with designers.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    contribution:
      'At Metro Coding I implemented booking modules from wireframes, kept visual consistency across flows, and applied semantic HTML and metadata for search.',
    liveUrl: 'https://shakkyaholidays.com/',
    liveLabel: 'shakkyaholidays.com',
    caseStudy: {
      problem:
        'Travel brands lose bookings when the site feels generic or hides visa and hotel steps behind confusing navigation.',
      approach:
        'Component library aligned to the design system, motion for key transitions, and SEO basics on every destination page.',
      pipeline: ['Browse packages', 'Visa & hotel paths', 'SEO metadata', 'Ship & iterate with design'],
      decisions: 'Custom sections over an off-the-shelf theme — longer build, stronger brand and clarity.',
      improve: 'Supplier APIs for live availability when partners expose them.',
    },
  },
  {
    version: 'v5',
    name: 'MK Design E-commerce',
    categories: ['E-commerce', 'GraphQL'],
    context: 'Who it helps: a fashion retailer whose customers shop on phone as often as desktop.',
    pitch:
      'Clothing storefront where catalog, cart, and checkout stay in sync with a GraphQL backend — stability over flash.',
    outcome:
      'Client-reported 95%+ improvement in platform stability, with a consistent shopping experience across mobile, tablet, and desktop.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'GraphQL', 'Redux', 'Material UI'],
    contribution:
      'Fixed critical frontend–backend defects, improved responsive layouts, and coordinated releases with designers and PMs.',
    liveUrl: null,
    caseStudy: {
      problem: 'When product data and checkout state diverge, customers abandon carts — especially on mobile.',
      approach:
        'Trace bugs across GraphQL resolvers and Redux state, patch systematically, then harden responsive layouts on high-traffic paths.',
      pipeline: ['Reproduce defect', 'Fix API/UI contract', 'Responsive pass', 'Release with PM sign-off'],
      decisions: 'Stabilize before feature churn — fewer headline launches, higher checkout success.',
      improve: 'Automated tests on add-to-cart and payment paths.',
    },
  },
  {
    version: 'v6',
    name: 'Smart Grocery Inventory & Billing Assistant',
    categories: ['Desktop', 'Python', 'Rules engine'],
    context: 'Who it helps: small grocers billing at the counter while watching expiry dates.',
    pitch:
      'Desktop app that bills sales, updates stock, suggests substitutes from five product categories, and warns before items expire.',
    outcome: 'Counter staff see stock and expiry in one screen — no separate spreadsheet for substitutes.',
    tags: ['Python', 'Tkinter', 'Rule-based logic'],
    contribution:
      'Built the inventory and billing modules, input validation, rule-based substitutes, and expiry alerts for products expiring within three days.',
    liveUrl: null,
    caseStudy: {
      problem: 'Manual billing plus mental stock-keeping leads to overselling and waste when items expire unnoticed.',
      approach: 'Single Tkinter app: every sale adjusts inventory; rules pick substitutes; dates drive alerts.',
      pipeline: ['Record stock', 'Bill & decrement', 'Suggest substitute', 'Expiry notification'],
      decisions: 'Transparent rules instead of ML — staff can explain why a substitute appeared.',
      improve: 'Optional cloud sync for multi-branch stores.',
    },
  },
];

/** Earlier builds — kept on the site, shown as a compact archive. */
export const earlierProjects = [
  {
    year: '2026',
    name: 'HoliStay',
    subtitle: 'Hotel showcase website',
    description:
      'Responsive, animated showcase for a resort — services, cultural experiences, and rooms with smooth transitions and a mobile-first layout.',
    tags: ['React', 'CSS', 'Vercel'],
    links: [{ href: 'https://holistay.vercel.app/', label: 'Live' }],
  },
  {
    year: '2025',
    name: 'Business Management ERP',
    subtitle: 'Full-stack ERP',
    description:
      'Billing, invoicing, inventory, purchases, orders, and customers — with an OpenAI-powered engine that recommends prices from demand and sales patterns.',
    tags: ['.NET', 'MSSQL', 'React', 'TypeScript', 'OpenAI API'],
    links: [],
    note: 'Private repository',
  },
  {
    year: '2024',
    name: 'Trip At',
    subtitle: 'Travel content sharing platform',
    description:
      'Community travel app where users share trip stories and photos and plan budgets together, with Firebase auth and a Redux-managed responsive UI.',
    tags: ['MERN', 'Firebase', 'Redux', 'Tailwind'],
    links: [
      { href: 'https://trip-at-one.vercel.app/', label: 'Live' },
      { href: 'https://github.com/faizansafwan/trip-at-frontend', label: 'Code' },
    ],
  },
  {
    year: '2023',
    name: 'Student Portal',
    subtitle: 'Career opportunity finder · team project',
    description:
      'Helps Sri Lankan A/L students find eligible universities and colleges by stream, subject combination, and cut-off scores.',
    tags: ['PHP', 'MySQL', 'jQuery'],
    links: [{ href: 'https://github.com/AmnaAroos2000/Student_Portal', label: 'Code' }],
  },
];
