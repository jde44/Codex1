import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { agents, handoffs } from "@/lib/mock-data/platform";

export default function OrchestrationPage() {
  return (
    <WorkspaceShell
      title="Agent Orchestration"
      subtitle="Govern agents, models, handoffs, approvals, and audit updates."
    >
      <section className="app-grid three">
        {agents.map((agent) => (
          <article className="panel" key={agent.id}>
            <span className="tag">{agent.category}</span>
            <h2>{agent.name}</h2>
            <p>{agent.description}</p>
            <ul>
              {agent.responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
      <section className="panel">
        <h2>Standard handoff packet</h2>
        <StatusTable
          columns={["From", "To", "Context", "Model", "Human Approval", "Risk Flags"]}
          rows={handoffs.map((handoff) => ({
            From: handoff.fromAgent,
            To: handoff.toAgent,
            Context: handoff.contextSummary,
            Model: handoff.modelRecommendation,
            "Human Approval": handoff.requiredHumanApproval ? "Required" : "Not required",
            "Risk Flags": handoff.riskFlags.join(", ")
          }))}
        />
      </section>
    </WorkspaceShell>
  );
}
