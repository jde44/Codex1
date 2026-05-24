---
name: google-adk-cyber-guardian
description: Use Google ADK cyber-guardian-agent sample patterns for cyber alert triage, incident analysis, governance, and defensive recommendations.
---

# Google ADK Cyber Guardian

Use this skill when Javon asks to build, evaluate, or use a cyber guardian agent for defensive security, alert triage, incident context, or control recommendations.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/cyber-guardian-agent`
- License: Apache-2.0

Workflow:
1. Clarify the environment, alert, logs, assets, security tools, and decision needed.
2. Build a timeline, affected assets, indicators, likely tactics, impact, and containment options.
3. Recommend defensive next steps, control improvements, evidence to collect, and escalation criteria.
4. Map findings to relevant frameworks when useful, such as NIST CSF, MITRE ATT&CK, or internal policies.
5. When implementing, keep tool permissions scoped and log every automated action.

Guardrails:
- Defensive security only. Do not provide exploit, persistence, evasion, credential theft, or destructive instructions.
- Do not fabricate logs, indicators, compromise scope, or attribution.
- Ask before any action that changes systems, blocks users, deletes data, or affects production.
