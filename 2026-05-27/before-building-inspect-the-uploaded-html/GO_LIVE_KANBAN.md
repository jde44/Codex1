# Go-Live Kanban

Status as of May 27, 2026.

## Done

| Ticket | Priority | Owner | Acceptance Criteria |
| --- | --- | --- | --- |
| ARGBriX-001 Next.js scaffold and route map | P0 | Engineering | Public pages, demo pages, and member workspace routes exist and prerender. |
| ARGBriX-002 Mock governance domain model | P0 | Product / Engineering | Mock use cases, agents, handoffs, controls, tests, alerts, memos, and audit events support all core screens. |
| ARGBriX-003 Core deterministic test harness | P0 | Engineering | Node test suite covers intake assessment, model routing, token estimate, role capability, and intake validation logic. |
| ARGBriX-004 Supabase starter schema and RLS draft | P0 | Backend | Schema and RLS starter files exist for organizations, profiles, workflows, agents, controls, evals, alerts, memos, and audit events. |
| ARGBriX-005 Production build smoke pass | P0 | Engineering | `next build --webpack` passes and prerenders 28 routes. |
| ARGBriX-038 Product refinement doc pack | P0 | Product | Grill questions, product brief, V1 scope, object rationalization, role/policy matrix, demo script, and go-live decision framework are documented. |
| ARGBriX-042 Prompt firewall baseline | P0 | Security / Engineering | Instruction override, policy exfiltration, role forgery, evidence tampering, encoded payload, dense token packing, invisible text, and adversarial intake routing tests pass. |
| ARGBriX-049 Shadow AI and learning-loop modules | P0 | Product / Engineering | Shadow AI Tracking and Lessons Learned/Training pages exist with deterministic agent logic and tests for containment, conversion, training, and feedback-loop behavior. |

## Ready For Build

| Ticket | Priority | Owner | Acceptance Criteria |
| --- | --- | --- | --- |
| ARGBriX-006 Normalize dependency installation | P0 | Engineering | Project has a clean lockfile from `npm install` or chosen package manager; no copied `node_modules` dependency on local Codex cache. |
| ARGBriX-007 Implement real Supabase Auth | P0 | Backend | Login uses Supabase Auth; sessions persist; logout works; unauthenticated users cannot access private routes. |
| ARGBriX-008 Add route protection middleware | P0 | Backend | `/dashboard` and private app routes redirect unauthenticated users to `/login`; role-based route restrictions are enforced. |
| ARGBriX-009 Persist use case intake submissions | P0 | Full stack | Intake form validates with React Hook Form and Zod, writes to `use_cases`, creates workflow, emits audit event, and shows success/error states. |
| ARGBriX-010 Replace static workspace data with repository layer | P0 | Full stack | Page components read through typed repository functions that can switch between mock mode and Supabase mode. |
| ARGBriX-011 Verify and harden RLS policies | P0 | Security / Backend | Automated tests prove org users cannot read or write another organization's records; super admin bypass is explicitly tested. |
| ARGBriX-012 Implement organization and user management | P0 | Full stack | Client admins can invite users, assign roles, deactivate access, and view organization membership. |
| ARGBriX-013 Real governance memo export | P0 | Full stack | PDF export, Markdown export, copy to clipboard, and save-to-evidence-library actions produce usable artifacts. |
| ARGBriX-014 Evidence library persistence | P0 | Backend | Evidence artifacts are stored with organization, workflow, type, owner, status, and audit trail linkage. |
| ARGBriX-015 Audit event service | P0 | Backend | Intake, agent run, handoff, control update, eval result, memo export, approval, alert, memory update, and skill update actions create immutable audit events. |
| ARGBriX-039 Simplify demo narrative | P0 | Product / Design | `/demo` follows one guided regulatory reporting workflow and removes or hides modules that do not support the approval decision. |
| ARGBriX-040 Reduce dashboard object noise | P0 | Product / Frontend | Dashboard surfaces only the metrics needed for use case approval, evidence readiness, risk, cost, and open decisions. |
| ARGBriX-041 Simplify Data Governance Agent page | P0 | Product / Frontend | Data readiness, role responsibilities, and policy embedding are legible at executive level with drill-down tables below. |
| ARGBriX-046 Add platform signal model | P1 | Product / Engineering | Create a V1 mock object for Snowflake, Databricks, AWS, Azure, and catalog signals that can become risk, control, owner, evidence, alert, memo, and audit events. |
| ARGBriX-047 Add companion positioning to marketing/demo | P1 | Product / Design | Public pages explain that the app complements Snowflake, Databricks, AWS, Azure, Purview, Collibra, and Alation without replacing them. |
| ARGBriX-048 Secure cloud integration architecture | P1 | Architecture / Security | Document private networking, metadata-first ingestion, no unnecessary data copy, tenant isolation, and customer-cloud deployment patterns. |
| ARGBriX-050 Shadow AI signal integration design | P1 | Security / Architecture | Define metadata-first ingestion from SSO, network, expense, browser, help desk, cloud logs, and data platforms without unnecessary surveillance or business-data copying. |
| ARGBriX-051 Training evidence integration | P1 | Governance / Engineering | Define how LMS, HR learning, policy attestations, and control coaching completion feed back into audit evidence. |

## Design And UX Hardening

