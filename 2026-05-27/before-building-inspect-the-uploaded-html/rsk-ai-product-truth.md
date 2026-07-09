# Ready Set Know / RSK AI - Product Source of Truth

## Current Decision

The public-facing brand architecture is **Ready Set Know**.

The app/platform name is **RSK AI**.

The prior Claude prototype name **Zess AI** is preserved as a legacy prototype name only.

## Product Thesis

RSK AI helps regulated teams govern AI use cases before they become unmanaged risk.

The product turns AI governance from policy language into an operational workflow:

1. Ready - assess and classify AI use cases.
2. Set - map the workflow using PARCM.
3. Know - produce evidence, governance memos, monitoring plans, and decision memory.

## Primary Tagline

Govern AI before risk scales.

## Naming Hierarchy

| Layer | Name |
|---|---|
| Public brand / site | Ready Set Know |
| App / platform | RSK AI |
| Legacy prototype | Zess AI |
| Methodology | PARCM |
| First product module | AI Use Case Governance |
| First demo workflow | Regulatory reporting / credit decisioning governance |

## MVP Focus

The MVP is not a broad AI GRC command center.

The MVP is:

AI Use Case Governance: submit AI use case -> classify risk -> map PARCM controls -> generate governance memo.

## Top 3 Use Cases

### 1. AI Use Case Governance

Users submit AI use cases and capture owner, business process, model/vendor, data used, regulatory exposure, decision impact, human review requirement, launch timing, known risks, and existing controls.

The system returns risk tier, missing information, required reviewers, required controls, and go / pause / review status.

### 2. Regulated Workflow Control Mapping

Users map each AI workflow through PARCM:

- Process
- Activities
- Risks
- Controls
- Monitoring

The system returns a workflow map, control requirements, evidence requirements, open gaps, and escalation path.

### 3. Evidence & Governance Memo Generation

Users generate an audit-ready governance memo.

The memo includes use case summary, risk tier rationale, data/model assumptions, required controls, evidence checklist, approval log, monitoring plan, open issues, and revisit triggers.

## MVP Screens

Keep these as MVP:

- Landing page
- Workspace dashboard
- Use Case Intake
- Risk Scoring
- PARCM Mapper
- Evidence Vault
- Decision Log
- Issue Tracker
- Governance Memo / Report Builder

Park these as phase two:

- Prompt Firewall
- Shadow AI Detector
- Token budget governance
- Full model mix router
- Board KPIs
- Early warnings
- Full regulatory reporting automation
- Clinical / HR high-risk workflows

## First Demo Scenario

A regulatory reporting team wants to use AI to draft variance commentary and identify potential anomalies before submission.

This connects RSK AI to regulated reporting, data governance, control testing, CDEs, lineage, report owner responsibilities, evidence, and AI governance.

## Build Guardrails

- Do not add new modules unless they support the three MVP use cases.
- Do not use fake customer quotes.
- Label mock data clearly.
- Keep deterministic risk tiering separate from LLM-generated narrative.
- Preserve evidence and decision traceability.
- Every AI use case must have owner, risk tier, controls, evidence, and approval status.
- PARCM is the core method.
- Governance memo is the core output.

## Go-Live Tasks

### To Do

- Add real Supabase Auth + route middleware.
- Add repository-layer functions.
- Replace mock data with Supabase-backed data.
- Build governance memo export.
- Add route-level visual QA.
- Add CI for typecheck, tests, and build.

### In Progress

- RSK AI rebrand from Zess prototype.
- MVP narrowing to three use cases.

### Done

- Product naming decision finalized.
- Source-of-truth structure created.
- Active app moved to Ready Set Know / RSK AI naming.
