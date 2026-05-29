import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { StatusTable } from "@/components/dashboard/status-table";

const users = [
  { Name: "Avery Cole", Role: "Client admin", Access: "Manage organization users and settings" },
  { Name: "Mina Shah", Role: "Governance reviewer", Access: "Approve memos, memory updates, and skills" },
  { Name: "Jordan Lee", Role: "Auditor", Access: "View evidence and audit trail" },
  { Name: "Riley Chen", Role: "Data owner", Access: "Approve CDE lineage and sensitive data decisions" }
];

export default function SettingsPage() {
  return (
    <WorkspaceShell
      title="Organization Settings"
      subtitle="Manage organization, workspace, roles, and access."
    >
      <section className="app-grid">
        <article className="panel">
          <h2>Organization</h2>
          <p>Name: Northstar Financial Controls</p>
          <p>Plan: Enterprise</p>
          <p>RLS scope: organization_id</p>
        </article>
        <article className="panel">
          <h2>Access model</h2>
          <p>Admins manage access. Reviewers approve artifacts. Auditors view evidence without editing records.</p>
        </article>
        <article className="panel">
          <h2>Harness controls</h2>
          <p>Meta-harness traces record validation, changed surfaces, residual risks, and next checks for product, agent, skill, and deployment changes.</p>
        </article>
      </section>
      <StatusTable columns={["Name", "Role", "Access"]} rows={users.map((user) => ({ ...user }))} />
    </WorkspaceShell>
  );
}
