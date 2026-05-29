import { MetricGrid } from "@/components/dashboard/metric-grid";
import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { shadowAIAssessment } from "@/lib/mock-data/platform";

const shadowMetrics = [
  {
    label: "Unapproved AI tools",
    value: `${shadowAIAssessment.unapprovedTools}`,
    detail: "Detected across metadata signals"
  },
  {
    label: "High-risk findings",
    value: `${shadowAIAssessment.highRiskFindings}`,
    detail: "Require containment or escalation"
  },
  {
    label: "Conversion candidates",
    value: `${shadowAIAssessment.conversionCandidates}`,
    detail: "Useful demand ready for governed intake"
  },
  {
    label: "Overall risk",
    value: shadowAIAssessment.overallRisk,
    detail: "Current enterprise shadow AI posture"
  }
];

export default function ShadowAIPage() {
  return (
    <WorkspaceShell
      title="Shadow AI Tracking"
      subtitle="Detect, contain, and convert unmanaged AI use."
    >
      <MetricGrid metrics={shadowMetrics} compact />
      <section className="app-grid">
        <article className="panel">
          <span className="tag">Shadow AI Tracking Agent</span>
          <h2>Contain, convert, or approve by exception.</h2>
          <p>{shadowAIAssessment.summary}</p>
        </article>
        <article className="panel">
          <h2>Next actions</h2>
          <div className="workflow-list">
            {shadowAIAssessment.nextActions.map((action) => (
              <article className="line-item" key={action}>
                <h3>{action}</h3>
              </article>
            ))}
          </div>
        </article>
      </section>
      <section className="panel">
        <h2>Shadow AI signal queue</h2>
        <StatusTable
          columns={["Signal", "Source", "Business Area", "Tool", "Risk", "Status", "Evidence", "Recommended Action", "Owner", "Policy Impact"]}
          rows={shadowAIAssessment.findings.map((finding) => ({
            Signal: finding.signal,
            Source: finding.source,
            "Business Area": finding.businessArea,
            Tool: finding.suspectedTool,
            Risk: <span className="tag">{finding.risk}</span>,
            Status: finding.status,
            Evidence: finding.evidence,
            "Recommended Action": finding.recommendedAction,
            Owner: finding.owner,
            "Policy Impact": finding.policyImpact
          }))}
        />
      </section>
      <section className="panel">
        <h2>Shadow AI controls</h2>
        <StatusTable
          columns={["Control", "Purpose", "Owner", "Evidence", "Cadence"]}
          rows={shadowAIAssessment.controls.map((control) => ({
            Control: control.control,
            Purpose: control.purpose,
            Owner: control.owner,
            Evidence: control.evidence,
            Cadence: control.cadence
          }))}
        />
      </section>
    </WorkspaceShell>
  );
}
