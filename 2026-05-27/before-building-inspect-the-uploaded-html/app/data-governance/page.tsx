import { MetricGrid } from "@/components/dashboard/metric-grid";
import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { dataGovernanceAssessment } from "@/lib/mock-data/platform";

const readinessMetrics = [
  {
    label: "AI readiness score",
    value: `${dataGovernanceAssessment.overallScore}`,
    detail: dataGovernanceAssessment.readinessTier
  },
  {
    label: "Open governance gaps",
    value: `${dataGovernanceAssessment.gaps.length}`,
    detail: "Lineage, CDEs, access, metadata"
  },
  {
    label: "Federated domains",
    value: "4",
    detail: "Finance, reporting, data architecture, controls"
  },
  {
    label: "Critical blockers",
    value: `${dataGovernanceAssessment.gaps.filter((gap) => gap.severity === "Critical").length}`,
    detail: "Must close before pilot approval"
  }
];

export default function DataGovernancePage() {
  return (
    <WorkspaceShell
      title="Data Governance Agent"
      subtitle="Assess AI readiness under a federated data model."
    >
      <MetricGrid metrics={readinessMetrics} compact />
      <section className="app-grid">
        <article className="panel">
          <span className="tag">Federated AI readiness assessment</span>
          <h2>{dataGovernanceAssessment.readinessTier}</h2>
          <p>{dataGovernanceAssessment.summary}</p>
          <p>{dataGovernanceAssessment.federatedModel}</p>
        </article>
        <article className="panel">
          <h2>Recommended next actions</h2>
          <div className="workflow-list">
            {dataGovernanceAssessment.nextActions.map((action) => (
              <article className="line-item" key={action}>
                <h3>{action}</h3>
              </article>
            ))}
          </div>
        </article>
      </section>
      <section className="panel">
        <h2>AI readiness dimensions</h2>
        <StatusTable
          columns={["Dimension", "Current", "Target", "Score", "Owner", "Domain", "Finding", "Required Action", "Evidence", "Impact"]}
          rows={dataGovernanceAssessment.dimensions.map((dimension) => ({
            Dimension: dimension.name,
            Current: dimension.currentState,
            Target: dimension.targetState,
            Score: dimension.score,
            Owner: dimension.owner,
            Domain: dimension.federatedDomain,
            Finding: dimension.finding,
            "Required Action": dimension.requiredAction,
            Evidence: dimension.evidenceNeeded,
            Impact: <span className="tag">{dimension.aiReadinessImpact}</span>
          }))}
        />
      </section>
      <section className="panel">
        <h2>Gap remediation board</h2>
        <StatusTable
          columns={["Gap", "Category", "Severity", "Current State", "Target State", "Remediation", "Owner", "Due", "Evidence"]}
          rows={dataGovernanceAssessment.gaps.map((gap) => ({
            Gap: gap.gap,
            Category: gap.category,
            Severity: <span className="tag">{gap.severity}</span>,
            "Current State": gap.currentState,
            "Target State": gap.targetState,
            Remediation: gap.remediation,
            Owner: gap.owner,
            Due: gap.dueDate,
            Evidence: gap.evidence
          }))}
        />
      </section>
      <section className="panel">
        <h2>Roles to turn policy into auditable action</h2>
        <StatusTable
          columns={["Role", "Responsibility", "Decision Rights", "Audit Action", "Policy Link", "Evidence", "Cadence"]}
          rows={dataGovernanceAssessment.policyRoles.map((role) => ({
            Role: role.role,
            Responsibility: role.responsibility,
            "Decision Rights": role.decisionRights,
            "Audit Action": role.auditAction,
            "Policy Link": role.enterprisePolicyLink,
            Evidence: role.evidence,
            Cadence: role.cadence
          }))}
        />
      </section>
      <section className="panel">
        <h2>Enterprise policy embedding</h2>
        <StatusTable
          columns={["Policy", "Required Update", "Control Objective", "Accountable Role", "Audit Evidence", "Status"]}
          rows={dataGovernanceAssessment.enterprisePolicyEmbedding.map((policy) => ({
            Policy: policy.policy,
            "Required Update": policy.requiredUpdate,
            "Control Objective": policy.controlObjective,
            "Accountable Role": policy.accountableRole,
            "Audit Evidence": policy.auditEvidence,
            Status: <span className="tag">{policy.status}</span>
          }))}
        />
      </section>
    </WorkspaceShell>
  );
}
