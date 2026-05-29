import type {
  AgentDefinition,
  AppLibraryAssessment,
  AuditEvent,
  DataGovernanceAssessment,
  GovernanceTest,
  HandoffPacket,
  MemoryArtifact,
  ModelDecision,
  OperatingSignal,
  RiskControl,
  Skill,
  TokenBudgetControl
} from "@/lib/types";
import { generateDataGovernanceAssessment } from "@/lib/agents/deterministic";
import { generateAppLibraryAssessment, generateFeedbackLoopAssessment, generateShadowAIAssessment } from "@/lib/agents/deterministic";
import { executiveMetrics, memoSections, modelRoutes, operatingSignals, useCases } from "@/lib/data";

export { executiveMetrics, memoSections, modelRoutes, operatingSignals, useCases };

export const dashboardMetrics = [
  { label: "Active AI use cases", value: "24", detail: "6 approved for monitored use" },
  { label: "High-risk AI use cases", value: "7", detail: "4 pending approval" },
  { label: "Open control gaps", value: "11", detail: "3 tied to regulated reporting" },
  { label: "Pending approvals", value: "9", detail: "Compliance, data, model risk" },
  { label: "Monthly token spend", value: "$3,850", detail: "77% of monthly budget" },
  { label: "Budget utilization", value: "77%", detail: "Escalates at 85%" },
  { label: "Highest cost model", value: "Frontier reasoning", detail: "$1,460 projected" },
  { label: "Highest cost agent", value: "Finance writer", detail: "38% of token burn" },
  { label: "Early warning signals", value: "5", detail: "2 require escalation" },
  { label: "Evidence completion", value: "77%", detail: "Target is 95% before launch" },
  { label: "Awaiting review", value: "4", detail: "Workflow gates blocked" },
  { label: "Skills pending approval", value: "6", detail: "2 high-risk updates" },
  { label: "Memory reviews", value: "3", detail: "1 sensitive exclusion" }
];

export const agents: AgentDefinition[] = [
  {
    id: "agent-orchestration",
    name: "Orchestration Agent",
    category: "Workflow control",
    description: "Maintains workflow state, model tiering, handoff discipline, budget gates, and human review pauses.",
    status: "Active",
    responsibilities: ["Select next agent", "Enforce token budgets", "Route exceptions", "Update audit trail"]
  },
  {
    id: "agent-intake",
    name: "Intake Agent",
    category: "PARCM intake",
    description: "Converts intake submissions into structured summaries, assumptions, gaps, and first handoff packets.",
    status: "Active",
    responsibilities: ["Find missing fields", "Create use case summary", "Create assumptions", "Open handoff"]
  },
  {
    id: "agent-risk",
    name: "Risk Classifier Agent",
    category: "Risk",
    description: "Classifies inherent risk, identifies drivers, and recommends required reviews.",
    status: "Active",
    responsibilities: ["Classify tier", "Identify drivers", "Assign inherent risk", "Recommend reviews"]
  },
  {
    id: "agent-data-governance",
    name: "Data Governance Agent",
    category: "AI readiness",
    description: "Assesses whether domain data is governed, traceable, certified, protected, and fit for AI under a federated data model.",
    status: "Active",
    responsibilities: [
      "Assess CDE readiness",
      "Identify lineage gaps",
      "Validate federated ownership",
      "Flag data product contract gaps",
      "Recommend AI readiness remediation"
    ]
  },
  {
    id: "agent-shadow-ai",
    name: "Shadow AI Tracking Agent",
    category: "Enterprise monitoring",
    description: "Detects unmanaged AI usage signals and routes them to containment, conversion, exception approval, or closure.",
    status: "Active",
    responsibilities: [
      "Correlate metadata signals",
      "Score unmanaged AI risk",
      "Preserve evidence",
      "Recommend contain or convert actions",
      "Feed patterns into training"
    ]
  },
  {
    id: "agent-learning-loop",
    name: "Lessons Learned and Training Agent",
    category: "Enterprise enablement",
    description: "Converts incidents, eval failures, shadow AI findings, and approval gaps into training, policy updates, and control improvements.",
    status: "Active",
    responsibilities: [
      "Capture lessons learned",
      "Identify root causes",
      "Propose training modules",
      "Update policy-to-control guidance",
      "Track enterprise feedback loop adoption"
    ]
  },
  {
    id: "agent-app-library",
    name: "App Library Agent",
    category: "Regulatory intelligence",
    description:
      "Maintains a version-controlled library of responsible AI, regulatory expectations, standards, and SIFI data-domain practices; drafts update proposals for approval before publication.",
    status: "Active",
    responsibilities: [
      "Ingest source references",
      "Classify standards and regulatory expectations",
      "Maintain version history",
      "Draft policy and control update proposals",
      "Require owner approval before publication"
    ]
  },
  {
    id: "agent-cost",
    name: "Token and Cost Governance Agent",
    category: "Cost",
    description: "Tracks token budgets by workflow, agent, model, and organization, with threshold escalation.",
    status: "Active",
    responsibilities: ["Track token usage", "Trigger 70/85/100 alerts", "Detect spikes", "Recommend cheaper routing"]
  },
  {
    id: "agent-memory",
    name: "Memory Governance Agent",
    category: "Memory",
    description: "Reviews what should be remembered, excluded, expired, or approved for governed reuse.",
    status: "Active",
    responsibilities: ["Detect sensitive memory", "Detect drift", "Propose expiration", "Require approval"]
  },
  {
    id: "agent-decision",
    name: "Decision Documentation Agent",
    category: "Evidence",
    description: "Turns agent activity, decisions, tests, controls, and exceptions into audit-ready memos.",
    status: "Active",
    responsibilities: ["Generate memo", "Capture decisions", "Capture assumptions", "Document approvals"]
  }
];

