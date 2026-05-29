export function MetricGrid({
  metrics,
  compact = false
}: {
  metrics: Array<{ label: string; value: string; detail: string }>;
  compact?: boolean;
}) {
  return (
    <section className={compact ? "metric-grid compact" : "metric-grid"}>
      {metrics.map((metric) => (
        <article key={metric.label} className="metric-card">
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <p>{metric.detail}</p>
        </article>
      ))}
    </section>
  );
}
