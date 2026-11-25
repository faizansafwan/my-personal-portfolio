export const consoleMocks = [
  {
    id: 'resume-parse',
    command: 'POST /resume/parse',
    request: `POST /resume/parse HTTP/1.1
Content-Type: multipart/form-data

{ "file": "resume.docx", "locale": "en" }`,
    response: `{
  "status": "ok",
  "profile": {
    "name": "Faizan Safwan",
    "experience": [{ "title": "Associate Software Engineer", "company": "X4 Digital Labs" }],
    "skills": ["TypeScript", "NestJS", "PostgreSQL"]
  }
}`,
    insight:
      'CVeezi: PDF/Word → structured JSON so ATS scoring and AI writing share one profile, not three pasted copies.',
  },
  {
    id: 'assessment-score',
    command: 'GET /assessment/score',
    request: `GET /assessment/score?candidate_id=c-884&rubric=v3`,
    response: `{
  "candidate_id": "c-884",
  "dimensions": [
    { "id": "collaboration", "score": 78, "evidence_refs": ["q12", "q19"] }
  ],
  "reviewer_role": "client_admin"
}`,
    insight:
      'EvalzNow: competency dashboards with RBAC — stakeholders see trends without crossing role boundaries.',
  },
  {
    id: 'shop-assistant',
    command: 'POST /assistant/query',
    request: `POST /assistant/query
{ "shop_id": "s-12", "question": "Low stock items this week?" }`,
    response: `{
  "shop_id": "s-12",
  "answer": "3 SKUs below reorder point.",
  "sources": ["inventory_snapshot", "sales_7d"],
  "advisory_only": true
}`,
    insight:
      'Unitel POS assistant: answers from live shop sales and stock — same data as checkout, with role permissions applied server-side.',
  },
  {
    id: 'referral-payout',
    command: 'POST /referrals/payout',
    request: `POST /referrals/payout
{ "user_id": "u-91", "amount_cents": 2500 }`,
    response: `{
  "status": "pending",
  "stripe_transfer_id": "tr_***",
  "referral_code": "FAIZAN-QR-8K2"
}`,
    insight:
      'CVeezi referrals: Stripe payouts tied to tracked referral links and QR codes — acquisition you can audit.',
  },
];
