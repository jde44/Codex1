# Product Brief

## Working Name

Veris

## Product Thesis

Move AI use cases from idea to governed, auditable operation by connecting intake, data readiness, risk, controls, model routing, token cost, testing, approvals, monitoring, evidence, and decision documentation.

## Sharp Version

The app helps regulated teams answer one question:

> Can this AI workflow be approved for controlled use, and what evidence proves it?

## Primary Buyer Hypothesis

Initial buyer should be one of:

- Chief AI Officer or AI governance lead
- Chief Data Officer or enterprise data governance lead
- Risk/compliance executive responsible for AI controls
- Consulting client evaluating an AI governance operating model

The most credible wedge is likely **regulated AI workflow approval and evidence readiness**, not generic chatbot governance.

## First Killer Use Case

Regulatory reporting variance commentary.

Why it works:

- It is familiar to risk, finance, audit, and data governance teams.
- It naturally requires data lineage, CDEs, human approval, source evidence, report ownership, and audit trail.
- It makes model risk, token spend, prompt/context controls, and memo evidence concrete.
- It avoids looking like a generic chatbot demo.

## Product Promise

Control risk, spend, memory, models, data readiness, and decisions from one operating layer.

## Platform Companion Thesis

The app should be positioned as a companion operating layer to Snowflake, Databricks, AWS, Azure, and enterprise data governance ecosystems.

Sharp message:

> From governed data to governed AI decisions.

Expanded message:

> Snowflake and Databricks organize, govern, and activate enterprise data. Veris turns those governed data insights into auditable AI decisions, controls, approvals, and real-time operating actions.

The app should not compete with data platforms as a warehouse, lakehouse, catalog, BI tool, or model registry. It should sit after and beside those platforms as the layer that asks:

- Is this AI use case ready to operate?
- Is the underlying data fit for AI?
- Which policies apply?
- Who owns approval?
- What controls must run?
- What evidence proves the decision?
- What action should happen when a governed insight or alert appears?

## Launch Narrative

1. A business team submits an AI use case.
2. The app classifies risk and required reviews.
3. The Data Governance Agent checks whether the data is fit for AI under a federated model.
4. The system maps risks to controls and evidence.
5. The model strategy recommends the right model mix instead of always using the largest model.
6. Testing and early warning signals expose unresolved issues.
7. The memo builder turns all activity into an audit-ready decision package.

## What Makes It Different

- Treats AI governance as an operating workflow, not a static policy.
- Connects data governance, model risk, controls, cost, and audit evidence.
- Makes token/model spend part of governance.
- Makes federated data ownership visible enough for executives and auditors.
- Produces decision documentation, not just dashboard metrics.
- Converts Snowflake, Databricks, and cloud data-platform signals into governance workflow, accountability, and audit evidence.

## Companion Platforms

| Platform | Companion Role |
| --- | --- |
| Snowflake | Use governed data, tags, lineage, usage, and anomaly signals to trigger AI readiness and control workflows. |
| Databricks / Unity Catalog | Use lineage, governed assets, jobs, model/feature context, and quality signals as inputs to readiness and evidence. |
| AWS | Integrate with Glue, Lake Formation, S3, CloudWatch, SageMaker, Bedrock, and PrivateLink-oriented deployment patterns. |
| Azure | Integrate with Purview/Fabric, Azure Databricks, Synapse, Azure OpenAI, and Private Link-oriented deployment patterns. |
| Collibra / Alation / Purview | Treat catalog and policy metadata as source signals, not products to replace. |

## Integration Design Principle

Read metadata, lineage, access, quality, cost, model, and evidence signals first. Avoid copying sensitive business data unless explicitly approved and controlled.

## What Must Be Simplified

The current app risks feeling overdone because too many enterprise objects appear at once. The first public demo should emphasize:

- Use case intake
- Data governance readiness
- Risk and control matrix
- Model mix and token cost
- Testing and EWS
- Governance memo
- Audit trail

Memory, skills, and broad agent catalog concepts should be framed as advanced modules unless they directly support the demo narrative.
