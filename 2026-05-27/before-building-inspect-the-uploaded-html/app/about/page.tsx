export default function AboutPage() {
  return (
    <main className="content-page">
      <section className="page-heading">
        <p className="small-caps">About</p>
        <h1>Built for regulated teams where evidence matters.</h1>
        <p>
          Zess AI is designed for AI governance, risk, compliance,
          audit, data governance, model risk, architecture, and executive teams moving AI from idea
          to governed operation.
        </p>
      </section>
      <section className="split-section">
        <div><h2>Serious AI adoption needs an operating layer.</h2></div>
        <div className="workflow-list">
          {["Control risk, spend, memory, models, and decisions from one place.", "Track token usage like cloud spend.", "Route work to the right model, not always the largest one.", "Turn agent activity into governed evidence."].map((item) => (
            <article className="line-item" key={item}><h3>{item}</h3></article>
          ))}
        </div>
      </section>
    </main>
  );
}
