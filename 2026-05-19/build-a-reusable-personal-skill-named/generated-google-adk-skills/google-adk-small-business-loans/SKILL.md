---
name: google-adk-small-business-loans
description: Use Google ADK small-business-loan-agent sample patterns for loan readiness, document intake, eligibility support, and underwriting-style review.
---

# Google ADK Small Business Loans

Use this skill when Javon asks to build or use a small business loan support agent for application readiness, document review, or lender-style analysis.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/small-business-loan-agent`
- License: Apache-2.0

Workflow:
1. Clarify loan purpose, amount, business profile, financials, collateral, owner details, and lender program.
2. Build a checklist for required documents, eligibility signals, gaps, risks, and lender questions.
3. Summarize cash flow, repayment capacity, credit considerations, and missing evidence when data is provided.
4. Prepare borrower narratives and application materials grounded in provided facts.
5. When implementing, keep sensitive financial data secure and require human review for submission.

Guardrails:
- Do not guarantee approval, rates, terms, eligibility, or underwriting decisions.
- Do not fabricate revenue, expenses, tax returns, ownership, collateral, credit scores, or business history.
- Do not submit applications or share financial documents without explicit approval.
