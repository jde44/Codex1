import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { governedSkills } from "@/lib/mock-data/platform";
import { generateMetaHarnessAssessment } from "@/lib/meta-harness/assessment";

export default function SkillsPage() {
  const skillHarness = generateMetaHarnessAssessment().candidates.find((candidate) => candidate.id === "mh-skill-governance");

  return (
    <WorkspaceShell
      title="Skills Governance"
      subtitle="Approve, version, reject, and retire governed skills."
    >
      {skillHarness ? (
        <section className="panel">
          <h2>Meta-harness skill gate</h2>
          <p>{skillHarness.currentSignal}</p>
          <div className="capability-list">
            {skillHarness.acceptanceChecks.map((check) => (
              <small key={check}>{check}</small>
            ))}
          </div>
        </section>
      ) : null}
      <StatusTable
        columns={["Skill", "Category", "Owner", "Control", "Eval Score", "Status"]}
        rows={governedSkills.map((skill, index) => ({
          Skill: skill.name,
          Category: skill.name.includes("Regulatory reference") ? "Regulatory reference feeder" : "AI governance",
          Owner: skill.owner,
          Control: skill.control,
          "Eval Score": `${skill.evalScore}%`,
          Status: index < 2 ? "Pending approval" : "Approved"
        }))}
      />
      <section className="app-grid three">
        {["Proposed changes", "Version history", "Deprecated skills"].map((title) => (
          <article className="panel" key={title}>
            <h2>{title}</h2>
            <p>Governed skill lifecycle records show proposed change, reason, reviewer, status, and approval evidence.</p>
          </article>
        ))}
      </section>
    </WorkspaceShell>
  );
}
