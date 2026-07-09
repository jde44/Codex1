import { MetricGrid } from "@/components/dashboard/metric-grid";
import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { dashboardMetrics, operatingSignals, useCases } from "@/lib/mock-data/platform";
import { boardKpis, offeringBuckets } from "@/lib/offerings";

export default function DashboardPage() {
  const executiveMetrics = dashboardMetrics.filter((metric) =>
    [
      "Active AI use cases",
      "High-risk AI use cases",
      "Pending approvals",
      "Open control gaps",
      "Evidence completion"
    ].includes(metric.label)
  );

  return (
    <WorkspaceShell
      title="Workspace Dashboard"
      subtitle="Use case intake, PARCM mapping, evidence, and decision memory at a glance."
    >
      <section className="dashboard-command">
        {offeringBuckets.map((bucket) => (
          <article className="command-card" key={bucket.id}>
            <div>
              <span>{bucket.label}</span>
              <h2>{bucket.name}</h2>
              <p>{bucket.outcome}</p>
            </div>
            <div className="command-metrics">
              {bucket.metrics.map((metric) => (
                <div key={metric.label}>
                  <small>{metric.label}</small>
                  <strong>{metric.value}</strong>
                  <p>{metric.detail}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="kpi-strip" aria-label="RSK AI governance summary">
        {boardKpis.map((kpi) => (
          <article key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <p>{kpi.detail}</p>
          </article>
        ))}
      </section>

      <MetricGrid metrics={executiveMetrics} compact />
      <section className="app-grid">
        <div className="panel">
          <h2>Priority workflows</h2>
          <StatusTable
            columns={["Use Case", "Risk", "Status", "Next Action"]}
            rows={useCases.map((item) => ({
              "Use Case": item.name,
              Risk: <span className="tag">{item.risk}</span>,
              Status: item.status,
              "Next Action": item.nextAction
            }))}
          />
        </div>
        <div className="panel">
          <h2>AI operating signals</h2>
          <div className="workflow-list">
            {operatingSignals.map((signal) => (
              <article className="line-item" key={signal.label}>
                <div>
                  <span>{signal.severity} severity</span>
                  <h3>{signal.label}</h3>
                </div>
                <p>{signal.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </WorkspaceShell>
  );
}
