import { memoSections } from "@/lib/mock-data/platform";

export function MemoPreview() {
  return (
    <article className="memo-preview">
      <header>
        <p>Governance Approval Memo</p>
        <h2>AI-assisted regulatory reporting variance commentary</h2>
        <span>Status: Conditional approval pending evidence completion</span>
      </header>
      {memoSections.map((section) => (
        <section key={section.title}>
          <h3>{section.title}</h3>
          <p>{section.body}</p>
          <small>Evidence: {section.evidence}</small>
        </section>
      ))}
    </article>
  );
}
