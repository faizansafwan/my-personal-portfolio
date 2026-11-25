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
    command: 'POST /assistant/ask',
    request: `POST /assistant/ask
{ "shop_id": "s-12", "question": "me sathiye low stock items monawada?" }`,
    response: `{
  "detected_language": "si-Latn",
  "answer": "මේ සතියේ items 3ක් reorder level එකට වඩා අඩුයි.",
  "sources": ["inventory_snapshot", "sales_7d"],
  "role_checked": "cashier",
  "advisory_only": true
}`,
    insight:
      'Aqra POS assistant: answers in English, Sinhala, or Tamil — even typed in English letters — from live shop data, with staff roles checked on the server.',
  },
  {
    id: 'bill-scan',
    command: 'POST /supplier-bills/scan',
    request: `POST /supplier-bills/scan
Content-Type: multipart/form-data

{ "file": "supplier_bill.jpg", "store_id": "st-2" }`,
    response: `{
  "supplier": "Lanka Distributors",
  "bill_no": "INV-20418",
  "lines": [
    { "item": "Sugar 1kg", "qty": 24, "cost": 265, "batch": "B-771", "expiry": "2027-03-01" },
    { "item": "Dhal (loose)", "qty_kg": 12.5, "cost_per_kg": 410 }
  ],
  "status": "ready_for_review"
}`,
    insight:
      'Aqra POS bill scan: a photo, PDF, or Excel sheet becomes item lines with weights, batches, and expiry — pre-filled for a quick check before stock moves.',
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
