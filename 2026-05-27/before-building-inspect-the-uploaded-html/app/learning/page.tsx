import { MetricGrid } from "@/components/dashboard/metric-grid";
import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { feedbackLoopAssessment } from "@/lib/mock-data/platform";

export default function LearningPage() {
  return (
    <WorkspaceShell
      title="Lessons Learned and Training"
      subtitle="Convert incidents and findings into training and control updates."
    >
      <MetricGrid metrics={feedbackLoopAssessment.metrics} compact />
      <section className="app-grid">
        <article className="panel">
          <span className="tag">Enterprise feedback loop</span>
          <h2>Turn findings into better behavior.</h2>
          <p>{feedbackLoopAssessment.summary}</p>
        </article>
        <article className="panel">
          <h2>Operating loop</h2>
          <div className="workflow-list">
            {feedbackLoopAssessment.operatingLoop.map((step) => (
              <article className="line-item" key={step}>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </article>
      </section>
      <section className="panel">
        <h2>Lessons learned</h2>
        <StatusTable
          columns={["Source Event", "Lesson", "Root Cause", "Enterprise Update", "Policy", "Control", "Training", "Owner", "Status"]}
          rows={feedbackLoopAssessment.lessons.map((lesson) => ({
            "Source Event": lesson.sourceEvent,
            Lesson: lesson.lesson,
            "Root Cause": lesson.rootCause,
            "Enterprise Update": lesson.enterpriseUpdate,
            Policy: lesson.targetPolicy,
            Control: lesson.targetControl,
            Training: lesson.trainingModule,
            Owner: lesson.owner,
            Status: <span className="tag">{lesson.status}</span>
          }))}
        />
      </section>
      <section className="panel">
        <h2>Training modules</h2>
        <StatusTable
          columns={["Title", "Audience", "Trigger", "Objective", "Delivery", "Status", "Evidence"]}
          rows={feedbackLoopAssessment.trainings.map((training) => ({
            Title: training.title,
            Audience: training.audience,
            Trigger: training.trigger,
            Objective: training.objective,
            Delivery: training.delivery,
            Status: <span className="tag">{training.status}</span>,
            Evidence: training.evidence
          }))}
        />
      </section>
    </WorkspaceShell>
  );
}
