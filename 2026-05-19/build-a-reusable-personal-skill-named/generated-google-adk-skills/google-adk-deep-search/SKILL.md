---
name: google-adk-deep-search
description: Use Google ADK deep-search sample patterns for multi-step research, source discovery, verification, synthesis, and cited reports.
---

# Google ADK Deep Search

Use this skill when Javon asks for deep research, web investigation, competitive intelligence, diligence, or cited synthesis using ADK-style search agents.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/deep-search`
- License: Apache-2.0

Workflow:
1. Clarify the research question, date sensitivity, source quality bar, geography, and output format.
2. Search broadly, then narrow to primary, authoritative, recent, and corroborating sources.
3. Track claims, citations, conflicts, uncertainty, and source limitations.
4. Deliver a concise answer first, followed by evidence, caveats, and recommended next checks.
5. When implementing, preserve separate planning, search, validation, and synthesis stages.

Guardrails:
- Browse for current facts, prices, laws, leadership, market data, or news.
- Do not invent citations, quotes, source contents, or inaccessible facts.
- Avoid over-reliance on SEO pages, unverified summaries, or low-quality aggregators.
