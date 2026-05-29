import { MetricGrid } from "@/components/dashboard/metric-grid";
import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { generateMetaHarnessAssessment } from "@/lib/meta-harness/assessment";

export default function MetaHarnessPage() {
  const assessment = generateMetaHarnessAssessment();
  const passed = assessment.candidates.filter((candidate) => candidate.validation === "passed").length;
  const partial = assessment.candidates.filter((candidate) => candidate.validation === "partial").length;

  return (
    <WorkspaceShell
      title="Meta Harness Center"
      subtitle="Evaluate the app, agents, skills, security, and deployment path."
    >
      <MetricGrid
        compact
        metrics={[
          { label: "Harness candidates", value: `${assessment.candidates.length}`, detail: "Project, agent, skill, security, and deployment" },
          { label: "Validated", value: `${passed}`, detail: "Passing current acceptance checks" },
          { label: "Partial", value: `${partial}`, detail: "Needs stronger contract or live-environment validation" },
          { label: "Pareto-best", value: `${assessment.paretoBest.length}`, detail: "Best current harnesses without weakening safety" },
          { label: "Residual risks", value: `${assessment.runTrace.residualRisks.length}`, detail: "Tracked before go-live" },
          { label: "Next actions", value: `${assessment.nextActions.length}`, detail: "Improvements queued" }
        ]}
      />

      <section className="panel">
        <h2>Harness posture</h2>
        <p>{assessment.summary}</p>
        <div className="capability-list">
          {assessment.activeHarness.map((item) => (
            <small key={item}>{item}</small>
          ))}
        </div>
      </section>

      <StatusTable
        columns={["Harness", "Scope", "Correctness", "Validation", "Reliability", "Improvement"]}
        rows={assessment.candidates.map((candidate) => ({
          Harness: candidate.name,
          Scope: candidate.scope,
          Correctness: candidate.correctness,
          Validation: candidate.validation,
          Reliability: candidate.reliability,
          Improvement: candidate.improvement
        }))}
      />

      <section className="app-grid">
        <article className="panel">
          <h2>App optimizations</h2>
          <div className="workflow-list">
            {assessment.appOptimizations.map((item) => (
              <article className="line-item" key={item}>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </article>
        <article className="panel">
          <h2>Skill optimizations</h2>
          <div className="workflow-list">
            {assessment.skillOptimizations.map((item) => (
              <article className="line-item" key={item}>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="app-grid">
        <article className="panel">
          <h2>Best current harnesses</h2>
          {assessment.paretoBest.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </article>
        <article className="panel">
          <h2>Run trace</h2>
          <p>Task: {assessment.runTrace.task}</p>
          <p>Changed surface: {assessment.runTrace.changedSurface.join(", ")}</p>
          <p>Residual risks: {assessment.runTrace.residualRisks.join(" ")}</p>
        </article>
      </section>
    </WorkspaceShell>
  );
}
