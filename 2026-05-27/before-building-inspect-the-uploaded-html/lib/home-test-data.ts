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
    name: "Shadow AI writing tool detected in reporting close",
    bucket: "Ready",
    owner: "AI Governance Office",
    status: "Triage",
    signal: "High-risk unmanaged usage",
    nextAction: "Contain, interview owner, convert to governed workflow"
  },
  {
    name: "UK AI watchlist mapped to policy update",
    bucket: "Grow",
    owner: "Legal and Compliance",
    status: "Proposed",
    signal: "Regulatory reference update awaiting approval",
    nextAction: "Review source note and approve control mapping"
  }
];

export const homeActivityFeed = [
  "Data Governance Agent flagged lineage gap for regulatory reporting workflow.",
  "Model router recommended local extraction before frontier reasoning.",
  "Regulatory reference feeder drafted UK AI watchlist policy mapping for approval.",
  "Prompt firewall blocked encoded instruction override in intake text.",
  "Learning Loop assigned prompt injection training after vendor chatbot retest."
];

export const bucketNarratives = {
  ready: {
    headline: "Find readiness gaps before AI reaches production.",
    proof:
      "A reporting-close shadow AI tool is routed into owner review, sensitive-data controls, and policy embeds."
  },
  set: {
    headline: "Turn a use case into a governed workflow.",
    proof:
      "The reporting workflow moves through intake, risk tiering, model routing, evidence, and approval."
  },
  grow: {
    headline: "Keep the program learning after launch.",
    proof:
      "Signals, training, regulatory updates, and drift alerts feed controls before issues spread."
  }
};
