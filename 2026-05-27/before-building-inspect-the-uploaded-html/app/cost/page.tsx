import { MetricGrid } from "@/components/dashboard/metric-grid";
import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { modelDecisions, modelRoutes } from "@/lib/mock-data/platform";

const costMetrics = [
  { label: "Monthly projected cost", value: "$3,850", detail: "Against $5,000 approved budget" },
  { label: "Cost per workflow", value: "$48.12", detail: "High-risk workflow average" },
  { label: "Frontier share", value: "38%", detail: "2 unjustified routes need review" },
  { label: "Savings opportunity", value: "23%", detail: "Model cascade substitution" }
];

export default function CostPage() {
  return (
    <WorkspaceShell
      title="Model Mix and Cost"
      subtitle="Route work to the right model and track spend."
    >
      <MetricGrid metrics={costMetrics} compact />
      <section className="panel">
        <h2>Model route ledger</h2>
        <StatusTable
          columns={["Task", "Primary", "Fallback", "Monthly Cost", "Token Share", "Policy"]}
          rows={modelRoutes.map((route) => ({
            Task: route.task,
            Primary: route.primaryModel,
            Fallback: route.fallbackModel,
            "Monthly Cost": `$${route.monthlyCost}`,
            "Token Share": `${route.tokenShare}%`,
            Policy: route.policy
          }))}
        />
      </section>
      <section className="panel">
        <h2>Model mix decision matrix</h2>
        <StatusTable
          columns={["Workload", "Risk", "Complexity", "Data Sensitivity", "Recommended Model", "Tier", "Reason", "Human Review", "Cost", "Savings"]}
          rows={modelDecisions.map((item) => ({
            Workload: item.workload,
            Risk: item.risk,
            Complexity: item.complexity,
            "Data Sensitivity": item.dataSensitivity,
            "Recommended Model": item.recommendedModel,
            Tier: item.modelTier,
            Reason: item.reason,
            "Human Review": item.humanReviewRequirement,
            Cost: item.estimatedCost,
            Savings: item.savingsOpportunity
          }))}
        />
      </section>
    </WorkspaceShell>
  );
}
