import Link from "next/link";

export default function RequestAccessPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="small-caps">Request Access</p>
        <h1>Bring governed AI operations into your risk program.</h1>
        <form>
          <label>Name<input placeholder="Your name" /></label>
          <label>Work email<input type="email" placeholder="you@company.com" /></label>
          <label>Organization<input placeholder="Company or institution" /></label>
          <label>Use case<textarea placeholder="Tell us what you need to govern" /></label>
          <Link className="button primary full" href="/dashboard">Submit request</Link>
        </form>
      </section>
    </main>
  );
}
