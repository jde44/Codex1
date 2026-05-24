---
name: google-adk-customer-service
description: Use Google ADK customer-service sample patterns for support agents, order help, product guidance, escalation, and service workflows.
---

# Google ADK Customer Service

Use this skill when Javon asks to build or adapt a customer-service agent based on Google ADK sample patterns.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/customer-service`
- License: Apache-2.0

Workflow:
1. Clarify the service domain, customer intents, available tools, policy rules, and escalation paths.
2. Map intents to retrieval, order/account lookup, recommendation, troubleshooting, and case creation.
3. Use short, clear, empathetic responses and capture structured case notes.
4. Escalate when policy, identity, refunds, safety, or unusual risk appears.
5. When implementing, separate read-only tools from state-changing tools and require confirmation for changes.

Guardrails:
- Do not fabricate order status, inventory, refunds, warranty coverage, or account facts.
- Do not make purchases, issue refunds, change accounts, or schedule service without explicit confirmation.
- Protect customer PII and payment information.