export const handoffs: HandoffPacket[] = [
  {
    id: "handoff-001",
    workflowId: "wf-variance-001",
    fromAgent: "Intake Agent",
    toAgent: "Risk Classifier Agent",
    task: "Classify regulatory reporting variance commentary use case",
    contextSummary: "Finance team wants AI-generated variance commentary with anomaly indicators before submission.",
    inputs: ["Business process: regulatory reporting", "Sensitive financial data", "Human approval required"],
    constraints: ["No final submission without compliance approval", "Evidence package must reach 95%"],
    openQuestions: ["Confirm source lineage for CDEs", "Confirm model retention settings"],
    decisionLog: ["Classified as high-risk due to reporting and financial impact"],
    evidence: ["Intake record", "CDE list", "Owner attestation"],
    tokenBudget: 125000,
    modelRecommendation: "Frontier for reasoning, mid-tier for summarization, local redaction pre-pass",
    riskFlags: ["Regulated reporting", "Financial impact", "Sensitive data"],
    requiredHumanApproval: true,
    status: "In review",
    createdAt: "May 27, 2026"
  }
];

export const riskControls: RiskControl[] = [
  {
    risk: "Unsupported variance explanation",
    category: "Output integrity",
    description: "Model may generate commentary not supported by source financial data.",
    inherentRisk: "High",
    residualRisk: "Medium",
    control: "Source citation and reviewer approval before memo export",
    controlType: "Preventive",
    owner: "Regulatory Reporting",
    evidenceRequired: "Citation map, reviewer sign-off, exception log",
    frequency: "Every workflow run",
    status: "Testing",
    escalationTrigger: "Unsupported claim rate above 2%",
    relatedAgent: "Prompt and Context Risk Agent",
    relatedModel: "Frontier reasoning",
    costMetric: "$0.42 per reviewed run"
  },
  {
    risk: "Prompt injection alters workflow decision",
    category: "Adversarial risk",
    description: "User or source text may attempt to bypass controls or approvals.",
    inherentRisk: "High",
    residualRisk: "Medium",
    control: "Prompt injection eval and instruction hierarchy validation",
    controlType: "Detective",
    owner: "Model Risk",
    evidenceRequired: "Red team run, failure log, remediation evidence",
    frequency: "Pre-launch and monthly",
    status: "Mapped",
    escalationTrigger: "Any failed high-severity injection test",
    relatedAgent: "Adversarial Red Team Agent",
    relatedModel: "Mid-tier evaluator",
    costMetric: "$120 monthly eval batch"
  },
  {
    risk: "Frontier model overuse drives avoidable cost",
    category: "Cost governance",
    description: "Routine subtasks may route to expensive models without justification.",
    inherentRisk: "Medium",
    residualRisk: "Low",
    control: "Model mix decision matrix and budget threshold gates",
    controlType: "Preventive",
    owner: "AI Platform",
    evidenceRequired: "Routing log, model decision, token ledger",
    frequency: "Continuous",
    status: "Approved",
    escalationTrigger: "Spend exceeds 85% or frontier use lacks justification",
    relatedAgent: "Token and Cost Governance Agent",
    relatedModel: "Model router",
    costMetric: "23% savings opportunity"
  }
];

