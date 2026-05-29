# Object Model Rationalization

## Core Objects For Go-Live

| Object | Keep? | Rationale |
| --- | --- | --- |
| Organization | Yes | Required for multi-tenant SaaS. |
| User | Yes | Required for auth and audit attribution. |
| Role | Yes | Needed for approvals, ownership, and permissions. |
| Use Case | Yes | Primary business object. |
| Workflow | Yes | Converts a use case into governed operation. |
| Agent Run | Yes | Captures automated assessment and evidence generation. |
| Handoff | Yes | Useful if it shows control transfer and next action. |
| Risk | Yes | Core governance artifact. |
| Control | Yes | Core auditable object. |
| Evidence | Yes | Must become first-class before go-live. |
| Decision | Yes | Needed for approval traceability. |
| Eval | Yes | Needed for testing and monitoring. |
| Alert | Yes | Needed for early warning signals. |
| Governance Memo | Yes | Primary output artifact. |
| Audit Event | Yes | Required for credibility. |

## Secondary Objects

| Object | Recommendation |
| --- | --- |
| Memory Item | Keep as an advanced governance object, not central first screen. |
| Skill | Keep as future module or admin-only capability. |
| Skill Change Request | Defer unless skills become a major product theme. |
| Model Decision | Keep; it is central to model mix governance. |
| Token Usage Record | Keep; token spend is an AI-native control. |
| Data Governance Dimension | Keep; this is a differentiator. |
| Enterprise Policy Embedding | Keep but simplify; use it to show policy-to-action traceability. |
| Policy Role | Keep but avoid making it too academic. |

## Objects That Need Better Naming

| Current Concept | Better Product Language |
| --- | --- |
| Agent orchestration | Workflow automation and governance agents |
| Handoff packet | Governed handoff |
| EWS | Early warning signals |
| Memory drift | Context and memory risk |
| Skills governance | Governed reusable patterns |
| Model mix | Model strategy and cost |
| Data governance assessment | AI data readiness assessment |

## Rule For Adding Objects

Do not add a new first-class object unless it answers one of these:

1. Who owns this?
2. What risk does it control?
3. What decision does it support?
4. What evidence does it produce?
5. What would an auditor test?

