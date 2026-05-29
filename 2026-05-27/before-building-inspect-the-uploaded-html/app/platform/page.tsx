import Link from "next/link";
import { offeringBuckets } from "@/lib/offerings";

export default function PlatformPage() {
  return (
    <main className="content-page">
      <section className="page-heading">
        <p className="small-caps">Ready. Set. Grow.</p>
        <h1>One command layer for AI readiness, governance setup, and program scale.</h1>
        <p>
          The platform separates the offer into three simple motions so executives, risk teams,
          data owners, architects, and reviewers can see where work belongs and what needs action.
        </p>
      </section>
      <section className="offering-grid">
        {offeringBuckets.map((bucket) => (
          <article className="offering-card" id={bucket.id} key={bucket.id}>
            <span>{bucket.label}</span>
            <h2>{bucket.name}</h2>
            <p>{bucket.summary}</p>
            <div className="capability-list">
              {bucket.capabilities.map((capability) => (
                <small key={capability}>{capability}</small>
              ))}
            </div>
            <div className="action-row">
              <Link className="button primary" href={bucket.primaryRoute}>
                Open {bucket.name}
              </Link>
              <Link className="button ghost" href="/dashboard">
                Open Workspace
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="split-section">
        <div>
          <p className="small-caps">Operating Model</p>
          <h2>PARCM still powers the detail. Ready, Set, Grow makes the front door understandable.</h2>
          <p>
            Process, activities, risk, control, and monitoring remain the internal governance
            backbone. The new top layer turns that depth into a practical buying and adoption path.
          </p>
        </div>
        <div className="workflow-list">
          <article className="line-item">
            <h3>Ready validates whether governed data, secure architecture, third-party oversight, and policy ownership are mature enough for AI.</h3>
          </article>
          <article className="line-item">
            <h3>Set configures intake, orchestration, model routing, controls, tests, approvals, and audit-ready evidence.</h3>
          </article>
          <article className="line-item">
            <h3>Grow monitors board KPIs, drift, shadow AI, lessons learned, training, escalation, and remediation.</h3>
          </article>
        </div>
      </section>
    </main>
  );
}
