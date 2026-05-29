import Link from "next/link";

const parcm = [
  ["P", "Process", "Define the business process, owners, systems, data products, and decisions affected by AI."],
  ["A", "Activities", "Decompose agent steps, handoffs, tools, memory updates, and human review moments."],
  ["R", "Risk", "Classify inherent and residual risk across output integrity, data, model, cost, security, and conduct."],
  ["C", "Control", "Map preventive, detective, and corrective controls to evidence, owners, and escalation triggers."],
  ["M", "Monitoring", "Track EWS, evals, drift, spend, overrides, failed tests, and audit-ready decisions."]
];

export default function MethodologyPage() {
  return (
    <main className="content-page">
      <section className="page-heading">
        <p className="small-caps">PARCM Methodology</p>
        <h1>An AI-native operating layer for governed workflows.</h1>
        <p>PARCM turns AI use cases into controlled operating objects that can be tested, monitored, approved, and audited.</p>
      </section>
      <section className="concept-grid">
        {parcm.map(([letter, title, body]) => (
          <article className="concept-card" key={letter}>
            <span>{letter}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <Link className="button primary" href="/workflows">Open PARCM workspace</Link>
    </main>
  );
}
