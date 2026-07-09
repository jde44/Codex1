export const offeringBuckets = [
  {
    id: "ready",
    name: "Ready",
    label: "Assess and classify",
    summary:
      "Submit AI use cases, capture ownership and exposure, classify risk, and identify the review path before deployment.",
    outcome: "Risk-tiered AI use case with owner, missing information, required reviewers, and approval posture.",
    metrics: [
      { label: "Intake status", value: "Submitted", detail: "Owner, workflow, data, model, and launch timing captured" },
      { label: "Risk tier", value: "High", detail: "Regulated reporting and credit-decisioning exposure" },
      { label: "Review path", value: "4 teams", detail: "Risk, compliance, data, and report owner review required" }
    ],
    capabilities: [
      "AI use case intake",
      "Risk tier classification",
      "Owner and reviewer assignment",
      "Data and regulatory exposure capture",
      "Go pause review status"
    ],
    agents: [
      "Use Case Intake Agent",
      "Risk Classifier Agent",
      "Reviewer Assignment Agent"
    ],
    primaryRoute: "/use-cases"
  },
  {
    id: "set",
    name: "Set",
    label: "Map the workflow",
    summary:
      "Use PARCM to connect process, activities, risks, controls, evidence requirements, monitoring, and escalation.",
    outcome: "Workflow control map with policy-to-control traceability and open gaps.",
    metrics: [
      { label: "PARCM map", value: "Draft", detail: "Process, activities, risks, controls, and monitoring linked" },
      { label: "Control gaps", value: "3", detail: "Lineage, CDE certification, and sensitivity controls" },
      { label: "Evidence readiness", value: "77%", detail: "Target 95% before monitored launch" }
    ],
    capabilities: [
      "PARCM workflow setup",
      "Risk and control mapping",
      "Evidence requirement mapping",
      "Control owner assignment",
      "Monitoring and escalation plan"
    ],
    agents: [
      "Control Mapper Agent",
      "Evidence Requirement Agent",
      "Monitoring Plan Agent"
    ],
    primaryRoute: "/workflows"
  },
  {
    id: "know",
    name: "Know",
    label: "Produce decision memory",
    summary:
      "Generate governance memos, evidence packs, decision logs, issue logs, and monitoring summaries that auditors can follow.",
    outcome: "Audit-ready governance memo with evidence, approvals, issues, and revisit triggers.",
    metrics: [
      { label: "Memo state", value: "Conditional", detail: "Approval pending evidence closure" },
      { label: "Open issues", value: "3", detail: "Each has owner, due date, and escalation path" },
      { label: "Revisit trigger", value: "30 days", detail: "Post-launch monitoring review cadence" }
    ],
    capabilities: [
      "Governance memo generation",
      "Evidence pack assembly",
      "Decision log",
      "Issue tracker",
      "Monitoring summary"
    ],
    agents: [
      "Governance Memo Agent",
      "Evidence Pack Agent",
      "Decision Memory Agent"
    ],
    primaryRoute: "/memos"
  }
];

export const futureModules = [
  "Prompt Firewall",
  "Shadow AI Detector",
  "Token Budget Drift",
  "Model Mix Governance",
  "Board KPIs",
  "Early Warnings",
  "Full Regulatory Report Builder",
  "Clinical / HR Decision Support"
];

export const boardKpis = [
  { label: "Use case", value: "Reporting AI", detail: "Variance commentary and anomaly review" },
  { label: "Approval posture", value: "Review", detail: "High-risk workflow pending evidence closure" },
  { label: "PARCM coverage", value: "77%", detail: "Controls mapped, three gaps open" },
  { label: "Decision memory", value: "Draft", detail: "Governance memo ready for reviewer edits" }
];
