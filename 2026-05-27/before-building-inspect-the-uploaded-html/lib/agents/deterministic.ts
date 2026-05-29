import type { AgentOutput } from "@/lib/agents/contracts";
import type {
  DataGovernanceAssessment,
  DataGovernanceDimension,
  DataGovernanceGap,
  EnterprisePolicyEmbedding,
  AppLibraryAssessment,
  FeedbackLoopAssessment,
  IntakeFormInput,
  LessonLearned,
  PolicyOperationalizationRole,
  ShadowAIAssessment,
  TrainingModule
} from "@/lib/types";
import { sanitizeGovernanceText } from "../security/prompt-firewall";

export function generateUseCaseAssessment(input: IntakeFormInput): AgentOutput {
  const secureUseCaseName = sanitizeGovernanceText(input.useCaseName, 160);
  const adversarialFlags = secureUseCaseName.assessment.blocked ? ["Adversarial input detected"] : [];
  const riskFlags = [
    input.regulatedReporting ? "Regulated reporting" : "",
    input.sensitiveDataInvolved ? "Sensitive data" : "",
    input.financialImpact ? "Financial impact" : "",
    input.frontierModelRequired ? "Frontier model requested" : "",
    ...adversarialFlags
  ].filter(Boolean);

  const highRisk = riskFlags.length >= 2 || input.humanApprovalRequired;

  return {
    json: {
      riskTier: highRisk ? "High" : "Medium",
      businessProcess: input.businessProcess,
      recommendedReviews: highRisk ? ["Compliance", "Model Risk", "Data Governance"] : ["Governance Reviewer"],
      modelMix: input.localModelAllowed
        ? "Local extraction, mid-tier drafting, frontier reasoning only for exceptions"
        : "Mid-tier drafting with frontier escalation for high-risk reasoning",
      evidenceCompletion: 42
    },
    summary: `${secureUseCaseName.value || "New use case"} is classified as ${highRisk ? "High" : "Medium"} risk based on ${riskFlags.join(", ") || "standard AI workflow factors"}.`,
    assumptions: [
      "Mock deterministic assessment",
      "Final tier requires reviewer approval",
      ...(secureUseCaseName.assessment.blocked ? ["Adversarial input was blocked from controlling agent instructions"] : [])
    ],
    requiredEvidence: ["Owner attestation", "CDE lineage", "Model route decision", "Human approval record"],
    riskFlags,
    recommendedNextAction: secureUseCaseName.assessment.blocked
      ? "Route intake text to Prompt and Context Risk Agent before workflow approval"
      : highRisk
        ? "Send to compliance and model risk review"
        : "Complete control mapping",
    tokenUsageEstimate: {
      inputTokens: 4200,
      outputTokens: 1600,
      estimatedCost: highRisk ? 3.2 : 1.4
    },
    modelRecommendation: highRisk ? "Frontier reasoning with human approval gate" : "Mid-tier model with lightweight formatter"
  };
}

const maturityWeight = {
  "Not started": 10,
  Emerging: 35,
  Defined: 60,
  Managed: 82,
  Optimized: 96
};

