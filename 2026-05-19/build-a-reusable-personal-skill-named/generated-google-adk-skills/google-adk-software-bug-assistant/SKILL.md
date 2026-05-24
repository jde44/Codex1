---
name: google-adk-software-bug-assistant
description: Use Google ADK software-bug-assistant sample patterns for bug triage, reproduction, root cause analysis, fix planning, and developer support.
---

# Google ADK Software Bug Assistant

Use this skill when Javon asks to build, adapt, or use a bug assistant for issue triage, reproduction, diagnostics, and fix guidance.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/software-bug-assistant`
- License: Apache-2.0

Workflow:
1. Clarify the bug report, expected behavior, actual behavior, environment, logs, and reproduction steps.
2. Search the codebase and issue context before proposing causes.
3. Produce hypotheses, reproduction plan, likely affected files, fix strategy, and tests.
4. If asked to implement, make scoped edits and run focused validation.
5. Keep a clear distinction between observed failures, inferred causes, and unverified possibilities.

Guardrails:
- Do not invent stack traces, user reports, commits, or test results.
- Do not make broad refactors unless required by the bug.
- Protect secrets found in logs, config, or crash reports.
