import Link from "next/link";
import { boardKpis, futureModules, offeringBuckets } from "@/lib/offerings";
import { homeActivityFeed, operatingScenarios } from "@/lib/home-test-data";
import { HomeBucketPanel } from "@/components/marketing/home-bucket-panel";

export default function Home() {
  return (
    <main>
      <section className="bank-hero public-hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">Ready Set Know</p>
          <h1>
            Govern AI before risk <em>scales.</em>
          </h1>
          <p>
            RSK AI helps risk, compliance, audit, data, and technology teams move AI
            use cases from intake to control mapping to audit-ready governance memos.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/dashboard">
              Open RSK AI
            </Link>
            <Link className="button ghost" href="/request-access">
              Request Access
            </Link>
          </div>
          <div className="hero-stat-strip" aria-label="Platform validation statistics">
            <div>
              <strong>20/20</strong>
              <span>Governance tests passing</span>
            </div>
            <div>
              <strong>32</strong>
              <span>Static routes prerendered</span>
            </div>
            <div>
              <strong>3</strong>
              <span>MVP use cases</span>
            </div>
            <div>
              <strong>PARCM</strong>
              <span>Core method</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Ready Set Know command panel">
          <HomeBucketPanel />
        </div>
      </section>

      <section className="quick-link-band" aria-label="Common actions">
        {[
          ["Start an intake", "/use-cases"],
          ["Map PARCM controls", "/workflows"],
          ["Draft memo", "/memos"],
          ["Open decision log", "/audit"]
        ].map(([label, href]) => (
          <Link href={href} key={label}>{label}</Link>
        ))}
      </section>

      <section className="offerings-section" aria-label="Ready Set Know offerings">
        <div className="section-kicker">
          <p className="small-caps">MVP workflow</p>
          <h2>Ready. Set. Know.</h2>
          <p>
            Ready Set Know narrows the platform to one credible first journey:
            submit an AI use case, map the governed workflow, then produce evidence
            that reviewers and auditors can use.
          </p>
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

      <section className="platform-section" aria-label="Platform capabilities">
        <div className="section-kicker">
          <p className="small-caps">Primary use cases</p>
          <h2>Focused on the work regulated teams actually have to finish.</h2>
          <p>
            The reset keeps the strongest governance ideas but makes the front door
            specific: use case governance, PARCM mapping, and evidence/memo generation.
          </p>
        </div>
        <div className="feature-grid">
          {[
            ["AI Use Case Governance", "Submit, classify, risk-tier, control-map, and approve AI use cases before deployment."],
            ["Regulated Workflow Control Mapping", "Use PARCM to map process, activities, risks, controls, and monitoring for AI-supported workflows."],
            ["Evidence & Governance Memo Generation", "Generate audit-ready governance memos, evidence packs, issue logs, and monitoring summaries."]
          ].map(([title, copy]) => (
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="test-data-section">
        <div className="section-kicker">
          <p className="small-caps">First demo workflow</p>
          <h2>Regulatory reporting and credit decisioning governance.</h2>
          <p>
            Mock data is labeled as sample enterprise data. The demo scenario is a
            reporting team using AI to draft variance commentary and identify anomalies
            before submission, with a credit decisioning intake as the next adjacent use case.
          </p>
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

      <section className="crm-band" aria-label="RSK AI use case governance summary">
        {boardKpis.map((kpi) => (
          <article key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <p>{kpi.detail}</p>
          </article>
        ))}
      </section>

      <section className="quote-section">
        <div>
          <p className="small-caps">Designed for governance teams</p>
          <h2>Operational enough for reviewers, clear enough for executives.</h2>
        </div>
        <blockquote>
          Designed for risk, compliance, audit, and technology teams that need to
          govern AI workflows before they scale.
        </blockquote>
      </section>

      <section className="split-section">
        <div>
          <p className="small-caps">Activity feed</p>
          <h2>Every step leaves decision memory.</h2>
          <p>Use these records to show intake, control mapping, evidence, and approval becoming one audit trail.</p>
        </div>
        <div className="workflow-list">
          {homeActivityFeed.map((item) => (
            <article key={item} className="line-item"><h3>{item}</h3></article>
          ))}
        </div>
      </section>

      <section className="platform-section" aria-label="Future modules">
        <div className="section-kicker">
          <p className="small-caps">Future modules</p>
          <h2>Parked until the first workflow is sharp.</h2>
          <p>
            These ideas remain useful, but they are not the current product promise.
            They should re-enter only when they directly support the three MVP use cases.
          </p>
        </div>
        <div className="capability-list">
          {futureModules.map((module) => (
            <small key={module}>{module}</small>
          ))}
        </div>
      </section>
    </main>
  );
}