export function generateDataGovernanceAssessment(input: IntakeFormInput): AgentOutput<DataGovernanceAssessment> {
  const secureUseCaseName = sanitizeGovernanceText(input.useCaseName, 160);
  const regulated = input.regulatedReporting || input.financialImpact;
  const sensitive = input.sensitiveDataInvolved;
  const hasCdes = input.criticalDataElements.trim().length > 0;
  const federatedModel = "Federated data product model with central policy, domain ownership, and enterprise evidence standards";

  const dimensions: DataGovernanceDimension[] = [
    {
      id: "dg-ownership",
      name: "Federated ownership and stewardship",
      currentState: input.dataOwner ? "Defined" : "Emerging",
      targetState: "Managed",
      score: input.dataOwner ? 62 : 38,
      owner: input.dataOwner || "Data Governance Office",
      federatedDomain: input.businessProcess || "Unassigned domain",
      finding: "Domain ownership is identified, but decision rights and stewardship routines need to be formalized for AI use.",
      requiredAction: "Confirm accountable domain owner, steward, approver, and escalation path for AI data use.",
      evidenceNeeded: "RACI, domain charter, approval record",
      aiReadinessImpact: "High"
    },
    {
      id: "dg-cde",
      name: "Critical data element governance",
      currentState: hasCdes ? "Defined" : "Emerging",
      targetState: "Managed",
      score: hasCdes ? 64 : 34,
      owner: input.dataOwner || "Enterprise Data",
      federatedDomain: "Finance data product",
      finding: "CDEs are named, but certification status, control ownership, and AI-use rules need evidence.",
      requiredAction: "Certify CDE list, map owners, define allowed AI usage, and capture control attestations.",
      evidenceNeeded: "CDE inventory, data product contract, control attestation",
      aiReadinessImpact: regulated ? "Critical" : "High"
    },
    {
      id: "dg-lineage",
      name: "Lineage and traceability",
      currentState: "Emerging",
      targetState: "Managed",
      score: 42,
      owner: "Data Architecture",
      federatedDomain: "Regulatory reporting domain",
      finding: "Source-to-output lineage is not complete enough to support audit-ready AI explanations.",
      requiredAction: "Map source systems, transformations, retrieval context, prompt inputs, and generated output citations.",
      evidenceNeeded: "Lineage diagram, transformation controls, retrieval log",
      aiReadinessImpact: "Critical"
    },
    {
      id: "dg-quality",
      name: "Data quality and exception management",
      currentState: "Defined",
      targetState: "Managed",
      score: 58,
      owner: input.processOwner || "Process Owner",
      federatedDomain: "Reporting operations",
      finding: "Quality rules exist, but unresolved CDE defects are not yet tied to AI workflow gates.",
      requiredAction: "Bind quality thresholds and unresolved defect rules to orchestration pause criteria.",
      evidenceNeeded: "DQ rule catalog, defect queue, workflow pause evidence",
      aiReadinessImpact: "High"
    },
    {
      id: "dg-access",
      name: "Access, sensitivity, and permitted use",
      currentState: sensitive ? "Emerging" : "Defined",
      targetState: "Managed",
      score: sensitive ? 48 : 68,
      owner: "Data Protection",
      federatedDomain: "Enterprise controls",
      finding: "Sensitive data rules need explicit model routing, masking, retention, and memory exclusion controls.",
      requiredAction: "Define permitted model routes, masking rules, memory exclusions, and approval gates for sensitive data.",
      evidenceNeeded: "Access policy, masking evidence, model route approval",
      aiReadinessImpact: sensitive ? "Critical" : "Medium"
    },
    {
      id: "dg-metadata",
      name: "Metadata and data product contracts",
      currentState: "Emerging",
      targetState: "Managed",
      score: 46,
      owner: "Data Product Owner",
      federatedDomain: "Federated data marketplace",
      finding: "The AI workflow needs machine-readable data contracts, semantic definitions, and approved use constraints.",
      requiredAction: "Publish data product contract with definitions, SLA, access rules, freshness, and AI restrictions.",
      evidenceNeeded: "Data contract, glossary entry, SLA evidence",
      aiReadinessImpact: "High"
    }
  ];

  const gaps: DataGovernanceGap[] = dimensions
    .filter((dimension) => dimension.score < maturityWeight[dimension.targetState])
    .map((dimension) => ({
      gap: dimension.name,
      category:
        dimension.id === "dg-ownership"
          ? "Ownership"
          : dimension.id === "dg-cde"
            ? "CDE"
            : dimension.id === "dg-lineage"
              ? "Lineage"
              : dimension.id === "dg-quality"
                ? "Quality"
                : dimension.id === "dg-access"
                  ? "Access"
                  : "Metadata",
      severity: dimension.aiReadinessImpact,
      currentState: dimension.currentState,
      targetState: dimension.targetState,
      remediation: dimension.requiredAction,
      owner: dimension.owner,
      dueDate: dimension.aiReadinessImpact === "Critical" ? "Before pilot approval" : "Before monitored launch",
      evidence: dimension.evidenceNeeded
    }));

  const policyRoles: PolicyOperationalizationRole[] = [
    {
      role: "Executive Sponsor",
      responsibility: "Set business priority, fund remediation, accept material tradeoffs, and ensure AI governance work is not treated as optional hygiene.",
      decisionRights: "Approve launch readiness posture, funding, and unresolved executive risk acceptance.",
      auditAction: "Confirm that governance gaps have accountable remediation plans and executive visibility.",
      enterprisePolicyLink: "Enterprise AI Governance Policy and Risk Appetite Statement",
      evidence: "Sponsor approval, funded roadmap, risk acceptance record",
      cadence: "At intake, pilot approval, monitored launch, and material escalation"
    },
    {
      role: "Enterprise Data Governance Council",
      responsibility: "Set enterprise AI data policy, approve minimum evidence standards, and resolve cross-domain conflicts.",
      decisionRights: "Approve enterprise data governance standards and escalation thresholds.",
      auditAction: "Review policy-to-control traceability and exception decisions.",
      enterprisePolicyLink: "Enterprise Data Governance Policy",
      evidence: "Council minutes, approved standard, exception register",
      cadence: "Quarterly and upon material AI policy change"
    },
    {
      role: "Domain Data Owner",
      responsibility: "Own data product fitness, permitted AI use, CDE certification, domain policy adherence, and remediation commitments.",
      decisionRights: "Approve domain data use for AI workflows and accept residual data quality risk.",
      auditAction: "Attest that governed data is fit for the approved AI purpose.",
      enterprisePolicyLink: "Data Owner Policy and Data Ownership Standard",
      evidence: "Owner attestation, data product contract, residual risk decision",
      cadence: "Per use case and monthly for monitored workflows"
    },
    {
      role: "Data Owner Lead",
      responsibility: "Coordinate data owners across domains, normalize ownership decisions, and ensure federated policy adoption is consistent.",
      decisionRights: "Escalate inconsistent domain decisions and require remediation before AI readiness approval.",
      auditAction: "Validate cross-domain ownership, issue closure, and policy implementation evidence.",
      enterprisePolicyLink: "Federated Data Governance Operating Model",
      evidence: "Cross-domain decision log, owner forum minutes, remediation tracker",
      cadence: "Biweekly during onboarding and monthly after launch"
    },
    {
      role: "Data Steward",
      responsibility: "Maintain glossary, CDE definitions, quality rules, metadata, and issue remediation evidence.",
      decisionRights: "Certify metadata completeness and data quality exception status.",
      auditAction: "Produce CDE, glossary, quality, and lineage evidence for review.",
      enterprisePolicyLink: "Metadata, CDE, and Data Quality Standards",
      evidence: "Glossary entry, CDE inventory, DQ rule results, defect log",
      cadence: "Per release and during monthly control checks"
    },
    {
      role: "AI Governance Reviewer",
      responsibility: "Translate AI policy requirements into workflow gates, approvals, monitoring triggers, and memo evidence.",
      decisionRights: "Approve readiness for controlled pilot or monitored operation.",
      auditAction: "Confirm AI controls are operating and evidence is complete.",
      enterprisePolicyLink: "Responsible AI and Model Use Policy",
      evidence: "Approval memo, control checklist, monitoring plan",
      cadence: "Per use case and after material workflow change"
    },
    {
      role: "Process Owner",
      responsibility: "Own the business process where AI is embedded and confirm workflow controls align to process policy and operating procedures.",
      decisionRights: "Approve process changes, human approval steps, control placement, and operational readiness.",
      auditAction: "Show that AI workflow gates are embedded into process procedures and control routines.",
      enterprisePolicyLink: "Business Process Ownership Policy and Operational Risk Control Standard",
      evidence: "Updated SOP, process control map, approval workflow evidence",
      cadence: "Before pilot, before monitored launch, and during control reviews"
    },
    {
      role: "Report Owner",
      responsibility: "Own report integrity, reporting definitions, submission dependencies, and decision documentation for AI-assisted reporting outputs.",
      decisionRights: "Approve report-use constraints and determine whether AI output can support reporting decisions.",
      auditAction: "Trace AI-assisted commentary to report policy, source evidence, reviewer approval, and final submission package.",
      enterprisePolicyLink: "Report Governance Policy and Regulatory Reporting Standard",
      evidence: "Report owner sign-off, report inventory linkage, submission evidence package",
      cadence: "Each reporting cycle and upon material report change"
    },
    {
      role: "Report Consumer",
      responsibility: "Confirm the AI-assisted output is understandable, decision-useful, and not overstated beyond approved purpose.",
      decisionRights: "Accept output for decision support or send back for remediation.",
      auditAction: "Document consumer review, exceptions, and final usage decision.",
      enterprisePolicyLink: "Report Consumer Responsibility Standard",
      evidence: "Consumer attestation, exception notes, decision-use record",
      cadence: "Each material report cycle"
    },
    {
      role: "Model Risk Partner",
      responsibility: "Ensure model routing, evals, prompt/context controls, and frontier model use meet model risk expectations.",
      decisionRights: "Require additional testing, block model route, or approve conditional use.",
      auditAction: "Review eval results, model route rationale, and unresolved model limitations.",
      enterprisePolicyLink: "Model Risk Management Policy",
      evidence: "Model route decision, eval pack, limitation register",
      cadence: "Pre-launch and recurring review"
    },
    {
      role: "Internal Audit",
      responsibility: "Independently test whether policy obligations became operating controls with sufficient evidence.",
      decisionRights: "Raise findings, require remediation plans, and validate closure.",
      auditAction: "Trace policy requirement to control, execution evidence, decision, and monitoring outcome.",
      enterprisePolicyLink: "Internal Audit Methodology",
      evidence: "Audit test script, sampled evidence, issue validation",
      cadence: "Audit plan cycle and targeted reviews"
    },
    {
      role: "Policy Owner",
      responsibility: "Translate enterprise policy into control requirements, maintain policy-to-control traceability, and keep policy language current as AI operating patterns change.",
      decisionRights: "Approve policy changes, issue clarifications, and retire outdated policy obligations.",
      auditAction: "Demonstrate that policy requirements are mapped to controls, evidence, owners, and review cadence.",
      enterprisePolicyLink: "Enterprise Policy Management Standard",
      evidence: "Policy change log, control traceability matrix, obligation register",
      cadence: "Policy review cycle and upon material AI control change"
    }
  ];

  const enterprisePolicyEmbedding: EnterprisePolicyEmbedding[] = [
    {
      policy: "Enterprise Data Governance Policy",
      requiredUpdate: "Add AI-use readiness requirements for CDEs, lineage, metadata, data products, domain attestations, and data owner accountabilities.",
      controlObjective: "AI workflows only use governed data with accountable ownership and traceable evidence.",
      accountableRole: "Enterprise Data Governance Council",
      auditEvidence: "Updated policy, control mapping, council approval",
      status: "Draft"
    },
    {
      policy: "Data Owner and Data Stewardship Policy",
      requiredUpdate: "Define data owner, data owner lead, steward, sponsor, report owner, process owner, and consumer responsibilities for AI-enabled data use.",
      controlObjective: "Every AI data decision has accountable ownership, decision rights, escalation path, and evidence expectations.",
      accountableRole: "Data Owner Lead",
      auditEvidence: "RACI, attestation workflow, decision rights matrix, owner forum evidence",
      status: "Gap"
    },
    {
      policy: "Report Governance Policy",
      requiredUpdate: "Add AI-assisted report commentary controls, report owner approval, report consumer review, source citation, and submission evidence requirements.",
      controlObjective: "AI-assisted reporting output is traceable, reviewed, and constrained to approved report use.",
      accountableRole: "Report Owner",
      auditEvidence: "Report inventory link, commentary approval, consumer attestation, evidence package",
      status: "Gap"
    },
    {
      policy: "Business Process Ownership Policy",
      requiredUpdate: "Embed AI workflow gates, human approvals, exception handling, and monitoring triggers into process procedures.",
      controlObjective: "AI controls operate inside the business process rather than sitting in a separate governance document.",
      accountableRole: "Process Owner",
      auditEvidence: "Updated SOP, workflow control map, operating evidence",
      status: "Gap"
    },
    {
      policy: "Model Risk Management Policy",
      requiredUpdate: "Add model mix, frontier-use justification, local/open-source routing, eval, and human approval requirements.",
      controlObjective: "Model choices are risk-based, cost-aware, tested, and reviewable.",
      accountableRole: "Model Risk Partner",
      auditEvidence: "Model route decision matrix, eval results, approval memo",
      status: "Mapped"
    },
    {
      policy: "Access Management and Data Protection Policy",
      requiredUpdate: "Add sensitive-data masking, retrieval boundaries, memory exclusions, and model endpoint restrictions.",
      controlObjective: "Sensitive data is protected across prompts, context, memory, retrieval, and exports.",
      accountableRole: "Data Protection",
      auditEvidence: "Access review, masking evidence, memory exclusion log",
      status: "Gap"
    },
    {
      policy: "SDLC and Change Management Policy",
      requiredUpdate: "Add AI workflow change gates for prompts, agents, skills, eval thresholds, and monitoring triggers.",
      controlObjective: "Agent and skill changes are tested, approved, versioned, and auditable.",
      accountableRole: "AI Platform",
      auditEvidence: "Change ticket, test results, approval, version history",
      status: "Gap"
    },
    {
      policy: "Third-Party Risk Management Policy",
      requiredUpdate: "Add vendor model, data processor, retention, and contractual evidence requirements for AI providers.",
      controlObjective: "External AI dependencies meet enterprise risk and evidence standards.",
      accountableRole: "Third Party Risk",
      auditEvidence: "Vendor assessment, contract clauses, residual risk acceptance",
      status: "Draft"
    },
    {
      policy: "Records Retention and Audit Evidence Policy",
      requiredUpdate: "Define retention rules for prompts, outputs, approvals, evals, token logs, memory decisions, and memos.",
      controlObjective: "AI governance evidence is retained, discoverable, and defensible.",
      accountableRole: "Records Management",
      auditEvidence: "Retention schedule, evidence library record, export log",
      status: "Gap"
    },
    {
      policy: "Enterprise Policy Management Standard",
      requiredUpdate: "Require policy obligations for AI to be decomposed into controls, owners, cadence, evidence, and audit test procedures.",
      controlObjective: "Policies become auditable operating actions with clear ownership and traceability.",
      accountableRole: "Policy Owner",
      auditEvidence: "Obligation register, policy-to-control traceability matrix, audit test script",
      status: "Draft"
    }
  ];

  const overallScore = Math.round(dimensions.reduce((sum, dimension) => sum + dimension.score, 0) / dimensions.length);
  const readinessTier =
    overallScore < 50 ? "Blocked" : overallScore < 70 ? "Conditional" : overallScore < 85 ? "Ready for controlled pilot" : "Ready for monitored operation";

  return {
    json: {
      useCaseName: secureUseCaseName.value,
      federatedModel,
      overallScore,
      readinessTier,
      summary: `${secureUseCaseName.value} is ${readinessTier.toLowerCase()} for AI readiness under a federated data model. The largest gaps are lineage, CDE certification, sensitivity controls, and data product contracts.`,
      dimensions,
      gaps,
      policyRoles,
      enterprisePolicyEmbedding,
      nextActions: [
        "Confirm domain owner, data steward, and approval authority",
        "Certify CDEs and attach control evidence",
        "Complete source-to-output lineage for AI context and generated commentary",
        "Define permitted model routes and memory exclusions for sensitive data",
        "Publish a data product contract with AI-use constraints",
        "Map enterprise AI data policy obligations to owners, controls, cadence, and audit evidence",
        "Embed AI governance requirements into enterprise data, data owner, report, process, model risk, access, SDLC, third-party, retention, and audit policies",
        "Confirm sponsor, data owner lead, process owner, report owner, and report consumer responsibilities before pilot approval"
      ]
    },
    summary: `${secureUseCaseName.value} requires data governance remediation before monitored AI use. Overall AI readiness score: ${overallScore}.`,
    assumptions: [
      "Assessment uses deterministic readiness rules",
      "Federated model means domain-owned data products with central governance standards",
      "Final readiness requires data owner and governance reviewer approval",
      ...(secureUseCaseName.assessment.blocked ? ["Adversarial input was normalized and blocked from changing assessment instructions"] : [])
    ],
    requiredEvidence: gaps.map((gap) => gap.evidence),
    riskFlags: [
      ...gaps.filter((gap) => gap.severity === "Critical" || gap.severity === "High").map((gap) => gap.gap),
      ...(secureUseCaseName.assessment.blocked ? ["Adversarial input detected"] : [])
    ],
    recommendedNextAction: secureUseCaseName.assessment.blocked
      ? "Route intake text to Prompt and Context Risk Agent before data governance approval"
      : "Open data governance remediation plan before compliance approval",
    tokenUsageEstimate: {
      inputTokens: 5200,
      outputTokens: 2100,
      estimatedCost: 2.8
    },
    modelRecommendation: "Local lineage extraction plus mid-tier summarization; frontier reasoning only for unresolved governance exceptions"
  };
}

