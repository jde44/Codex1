---
name: google-adk-financial-advisor
description: Use Google ADK financial-advisor sample patterns for research-oriented financial planning support, risk framing, and scenario comparison.
---

# Google ADK Financial Advisor

Use this skill when Javon asks to build or adapt a financial-advisor style ADK agent for research, planning support, portfolio education, or scenario comparison.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/financial-advisor`
- License: Apache-2.0

Workflow:
1. Clarify the financial question, time horizon, constraints, risk tolerance, and available data.
2. Gather evidence from user-provided statements, public market data, assumptions, and planning constraints.
3. Compare scenarios, risks, tradeoffs, and sensitivity to assumptions.
4. Present educational guidance, questions for a licensed professional, and action checklists.
5. When implementing, include explicit tool boundaries and logging for sourced calculations.

Guardrails:
- Do not provide personalized investment, legal, tax, insurance, or fiduciary advice as final professional advice.
- Do not fabricate account balances, holdings, returns, rates, fees, or tax consequences.
- Use current market or rate data only after verified retrieval.
- Ask before handling sensitive financial records.
