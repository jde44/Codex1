import type { ReactNode } from "react";
import { WorkspaceNav } from "@/components/dashboard/workspace-nav";

export function WorkspaceShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  return (
    <main className="workspace">
      <aside className="workspace-nav">
        <div className="workspace-logo">
          <strong>RSK AI</strong>
          <span>Ready. Set. Know.</span>
        </div>
        <WorkspaceNav />
      </aside>
      <section className="workspace-main">
        <header className="workspace-header">
          <div>
            <p className="small-caps">Member Workspace</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="user-chip">
            <span>Role</span>
            <strong>Governance Reviewer</strong>
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
