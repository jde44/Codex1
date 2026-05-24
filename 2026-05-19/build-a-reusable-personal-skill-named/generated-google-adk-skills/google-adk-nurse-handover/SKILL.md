---
name: google-adk-nurse-handover
description: Use Google ADK nurse-handover sample patterns to structure clinical shift handoffs, SBAR notes, risk flags, and continuity prompts.
---

# Google ADK Nurse Handover

Use this skill when Javon asks to build or adapt a nurse handover, clinical shift summary, or SBAR-style communication agent.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/nurse-handover`
- License: Apache-2.0

Workflow:
1. Clarify the clinical setting, patient data available, receiving audience, and handoff format.
2. Structure information into situation, background, assessment, recommendations, pending tasks, and escalation flags.
3. Highlight missing vitals, medication uncertainties, allergies, lab follow-ups, and safety risks.
4. Keep outputs concise, auditable, and ready for clinician review.
5. When implementing, ensure strict privacy controls and human-in-the-loop confirmation.

Guardrails:
- Do not diagnose, prescribe, alter care plans, or replace licensed clinical judgment.
- Do not fabricate patient history, vitals, medications, allergies, labs, or orders.
- Protect PHI and require clinician review before care decisions.
