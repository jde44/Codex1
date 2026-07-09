"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { offeringBuckets } from "@/lib/offerings";
import { bucketNarratives, operatingScenarios } from "@/lib/home-test-data";

const skillRoutes: Record<string, string> = {
  "AI use case intake": "/use-cases",
  "Risk tier classification": "/use-cases",
  "Owner and reviewer assignment": "/use-cases",
  "Data and regulatory exposure capture": "/data-governance",
  "Go pause review status": "/dashboard",
  "PARCM workflow setup": "/workflows",
  "Risk and control mapping": "/risk-controls",
  "Evidence requirement mapping": "/risk-controls",
  "Control owner assignment": "/risk-controls",
  "Monitoring and escalation plan": "/testing",
  "Governance memo generation": "/memos",
  "Evidence pack assembly": "/memos",
  "Decision log": "/audit",
  "Issue tracker": "/testing",
  "Monitoring summary": "/memos"
};

export function HomeBucketPanel() {
  const [selectedId, setSelectedId] = useState(offeringBuckets[0]?.id ?? "ready");
  const selected = useMemo(
    () => offeringBuckets.find((bucket) => bucket.id === selectedId) ?? offeringBuckets[0],
    [selectedId]
  );
  const selectedScenario = operatingScenarios.find(
    (scenario) => scenario.bucket.toLowerCase() === selected.id || scenario.bucket === selected.name
  );
  const selectedNarrative = bucketNarratives[selected.id as keyof typeof bucketNarratives];

  return (
    <section className="home-action-panel" aria-label="Ready Set Know command panel">
      <div className="home-action-tabs" role="tablist" aria-label="Choose operating bucket">
        {offeringBuckets.map((bucket) => (
          <button
            aria-selected={bucket.id === selected.id}
            className={bucket.id === selected.id ? "active" : ""}
            key={bucket.id}
            onClick={() => setSelectedId(bucket.id)}
            role="tab"
            type="button"
          >
            <span>{bucket.label}</span>
            <strong>{bucket.name}</strong>
          </button>
        ))}
      </div>

      <article className="home-action-detail">
        <span>{selected.label}</span>
        <h2>{selected.name}</h2>
        <p>{selectedNarrative?.headline ?? selected.summary}</p>
        <div className="home-metric-row">
          {selected.metrics.map((metric) => (
            <div key={metric.label}>
              <small>{metric.label}</small>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
      </article>

      {selectedScenario ? (
        <article className="home-scenario-preview">
          <span>Sample workspace record</span>
          <h3>{selectedScenario.name}</h3>
          <p>{selectedNarrative?.proof}</p>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{selectedScenario.status}</dd>
            </div>
            <div>
              <dt>Signal</dt>
              <dd>{selectedScenario.signal}</dd>
            </div>
          </dl>
        </article>
      ) : null}

      <div className="featured-skills">
        <div className="frame-header">
          <span>Featured skills</span>
          <strong>{selected.name} phase</strong>
        </div>
        <div className="featured-skill-list">
          {selected.capabilities.map((capability) => (
            <Link href={skillRoutes[capability] ?? selected.primaryRoute} key={capability}>
              {capability}
            </Link>
          ))}
        </div>
      </div>

      <Link className="button primary full" href={selected.primaryRoute}>
        Open {selected.name}
      </Link>
    </section>
  );
}
