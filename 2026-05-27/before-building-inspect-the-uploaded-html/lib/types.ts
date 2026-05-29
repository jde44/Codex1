export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type WorkflowStatus =
  | "Intake"
  | "Control mapping"
  | "Data review"
  | "Testing"
  | "Red team"
  | "Approved"
  | "Monitored";

export type UseCase = {
  id: string;
  name: string;
  owner: string;
  businessUnit: string;
  risk: RiskLevel;
  status: WorkflowStatus;
  nextAction: string;
  evidenceCompletion: number;
  monthlyTokens: number;
  monthlyCost: number;
  approvedForMonitoring: boolean;
  controls: string[];
};

export type OperatingSignal = {
  label: string;
  state: "Triggered" | "Passed" | "Review required" | "Pending" | "Healthy";
  value: string;
  severity: RiskLevel;
};

export type AgentStep = {
  step: string;
  agent: string;
  controlGate: string;
  humanReview: boolean;
  evidence: string;
};

export type ModelRoute = {
  task: string;
  primaryModel: string;
  fallbackModel: string;
  monthlyCost: number;
  tokenShare: number;
  policy: string;
};

export type MemoryArtifact = {
  name: string;
  scope: "Workflow" | "Enterprise" | "User";
  retention: string;
  driftState: "Stable" | "Review" | "Restricted";
};

export type Skill = {
  name: string;
  owner: string;
  control: string;
  evalScore: number;
};

export type AppLibrarySource = {
  id: string;
  title: string;
  category:
    | "Responsible AI"
    | "Regulatory expectation"
    | "Technical standard"
    | "Data governance"
    | "SIFI practice"
    | "Jurisdictional law"
    | "Internal policy";
  sourceOwner: string;
  jurisdiction: string;
  version: string;
  status: "Draft" | "Under review" | "Approved" | "Retired";
  summary: string;
  keyExpectations: string[];
  relatedControls: string[];
  lastReviewed: string;
  nextReview: string;
};

export type AppLibraryProposal = {
  id: string;
  sourceId: string;
  proposedBy: string;
  proposalType: "New entry" | "Version update" | "Control update" | "Retirement" | "Policy mapping";
  summary: string;
  rationale: string;
  impactedAreas: string[];
  requiredApprover: string;
  approvalStatus: "Proposed" | "Needs changes" | "Approved" | "Rejected";
  versionBefore: string;
  versionAfter: string;
  evidenceNeeded: string;
};

export type AppLibraryAssessment = {
  summary: string;
  sources: AppLibrarySource[];
  proposals: AppLibraryProposal[];
  versionControls: Array<{ control: string; purpose: string; owner: string; evidence: string }>;
  nextActions: string[];
};

export type EvalAlert = {
  name: string;
  result: "Passed" | "Failed" | "Watch";
  threshold: string;
  lastRun: string;
  escalation: string;
};

export type MemoSection = {
  title: string;
  body: string;
  evidence: string;
};

export type UserRole =
  | "public_visitor"
  | "demo_viewer"
  | "member"
  | "client_admin"
  | "governance_reviewer"
  | "risk_compliance"
  | "data_owner"
  | "business_owner"
  | "auditor"
  | "super_admin";

export type Organization = {
  id: string;
  name: string;
  plan: "Demo" | "Enterprise" | "Advisory";
};

export type AgentDefinition = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "Active" | "Paused" | "Draft";
  responsibilities: string[];
};

export type HandoffPacket = {
  id: string;
  workflowId: string;
  fromAgent: string;
  toAgent: string;
  task: string;
  contextSummary: string;
  inputs: string[];
  constraints: string[];
  openQuestions: string[];
  decisionLog: string[];
  evidence: string[];
  tokenBudget: number;
  modelRecommendation: string;
  riskFlags: string[];
  requiredHumanApproval: boolean;
  status: "Queued" | "In review" | "Complete";
  createdAt: string;
};

export type RiskControl = {
  risk: string;
  category: string;
  description: string;
  inherentRisk: RiskLevel;
  residualRisk: RiskLevel;
  control: string;
  controlType: "Preventive" | "Detective" | "Corrective";
  owner: string;
  evidenceRequired: string;
  frequency: string;
  status: "Mapped" | "Gap" | "Testing" | "Approved";
  escalationTrigger: string;
  relatedAgent: string;
  relatedModel: string;
  costMetric: string;
};

export type ModelDecision = {
  workload: string;
  risk: RiskLevel;
  complexity: "Low" | "Medium" | "High";
  dataSensitivity: "Low" | "Medium" | "High";
  recommendedModel: string;
  modelTier: "Frontier" | "Mid-tier" | "Lightweight" | "Local";
  reason: string;
  humanReviewRequirement: string;
  estimatedCost: string;
  savingsOpportunity: string;
};

export type TokenBudgetControl = {
  scope: string;
  budget: string;
  currentUsage: string;
  utilization: number;
  control: string;
  trigger: string;
};

export type GovernanceTest = {
  name: string;
  purpose: string;
  result: "Pass" | "Watch" | "Fail";
  threshold: string;
  evidence: string;
  remediationAction: string;
  owner: string;
  dueDate: string;
};

export type AuditEvent = {
  id: string;
  eventType: string;
  actor: string;
  description: string;
  createdAt: string;
};

export type DataGovernanceMaturity = "Not started" | "Emerging" | "Defined" | "Managed" | "Optimized";

export type DataGovernanceDimension = {
  id: string;
  name: string;
  currentState: DataGovernanceMaturity;
  targetState: DataGovernanceMaturity;
  score: number;
  owner: string;
  federatedDomain: string;
  finding: string;
  requiredAction: string;
  evidenceNeeded: string;
  aiReadinessImpact: RiskLevel;
};

