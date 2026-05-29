import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { auditEvents } from "@/lib/mock-data/platform";

export default function AuditPage() {
  return (
    <WorkspaceShell
      title="Audit Trail"
      subtitle="Evidence chronology for workflows, controls, decisions, and alerts."
    >
      <section className="panel">
        <div className="timeline">
          {auditEvents.map((event) => (
            <article key={event.id}>
              <span className="small-caps">{event.createdAt}</span>
              <h2>{event.eventType}</h2>
              <p>{event.actor}: {event.description}</p>
            </article>
          ))}
        </div>
      </section>
    </WorkspaceShell>
  );
}
