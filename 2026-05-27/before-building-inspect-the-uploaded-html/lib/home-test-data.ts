export const operatingScenarios = [
  {
    name: "Regulatory reporting variance commentary",
    bucket: "Set",
    owner: "Controller organization",
    status: "Testing",
    signal: "Evidence package 77% complete",
    nextAction: "Compliance approval and lineage attachment"
  },
  {
    name: "Credit decisioning support intake",
    bucket: "Ready",
    owner: "Consumer lending risk",
    status: "Submitted",
    signal: "Decision-impact and fair-lending review required",
    nextAction: "Assign compliance, model risk, and data owner reviewers"
  },
  {
    name: "Governance memo for conditional approval",
    bucket: "Know",
    owner: "AI Governance Committee",
    status: "Draft",
    signal: "Evidence checklist and open issues attached",
    nextAction: "Finalize reviewer rationale and revisit triggers"
  }
];

export const homeActivityFeed = [
  "Use case intake captured owner, data source, model/vendor, decision impact, and launch timing.",
  "Risk classifier marked regulatory reporting workflow high risk pending compliance and data-owner review.",
  "PARCM mapper linked variance commentary risks to controls, evidence, cadence, and escalation.",
  "Evidence vault flagged missing CDE certification and lineage attachment.",
  "Governance memo builder drafted conditional approval with open issues and revisit triggers."
];

export const bucketNarratives = {
  ready: {
    headline: "Know whether the use case can enter review.",
    proof:
      "A credit decisioning support intake captures owners, data, model/vendor context, regulatory exposure, and human review needs."
  },
  set: {
    headline: "Turn the use case into a controlled workflow.",
    proof:
      "The reporting workflow moves through PARCM control mapping, evidence requirements, open gaps, and escalation."
  },
  know: {
    headline: "Produce evidence people can approve and audit.",
    proof:
      "The governance memo explains the risk tier, controls, evidence, decisions, issues, and monitoring triggers."
  }
};