export const modelDecisions: ModelDecision[] = [
  {
    workload: "Variance reasoning",
    risk: "High",
    complexity: "High",
    dataSensitivity: "High",
    recommendedModel: "Frontier reasoning with human review",
    modelTier: "Frontier",
    reason: "Complex financial narrative with regulated reporting impact.",
    humanReviewRequirement: "Compliance approval required",
    estimatedCost: "$1.12 per run",
    savingsOpportunity: "Use mid-tier model for first draft when variance is below threshold"
  },
  {
    workload: "Source extraction",
    risk: "Medium",
    complexity: "Medium",
    dataSensitivity: "High",
    recommendedModel: "Local structured extractor",
    modelTier: "Local",
    reason: "Sensitive data can remain in controlled environment.",
    humanReviewRequirement: "Data owner spot check",
    estimatedCost: "$0.08 per run",
    savingsOpportunity: "Avoid frontier call for deterministic extraction"
  },
  {
    workload: "Memo formatting",
    risk: "Low",
    complexity: "Low",
    dataSensitivity: "Medium",
    recommendedModel: "Lightweight drafting model",
    modelTier: "Lightweight",
    reason: "Low reasoning need after decisions are fixed.",
    humanReviewRequirement: "Reviewer confirms final recommendation",
    estimatedCost: "$0.04 per run",
    savingsOpportunity: "Cache standard memo sections"
  }
];

export const tokenBudgetControls: TokenBudgetControl[] = [
  { scope: "Monthly organization budget", budget: "$5,000", currentUsage: "$3,850", utilization: 77, control: "Budget owner review at 85%", trigger: "Spend exceeds 85%" },
  { scope: "Workflow budget", budget: "$800", currentUsage: "$612", utilization: 76, control: "Pause at 100%", trigger: "Workflow exceeds budget" },
  { scope: "Agent budget", budget: "125k tokens", currentUsage: "96k tokens", utilization: 77, control: "Router substitution", trigger: "Agent exceeds allocation" },
  { scope: "Per-run ceiling", budget: "18k tokens", currentUsage: "14.5k tokens", utilization: 81, control: "Human approval required", trigger: "Run exceeds ceiling" },
  { scope: "Spike baseline", budget: "150% baseline", currentUsage: "141%", utilization: 94, control: "Spike monitor", trigger: "Usage exceeds 150%" }
];

export const memoryItems: MemoryArtifact[] = [
  { name: "Reg reporting variance lexicon", scope: "Workflow", retention: "90 days", driftState: "Review" },
  { name: "Approved SOX commentary examples", scope: "Enterprise", retention: "1 year", driftState: "Stable" },
  { name: "Reviewer preference notes", scope: "User", retention: "30 days", driftState: "Restricted" },
  { name: "Sensitive CDE examples", scope: "Workflow", retention: "Excluded", driftState: "Restricted" }
];

export const governedSkills: Skill[] = [
  { name: "AI use case intake skill", owner: "Governance Office", control: "Version approval", evalScore: 96 },
  { name: "Risk assessment skill", owner: "Model Risk", control: "Reviewer approval", evalScore: 92 },
  { name: "Token budget evaluator skill", owner: "AI Platform", control: "Budget owner sign-off", evalScore: 94 },
  { name: "Governance memo skill", owner: "Compliance", control: "Memo rubric", evalScore: 91 },
  { name: "Red team skill", owner: "Security", control: "Adversarial test pack", evalScore: 89 },
  { name: "Regulatory reference curation skill", owner: "Regulatory Affairs", control: "Proposal-before-publication approval", evalScore: 90 }
];

