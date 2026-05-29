import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { handoffs, useCases } from "@/lib/mock-data/platform";

export default function WorkflowsPage() {
  return (
    <WorkspaceShell
      title="Workflow Command Center"
      subtitle="Move use cases from intake to monitored operation."
    >
      <section className="app-grid">
        <div className="panel">
          <h2>Current workflow</h2>
          <p>AI-assisted regulatory reporting variance commentary</p>
          <div className="progress-track"><span style={{ width: "77%" }} /></div>
          <p>Evidence package 77% complete. Compliance approval and lineage evidence remain open.</p>
        </div>
        <div className="panel">
          <h2>PARCM status</h2>
          {["Process mapped", "Activities decomposed", "Risk classified", "Controls in testing", "Monitoring armed"].map((item) => (
            <article className="line-item" key={item}><h3>{item}</h3><span className="tag">Active</span></article>
          ))}
        </div>
      </section>
      <StatusTable
        columns={["Workflow", "Risk", "Evidence", "Next Action"]}
        rows={useCases.map((item) => ({
          Workflow: item.name,
          Risk: item.risk,
          Evidence: `${item.evidenceCompletion}%`,
          "Next Action": item.nextAction
        }))}
      />
      <section className="panel">
        <h2>Latest handoff packet</h2>
        <StatusTable
          columns={["From", "To", "Task", "Budget", "Status"]}
          rows={handoffs.map((item) => ({
            From: item.fromAgent,
            To: item.toAgent,
            Task: item.task,
            Budget: `${item.tokenBudget.toLocaleString()} tokens`,
            Status: item.status
          }))}
        />
      </section>
    </WorkspaceShell>
  );
}
