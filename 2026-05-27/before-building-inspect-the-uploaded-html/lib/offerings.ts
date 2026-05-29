export const offeringBuckets = [
  {
    id: "ready",
    name: "Ready",
    label: "Prepare the enterprise",
    summary:
      "Assess data, security, architecture, ownership, and third-party AI exposure before scale.",
    outcome: "Readiness posture with owners, gaps, controls, and evidence.",
    metrics: [
      { label: "Readiness score", value: "62", detail: "Conditional for controlled pilot" },
      { label: "Critical gaps", value: "3", detail: "Lineage, CDEs, sensitive data routing" },
      { label: "Policy embeds", value: "10", detail: "Data, report, process, model risk, retention" }
    ],
    capabilities: [
      "SIFI-grade data governance readiness",
      "Federated ownership and stewardship assessment",
      "Security architecture and access control review",
      "Third-party model and vendor oversight",
      "Data sovereignty and residency assessment",
      "Cloud data platform signal intake",
      "AI macro-risk and regulatory trend watch",
      "Shadow AI discovery and conversion"
    ],
    agents: [
      "Data Governance Agent",
      "Shadow AI Tracking Agent",
      "Third-Party Model Oversight Agent",
      "Security Architecture Readiness Agent"
    ],
    primaryRoute: "/data-governance"
  },
  {
    id: "set",
    name: "Set",
    label: "Stand up sustainable governance",
    summary:
      "Move use cases through intake, risk, controls, model routing, testing, approval, and evidence.",
    outcome: "Governed workflows with policy-to-control traceability.",
    metrics: [
      { label: "Use cases in flow", value: "24", detail: "7 high-risk workflows" },
      { label: "Pending approvals", value: "9", detail: "Compliance, data, model risk" },
      { label: "Evidence package", value: "77%", detail: "Target 95% before launch" }
    ],
    capabilities: [
      "AI use case intake",
      "PARCM workflow setup",
      "Agent orchestration and handoffs",
      "Risk and control mapping",
      "Model mix and routing decisions",
      "Token budget governance",
      "Testing and eval setup",
      "Governance memo generation"
    ],
    agents: [
      "Orchestration Agent",
      "Risk Classifier Agent",
      "Control Mapper Agent",
      "Model Strategy and Routing Agent"
    ],
    primaryRoute: "/workflows"
  },
  {
    id: "grow",
    name: "Grow",
    label: "Monitor, learn, and scale",
    summary:
      "Track AI KPIs, drift, lessons, training, escalation, and remediation.",
    outcome: "Continuous monitoring with learning and remediation.",
    metrics: [
      { label: "EWS alerts", value: "5", detail: "2 require escalation" },
      { label: "Training actions", value: "2", detail: "Prompt injection and AI intake" },
      { label: "Lessons captured", value: "3", detail: "Fed back into controls" }
    ],
    capabilities: [
      "Board KPI monitoring",
      "Early warning signals",
      "Regulatory expectation monitoring",
      "Program drift detection",
      "Model and context drift monitoring",
      "Shadow AI trend reporting",
      "Lessons learned capture",
      "Role-based training triggers",
      "Remediation and audit trail updates"
    ],
    agents: [
      "Early Warning Signal Monitoring Agent",
      "Lessons Learned and Training Agent",
      "Token and Cost Governance Agent",
      "Prompt and Context Risk Agent"
    ],
    primaryRoute: "/testing"
  }
];

export const boardKpis = [
  { label: "AI readiness", value: "Conditional", detail: "3 blockers before monitored launch" },
  { label: "Governance flow", value: "24", detail: "Active use cases across the enterprise" },
  { label: "Program drift", value: "Watch", detail: "Memory drift and spend spike under review" },
  { label: "Enterprise learning", value: "3", detail: "Lessons converted into training and controls" }
];