export const tests: GovernanceTest[] = [
  { name: "Risk classification accuracy", purpose: "Confirm high-risk reporting workflows are tiered correctly.", result: "Pass", threshold: ">= 90% match", evidence: "12 of 13 matched reviewer tier", remediationAction: "None", owner: "Model Risk", dueDate: "May 30, 2026" },
  { name: "Control mapping completeness", purpose: "Ensure risks have mapped owners, evidence, frequency, and triggers.", result: "Watch", threshold: "100% mapped", evidence: "2 control gaps remain", remediationAction: "Assign data lineage evidence", owner: "Compliance", dueDate: "June 3, 2026" },
  { name: "Prompt injection resistance", purpose: "Test instruction override and fake approval attempts.", result: "Pass", threshold: ">= 96% blocked", evidence: "98.2% blocked", remediationAction: "Retest vendor chatbot", owner: "Security", dueDate: "May 31, 2026" },
  { name: "Token budget adherence", purpose: "Confirm routing respects workflow and agent budgets.", result: "Fail", threshold: "<= 120% baseline", evidence: "141% token spike", remediationAction: "Apply cheaper model cascade", owner: "AI Platform", dueDate: "May 29, 2026" },
  { name: "Evidence package completeness", purpose: "Validate memo contains required artifacts.", result: "Watch", threshold: ">= 95%", evidence: "77% complete", remediationAction: "Attach lineage evidence and approval log", owner: "Internal Audit", dueDate: "June 4, 2026" }
];

export const ewsSignals: OperatingSignal[] = [
  ...operatingSignals,
  { label: "Frontier model overuse", state: "Review required", value: "2 unjustified routes", severity: "Medium" },
  { label: "Required approval missing", state: "Triggered", value: "Compliance approval", severity: "High" },
  { label: "Context drift", state: "Review required", value: "Narrative style divergence", severity: "Medium" }
];

export const auditEvents: AuditEvent[] = [
  { id: "evt-001", eventType: "Intake submitted", actor: "Business owner", description: "Regulatory reporting variance commentary use case submitted.", createdAt: "May 27, 2026 09:10" },
  { id: "evt-002", eventType: "Orchestration started", actor: "Orchestration Agent", description: "Workflow initialized and first handoff generated.", createdAt: "May 27, 2026 09:14" },
  { id: "evt-003", eventType: "Risk classified", actor: "Risk Classifier Agent", description: "Risk tier assigned as High.", createdAt: "May 27, 2026 09:19" },
  { id: "evt-004", eventType: "Controls mapped", actor: "Control Mapper Agent", description: "Three controls mapped; two evidence items pending.", createdAt: "May 27, 2026 09:37" },
  { id: "evt-005", eventType: "Token alert triggered", actor: "Token and Cost Governance Agent", description: "Budget burn reached 77%; spike monitor at 141% baseline.", createdAt: "May 27, 2026 10:02" },
  { id: "evt-006", eventType: "Governance memo created", actor: "Decision Documentation Agent", description: "Draft approval memo generated with open issues.", createdAt: "May 27, 2026 10:26" }
];

export const dataGovernanceAssessment: DataGovernanceAssessment = generateDataGovernanceAssessment({
  useCaseName: "Regulatory reporting variance commentary",
  businessProcess: "Regulatory reporting",
  processOwner: "Regulatory Reporting",
  businessOwner: "Finance Controls",
  dataOwner: "Enterprise Data Steward",
  reportOwner: "Controller organization",
  aiPurpose: "Draft variance commentary and identify anomalies before submission.",
  aiOutputType: "Narrative commentary and exception flags",
  dataTypesUsed: "Financial balances, reporting adjustments, CDEs, variance thresholds",
  criticalDataElements: "Account, entity, period, variance amount, adjustment reason",
  systemsInvolved: "GL, regulatory reporting platform, data catalog",
  thirdPartyTools: "Enterprise AI gateway",
  modelProvider: "Multi-provider router",
  modelFamily: "Frontier plus mid-tier plus local extraction",
  localModelAllowed: true,
  openSourceModelAllowed: true,
  frontierModelRequired: true,
  sensitiveDataInvolved: true,
  regulatedReporting: true,
  customerImpact: false,
  financialImpact: true,
  employeeImpact: false,
  humanApprovalRequired: true,
  expectedUsers: "15 report preparers and reviewers",
  expectedFrequency: "Monthly close cycle",
  monthlyTokenBudget: 900000,
  workflowBudget: 800,
  knownRisks: "Unsupported commentary, incomplete lineage, unresolved CDE defects, sensitive memory storage",
  existingControls: "Reviewer approval, CDE lineage control, data quality checks, access review",
  requiredLaunchDate: "2026-06-30"
}).json;

export const shadowAIAssessment = generateShadowAIAssessment().json;

export const feedbackLoopAssessment = generateFeedbackLoopAssessment().json;

export const appLibraryAssessment: AppLibraryAssessment = generateAppLibraryAssessment().json;
