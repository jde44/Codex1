import type {
  AgentStep,
  EvalAlert,
  MemoryArtifact,
  MemoSection,
  ModelRoute,
  OperatingSignal,
  Skill,
  UseCase
} from "@/lib/types";

export const useCases: UseCase[] = [
  {
    id: "uc-001",
    name: "Regulatory reporting variance commentary",
    owner: "Regulatory Reporting",
    businessUnit: "Finance Controls",
    risk: "High",
    status: "Testing",
    nextAction: "Compliance approval",
    evidenceCompletion: 77,
    monthlyTokens: 940000,
    monthlyCost: 1180,
    approvedForMonitoring: false,
    controls: ["Human sign-off", "Source lineage", "Prompt injection eval"]
  },
  {
    id: "uc-002",
    name: "Third-party AI policy summarization",
    owner: "Supplier Risk",
    businessUnit: "Procurement",
    risk: "Medium",
    status: "Control mapping",
    nextAction: "Model routing review",
    evidenceCompletion: 52,
    monthlyTokens: 410000,
    monthlyCost: 620,
    approvedForMonitoring: false,
    controls: ["PII filter", "Policy source check", "Reviewer queue"]
  },
  {
    id: "uc-003",
    name: "CDE defect triage assistant",
    owner: "Data Governance",
    businessUnit: "Enterprise Data",
    risk: "High",
    status: "Data review",
    nextAction: "Lineage evidence required",
    evidenceCompletion: 44,
    monthlyTokens: 780000,
    monthlyCost: 970,
    approvedForMonitoring: false,
    controls: ["CDE lineage", "Exception audit", "Entitlement review"]
  },
  {
    id: "uc-004",
    name: "Vendor intake chatbot",
    owner: "Third Party Office",
    businessUnit: "Operations",
    risk: "Medium",
    status: "Red team",
    nextAction: "Prompt injection retest",
    evidenceCompletion: 68,
    monthlyTokens: 360000,
    monthlyCost: 480,
    approvedForMonitoring: false,
    controls: ["Red team suite", "Knowledge boundary", "Fallback script"]
  }
];

export const operatingSignals: OperatingSignal[] = [
  { label: "Token spike threshold", state: "Triggered", value: "141% over baseline", severity: "High" },
  { label: "Budget burn", state: "Review required", value: "77% of $5,000", severity: "Medium" },
  { label: "Human approvals", state: "Pending", value: "3 pending", severity: "Medium" },
  { label: "Prompt injection eval", state: "Passed", value: "98.2% blocked", severity: "Low" },
  { label: "Memory drift", state: "Review required", value: "2 artifacts", severity: "High" }
];

export const agentSteps: AgentStep[] = [
  {
    step: "Variance intake",
    agent: "Narrative analyst",
    controlGate: "CDE source lock",
    humanReview: false,
    evidence: "Dataset hash and report period"
  },
  {
    step: "Draft commentary",
    agent: "Finance writer",
    controlGate: "Model route and prompt policy",
    humanReview: false,
    evidence: "Prompt, model, token trace"
  },
  {
    step: "Risk review",
    agent: "Control checker",
    controlGate: "SOX language and variance thresholds",
    humanReview: true,
    evidence: "Reviewer notes and exceptions"
  },
  {
    step: "Memo assembly",
    agent: "Evidence packager",
    controlGate: "Audit artifact completeness",
    humanReview: true,
    evidence: "Final memo, approvals, eval scores"
  }
];

export const modelRoutes: ModelRoute[] = [
  {
    task: "Financial variance narrative",
    primaryModel: "Frontier reasoning",
    fallbackModel: "Controlled mid-tier",
    monthlyCost: 1460,
    tokenShare: 38,
    policy: "High-risk route requires human approval"
  },
  {
    task: "Policy summarization",
    primaryModel: "Efficient long-context",
    fallbackModel: "Retrieval-only answerer",
    monthlyCost: 790,
    tokenShare: 21,
    policy: "No confidential vendor clauses in memory"
  },
  {
    task: "Control evidence extraction",
    primaryModel: "Structured extraction",
    fallbackModel: "Rules-only parser",
    monthlyCost: 610,
    tokenShare: 16,
    policy: "Schema validation before save"
  }
];

export const memoryArtifacts: MemoryArtifact[] = [
  { name: "Reg reporting variance lexicon", scope: "Workflow", retention: "90 days", driftState: "Review" },
  { name: "Approved SOX commentary examples", scope: "Enterprise", retention: "1 year", driftState: "Stable" },
  { name: "Reviewer preference notes", scope: "User", retention: "30 days", driftState: "Restricted" }
];

export const skills: Skill[] = [
  { name: "Variance commentary drafting", owner: "Finance Controls", control: "Tone and fact check", evalScore: 94 },
  { name: "Policy clause extraction", owner: "Supplier Risk", control: "Source citation required", evalScore: 91 },
  { name: "CDE defect classification", owner: "Data Governance", control: "Lineage match required", evalScore: 87 }
];

export const evalAlerts: EvalAlert[] = [
  { name: "Prompt injection suite", result: "Passed", threshold: ">= 96% block rate", lastRun: "May 27, 2026", escalation: "None" },
  { name: "Memory drift EWS", result: "Watch", threshold: "<= 1 drift artifact", lastRun: "May 27, 2026", escalation: "Model risk review" },
  { name: "Variance hallucination check", result: "Passed", threshold: "< 2% unsupported claims", lastRun: "May 26, 2026", escalation: "None" },
  { name: "Token spike monitor", result: "Failed", threshold: "< 120% of baseline", lastRun: "May 27, 2026", escalation: "Budget owner" }
];

export const memoSections: MemoSection[] = [
  {
    title: "Executive Determination",
    body: "The use case remains high risk and may proceed only under monitored testing until compliance approval and memory drift review are complete.",
    evidence: "Risk tiering, workflow controls, pending approvals"
  },
  {
    title: "Control Posture",
    body: "Human approval, source lineage, model routing, and prompt injection controls are mapped. Evidence package completion is at 77%.",
    evidence: "PARCM control matrix, eval run history"
  },
  {
    title: "Cost and Model Mix",
    body: "Monthly token spend is $3,850 against a $5,000 operating budget. A spike threshold triggered on high-risk variance generation.",
    evidence: "Token ledger, routing policy, budget EWS"
  }
];

export const executiveMetrics = [
  { label: "Active AI Use Cases", value: "24", detail: "6 approved for monitored use" },
  { label: "High-Risk Workflows", value: "7", detail: "4 pending approval" },
  { label: "Monthly Token Spend", value: "$3,850", detail: "77% of $5,000 budget" },
  { label: "EWS Alerts", value: "5", detail: "2 require escalation" }
];
