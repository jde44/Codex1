import Link from "next/link";
import { offeringBuckets } from "@/lib/offerings";

export default function PlatformPage() {
  return (
    <main className="content-page">
      <section className="page-heading">
        <p className="small-caps">Ready. Set. Know.</p>
        <h1>One operating workflow for governing AI before it scales.</h1>
        <p>
          The platform separates the MVP into three practical motions so executives, risk teams,
          data owners, technology teams, and reviewers can see where work belongs and what needs action.
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
          <h2>PARCM powers the detail. Ready, Set, Know makes the workflow understandable.</h2>
          <p>
            Process, activities, risk, control, and monitoring remain the internal governance
            backbone. The top layer turns that depth into a practical intake, approval, and evidence path.
          </p>
        </div>
        <div className="workflow-list">
          <article className="line-item">
            <h3>Ready captures the AI use case, owner, model/vendor, data exposure, decision impact, and required review path.</h3>
          </article>
          <article className="line-item">
            <h3>Set maps the workflow through PARCM: process, activities, risks, controls, evidence, monitoring, and escalation.</h3>
          </article>
          <article className="line-item">
            <h3>Know produces the governance memo, evidence pack, decision log, issue log, and revisit triggers.</h3>
          </article>
        </div>
      </section>
    </main>
  );
}