export function generateShadowAIAssessment(): AgentOutput<ShadowAIAssessment> {
  const findings: ShadowAIAssessment["findings"] = [
    {
      id: "shadow-001",
      signal: "Repeated browser access to unmanaged AI writing tool from finance reporting subnet",
      source: "Network",
      businessArea: "Finance Controls",
      suspectedTool: "External AI writing assistant",
      risk: "High",
      status: "Triaged",
      evidence: "Proxy log pattern, user group, reporting calendar correlation",
      recommendedAction: "Interview process owner, block sensitive uploads, convert to governed variance commentary workflow.",
      owner: "AI Governance Reviewer",
      policyImpact: "Responsible AI Policy and Report Governance Policy"
    },
    {
      id: "shadow-002",
      signal: "Expense report references AI transcription subscription",
      source: "Expense",
      businessArea: "Operations",
      suspectedTool: "Meeting transcription AI",
      risk: "Medium",
      status: "New",
      evidence: "Expense merchant, recurring charge, business justification note",
      recommendedAction: "Review data sensitivity, records retention, and approved vendor alternatives.",
      owner: "Third Party Risk",
      policyImpact: "Third-Party Risk Management Policy"
    },
    {
      id: "shadow-003",
      signal: "Data platform query exports followed by unapproved model endpoint traffic",
      source: "Data platform",
      businessArea: "Enterprise Data",
      suspectedTool: "Unapproved local model endpoint",
      risk: "Critical",
      status: "Contained",
      evidence: "Query history, access log, endpoint telemetry, sensitive tag match",
      recommendedAction: "Freeze endpoint, preserve evidence, run data exposure review, create approved local-model route if justified.",
      owner: "Security and Data Protection",
      policyImpact: "Access Management and Data Protection Policy"
    },
    {
      id: "shadow-004",
      signal: "Help desk ticket asks how to use AI for vendor policy summarization",
      source: "Help desk",
      businessArea: "Procurement",
      suspectedTool: "General-purpose chatbot",
      risk: "Medium",
      status: "Converted",
      evidence: "Ticket text, team, vendor intake process",
      recommendedAction: "Convert to approved third-party AI policy summarization use case with retrieval and reviewer controls.",
      owner: "Supplier Risk",
      policyImpact: "Vendor Intake Procedure and AI Use Case Intake Standard"
    }
  ];

  return {
    json: {
      overallRisk: "High",
      unapprovedTools: findings.length,
      highRiskFindings: findings.filter((finding) => finding.risk === "High" || finding.risk === "Critical").length,
      conversionCandidates: findings.filter((finding) => finding.status === "Converted" || finding.risk !== "Critical").length,
      summary:
        "Shadow AI monitoring found unmanaged AI usage across finance, operations, data, and procurement. The goal is not only to block tools, but to convert useful demand into governed workflows with owners, controls, training, and evidence.",
      findings,
      controls: [
        {
          control: "Shadow AI signal review",
          purpose: "Review network, SSO, data platform, expense, and help desk signals for unmanaged AI use.",
          owner: "AI Governance Office",
          evidence: "Signal queue, triage notes, disposition decision",
          cadence: "Weekly"
        },
        {
          control: "Sensitive data containment",
          purpose: "Block or review unmanaged AI usage involving regulated, confidential, or CDE-tagged data.",
          owner: "Security and Data Protection",
          evidence: "Containment record, access log, exposure assessment",
          cadence: "Event-driven"
        },
        {
          control: "Governed conversion pathway",
          purpose: "Convert legitimate shadow demand into approved AI use cases with intake, controls, and monitoring.",
          owner: "Business Owner and AI Governance Reviewer",
          evidence: "Converted use case record, approval memo, training assignment",
          cadence: "Per finding"
        }
      ],
      nextActions: [
        "Classify each shadow AI signal as contain, convert, approve exception, or close",
        "Preserve evidence for critical data exposure signals",
        "Create governed use case intake for legitimate business demand",
        "Update training based on repeated unmanaged usage patterns",
        "Report shadow AI trend and conversion rate to governance council"
      ]
    },
    summary: "Shadow AI signals require triage, containment for critical exposure, and conversion of legitimate demand into governed workflows.",
    assumptions: ["Mock deterministic shadow AI assessment", "Signals are metadata-first and do not copy business content"],
    requiredEvidence: ["Signal log", "Triage notes", "Containment record", "Converted use case record", "Training assignment"],
    riskFlags: findings.filter((finding) => finding.risk === "High" || finding.risk === "Critical").map((finding) => finding.signal),
    recommendedNextAction: "Triage critical and high-risk shadow AI signals before expanding approved AI access",
    tokenUsageEstimate: { inputTokens: 3800, outputTokens: 1400, estimatedCost: 1.6 },
    modelRecommendation: "Rules-first signal scoring with mid-tier summarization; no frontier model needed for initial triage"
  };
}

