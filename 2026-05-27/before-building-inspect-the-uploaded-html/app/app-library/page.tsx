import { MetricGrid } from "@/components/dashboard/metric-grid";
import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { appLibraryAssessment } from "@/lib/mock-data/platform";

export default function AppLibraryPage() {
  const approvedSources = appLibraryAssessment.sources.filter((source) => source.status === "Approved").length;
  const pendingProposals = appLibraryAssessment.proposals.filter((proposal) => proposal.approvalStatus !== "Approved").length;
  const draftSources = appLibraryAssessment.sources.filter((source) => source.status === "Draft" || source.status === "Under review").length;

  return (
    <WorkspaceShell
      title="App Library"
      subtitle="Internal source feeder for governed regulatory and standards updates."
    >
      <MetricGrid
        compact
        metrics={[
          { label: "Library sources", value: `${appLibraryAssessment.sources.length}`, detail: "Regulatory, RAI, ISO, UK AI, and data-domain references" },
          { label: "Approved sources", value: `${approvedSources}`, detail: "Can be referenced in control mapping" },
          { label: "Draft/review", value: `${draftSources}`, detail: "Needs owner validation before publication" },
          { label: "Open proposals", value: `${pendingProposals}`, detail: "Require your approval or assigned owner action" },
          { label: "Version controls", value: `${appLibraryAssessment.versionControls.length}`, detail: "Source, proposal, history, and validation controls" },
          { label: "Publication mode", value: "Approval", detail: "Agent proposes updates but cannot publish alone" }
        ]}
      />

      <section className="panel">
        <h2>Library agent posture</h2>
        <p>{appLibraryAssessment.summary}</p>
        <div className="capability-list">
          {appLibraryAssessment.nextActions.map((action) => (
            <small key={action}>{action}</small>
          ))}
        </div>
      </section>

      <StatusTable
        columns={["Source", "Category", "Jurisdiction", "Version", "Status", "Next Review"]}
        rows={appLibraryAssessment.sources.map((source) => ({
          Source: source.title,
          Category: source.category,
          Jurisdiction: source.jurisdiction,
          Version: source.version,
          Status: source.status,
          "Next Review": source.nextReview
        }))}
      />

      <section className="app-grid">
        <article className="panel">
          <h2>Proposed updates</h2>
          <StatusTable
            columns={["Proposal", "Type", "Approver", "Status", "Version"]}
            rows={appLibraryAssessment.proposals.map((proposal) => ({
              Proposal: proposal.summary,
              Type: proposal.proposalType,
              Approver: proposal.requiredApprover,
              Status: proposal.approvalStatus,
              Version: `${proposal.versionBefore} -> ${proposal.versionAfter}`
            }))}
          />
        </article>
        <article className="panel">
          <h2>Version controls</h2>
          <div className="workflow-list">
            {appLibraryAssessment.versionControls.map((control) => (
              <article className="line-item" key={control.control}>
                <div>
                  <span>{control.owner}</span>
                  <h3>{control.control}</h3>
                </div>
                <p>{control.evidence}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="app-grid three">
        {appLibraryAssessment.sources.slice(0, 3).map((source) => (
          <article className="panel" key={source.id}>
            <h2>{source.title}</h2>
            <p>{source.summary}</p>
            <div className="capability-list">
              {source.keyExpectations.map((expectation) => (
                <small key={expectation}>{expectation}</small>
              ))}
            </div>
          </article>
        ))}
      </section>
    </WorkspaceShell>
  );
}
