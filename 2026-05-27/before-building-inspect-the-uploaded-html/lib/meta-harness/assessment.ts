import type { MetaHarnessAssessment, MetaHarnessCandidate } from "@/lib/types";

function candidateScore(candidate: MetaHarnessCandidate) {
  const score = (value: string) =>
    value === "passed" || value === "stable" || value === "low" || value === "none"
      ? 2
      : value === "partial" || value === "medium"
        ? 1
        : 0;

  return (
    score(candidate.correctness) +
    score(candidate.validation) +
    score(candidate.reliability) +
    score(candidate.maintainability) +
    score(candidate.cost) +
    score(candidate.latency) +
    score(candidate.invasiveness)
  );
}

export function generateMetaHarnessAssessment(): MetaHarnessAssessment {
  const candidates: MetaHarnessCandidate[] = [
    {
      id: "mh-project-core",
      name: "Project build and governance validation harness",
      scope: "Project",
      taskSet: "Validate app integrity after product, UX, architecture, and deployment changes.",
      acceptanceChecks: [
        "TypeScript passes",
        "Deterministic governance tests pass",
        "Next production build passes",
        "Material failures are captured in .meta-harness/runs"
      ],
      validationCommands: [
        "./node_modules/.bin/tsc -p tsconfig.tests.json",
        "node --test .test-dist/tests/*.test.js",
        "./node_modules/.bin/tsc --noEmit",
        "next build"
      ],
      correctness: "passed",
      validation: "passed",
      cost: "low",
      latency: "medium",
      reliability: "stable",
      maintainability: "passed",
      invasiveness: "low",
      currentSignal: "18 deterministic tests and 31-route production build are passing.",
      improvement: "Add a single validation script and CI job so future agents do not rediscover local command quirks."
    },
    {
      id: "mh-agent-output",
      name: "Agent output acceptance harness",
      scope: "Agent",
      taskSet: "Ensure every governance agent produces structured JSON, summary, assumptions, evidence, risk flags, next action, token estimate, and model recommendation.",
      acceptanceChecks: [
        "Agent output includes required fields",
        "Risk flags are tied to evidence",
        "Recommended next action is human-reviewable",
        "Output does not let user input control system behavior"
      ],
      validationCommands: ["node --test .test-dist/tests/*.test.js"],
      correctness: "partial",
      validation: "partial",
      cost: "low",
      latency: "low",
      reliability: "stable",
      maintainability: "partial",
      invasiveness: "low",
      currentSignal: "Core deterministic agents are covered, but not every future provider-backed agent has schema-level contract tests.",
      improvement: "Add shared AgentOutput contract tests for all agent runners before connecting live LLM providers."
    },
    {
      id: "mh-skill-governance",
      name: "Skill lifecycle optimization harness",
      scope: "Skill",
      taskSet: "Evaluate reusable skills for approval, versioning, depreciation, and evidence requirements.",
      acceptanceChecks: [
        "Skill has owner and control",
        "Eval score is above approval threshold",
        "Change request has reason and reviewer",
        "Training or policy update is linked when skill changes affect enterprise behavior"
      ],
      validationCommands: ["Manual reviewer approval", "Future: skill eval batch"],
      correctness: "partial",
      validation: "unknown",
      cost: "medium",
      latency: "medium",
      reliability: "flaky",
      maintainability: "partial",
      invasiveness: "medium",
      currentSignal: "Skills page tracks owner, control, score, and status, but approval evidence is still mock-level.",
      improvement: "Use meta-harness scoring to decide whether a skill is approved, needs retraining, or should be deprecated."
    },
    {
      id: "mh-security",
      name: "Prompt and compression attack harness",
      scope: "Security",
      taskSet: "Detect prompt injection, role forgery, evidence tampering, encoded payloads, and dense token packing before workflow approval.",
      acceptanceChecks: [
        "Instruction override is blocked",
        "Encoded payload is blocked",
        "Dense token packing is blocked",
        "Invisible control characters are normalized"
      ],
      validationCommands: ["node --test .test-dist/tests/*.test.js"],
      correctness: "passed",
      validation: "passed",
      cost: "low",
      latency: "low",
      reliability: "stable",
      maintainability: "passed",
      invasiveness: "low",
      currentSignal: "Prompt firewall tests cover classic injection, role forgery, evidence tampering, encoded payloads, and compression-style attacks.",
      improvement: "Expand fixtures with multilingual attacks, document-borne injections, and retrieval poisoning samples."
    },
    {
      id: "mh-deployment",
      name: "Oracle deployment readiness harness",
      scope: "Deployment",
      taskSet: "Keep deployment assets executable, scoped, and compatible with Oracle Free Tier hosting.",
      acceptanceChecks: [
        "Standalone Next build is enabled",
        "Dockerfile builds from clean install",
        "Nginx proxies to localhost:3000",
        "Runbook explains VM, ports, systemd, and HTTPS"
      ],
      validationCommands: ["next build", "Future: docker build .", "Future: curl public host"],
      correctness: "partial",
      validation: "partial",
      cost: "medium",
      latency: "medium",
      reliability: "stable",
      maintainability: "passed",
      invasiveness: "low",
      currentSignal: "Standalone build and Oracle runbook exist; public host validation waits on Oracle VM access.",
      improvement: "Add post-deploy smoke checks once the Oracle public IP or domain is available."
    }
  ];

  const paretoBest = [...candidates]
    .sort((a, b) => candidateScore(b) - candidateScore(a))
    .slice(0, 3)
    .map((candidate) => candidate.name);

  return {
    summary:
      "The meta-harness layer evaluates the app, agents, skills, security tests, and deployment path as reusable operating harnesses. It keeps the best checks, records traces, and highlights where a weak harness would let bad AI governance work slip through.",
    activeHarness: [
      "AGENTS.md meta-harness overlay",
      "TypeScript strict checks",
      "Deterministic governance test suite",
      "Prompt firewall security fixtures",
      "Next production build",
      "Oracle deployment runbook",
      ".meta-harness/runs trace store"
    ],
    candidates,
    paretoBest,
    appOptimizations: [
      "Expose a Meta Harness Center so reviewers can see validation posture instead of hidden developer checks.",
      "Make Ready, Set, Grow modules inherit acceptance checks before artifacts are considered governed.",
      "Use run traces as audit evidence for product changes, agent changes, and deployment changes.",
      "Convert repeated failures into backlog items, training updates, and stronger tests."
    ],
    skillOptimizations: [
      "Apply correctness, validation, cost, latency, reliability, maintainability, and invasiveness scoring to governed skills.",
      "Require skill owners to define acceptance checks before approval.",
      "Deprecate skills that are useful but flaky, unverifiable, or too invasive for regulated workflows.",
      "Feed skill eval failures into lessons learned and training modules."
    ],
    runTrace: {
      id: "mh-run-current",
      task: "Optimize Veris app and governed skills using the meta-harness model.",
      harnessUsed: [
        "Project instructions",
        "Meta-harness skill",
        "TypeScript checks",
        "Node deterministic tests",
        "Next production build"
      ],
      changedSurface: [
        "Meta-harness assessment library",
        "Meta Harness Center route",
        "Workspace navigation",
        "Governed skill display",
        "Tests and documentation"
      ],
      validations: [
        { command: "./node_modules/.bin/tsc -p tsconfig.tests.json", result: "unknown", note: "Run after implementation" },
        { command: "node --test .test-dist/tests/*.test.js", result: "unknown", note: "Run after implementation" },
        { command: "./node_modules/.bin/tsc --noEmit", result: "unknown", note: "Run after implementation" },
        { command: "next build", result: "unknown", note: "Run after implementation" }
      ],
      failures: [],
      residualRisks: [
        "Live LLM-provider agents are not connected yet, so meta-harness scoring is deterministic and mock-data based.",
        "Oracle public-host validation requires VM credentials or a public URL."
      ],
      createdAt: "2026-05-28"
    },
    nextActions: [
      "Add provider-backed agent contract tests before connecting live LLM APIs.",
      "Create a CI validation command that runs typecheck, deterministic tests, and build in one step.",
      "Connect post-deploy Oracle smoke checks after the VM is available.",
      "Use harness scores as approval criteria for future governed skills."
    ]
  };
}
