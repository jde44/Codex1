# Project Instructions

<!-- meta-harness:start -->
## Meta-Harness Overlay

Algorithm mapping:

- Treat the current request as task set `X` and Codex as model `M`.
- Treat project instructions, setup commands, validation commands, scripts, fixtures, CI checks, and task templates as candidate harnesses `H`.
- Treat `.meta-harness/runs/` plus harness files such as `AGENTS.md`, scripts, and test config as filesystem store `D`.
- Evaluate harnesses by correctness, validation status, cost, latency, reliability, maintainability, and invasiveness.
- Keep the Pareto-best harness: improve task success without weakening safety, tests, maintainability, or user control.

Before implementation:

1. Capture a compact environment snapshot: working directory, git state, key files, likely package managers, likely test commands, and existing project instructions.
2. Identify the active harness `H`: instructions, setup steps, validation commands, scripts, and conventions that will govern the run.
3. Define the acceptance surface in concrete terms: files likely touched, validation commands, and observable success criteria.
4. Query filesystem store `D`: check previous `.meta-harness/runs/` traces when present and reuse relevant failure lessons.

During implementation:

1. Keep edits scoped to the current request.
2. Treat instructions, setup scripts, validation scripts, test scripts, and repository conventions as harness code.
3. Run interface validation before keeping harness changes: they must be executable, scoped, understandable, and compatible with the project.
4. Prefer improving the harness when repeated failures come from missing context, weak validation, or unclear setup.
5. Record material failures, retries, and final validation in `.meta-harness/runs/` for future runs.

Before final response:

1. Run the highest-signal available validation.
2. Save a short trace with outcome, harness used, changed files, commands run, lightweight scores/signals, failures, and remaining risks.
3. Report only the user-relevant result and any verification gaps.

Safety boundaries:

- Do not broaden write scope without a task reason.
- Do not overwrite user changes.
- Do not hide failed checks; record and report them.
- Do not treat benchmark-style optimization as permission to weaken quality gates.
<!-- meta-harness:end -->
