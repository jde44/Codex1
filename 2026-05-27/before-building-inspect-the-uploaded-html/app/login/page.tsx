import Link from "next/link";
import { operatingScenarios } from "@/lib/home-test-data";
import { boardKpis, offeringBuckets } from "@/lib/offerings";

export default function LoginPage() {
  return (
    <main className="member-gateway">
      <section className="member-gateway-copy">
        <p className="small-caps">Member Workspace</p>
        <h1>Enter the workspace where governed AI work happens.</h1>
        <p>
          Review readiness, launch workflows, monitor signals, and turn evidence into decisions.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/dashboard">
            Open Workspace
          </Link>
          <Link className="button ghost" href="/product#ready">
            Review Ready Set Grow
          </Link>
        </div>
      </section>

      <section className="member-login-panel" aria-label="Member access and workspace preview">
        <section className="auth-card gateway-card">
          <p className="small-caps">Secure access</p>
          <h2>Member Access</h2>
          <form>
            <label>
              Work email
              <input type="email" placeholder="member@institution.com" />
            </label>
            <label>
              Access code
              <input type="password" placeholder="Access code" />
            </label>
            <Link className="button primary full" href="/dashboard">
              Continue to Workspace
            </Link>
          </form>
          <p className="auth-note">
            Supabase Auth can replace this gate using the included client wrappers and RLS policies.
          </p>
        </section>

        <section className="workspace-preview">
          <div className="frame-header">
            <span>Workspace preview</span>
            <strong>Sample enterprise data</strong>
          </div>
          <div className="workspace-preview-grid">
            {boardKpis.map((kpi) => (
              <article key={kpi.label}>
                <span>{kpi.label}</span>
                <strong>{kpi.value}</strong>
                <p>{kpi.detail}</p>
              </article>
            ))}
          </div>
          <div className="workspace-bucket-row">
            {offeringBuckets.map((bucket) => (
              <Link href={bucket.primaryRoute} key={bucket.id}>
                <span>{bucket.label}</span>
                <strong>{bucket.name}</strong>
              </Link>
            ))}
          </div>
          <div className="workspace-scenario-list">
            {operatingScenarios.map((scenario) => (
              <article key={scenario.name}>
                <span>{scenario.bucket}</span>
                <h3>{scenario.name}</h3>
                <p>{scenario.signal}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
