import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { ewsSignals, tests } from "@/lib/mock-data/platform";

export default function TestingPage() {
  return (
    <WorkspaceShell
      title="Testing and Early Warning Signals"
      subtitle="Run evals and monitor early warning signals."
    >
      <section className="panel">
        <h2>Governance test modules</h2>
        <StatusTable
          columns={["Test", "Purpose", "Result", "Threshold", "Evidence", "Remediation", "Owner", "Due Date"]}
          rows={tests.map((test) => ({
            Test: test.name,
            Purpose: test.purpose,
            Result: <span className={`result-${test.result}`}>{test.result}</span>,
            Threshold: test.threshold,
            Evidence: test.evidence,
            Remediation: test.remediationAction,
            Owner: test.owner,
            "Due Date": test.dueDate
          }))}
        />
      </section>
      <section className="panel">
        <h2>Early warning triggers</h2>
        <div className="workflow-list">
          {ewsSignals.map((signal) => (
            <article className="line-item" key={`${signal.label}-${signal.value}`}>
              <div><span>{signal.severity} severity</span><h3>{signal.label}</h3></div>
              <p>{signal.state}: {signal.value}</p>
            </article>
          ))}
        </div>
      </section>
    </WorkspaceShell>
  );
}
