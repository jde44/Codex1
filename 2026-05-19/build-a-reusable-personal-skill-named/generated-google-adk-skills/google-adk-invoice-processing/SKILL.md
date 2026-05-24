---
name: google-adk-invoice-processing
description: Use Google ADK invoice-processing sample patterns to build or adapt invoice extraction, validation, correction, and audit workflows.
---

# Google ADK Invoice Processing

Use this skill when Javon asks to build, inspect, adapt, or prototype an invoice-processing agent using Google ADK patterns.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/invoice-processing`
- License: Apache-2.0

Workflow:
1. Clarify the invoice inputs, output schema, exception rules, and review workflow.
2. Follow the ADK sample pattern for document intake, structured extraction, validation, and correction feedback.
3. Produce schema-first outputs with confidence flags, missing fields, duplicate checks, and human review queues.
4. Include implementation notes for ADK agents, tools, environment variables, and test fixtures when code changes are requested.
5. Preserve an audit trail of source fields, extracted values, validation decisions, and manual overrides.

Guardrails:
- Do not invent invoice data, vendor details, approvals, payment status, tax values, or accounting codes.
- Flag low-confidence extraction and missing source evidence.
- Do not submit payments, approve vendors, or change financial records without explicit user approval.
- Protect confidential invoice, vendor, client, banking, and tax information.