| Ticket | Priority | Owner | Acceptance Criteria |
| --- | --- | --- | --- |
| ARGBriX-016 Browser visual QA pass | P0 | Design / Frontend | Public home, demo, dashboard, intake, memo, and mobile viewport are reviewed with screenshots; no clipping, overlap, or unreadable text. |
| ARGBriX-017 Standalone visual QA review | P1 | Design / Product | Review the current Next.js implementation as the source of truth and record any visual or workflow improvements before launch. |
| ARGBriX-018 Shadcn UI component integration | P1 | Frontend | Buttons, inputs, tables, dialogs, tabs, toasts, and forms use a consistent Shadcn-compatible component system. |
| ARGBriX-019 Charting and cost visualization | P1 | Frontend | Model mix, token spend, budget burn, EWS, and risk trend charts render with real data inputs and accessible labels. |
| ARGBriX-020 Empty, loading, and error states | P1 | Frontend | Every private page has polished empty, loading, and error states suitable for demos and production use. |
| ARGBriX-021 Executive memo print layout | P1 | Design / Frontend | Memo page has a print/PDF-ready layout with page breaks, header/footer, approval metadata, and evidence references. |

## Governance Engine

| Ticket | Priority | Owner | Acceptance Criteria |
| --- | --- | --- | --- |
| ARGBriX-022 Agent runner orchestration state machine | P0 | Platform | Workflow engine can run deterministic agents in order, pause on gates, resume after approval, and create handoff packets. |
| ARGBriX-023 Token and cost policy engine | P0 | Platform | Budgets are enforced at monthly, workflow, agent, and per-run levels; 70/85/100% alerts and 150% spike alerts are emitted. |
| ARGBriX-024 Model price and capability registry | P1 | Platform | Model routing uses configurable provider, model tier, cost, context, latency, data sensitivity, and allowed-use metadata. |
| ARGBriX-025 Memory governance workflow | P1 | Platform / Data Governance | Proposed memory updates can be approved, rejected, expired, excluded for sensitivity, and audited. |
| ARGBriX-026 Skills approval workflow | P1 | Platform / Governance | Skill change requests support version history, approval, rejection, deprecation, and evidence linkage. |
| ARGBriX-027 Testing and eval runner | P1 | Platform | Mock eval modules execute and persist results; later LLM-backed evals can plug into the same interface. |
| ARGBriX-028 EWS alert lifecycle | P1 | Platform | Alerts can be triggered, assigned, acknowledged, remediated, resolved, and linked to audit events. |

## Security, Compliance, And Production Readiness

| Ticket | Priority | Owner | Acceptance Criteria |
| --- | --- | --- | --- |
| ARGBriX-029 Security threat model | P0 | Security | Threat model covers auth, RLS, prompt injection, memory misuse, evidence tampering, export leakage, and multi-tenant isolation. |
| ARGBriX-030 Secrets and environment management | P0 | DevOps | Required env vars are documented, validated at startup, and never exposed to the client unless explicitly public. |
| ARGBriX-031 CI pipeline | P0 | DevOps | CI runs install, test, typecheck, lint, build, and migration validation on every PR. |
| ARGBriX-032 Deployment target | P0 | DevOps | Staging and production deployment paths are defined with Supabase project separation and rollback plan. |
| ARGBriX-033 Observability | P1 | DevOps | App logs, error reporting, audit service failures, slow route metrics, and export failures are observable. |
| ARGBriX-034 Accessibility review | P1 | Frontend | Keyboard navigation, focus states, contrast, headings, labels, and table semantics meet WCAG AA expectations. |
| ARGBriX-035 Legal/privacy retention review | P1 | Compliance | Memory retention, evidence storage, exported memos, and audit records have documented retention and deletion policy. |
| ARGBriX-043 Auth bypass regression suite | P0 | Security / Backend | Private route tests include Next internal-header bypass attempts and server-side authorization checks, not middleware-only checks. |
| ARGBriX-044 LLM red-team corpus | P0 | Security / AI Governance | Prompt injection, indirect injection, encoded/compressed payload, role forgery, tool misuse, evidence tampering, and output injection cases run in CI. |
| ARGBriX-045 Dependency and advisory automation | P0 | DevOps / Security | Lockfile exists, dependency audit runs in CI, and Next.js/Supabase advisories are reviewed before deploy. |

## Blocked

| Ticket | Priority | Owner | Blocker | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| ARGBriX-036 In-app browser screenshot QA | P0 | Frontend | Browser plugin endpoint returned `Browser is not available: iab` in this environment. | Capture desktop and mobile screenshots for home, demo, dashboard, intake, and memo pages. |
| ARGBriX-037 External reference diff | P2 | Product / Design | Optional only; no launch dependency. | Compare any future reference artifact against the standalone Next.js implementation and open tickets only for material gaps. |

## Current Test Evidence

| Check | Result |
| --- | --- |
| `tsc -p tsconfig.tests.json` | Pass |
| `node --test .test-dist/tests/*.test.js` | Pass, 18 tests |
| `tsc --noEmit` | Pass |
| `env NEXT_TEST_WASM_DIR=./node_modules/@next/swc-wasm-nodejs ./node_modules/.bin/next build --webpack` | Pass, 31 static routes |
| Standalone HTML response check | Pass, `/` returned 15,319 bytes and key content rendered for `/`, `/demo`, and `/dashboard` |
