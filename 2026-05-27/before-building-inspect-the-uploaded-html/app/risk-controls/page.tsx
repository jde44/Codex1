import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { riskControls } from "@/lib/mock-data/platform";

export default function RiskControlsPage() {
  return (
    <WorkspaceShell
      title="Risk and Control Matrix"
      subtitle="Map AI risks to controls, owners, evidence, and triggers."
    >
      <StatusTable
        columns={["Risk", "Category", "Inherent", "Control", "Owner", "Evidence", "Frequency", "Status", "Escalation", "Agent", "Model", "Cost"]}
        rows={riskControls.map((item) => ({
          Risk: item.risk,
          Category: item.category,
          Inherent: item.inherentRisk,
          Control: item.control,
          Owner: item.owner,
          Evidence: item.evidenceRequired,
          Frequency: item.frequency,
          Status: <span className="tag">{item.status}</span>,
          Escalation: item.escalationTrigger,
          Agent: item.relatedAgent,
          Model: item.relatedModel,
          Cost: item.costMetric
        }))}
      />
    </WorkspaceShell>
  );
}
