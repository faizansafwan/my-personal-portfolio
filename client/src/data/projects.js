import { LINKS } from './site';

export const projects = [
  {
    version: 'v1',
    name: 'CVeezi',
    categories: ['SaaS', 'ATS', 'Applied AI'],
    context: 'Who it helps: job seekers and teams tired of juggling separate resume, ATS, and prep tools.',
    pitch: 'One AI-assisted hiring workspace — build a CV, improve it, score it for ATS, and prepare for interviews from the same profile.',
    outcome:
      'Workflow designed to collapse a multi-hour prep routine into roughly ten minutes, with referrals and payouts built in.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'LLM', 'Redis', 'Stripe'],
    contribution:
      'At X4 Digital Labs I build full-stack features: document parsing to JSON, editor and AI writing flows, ATS scoring, referral/QR earnings, and Stripe payouts.',
    liveUrl: null,
    images: [],
    hideScreenshot: true,
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
    version: 'v2',
    name: 'EvalzNow',
    categories: ['SaaS', 'Analytics', 'Human capital'],
    context: 'Who it helps: schools and organizations running behavioral and competency assessments at scale.',
    pitch:
      'Assessment platform where reviewers see growth, scores, and competency trends — not just a single test result.',
    outcome:
      'Analytics built to support large candidate cohorts (1000+ on the platform) with role-appropriate access to sensitive data.',
    tags: ['Next.js', 'Node.js', 'MySQL', 'Context API', 'Recharts'],
    contribution:
      'At Metro Coding I built Recharts dashboards, competency views, and multi-level RBAC (admin, client, staff) across frontend and backend.',
    liveUrl: null,
    images: [],
    hideScreenshot: true,
    caseStudy: {
      problem:
        'Institutions need to compare candidates over time, but raw scores without context are useless — and the wrong role must never see the wrong row.',
      approach:
        'Separate delivery, scoring, and analytics layers; every dashboard query checks organization and role on the server.',
      pipeline: [
        'Deliver assessments',
        'Score & store competencies',
        'Authorize by role',
        'Dashboards & exports',
      ],
      decisions:
        'Server-enforced RBAC on each analytics endpoint instead of hiding rows only in the browser — more API work, safer audits.',
      improve: 'Drill from chart to item-level evidence without loading entire assessments upfront.',
    },
  },
  {
    version: 'v3',
    name: 'Unitel POS',
    categories: ['Retail POS', 'ERP', 'Multi-store SaaS'],
    context:
      'Who it helps: retail shops and growing chains that need billing, stock, credit, and reporting in one system.',
    pitch:
      'Cloud point-of-sale and shop operations: fast invoicing, inventory and batches, customer credit, returns and refunds, quotations, multi-store reporting, and subscription plans — with an in-app AI assistant grounded in live shop data.',
    outcome:
      'Production SaaS used on the shop floor: shared GraphQL API, role-based access per store, and AI features (shop assistant + supplier invoice extraction) that read the same database as checkout.',
    tags: ['GraphQL', 'PostgreSQL', 'Multi-store', 'Subscriptions', 'Applied AI'],
    contribution:
      'Full-stack work across POS dashboards, sales and inventory flows, subscriptions, supplier document processing, and the permission-aware shop assistant.',
    liveUrl: LINKS.unitel,
    liveLabel: 'unitelpos.vercel.app',
    images: [],
    hideScreenshot: true,
    caseStudy: {
      problem:
        'Retail teams outgrow spreadsheets and disconnected tools — checkout, returns, supplier paperwork, and branch stock must stay consistent, including when staff share tablets or work offline briefly.',
      approach:
        'Single product surface for checkout, back-office inventory, and reporting — modular services for shops, stores, sales, suppliers, subscriptions, and AI features tied to the same transactional data.',
      pipeline: [
        'Sale / return / quotation at POS',
        'Inventory & batch updates per store',
        'Customer ledger & payments',
        'Reports + AI assistant / document extract',
      ],
      decisions:
        'Kept one GraphQL API contract while upgrading the platform so existing clients kept working — more migration work upfront, smoother rollout for shops already on the system.',
      improve:
        'Stronger offline POS paths, notification workers, and broader automated tests on checkout and inventory edge cases.',
    },
  },
  {
    version: 'v4',
    name: 'Shakkya Holidays',
    categories: ['Travel', 'Booking'],
    context: 'Who it helps: travelers booking Sri Lankan and regional tours, visas, and hotels in one place.',
    pitch:
      'Public travel site where visitors discover packages and move through tour, visa, and hotel journeys without a clunky template feel.',
    outcome: 'Live production site with SEO-oriented pages and motion-rich UI co-built with designers.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    contribution:
      'Implemented booking modules from wireframes, kept visual consistency across flows, and applied semantic HTML/metadata for search.',
    liveUrl: 'https://shakkyaholidays.com/',
    liveLabel: 'shakkyaholidays.com',
    images: [],
    hideScreenshot: true,
    caseStudy: {
      problem:
        'Travel brands lose bookings when the site feels generic or hides visa and hotel steps behind confusing navigation.',
      approach:
        'Component library aligned to design system, Framer Motion for key transitions, and SEO basics on every destination page.',
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
      'Major reduction in integration-related defects and smoother purchasing flows across devices (client-reported stability gains).',
    tags: ['React.js', 'Node.js', 'MongoDB', 'GraphQL', 'Redux', 'Material UI'],
    contribution:
      'Fixed critical frontend–backend defects, improved responsive layouts, and coordinated releases with designers and PMs.',
    liveUrl: null,
    images: [],
    hideScreenshot: true,
    caseStudy: {
      problem:
        'When product data and checkout state diverge, customers abandon carts — especially on mobile.',
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
      'Desktop app that bills sales, updates stock, suggests substitutes from five product families, and warns before items expire.',
    outcome: 'Counter staff see stock and expiry in one screen — no separate spreadsheet for substitutes.',
    tags: ['Python', 'Tkinter', 'Rule-based logic'],
    contribution:
      'Built inventory and billing modules, validation on inputs, rule-based substitutes, and expiry alerts within a three-day window.',
    liveUrl: null,
    images: [],
    hideScreenshot: true,
    caseStudy: {
      problem:
        'Manual billing plus mental stock-keeping leads to overselling and waste when items expire unnoticed.',
      approach:
        'Single Tkinter app: every sale adjusts inventory; rules pick substitutes; dates drive alerts.',
      pipeline: ['Record stock', 'Bill & decrement', 'Suggest substitute', 'Expiry notification'],
      decisions: 'Transparent rules instead of ML — staff can explain why a substitute appeared.',
      improve: 'Optional cloud sync for multi-branch stores.',
    },
  },
];