export function generateFeedbackLoopAssessment(): AgentOutput<FeedbackLoopAssessment> {
  const lessons: LessonLearned[] = [
    {
      id: "lesson-001",
      sourceEvent: "Prompt injection retest required for vendor intake chatbot",
      lesson: "Teams need concrete examples of prompt injection, fake approval attempts, and retrieval boundary failures.",
      rootCause: "Training explained policy but not how attacks appear in daily workflow.",
      enterpriseUpdate: "Add adversarial examples to AI acceptable use and reviewer training.",
      targetPolicy: "Responsible AI Policy",
      targetControl: "Prompt injection eval and reviewer checklist",
      trainingModule: "Recognizing prompt injection in enterprise workflows",
      owner: "Security and AI Governance",
      status: "Approved"
    },
    {
      id: "lesson-002",
      sourceEvent: "Shadow AI writing tool usage during reporting close",
      lesson: "Business teams are using unmanaged AI when approved workflow paths are unclear or too slow.",
      rootCause: "No easy conversion path from business need to governed AI use case.",
      enterpriseUpdate: "Publish fast-track intake for low/medium-risk AI productivity use cases and escalation for reporting workflows.",
      targetPolicy: "AI Use Case Intake Standard",
      targetControl: "Governed conversion pathway",
      trainingModule: "How to bring AI use cases into governed operation",
      owner: "AI Governance Office",
      status: "Captured"
    },
    {
      id: "lesson-003",
      sourceEvent: "Lineage evidence missing for variance commentary workflow",
      lesson: "Data owners and report owners need shared evidence expectations before AI pilots begin.",
      rootCause: "Federated ownership roles were named but not translated into evidence tasks.",
      enterpriseUpdate: "Embed data owner, report owner, and report consumer attestations in AI data readiness procedures.",
      targetPolicy: "Data Owner and Report Governance Policies",
      targetControl: "AI data readiness assessment",
      trainingModule: "Federated data ownership for AI readiness",
      owner: "Data Owner Lead",
      status: "Embedded"
    }
  ];

  const trainings: TrainingModule[] = [
    {
      id: "training-001",
      title: "How to bring AI use cases into governed operation",
      audience: "Business owners, process owners, data owners",
      trigger: "New AI use case or shadow AI conversion candidate",
      objective: "Teach teams how to move from idea to approved workflow without bypassing governance.",
      delivery: "Microlearning",
      status: "Live",
      evidence: "Completion record, quiz score, linked intake record"
    },
    {
      id: "training-002",
      title: "Recognizing prompt injection in enterprise workflows",
      audience: "Reviewers, data owners, report owners, procurement teams",
      trigger: "Failed prompt injection eval or high-risk external content workflow",
      objective: "Show practical examples of malicious instructions hidden in documents, prompts, and approvals.",
      delivery: "Workshop",
      status: "Assigned",
      evidence: "Attendance, scenario results, remediation actions"
    },
    {
      id: "training-003",
      title: "Federated data ownership for AI readiness",
      audience: "Data owners, data stewards, report owners, report consumers",
      trigger: "Missing lineage, CDE, report owner, or consumer evidence",
      objective: "Turn data ownership policy into concrete AI readiness evidence.",
      delivery: "Control coaching",
      status: "Draft",
      evidence: "Attestation checklist, evidence package, owner sign-off"
    }
  ];

  return {
    json: {
      summary:
        "Lessons learned are converted into policy updates, control changes, training modules, and evidence requirements so the enterprise improves after every finding, alert, approval, and shadow AI event.",
      lessons,
      trainings,
      metrics: [
        { label: "Lessons captured", value: `${lessons.length}`, detail: "From alerts, evals, and shadow AI events" },
        { label: "Training modules", value: `${trainings.length}`, detail: "Mapped to roles and triggers" },
        { label: "Embedded updates", value: `${lessons.filter((lesson) => lesson.status === "Embedded").length}`, detail: "Policy/control changes in operation" },
        { label: "Open training actions", value: `${trainings.filter((training) => training.status !== "Live").length}`, detail: "Need assignment or publication" }
      ],
      operatingLoop: [
        "Detect event, gap, alert, or shadow AI signal",
        "Capture lesson and root cause",
        "Update policy, control, or workflow guidance",
        "Assign role-specific training",
        "Verify completion and control adoption",
        "Feed evidence back into governance memo and audit trail"
      ]
    },
    summary: "Feedback loop converts governance events into enterprise training, policy updates, controls, and audit evidence.",
    assumptions: ["Mock deterministic lessons learned engine", "Training completion will later integrate with LMS or HR learning systems"],
    requiredEvidence: ["Lesson record", "Policy update", "Training assignment", "Completion evidence", "Control adoption proof"],
    riskFlags: lessons.filter((lesson) => lesson.status !== "Embedded").map((lesson) => lesson.lesson),
    recommendedNextAction: "Prioritize training for repeated shadow AI and prompt injection patterns",
    tokenUsageEstimate: { inputTokens: 3100, outputTokens: 1200, estimatedCost: 1.2 },
    modelRecommendation: "Lightweight summarization for lessons; human approval before publishing enterprise training"
  };
}

