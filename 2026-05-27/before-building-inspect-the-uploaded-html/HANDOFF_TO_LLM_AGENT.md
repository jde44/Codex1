# Zess AI LLM Agent Handoff

## Current State

Zess AI is a Next.js App Router application for an AI governance command center. It is built as a SaaS-style front end with public marketing pages, a member workspace, deterministic mock governance agents, Supabase-ready schema/RLS files, and Oracle Free Tier deployment notes.

The app has been renamed from "Agentic Risk Governance Command Center" to **Zess AI** across visible app chrome, metadata, package name, README, deployment files, and refinement docs.

## Repository Access

- GitHub repo: `https://github.com/jde44/Codex1.git`
- Branch: `ARGBriX`
- Product rename commit: `1c89b32 Rename app to Zess AI`
- Pull request creation link: `https://github.com/jde44/Codex1/pull/new/ARGBriX`

The branch was pushed successfully with the full app scaffold under the dated project folder.

## Local Paths

Repo root:

```text
/Users/javonedwards/Documents/Codex
```

App working directory:

```text
/Users/javonedwards/Documents/Codex/2026-05-27/before-building-inspect-the-uploaded-html
```

Primary files and folders edited during this build:

```text
app/
components/
lib/
docs/
deploy/oracle/
tests/
README.md
GO_LIVE_KANBAN.md
package.json
next.config.ts
tsconfig.json
tsconfig.tests.json
```

Important new/changed files:

```text
components/dashboard/workspace-nav.tsx
components/marketing/site-nav.tsx
components/marketing/home-bucket-panel.tsx
components/dashboard/workspace-shell.tsx
lib/offerings.ts
lib/home-test-data.ts
lib/agents/deterministic.ts
lib/security/prompt-firewall.ts
lib/meta-harness/assessment.ts
lib/supabase/schema.sql
lib/supabase/rls-policies.sql
deploy/oracle/zess-ai.service
deploy/oracle/nginx.zess-ai.conf
docs/security/SECURITY_TEST_PLAN.md
```

## Local Server

Current local URL:

```text
http://localhost:3000
```

The app was last restarted with:

```bash
env NEXT_TEST_WASM_DIR=./node_modules/@next/swc-wasm-nodejs ./node_modules/.bin/next start -p 3000
```

Note: `next start` warns because `next.config.ts` uses `output: "standalone"`. It still serves locally in this environment. For production standalone deployment, prefer the generated standalone server or the Oracle instructions.

## Install And Run

From the app directory:

```bash
npm install
npm run test
npm run typecheck
npm run build
npm run dev
```

In this Codex environment, `npm` may not be on PATH. Existing validation has used direct binaries:

```bash
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/tsc -p tsconfig.tests.json
node --test .test-dist/tests/*.test.js
env NEXT_TEST_WASM_DIR=./node_modules/@next/swc-wasm-nodejs ./node_modules/.bin/next build --webpack
```

After `next build`, Next may mutate `tsconfig.json` by adding `.next/types/**/*.ts` and `.next/dev/types/**/*.ts` to `include`. Restore `include` to:

```json
[
  "next-env.d.ts",
  "**/*.ts",
  "**/*.tsx"
]
```

## Validation Last Run

Last successful validation before handoff:

```text
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/tsc -p tsconfig.tests.json
node --test .test-dist/tests/*.test.js
env NEXT_TEST_WASM_DIR=./node_modules/@next/swc-wasm-nodejs ./node_modules/.bin/next build --webpack
```

Tests passed:

```text
20/20 deterministic governance tests passed
32 static routes prerendered by Next build
```

## Product Shape

Public/top-level routes:

```text
/
/product
/platform
/methodology
/about
/contact
/request-access
/login
```

Member/workspace routes:

```text
/dashboard
/data-governance
/shadow-ai
/risk-controls
/use-cases
/workflows
/orchestration
/cost
/token-governance
/memory
/skills
/testing
/learning
/meta-harness
/memos
/audit
/settings
/organization
/access-management
```

Internal feeder route:

```text
/app-library
```

The app is organized around three parent operating buckets:

- Ready: data governance readiness, shadow AI, security/control readiness, third-party model oversight, sovereignty, macro-risk watch.
- Set: use case intake, PARCM workflow setup, orchestration, controls, model routing, token budgets, tests, memos.
- Grow: board KPIs, early warning signals, program drift, context/model drift, learning loop, training, remediation, audit updates.

## Recent UX Decisions

- Public home is blue/white bank-style, inspired by the provided Truist source reference.
- The old `/demo` page was removed. Demo-like behavior now uses sample operating records across the home and workspace.
- `/login` is now the member workspace front door, not a plain auth card.
- Workspace side navigation is an accordion. Ready, Set, and Grow are parent buttons. Only the active bucket expands.
- Top nav and workspace nav both show active state.
- App Library is not front-stage. It remains an internal version-controlled feeder for regulatory/reference update proposals.
- Copy was compressed across major headers and high-traffic pages to reduce wordiness.

## Architecture Notes

The app uses deterministic local functions first. No live LLM API is required.

Key architecture concepts:

- Supabase-ready auth/database architecture
- Supabase RLS starter policies
- Provider abstraction for future OpenAI, Anthropic, Bedrock, Vertex, and local model endpoints
- Model mix governance rather than hard-coding one provider
- Deterministic agents for intake, risk, data governance, shadow AI, prompt firewall, app library proposals, learning loop, and meta-harness assessment
- Mock data located mainly in `lib/mock-data/platform.ts`
- Type definitions in `lib/types.ts`
- Supabase SQL in `lib/supabase/schema.sql` and `lib/supabase/rls-policies.sql`

## Security And Governance

Prompt/security tests currently cover:

- Classic prompt injection
- Role forgery
- Evidence tampering
- Encoded payloads
- Dense token packing / compression-style attacks
- Invisible character normalization
- Adversarial intake routing

Security plan:

```text
docs/security/SECURITY_TEST_PLAN.md
```

Go-live backlog:

```text
GO_LIVE_KANBAN.md
```

## Deployment Notes

Oracle deployment assets:

```text
deploy/oracle/README.md
deploy/oracle/zess-ai.service
deploy/oracle/nginx.zess-ai.conf
Dockerfile
.dockerignore
```

Expected Oracle app path:

```text
/opt/zess-ai
```

## Known Repo Caveats

The Git repo root contains unrelated untracked folders and `.DS_Store` changes outside this app. They were intentionally not staged or committed.

Current clean scope for this app is:

```text
2026-05-27/before-building-inspect-the-uploaded-html/
```

If continuing work, stage only this app directory unless the user explicitly asks to include other repo-level files.

## Suggested Next Steps

1. Open a PR from `ARGBriX` into the target base branch.
2. Add a lockfile with a clean dependency install if this is moving toward deployment.
3. Add real Supabase Auth and route protection middleware.
4. Add repository-layer functions so pages can switch from mock data to Supabase.
5. Add visual QA screenshots for `/`, `/login`, `/dashboard`, `/data-governance`, `/use-cases`, and `/memos`.
6. Add CI to run typecheck, deterministic tests, and production build.
7. Connect Oracle hosting or another deployment target once a public URL/domain is available.
