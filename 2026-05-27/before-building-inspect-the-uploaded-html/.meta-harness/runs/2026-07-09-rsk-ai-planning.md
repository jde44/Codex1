# Meta-Harness Trace: RSK AI Planning

Date: 2026-07-09
Task: Plan the RSK AI / Ready Set Know product reset without building yet.

Harness:
- Root and app `AGENTS.md` meta-harness overlay
- `meta-harness` skill instructions
- `frontend-app-builder` planning guidance for a future app/dashboard surface
- Existing Next.js App Router structure in `2026-05-27/before-building-inspect-the-uploaded-html`
- User-provided pasted prompt for RSK AI naming, MVP scope, legacy Zess preservation, ADRs, branch, commit, and PR flow

Snapshot Highlights:
- Git repo root: `/Users/javonedwards/Documents/Codex`
- Remote: `https://github.com/jde44/Codex1.git`
- Current branch: `ARGBriX`
- Referenced app: Next.js project named `zess-ai`
- Existing validation scripts: `test`, `typecheck`, `build`, `validate:harness`
- Existing run traces show successful deterministic tests, TypeScript checks, and Next builds.
- The current Zess app is broader than the requested reset: Ready/Set/Grow, Prompt Firewall, Shadow AI, Model Mix, Board KPIs, token governance, learning, and meta-harness modules.

Acceptance Surface For Future Build:
- Create branch `rsk-ai-product-reset` from the agreed base branch.
- Preserve Zess AI as legacy artifact.
- Rebrand active product to Ready Set Know / RSK AI.
- Narrow MVP to AI Use Case Governance, Regulated Workflow Control Mapping, and Evidence & Governance Memo Generation.
- Keep PARCM as the operating method.
- Park broad modules as future, not front-door promises.
- Add source-of-truth and ADR docs.
- Validate with product-copy searches, tests, typecheck, build, and visual QA if UI changes are made.

Commands/Inspection Run:
- `git status --short --branch`
- `git remote -v`
- `git branch --show-current`
- `find` and `rg` across the Zess app and prior GRC/risk projects
- Read `package.json`, `AGENTS.md`, prior `.meta-harness/runs`, product brief, V1 scope, demo script, homepage, offerings, and prior BridgeLayer/HarborLedger source material

Outcome:
- Planning only. No branch was created, no app/product files were edited, and no implementation was started.

Scores:
- correctness: partial, planning artifact only
- validation: inspection-only
- cost: low
- latency: low
- reliability: stable
- invasiveness: low

Remaining Risks:
- User wording conflicts with the pasted prompt on branch base: current branch `ARGBriX` vs pasted instruction to branch from `main`.
- The pasted prompt references preserving a single Claude HTML prototype, but the local project is now a full Next.js app; migration strategy should decide whether to add HTML artifacts, preserve the Next app as legacy, or both.
- The repo has unrelated dirty worktree changes outside the RSK planning surface; future implementation should avoid touching or reverting them.
