import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { tokenBudgetControls } from "@/lib/mock-data/platform";

export default function TokenGovernancePage() {
  return (
    <WorkspaceShell
      title="Token Budget Governance"
      subtitle="Control budgets, ceilings, and spike alerts."
    >
      <section className="app-grid">
        {tokenBudgetControls.map((control) => (
          <article className="panel" key={control.scope}>
            <span className="tag">{control.scope}</span>
            <h2>{control.currentUsage}</h2>
            <p>Budget: {control.budget}</p>
            <div className="progress-track"><span style={{ width: `${Math.min(control.utilization, 100)}%` }} /></div>
            <p>{control.control}. Trigger: {control.trigger}.</p>
          </article>
        ))}
      </section>
      <StatusTable
        columns={["Control", "Alert", "Escalation", "Pause"]}
        rows={[
          { Control: "Monthly budget", Alert: "70%", Escalation: "85%", Pause: "100%" },
          { Control: "Workflow budget", Alert: "70%", Escalation: "85%", Pause: "100%" },
          { Control: "Per-run token ceiling", Alert: "80%", Escalation: "95%", Pause: "100%" },
          { Control: "Token spike", Alert: "120% baseline", Escalation: "150% baseline", Pause: "Manual approval" }
        ]}
      />
    </WorkspaceShell>
  );
}
