import { StatusTable } from "@/components/dashboard/status-table";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { memoryItems } from "@/lib/mock-data/platform";

export default function MemoryPage() {
  return (
    <WorkspaceShell
      title="Memory Governance"
      subtitle="Review memory, exclusions, expiration, context, and drift."
    >
      <StatusTable
        columns={["Memory Item", "Scope", "Retention", "Decision", "Drift State"]}
        rows={memoryItems.map((item) => ({
          "Memory Item": item.name,
          Scope: item.scope,
          Retention: item.retention,
          Decision: item.retention === "Excluded" ? "Rejected" : item.driftState === "Review" ? "Pending review" : "Approved",
          "Drift State": <span className="tag">{item.driftState}</span>
        }))}
      />
      <section className="app-grid">
        <article className="panel">
          <h2>Context summary</h2>
          <p>
            Store reusable variance terminology and approved commentary examples. Exclude raw CDE
            examples and reviewer preference notes unless retention is explicitly approved.
          </p>
        </article>
        <article className="panel">
          <h2>Approval workflow</h2>
          <p>High-risk memory requires data owner approval, model risk review, expiration, and audit event capture.</p>
        </article>
      </section>
    </WorkspaceShell>
  );
}
