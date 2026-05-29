"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { offeringBuckets } from "@/lib/offerings";
import { bucketNarratives, operatingScenarios } from "@/lib/home-test-data";

const skillRoutes: Record<string, string> = {
  "SIFI-grade data governance readiness": "/data-governance",
  "Federated ownership and stewardship assessment": "/data-governance",
  "Security architecture and access control review": "/risk-controls",
  "Third-party model and vendor oversight": "/risk-controls",
  "Data sovereignty and residency assessment": "/data-governance",
  "Cloud data platform signal intake": "/shadow-ai",
  "AI macro-risk and regulatory trend watch": "/risk-controls",
  "Shadow AI discovery and conversion": "/shadow-ai",
  "AI use case intake": "/use-cases",
  "PARCM workflow setup": "/workflows",
  "Agent orchestration and handoffs": "/orchestration",
  "Risk and control mapping": "/risk-controls",
  "Model mix and routing decisions": "/cost",
  "Token budget governance": "/token-governance",
  "Testing and eval setup": "/testing",
  "Governance memo generation": "/memos",
  "Board KPI monitoring": "/dashboard",
  "Early warning signals": "/testing",
  "Regulatory expectation monitoring": "/testing",
  "Program drift detection": "/alerts",
  "Model and context drift monitoring": "/testing",
  "Shadow AI trend reporting": "/shadow-ai",
  "Lessons learned capture": "/learning",
  "Role-based training triggers": "/learning",
  "Remediation and audit trail updates": "/audit"
};

export function HomeBucketPanel() {
  const [selectedId, setSelectedId] = useState(offeringBuckets[0]?.id ?? "ready");
  const selected = useMemo(
    () => offeringBuckets.find((bucket) => bucket.id === selectedId) ?? offeringBuckets[0],
    [selectedId]
  );
  const selectedScenario = operatingScenarios.find(
    (scenario) => scenario.bucket.toLowerCase() === selected.id
  );
  const selectedNarrative = bucketNarratives[selected.id as keyof typeof bucketNarratives];

  return (
    <section className="home-action-panel" aria-label="Ready Set Grow command panel">
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
          <strong>{selected.name} bucket</strong>
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