export type DataGovernanceGap = {
  gap: string;
  category:
    | "Ownership"
    | "CDE"
    | "Lineage"
    | "Quality"
    | "Access"
    | "Metadata"
    | "Controls"
    | "Operating model";
  severity: RiskLevel;
  currentState: string;
  targetState: string;
  remediation: string;
  owner: string;
  dueDate: string;
  evidence: string;
};

export type PolicyOperationalizationRole = {
  role: string;
  responsibility: string;
  decisionRights: string;
  auditAction: string;
  enterprisePolicyLink: string;
  evidence: string;
  cadence: string;
};

export type EnterprisePolicyEmbedding = {
  policy: string;
  requiredUpdate: string;
  controlObjective: string;
  accountableRole: string;
  auditEvidence: string;
  status: "Gap" | "Draft" | "Mapped" | "Embedded";
};

export type DataGovernanceAssessment = {
  useCaseName: string;
  federatedModel: string;
  overallScore: number;
  readinessTier: "Blocked" | "Conditional" | "Ready for controlled pilot" | "Ready for monitored operation";
  summary: string;
  dimensions: DataGovernanceDimension[];
  gaps: DataGovernanceGap[];
  policyRoles: PolicyOperationalizationRole[];
  enterprisePolicyEmbedding: EnterprisePolicyEmbedding[];
  nextActions: string[];
};

export type ShadowAISignalSource =
  | "Network"
  | "SSO"
  | "Expense"
  | "Browser"
  | "Cloud logs"
  | "Data platform"
  | "Help desk"
  | "Survey";

export type ShadowAIFinding = {
  id: string;
  signal: string;
  source: ShadowAISignalSource;
  businessArea: string;
  suspectedTool: string;
  risk: RiskLevel;
  status: "New" | "Triaged" | "Contained" | "Converted" | "Exception approved";
  evidence: string;
  recommendedAction: string;
  owner: string;
  policyImpact: string;
};

export type ShadowAIAssessment = {
  overallRisk: RiskLevel;
  unapprovedTools: number;
  highRiskFindings: number;
  conversionCandidates: number;
  summary: string;
  findings: ShadowAIFinding[];
  controls: Array<{
    control: string;
    purpose: string;
    owner: string;
    evidence: string;
    cadence: string;
  }>;
  nextActions: string[];
};

export type TrainingModule = {
  id: string;
  title: string;
  audience: string;
  trigger: string;
  objective: string;
  delivery: "Microlearning" | "Workshop" | "Policy update" | "Office hours" | "Control coaching";
  status: "Draft" | "Assigned" | "Live" | "Needs refresh";
  evidence: string;
};

export type LessonLearned = {
  id: string;
  sourceEvent: string;
  lesson: string;
  rootCause: string;
  enterpriseUpdate: string;
  targetPolicy: string;
  targetControl: string;
  trainingModule: string;
  owner: string;
  status: "Captured" | "Approved" | "Published" | "Embedded";
};

export type FeedbackLoopAssessment = {
  summary: string;
  lessons: LessonLearned[];
  trainings: TrainingModule[];
  metrics: Array<{ label: string; value: string; detail: string }>;
  operatingLoop: string[];
};

export type MetaHarnessScore = "passed" | "partial" | "failed" | "unknown";
export type MetaHarnessEffort = "low" | "medium" | "high";
export type MetaHarnessReliability = "stable" | "flaky" | "blocked";
export type MetaHarnessInvasiveness = "none" | "low" | "medium" | "high";

export type MetaHarnessCandidate = {
  id: string;
  name: string;
  scope: "Project" | "Agent" | "Skill" | "Workflow" | "Security" | "Deployment";
  taskSet: string;
  acceptanceChecks: string[];
  validationCommands: string[];
  correctness: MetaHarnessScore;
  validation: MetaHarnessScore;
  cost: MetaHarnessEffort;
  latency: MetaHarnessEffort;
  reliability: MetaHarnessReliability;
  maintainability: MetaHarnessScore;
  invasiveness: MetaHarnessInvasiveness;
  currentSignal: string;
  improvement: string;
};

export type MetaHarnessRunTrace = {
  id: string;
  task: string;
  harnessUsed: string[];
  changedSurface: string[];
  validations: Array<{ command: string; result: MetaHarnessScore; note: string }>;
  failures: string[];
  residualRisks: string[];
  createdAt: string;
};

export type MetaHarnessAssessment = {
  summary: string;
  activeHarness: string[];
  candidates: MetaHarnessCandidate[];
  paretoBest: string[];
  appOptimizations: string[];
  skillOptimizations: string[];
  runTrace: MetaHarnessRunTrace;
  nextActions: string[];
};

export type IntakeFormInput = {
  useCaseName: string;
  businessProcess: string;
  processOwner: string;
  businessOwner: string;
  dataOwner: string;
  reportOwner: string;
  aiPurpose: string;
  aiOutputType: string;
  dataTypesUsed: string;
  criticalDataElements: string;
  systemsInvolved: string;
  thirdPartyTools: string;
  modelProvider: string;
  modelFamily: string;
  localModelAllowed: boolean;
  openSourceModelAllowed: boolean;
  frontierModelRequired: boolean;
  sensitiveDataInvolved: boolean;
  regulatedReporting: boolean;
  customerImpact: boolean;
  financialImpact: boolean;
  employeeImpact: boolean;
  humanApprovalRequired: boolean;
  expectedUsers: string;
  expectedFrequency: string;
  monthlyTokenBudget: number;
  workflowBudget: number;
  knownRisks: string;
  existingControls: string;
  requiredLaunchDate: string;
};
