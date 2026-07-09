# Platform Companion Positioning

## Core Position

RSK AI is a market companion to Snowflake, Databricks, AWS, Azure, and enterprise data governance ecosystems.

It does not replace the data platform. It operationalizes what happens after a governed data signal, model output, anomaly, or AI use case appears.

## One-Line Positioning

From governed data to governed AI decisions.

## Expanded Positioning

Enterprise data platforms govern, process, and activate data. RSK AI turns those data signals into auditable AI governance workflows: readiness assessment, policy-to-control mapping, role accountability, approval, monitoring, memo generation, and audit evidence.

## What We Are

- AI governance operating layer
- Last-mile control and evidence layer
- Federated data readiness assessment layer
- Policy-to-action translation layer
- Real-time insight-to-governed-action workflow
- Companion to secure cloud data environments

## What We Are Not

- Not a warehouse
- Not a lakehouse
- Not a BI tool
- Not a data catalog
- Not a model registry
- Not a replacement for Snowflake, Databricks, AWS, Azure, Purview, Collibra, or Alation

## Companion Value By Platform

| Platform | What They Provide | What This App Adds |
| --- | --- | --- |
| Snowflake | Governed data, tags, lineage, access, query/activity signals, data sharing, app ecosystem | AI readiness workflow, approval routing, evidence package, governance memo, model/cost decision, audit trail |
| Databricks | Lakehouse, Unity Catalog, lineage, model/job context, feature/data products, ML/AI workflows | AI use case governance, policy-to-control mapping, federated role accountability, eval/EWS, decision evidence |
| AWS | Secure cloud environment, S3, Glue, Lake Formation, Bedrock, SageMaker, CloudWatch, PrivateLink patterns | Governance workflow across cloud data/AI signals, approval gates, evidence, monitoring, audit-ready decisions |
| Azure | Secure cloud environment, Azure Databricks, Purview/Fabric, Synapse, Azure OpenAI, Private Link patterns | AI governance operating layer connecting data readiness, model use, policy obligations, and audit action |
| Purview / Collibra / Alation | Catalog, glossary, policies, stewardship, lineage metadata | Converts metadata and policy obligations into active workflow, control ownership, evidence, decisions, and monitoring |

## Integration Signal Categories

The app should ingest or reference:

- Data product metadata
- Business glossary terms
- CDE inventory
- Lineage and transformation paths
- Data quality scores and defects
- Sensitive data classifications
- Access and entitlement metadata
- Report ownership and report inventory
- Model/job context
- Token and model usage records
- Cloud cost and usage signals
- Policy obligations and control mappings
- Audit events and evidence artifacts

## Secure Cloud Deployment Story

For regulated clients, the preferred story is:

1. Run in the customer-approved cloud environment or private SaaS pattern.
2. Connect through private networking where required.
3. Pull metadata and governance signals before pulling business data.
4. Keep sensitive data in the source platform whenever possible.
5. Store decisions, evidence, approvals, and audit trail in the governance layer.
6. Enforce tenant, role, and policy boundaries server-side.

## Product Implications

The app should add a “Platform Signals” concept to the product model.

Possible V1 mock signals:

- Snowflake lineage gap detected
- Databricks Unity Catalog data quality warning
- AWS Lake Formation sensitive tag used in AI context
- Azure Purview policy obligation unmapped
- Token spend spike from model route
- Report owner approval missing

Each signal should become:

- Risk
- Control
- Owner
- Evidence requirement
- Escalation trigger
- Memo section
- Audit event

## Demo Positioning

Do not demo connectors first. Demo the governance outcome:

> A governed data platform produced a signal. The command center turned it into accountable action.

Best phrasing:

- “Snowflake and Databricks help govern the data estate. This governs AI decisions made from that data.”
- “This is where data readiness becomes approval readiness.”
- “The app does not move the lakehouse. It moves the decision.”

