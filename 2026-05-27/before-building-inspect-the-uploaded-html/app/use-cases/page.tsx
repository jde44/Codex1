import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { StatusTable } from "@/components/dashboard/status-table";
import { useCases } from "@/lib/mock-data/platform";

export default function UseCasesPage() {
  return (
    <WorkspaceShell
      title="AI Use Case Intake"
      subtitle="Capture context, impact, model needs, budgets, controls, and evidence."
    >
      <section className="app-grid">
        <form className="panel">
          <div className="section-header">
            <h2>New use case</h2>
            <span className="tag">Deterministic mock agent</span>
          </div>
          <div className="form-grid">
            <label>Use case name<input name="useCaseName" defaultValue="Regulatory reporting variance commentary" /></label>
            <label>Business process<input name="businessProcess" defaultValue="Regulatory reporting" /></label>
            <label>Process owner<input name="processOwner" defaultValue="Regulatory Reporting" /></label>
            <label>Business owner<input name="businessOwner" defaultValue="Finance Controls" /></label>
            <label>Data owner<input name="dataOwner" defaultValue="Enterprise Data" /></label>
            <label>Report owner / consumer<input name="reportOwner" defaultValue="Controller organization" /></label>
            <label>AI purpose<textarea name="aiPurpose" defaultValue="Draft variance commentary and identify anomalies before submission." /></label>
            <label>AI output type<input name="aiOutputType" defaultValue="Narrative commentary and exception flags" /></label>
            <label>Data types used<input name="dataTypesUsed" defaultValue="Financial balances, CDEs, variance thresholds" /></label>
            <label>Critical data elements<input name="criticalDataElements" defaultValue="Account, entity, period, variance amount" /></label>
            <label>Systems involved<input name="systemsInvolved" defaultValue="GL, regulatory reporting platform, data catalog" /></label>
            <label>Third-party tools<input name="thirdPartyTools" defaultValue="Approved enterprise AI gateway" /></label>
            <label>Model provider<input name="modelProvider" defaultValue="Multi-provider router" /></label>
            <label>Model family<input name="modelFamily" defaultValue="Frontier + mid-tier + local extraction" /></label>
            <label>Expected users<input name="expectedUsers" defaultValue="15 report preparers and reviewers" /></label>
            <label>Expected frequency<input name="expectedFrequency" defaultValue="Monthly close cycle" /></label>
            <label>Monthly token budget<input type="number" name="monthlyTokenBudget" defaultValue={900000} /></label>
            <label>Workflow budget<input type="number" name="workflowBudget" defaultValue={800} /></label>
            <label>Known risks<textarea name="knownRisks" defaultValue="Unsupported claims, sensitive data exposure, approval bypass, token spike." /></label>
            <label>Existing controls<textarea name="existingControls" defaultValue="Reviewer approval, CDE lineage, prompt injection eval, audit trail." /></label>
            <label>Required launch date<input type="date" name="requiredLaunchDate" defaultValue="2026-06-30" /></label>
            <label>Evidence attachments<input type="file" disabled /></label>
          </div>
          <div className="app-grid three">
            {[
              "Local model allowed",
              "Open-source model allowed",
              "Frontier model required",
              "Sensitive data involved",
              "Regulated reporting involved",
              "Customer impact exists",
              "Financial impact exists",
              "Employee impact exists",
              "Human approval required"
            ].map((item) => (
              <label className="checkbox-row" key={item}>
                <input type="checkbox" defaultChecked={item !== "Customer impact exists" && item !== "Employee impact exists"} />
                {item}
              </label>
            ))}
          </div>
          <button className="button primary" type="button">Create governed workflow</button>
        </form>
        <div className="panel">
          <h2>Generated output</h2>
          <p>
            Risk tier: High. Required reviews: Compliance, Model Risk, Data Governance. Recommended
            model mix: local extraction, mid-tier drafting, frontier reasoning for exceptions.
          </p>
          <p>
            Required evidence: owner attestation, CDE lineage, model route decision, prompt injection
            eval, token budget, human approval record.
          </p>
        </div>
      </section>
      <StatusTable
        columns={["Use Case", "Risk", "Status", "Next Action"]}
        rows={useCases.map((item) => ({
          "Use Case": item.name,
          Risk: <span className="tag">{item.risk}</span>,
          Status: item.status,
          "Next Action": item.nextAction
        }))}
      />
    </WorkspaceShell>
  );
}
