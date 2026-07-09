export default function AboutPage() {
  return (
    <main className="content-page">
      <section className="page-heading">
        <p className="small-caps">About</p>
        <h1>Built for regulated teams where evidence matters.</h1>
        <p>
          RSK AI is the app platform behind Ready Set Know. It is designed for AI governance,
          risk, compliance, audit, data governance, model risk, architecture, and executive teams
          moving AI from idea to governed operation.
        </p>
      </section>
      <section className="split-section">
        <div><h2>Serious AI adoption needs an operating layer.</h2></div>
        <div className="workflow-list">
          {["Classify AI use cases before deployment.", "Map regulated workflows through PARCM.", "Keep deterministic risk tiering separate from generated narrative.", "Turn approvals, issues, and evidence into decision memory."].map((item) => (
            <article className="line-item" key={item}><h3>{item}</h3></article>
          ))}
        </div>
      </section>
    </main>
  );
}
