# ARGBriX

Production-grade Next.js scaffold for an enterprise AI governance SaaS application. The app is now a standalone implementation with a public website, member workspace, mock governance engine, and Supabase-ready data model.

## What Is Included

- Public marketing website with luxury enterprise positioning
- Member login gate and authenticated workspace routes
- Dashboard, intake, workflow command center, orchestration, data governance, shadow AI, risk/control matrix, model mix, token budgets, memory, skills, testing/EWS, lessons learned/training, memos, audit, and settings pages
- Mock data for organizations, use cases, workflows, agents, handoffs, controls, model decisions, token usage, memory, skills, evals, alerts, memos, and audit events
- Deterministic local agent assessment functions
- Provider-ready interfaces for OpenAI, Anthropic, AWS Bedrock, Google Vertex AI, and local/open-source endpoints
- Supabase schema and starter RLS policy files
- Product refinement docs in `docs/refinement/`
- Security test plan in `docs/security/SECURITY_TEST_PLAN.md`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS / Shadcn UI-ready styling
- Supabase Auth and database-ready architecture
- Zod / React Hook Form dependencies for production forms
- Recharts and jsPDF dependencies for future chart/export work

## Setup

```bash
npm install
npm run test
npm run typecheck
npm run build
npm run dev
```

Then open `http://localhost:3000`.

## Oracle Free Tier Deployment

This app is ready to run on an Oracle Cloud Free Tier VM as a Next.js service behind Nginx.

Deployment assets:

- `Dockerfile`
- `.dockerignore`
- `deploy/oracle/README.md`
- `deploy/oracle/argbrix.service`
- `deploy/oracle/nginx.argbrix.conf`

High-level deployment path:

1. Create an Ubuntu VM in Oracle Cloud.
2. Open inbound `80` and `443` in the Oracle VCN security rules.
3. SSH into the VM and install Node, npm, Git, and Nginx.
4. Copy or clone this repo into `/opt/argbrix`.
5. Run `npm install`, `npm run test`, and `npm run build`.
6. Install `deploy/oracle/argbrix.service` as a systemd service.
7. Install `deploy/oracle/nginx.argbrix.conf` as the Nginx reverse proxy.

Full instructions are in `deploy/oracle/README.md`.

If using Supabase, copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Run the SQL files in order:

1. `lib/supabase/schema.sql`
2. `lib/supabase/rls-policies.sql`

## Key Routes

- `/` marketing home
- `/product`
- `/methodology`
- `/request-access`
- `/login`
- `/dashboard`
- `/use-cases`
- `/workflows`
- `/orchestration`
- `/data-governance`
- `/shadow-ai`
- `/risk-controls`
- `/cost`
- `/token-governance`
- `/memory`
- `/skills`
- `/testing`
- `/learning`
- `/meta-harness`
- `/memos`
- `/audit`
- `/settings`

Internal feeder route:

- `/app-library` version-controlled regulatory and best-practice source feeder for governed update proposals

## Architecture Notes

The first build uses deterministic mock data. Live LLM APIs are intentionally not required. The abstractions in `lib/agents/contracts.ts` define the integration boundary for:

- `ModelProvider`
- `ModelRouter`
- `TokenTracker`
- `AgentRunner`
- `EvalRunner`
- `GovernanceMemoGenerator`

This keeps the app model-mix ready instead of binding it to one provider.

## Meta-Harness Layer

The app now includes a Meta Harness Center at `/meta-harness`.

It applies the same meta-harness idea used in `AGENTS.md` to the product itself:

- evaluates project, agent, skill, security, and deployment harnesses
- tracks acceptance checks and validation commands
- scores correctness, validation, cost, latency, reliability, maintainability, and invasiveness
- identifies Pareto-best harnesses that improve outcomes without weakening safety
- records residual risks and next actions for future runs

Use this route to explain how the platform governs its own agents and skills, not only client AI workflows.

## Refinement Pack

The refinement docs are intended to pressure-test the product before go-live:

1. `docs/refinement/00-grill-questions.md`
2. `docs/refinement/01-product-brief.md`
3. `docs/refinement/02-v1-scope.md`
4. `docs/refinement/03-object-model-rationalization.md`
5. `docs/refinement/04-role-policy-matrix.md`
6. `docs/refinement/05-demo-script.md`
7. `docs/refinement/06-go-live-decision.md`
8. `docs/refinement/07-platform-companion-positioning.md`

## Local Environment Note

This workspace did not include a package manager on `PATH`, so verification was performed with a copied local dependency tree and the Next.js WASM SWC fallback:

```bash
env NEXT_TEST_WASM_DIR=./node_modules/@next/swc-wasm-nodejs ./node_modules/.bin/next build --webpack
env NEXT_TEST_WASM_DIR=./node_modules/@next/swc-wasm-nodejs ./node_modules/.bin/next start -p 3000
```

On a normal machine with `npm`, use the standard commands in the setup section.

## Source Direction

This build does not import, parse, or depend on a static HTML file. The Next.js routes and components are the source of truth.
