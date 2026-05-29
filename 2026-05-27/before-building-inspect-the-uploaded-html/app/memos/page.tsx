import { MemoPreview } from "@/components/memos/memo-preview";
import { WorkspaceShell } from "@/components/dashboard/workspace-shell";

export default function MemosPage() {
  return (
    <WorkspaceShell
      title="Governance Memo Builder"
      subtitle="Turn agent activity into decision-ready evidence."
    >
      <section className="app-grid">
        <MemoPreview />
        <div className="panel">
          <h2>Export actions</h2>
          <p>Summary, risk tier, controls, tests, open issues, recommendation, and approvals are ready for export.</p>
          <div className="action-row">
            <button className="button primary" type="button">Export PDF</button>
            <button className="button ghost" type="button">Export Markdown</button>
            <button className="button ghost" type="button">Copy to clipboard</button>
            <button className="button ghost" type="button">Save to evidence library</button>
          </div>
        </div>
      </section>
    </WorkspaceShell>
  );
}
