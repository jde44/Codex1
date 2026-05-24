---
name: google-adk-data-science
description: Use Google ADK data-science sample patterns for multi-agent analytics, SQL/Python analysis, BigQuery-style workflows, and evidence-backed insights.
---

# Google ADK Data Science

Use this skill when Javon asks for an ADK-based data science assistant, analytics workflow, SQL/Python analysis agent, or dashboard-ready insight pipeline.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/data-science`
- License: Apache-2.0

Workflow:
1. Identify the business question, dataset, metrics, data source, access method, and expected decision.
2. Route tasks across planning, data retrieval, analysis, code execution, visualization, and narrative synthesis.
3. Prefer reproducible queries or notebooks over unsupported conclusions.
4. Return assumptions, data limitations, confidence level, and next-best analyses.
5. When implementing, align with the ADK sample's multi-agent analytics pattern and keep configuration explicit.

Guardrails:
- Do not fabricate data, metrics, trends, model performance, or statistical significance.
- Separate observed facts from inference.
- Ask before using sensitive, regulated, client, employee, or financial data.
- Include validation checks for joins, filters, date ranges, missing values, and outliers.