export function generateAppLibraryAssessment(): AgentOutput<AppLibraryAssessment> {
  const sources: AppLibraryAssessment["sources"] = [
    {
      id: "lib-rai-001",
      title: "Responsible AI operating expectations",
      category: "Responsible AI",
      sourceOwner: "AI Governance Office",
      jurisdiction: "Enterprise",
      version: "v0.3",
      status: "Under review",
      summary: "Enterprise reference pack for fairness, explainability, human oversight, accountability, transparency, and safe AI use.",
      keyExpectations: [
        "Define accountable owner for material AI decisions",
        "Retain evidence for human review and override decisions",
        "Require testing before monitored operation"
      ],
      relatedControls: ["AI use case intake", "Human approval gate", "Governance memo"],
      lastReviewed: "2026-05-28",
      nextReview: "2026-06-28"
    },
    {
      id: "lib-nist-001",
      title: "NIST AI Risk Management Framework reference",
      category: "Technical standard",
      sourceOwner: "Model Risk",
      jurisdiction: "United States",
      version: "v1.0-map",
      status: "Approved",
      summary: "Control mapping library for govern, map, measure, and manage style AI risk expectations.",
      keyExpectations: [
        "Map AI context and intended use",
        "Measure risks with repeatable evals",
        "Manage residual risk with accountable decisions"
      ],
      relatedControls: ["Risk classification", "Testing and evals", "EWS monitoring"],
      lastReviewed: "2026-05-20",
      nextReview: "2026-08-20"
    },
    {
      id: "lib-iso-001",
      title: "ISO AI management system source pack",
      category: "Technical standard",
      sourceOwner: "Technology Risk",
      jurisdiction: "Global",
      version: "ISO 42007 watchlist",
      status: "Draft",
      summary:
        "Placeholder-controlled source pack for ISO AI management system expectations, including the user-supplied ISO 42007 reference and related ISO AI governance materials pending source validation.",
      keyExpectations: [
        "Maintain controlled AI management procedures",
        "Define roles, responsibilities, and evidence routines",
        "Version AI governance requirements as standards change"
      ],
      relatedControls: ["Policy-to-control traceability", "Skills versioning", "Audit trail"],
      lastReviewed: "2026-05-28",
      nextReview: "2026-06-15"
    },
    {
      id: "lib-sr-262-001",
      title: "SR 26-2 supervisory expectation notes",
      category: "Regulatory expectation",
      sourceOwner: "Regulatory Affairs",
      jurisdiction: "United States",
      version: "notes-v0.1",
      status: "Draft",
      summary: "Controlled notes area for supervisory expectations and internal interpretation before mapping to controls.",
      keyExpectations: [
        "Capture source notes separately from approved policy",
        "Require regulatory affairs approval before control updates",
        "Preserve version history and rationale"
      ],
      relatedControls: ["Regulatory change review", "Governance memo", "Control update proposal"],
      lastReviewed: "2026-05-28",
      nextReview: "2026-06-28"
    },
    {
      id: "lib-uk-ai-001",
      title: "UK AI law and regulator expectations watchlist",
      category: "Jurisdictional law",
      sourceOwner: "Legal and Compliance",
      jurisdiction: "United Kingdom",
      version: "watchlist-v0.2",
      status: "Under review",
      summary: "Jurisdictional library for UK AI legal, supervisory, consumer, privacy, and sector-regulator developments.",
      keyExpectations: [
        "Track jurisdictional applicability before policy mapping",
        "Separate legal watchlist items from approved controls",
        "Require legal approval before final policy updates"
      ],
      relatedControls: ["Jurisdictional impact assessment", "Policy mapping", "Legal approval"],
      lastReviewed: "2026-05-28",
      nextReview: "2026-06-28"
    },
    {
      id: "lib-sifi-data-001",
      title: "SIFI federated data-domain governance patterns",
      category: "SIFI practice",
      sourceOwner: "Enterprise Data Governance",
      jurisdiction: "Global financial institutions",
      version: "patterns-v0.4",
      status: "Under review",
      summary:
        "Reference library for SIFI-style federated data governance patterns, including domain ownership, data owner leads, CDE accountability, and worldwide risk domains. Includes a public-reference pattern inspired by Citibank-style federated domain governance without treating any single firm's implementation as the app's proprietary standard.",
      keyExpectations: [
        "Assign domain owner and data owner lead",
        "Map worldwide risk data into governed domains",
        "Tie CDE lineage and quality evidence to AI readiness"
      ],
      relatedControls: ["Federated ownership", "CDE certification", "Data product contract"],
      lastReviewed: "2026-05-28",
      nextReview: "2026-06-28"
    }
  ];

  const proposals: AppLibraryAssessment["proposals"] = [
    {
      id: "proposal-001",
      sourceId: "lib-uk-ai-001",
      proposedBy: "App Library Agent",
      proposalType: "Policy mapping",
      summary: "Map UK AI watchlist obligations to jurisdictional impact assessment controls.",
      rationale: "UK developments may affect customer-impacting AI workflows and third-party model oversight.",
      impactedAreas: ["Responsible AI policy", "Third-party oversight", "Customer impact review"],
      requiredApprover: "Legal and Compliance",
      approvalStatus: "Proposed",
      versionBefore: "watchlist-v0.2",
      versionAfter: "watchlist-v0.3-proposed",
      evidenceNeeded: "Legal review note, approved source citation, control mapping"
    },
    {
      id: "proposal-002",
      sourceId: "lib-sifi-data-001",
      proposedBy: "App Library Agent",
      proposalType: "Control update",
      summary: "Add data owner lead and domain owner evidence requirements to AI readiness gates.",
      rationale: "Federated domain models need clear ownership and escalation before AI workflows can rely on governed data.",
      impactedAreas: ["Data governance readiness", "Use case intake", "Governance memo"],
      requiredApprover: "Enterprise Data Governance Council",
      approvalStatus: "Proposed",
      versionBefore: "patterns-v0.4",
      versionAfter: "patterns-v0.5-proposed",
      evidenceNeeded: "Council approval, RACI update, domain owner attestation"
    },
    {
      id: "proposal-003",
      sourceId: "lib-iso-001",
      proposedBy: "App Library Agent",
      proposalType: "Version update",
      summary: "Validate ISO 42007 reference and align with related ISO AI management system materials before publishing.",
      rationale: "The source reference should be validated before it drives production controls.",
      impactedAreas: ["Skills governance", "Audit evidence", "Policy-to-control traceability"],
      requiredApprover: "Technology Risk",
      approvalStatus: "Needs changes",
      versionBefore: "ISO 42007 watchlist",
      versionAfter: "ISO source pack validation pending",
      evidenceNeeded: "Validated standard reference, source owner sign-off, mapped control objective"
    }
  ];

  return {
    json: {
      summary:
        "The App Library Agent maintains a version-controlled source library of regulatory expectations, AI standards, responsible AI practices, and SIFI data-domain operating patterns. It can draft proposed updates, but final publication requires named owner approval.",
      sources,
      proposals,
      versionControls: [
        {
          control: "Source intake and classification",
          purpose: "Separate draft notes, watchlist items, approved references, and retired sources.",
          owner: "App Library Steward",
          evidence: "Source record, category, owner, jurisdiction, version"
        },
        {
          control: "Proposal-before-publication",
          purpose: "Prevent the agent from directly changing approved policy, controls, or skills without owner approval.",
          owner: "Governance Reviewer",
          evidence: "Proposal record, approval decision, version diff"
        },
        {
          control: "Version history and rollback",
          purpose: "Retain prior approved versions and rationale for audit and rollback.",
          owner: "Technology Risk",
          evidence: "Version log, change summary, approver, effective date"
        },
        {
          control: "Regulatory source validation",
          purpose: "Require legal, compliance, or risk owner validation before regulatory expectations become controls.",
          owner: "Legal and Compliance",
          evidence: "Source citation, legal note, control mapping approval"
        }
      ],
      nextActions: [
        "Validate ISO 42007 and SR 26-2 source references before approving control updates",
        "Create data-domain ownership template for SIFI-style federated governance patterns",
        "Route UK AI watchlist mapping to Legal and Compliance",
        "Require your approval before any App Library proposal becomes an approved source update"
      ]
    },
    summary:
      "App Library Agent created controlled source entries and proposed updates for regulatory, RAI, ISO, UK AI, and SIFI federated data governance materials.",
    assumptions: [
      "This is a mock deterministic library and not legal advice",
      "External regulatory sources require owner validation before final control mapping",
      "The agent proposes updates but cannot publish without approval"
    ],
    requiredEvidence: ["Source citation", "Owner review", "Version diff", "Approval decision", "Control mapping"],
    riskFlags: proposals.filter((proposal) => proposal.approvalStatus !== "Approved").map((proposal) => proposal.summary),
    recommendedNextAction: "Review App Library proposals and approve, reject, or request changes before publication",
    tokenUsageEstimate: { inputTokens: 4700, outputTokens: 1800, estimatedCost: 2.1 },
    modelRecommendation: "Retrieval-grounded summarization with human approval; no autonomous policy publication"
  };
}
