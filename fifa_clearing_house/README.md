# FIFA Clearing House Navigator – MVP

A deterministic-first API for the three most common FIFA Clearing House workflows.

## Core design rule

**LLMs must never compute eligibility verdicts, monetary amounts, procedural
deadlines, or readiness pass/fail outcomes.** Those are handled exclusively by
deterministic Python code. The LLM layer (`/ai/extract`) converts free-form
text into structured fields only; all numeric and procedural outputs come from
the rule engines.

## MVP use cases

| # | Endpoint | What it does |
|---|----------|--------------|
| Gate | `POST /gate` | Routes a transfer to the applicable mechanisms (solidarity, training comp, neither) |
| UC1 | `POST /uc1/estimate` | Estimates the solidarity contribution or training compensation amount |
| UC2 | `POST /uc2/deadline` | Calculates the filing deadline from a trigger-event date |
| UC3 | `POST /uc3/readiness` | Checks a club's document checklist against RSTP requirements |

Supporting endpoints:

| Endpoint | Purpose |
|----------|---------|
| `POST /ai/extract` | LLM-only: converts unstructured text to structured fields (always returns `confirmed=false`) |
| `GET  /audit/log`  | Retrieve recent audit records |
| `POST /audit/log`  | Write an explicit audit record (external systems) |

---

## Local setup

### Prerequisites

- Python 3.11+
- `pip`

### Install

```bash
cd fifa_clearing_house
pip install -r requirements-dev.txt
```

### Run the API

```bash
cd fifa_clearing_house
uvicorn fifa_ch.main:app --reload --host 0.0.0.0 --port 8000
```

Interactive docs are available at <http://localhost:8000/docs>.

### Run tests

```bash
cd fifa_clearing_house
pytest -v
```

Expected output: **53 passed**.

### Audit log location

By default the audit log is written to `audit_log.ndjson` in whichever
directory you run the server from. Override with the environment variable:

```bash
export AUDIT_LOG_PATH=/var/log/fifa_ch/audit.ndjson
```

### Optional: AI extraction

To enable live LLM extraction set your Anthropic API key:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

Without the key, `/ai/extract` returns a placeholder showing the expected
field schema. The deterministic endpoints are unaffected either way.

---

## Human-in-the-loop confirmation gate

Every request model carries two fields:

| Field | Default | Purpose |
|-------|---------|---------|
| `source` | `"manual"` | `"manual"` or `"ai_extracted"` |
| `confirmed` | `true` | Must be `true` before the engine runs |

When data comes from `/ai/extract`:
1. The response carries `source="ai_extracted"` and `confirmed=false`.
2. Show `extracted_fields` to the user for review.
3. After confirmation, set `confirmed=true` and forward to the deterministic
   endpoint.
4. Posting with `source="ai_extracted"` and `confirmed=false` returns **422**.

---

## Regulatory config

All FIFA/RSTP citations, training-cost amounts, deadline periods, and
readiness-checklist items are stored in:

```
fifa_ch/config/regulations.yaml
```

No business-logic code hard-codes rule numbers or monetary amounts.

Items marked `verify_status: VERIFY_REQUIRED` must be validated against the
current FIFA circular before production use. The API propagates these warnings
in every response under `verify_required_warnings`.

---

## Sample payloads

| Endpoint | Request | Response |
|----------|---------|---------|
| `/gate` | `samples/gate_request.json` | `samples/gate_response.json` |
| `/uc1/estimate` (solidarity) | `samples/uc1_solidarity_request.json` | `samples/uc1_solidarity_response.json` |
| `/uc1/estimate` (training comp) | `samples/uc1_training_request.json` | `samples/uc1_training_response.json` |
| `/uc2/deadline` | `samples/uc2_request.json` | `samples/uc2_response.json` |
| `/uc3/readiness` | `samples/uc3_request.json` | `samples/uc3_response.json` |

Try them with curl:

```bash
curl -s -X POST http://localhost:8000/gate \
  -H "Content-Type: application/json" \
  -d @samples/gate_request.json | python3 -m json.tool
```

---

## Architecture

```
fifa_ch/
  main.py              # FastAPI routes; auto-writes audit record per call
  models.py            # Pydantic request/response models + AI confirmation gate
  config/
    regulations.yaml   # Single source of truth for all regulatory metadata
    loader.py          # YAML loader (cached)
  engines/
    gate.py            # Eligibility routing (deterministic)
    uc1_estimate.py    # Fee estimation (deterministic)
    uc2_deadline.py    # Deadline calculation (deterministic)
    uc3_readiness.py   # Readiness check (deterministic)
  ai/
    extractor.py       # LLM boundary – only file allowed to call an LLM
  audit/
    logger.py          # NDJSON audit writer (thread-safe)
tests/
  test_gate.py
  test_uc1.py
  test_uc2.py
  test_uc3.py
  test_audit.py
  test_no_llm.py       # Proves LLMs are never called in deterministic paths
samples/               # Representative request/response pairs
```

---

## VERIFY_REQUIRED items

The following items require verification against current FIFA documents
before any live monetary calculation or deadline commitment:

- Training-cost amounts for categories I–IV (from FIFA Circular 1264 and
  subsequent confederation schedules)
- The exact formula for applicable category when clubs are different categories
  (RSTP Annex 4 Art. 3)
- The 6-month filing-deadline trigger-event definition for both mechanisms
- Confederation-specific overrides to training-cost schedules
- Age-bracket season counting (integer ages here vs. full football seasons in TMS)
- Bank-account submission format required by FIFA TMS

See `regulations.yaml` for the full list with per-item citations.
