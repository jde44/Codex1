---
name: google-adk-global-kyc-agent
description: Use Google ADK global-kyc-agent sample patterns for KYC onboarding, risk review, screening support, and evidence-based compliance workflows.
---

# Google ADK Global KYC Agent

Use this skill when Javon asks to build, evaluate, or adapt a KYC, onboarding, due diligence, or financial crime review agent.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/global-kyc-agent`
- License: Apache-2.0

Workflow:
1. Clarify jurisdiction, customer type, policy standard, data sources, and review decision needed.
2. Organize evidence across identity, ownership, sanctions, adverse media, geography, products, and transaction risk.
3. Produce a structured risk memo with missing information, source evidence, and escalation recommendations.
4. Keep human approval for final onboarding, filing, closure, or customer-impacting decisions.
5. When implementing, include audit logs, policy mapping, explainability, and reviewer checkpoints.

Guardrails:
- Do not fabricate identity records, sanctions hits, beneficial ownership, adverse media, or customer risk ratings.
- Do not make final legal, regulatory, SAR, account closure, or onboarding decisions.
- Protect PII, financial crime data, and confidential institution policy.
