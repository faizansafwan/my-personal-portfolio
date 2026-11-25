export const blogPosts = [
  {
    id: 'structured-outputs',
    slug: 'structured-outputs-production',
    title: 'Structured outputs are the real LLM feature — not the chat box',
    date: 'October 2026',
    readTime: '7 min read',
    tags: ['LLM', 'JSON Schema', 'Production'],
    excerpt:
      'Chat demos sell AI; validated JSON keeps it shippable. What I learned building document → schema pipelines for résumés and invoices.',
    paragraphs: [
      'Most teams still demo LLMs as a textarea that talks back. In production, the valuable part is different: force the model into a schema you own, validate it, and only then let the rest of your app touch the data. That is especially true for documents — résumés, invoices, forms — where layout is messy but downstream features need columns, not paragraphs.',
      'The pattern that works: define a strict JSON schema (with optional fields and confidence flags), run extraction, validate with a library or custom rules, and surface `needs_review` instead of silently guessing. When a job title is ambiguous, the UI should show two candidates — not pick one and move on. Users trust the product when they can see why the system hesitated.',
      'What fails in the real world: one-shot prompts with “return JSON only” and no validator; schemas so loose they accept anything; or schemas so tight that half of real uploads fail. The balance is iterative — start strict on fields you truly need, relax with explicit enums, and measure failure modes on a small set of real files.',
      'If you are adding AI to an existing SaaS flow, treat the model as an unreliable adapter between messy input and your domain model — same as you would a third-party API with rate limits and partial errors. Cache structured results, version your schema, and never let the LLM write directly to billing or permissions tables without a human or rule gate.',
      'Trend-wise, every major provider now pushes structured output modes; the engineering work is not picking a vendor — it is designing the contract between model output and your product, and testing it like any other integration.',
    ],
  },
  {
    id: 'rbac-api',
    slug: 'rbac-in-the-api',
    title: 'RBAC in multi-tenant SaaS: if it is only in React, it is not security',
    date: 'September 2026',
    readTime: '6 min read',
    tags: ['SaaS', 'RBAC', 'Security'],
    excerpt:
      'Dashboards for assessments and analytics look identical for every role until the API says no. Why I enforce permissions on every query.',
    paragraphs: [
      'Multi-tenant SaaS almost always ships with “admin”, “client”, and “staff” roles — plus org boundaries. It is tempting to fetch a big JSON blob and hide rows in the frontend. That breaks the moment someone opens DevTools, hits an old API route, or a new chart ships without the same conditional.',
      'The approach I use on analytics products: every dashboard endpoint accepts identity + role context from the session, applies policy in the service layer, and returns only aggregates or rows that policy allows. The UI stays dumb: it renders what it gets. Adding a new chart means adding a new authorized query, not a new `if (role === …)` sprinkled in JSX.',
      'Practical trade-off: more endpoints and duplication of permission checks versus one “super query” filtered in SQL. I prefer explicit query paths for sensitive domains (candidate PII, billing, cross-org reports). ORMs make it easy to accidentally join too much — code review should ask “who can run this query?” not only “does it return the right chart?”',
      'Testing: table-driven tests for policy matrices beat manual QA alone. Document which roles see which dimensions before designers wire new dashboards — otherwise you redesign charts when compliance pushes back.',
      'This aligns with how buyers evaluate B2B SaaS in 2026: SSO, audit logs, and provable access control matter as much as feature checklists. Frontend polish gets the meeting; API-level RBAC gets the renewal.',
    ],
  },
  {
    id: 'ai-advisory',
    slug: 'advisory-ai-features',
    title: 'Ship AI as advisory first — pricing, assistants, and copilots that do not ghost-write production',
    date: 'August 2026',
    readTime: '5 min read',
    tags: ['Applied AI', 'Product', 'ERP'],
    excerpt:
      'Let the model suggest, explain, and retrieve — but keep commits, prices, and inventory writes in code you control.',
    paragraphs: [
      '“AI-powered” too often means the model mutates live data: repricing SKUs, posting journal entries, deleting rows. One bad completion becomes an incident. A pattern that survives legal and ops review: advisory mode — suggestions, drivers, retrieved context — with explicit human or rule confirmation before writes.',
      'In ERP-style products this looks like: natural-language questions answered from shop-specific data (inventory snapshots, sales windows), pricing hints with ranges and reasons, invoice extraction that pre-fills a review screen instead of auto-posting. The user sees what will change and clicks confirm. Latency is slightly higher; trust is much higher.',
      'Retrieval matters more than model size for these features. A small model with good shop-scoped context beats a large model guessing from general knowledge. Log prompts and outputs (redacted) for support — when a user says “the assistant lied”, you need the trace.',
      'Agent hype in 2026 pushes autonomous loops; product teams win by narrowing scope — one workflow, one schema, one approval step — then expanding when metrics show error rates you can defend.',
      'If you are a full-stack dev owning an AI feature, your job is half UX: empty states, failure copy, and “here is what I used to answer this” matter as much as the prompt.',
    ],
  },
];
