import Link from "next/link";
import { boardKpis, offeringBuckets } from "@/lib/offerings";
import { homeActivityFeed, operatingScenarios } from "@/lib/home-test-data";
import { HomeBucketPanel } from "@/components/marketing/home-bucket-panel";

export default function Home() {
  return (
    <main>
      <section className="bank-hero">
        <div className="hero-copy">
          <p className="small-caps">Ready. Set. Grow.</p>
          <h1>Govern AI workflows before they govern you.</h1>
          <p>
            A command layer for regulated teams governing AI readiness, orchestration,
            monitoring, evidence, and approval.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/dashboard">
              Enter Workspace
            </Link>
            <Link className="button ghost" href="/request-access">
              Request Access
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="Ready Set Grow command panel">
          <HomeBucketPanel />
        </div>
      </section>

      <section className="quick-link-band" aria-label="Common actions">
        {[
          ["Start an intake", "/use-cases"],
          ["Open workspace", "/dashboard"],
          ["Open risk controls", "/risk-controls"],
          ["Monitor alerts", "/testing"]
        ].map(([label, href]) => (
          <Link href={href} key={label}>{label}</Link>
        ))}
      </section>

      <section className="offerings-section" aria-label="Ready Set Grow offerings">
        <div className="section-kicker">
          <p className="small-caps">Offerings</p>
          <h2>Three buckets. Clear owners. Governed evidence.</h2>
        </div>
        <div className="offering-grid">
          {offeringBuckets.map((bucket) => (
            <article className="offering-card" id={bucket.id} key={bucket.id}>
              <span>{bucket.label}</span>
              <h3>{bucket.name}</h3>
              <p>{bucket.summary}</p>
              <div className="capability-list">
                {bucket.capabilities.slice(0, 5).map((capability) => (
                  <small key={capability}>{capability}</small>
                ))}
              </div>
              <Link href={bucket.primaryRoute}>Open {bucket.name}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="test-data-section">
        <div className="section-kicker">
          <p className="small-caps">Live test data</p>
          <h2>Sample records that make the workspace real.</h2>
        </div>
        <div className="scenario-board">
          {operatingScenarios.map((scenario) => (
            <article className="scenario-card" key={scenario.name}>
              <span>{scenario.bucket}</span>
              <h3>{scenario.name}</h3>
              <p>{scenario.signal}</p>
              <dl>
                <div><dt>Owner</dt><dd>{scenario.owner}</dd></div>
                <div><dt>Status</dt><dd>{scenario.status}</dd></div>
                <div><dt>Next</dt><dd>{scenario.nextAction}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="crm-band" aria-label="Board level AI KPIs">
        {boardKpis.map((kpi) => (
          <article key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <p>{kpi.detail}</p>
          </article>
        ))}
      </section>

      <section className="split-section">
        <div>
          <p className="small-caps">Activity feed</p>
          <h2>Signals flow from intake to policy, security, and training.</h2>
          <p>Use these records to show platform activity becoming governance action.</p>
        </div>
        <div className="workflow-list">
          {homeActivityFeed.map((item) => (
            <article key={item} className="line-item"><h3>{item}</h3></article>
          ))}
        </div>
      </section>
    </main>
  );
}
