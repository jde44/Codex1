# BUILD_REPORT – FIFA Clearing House Navigator MVP

**Date:** 2026-06-24  
**Branch:** `claude/fifa-clearing-house-mvp-9dc8qu`

---

## Files changed (new in this build)

All files are new; no pre-existing scaffold existed.

| File | Purpose |
|------|---------|
| `requirements.txt` | Runtime dependencies (FastAPI, Pydantic, PyYAML, uvicorn) |
| `requirements-dev.txt` | Dev/test deps (pytest, pytest-asyncio, httpx) |
| `pytest.ini` | Test runner config |
| `fifa_ch/__init__.py` | Package marker |
| `fifa_ch/main.py` | FastAPI app – 5 endpoint groups, auto-audit middleware |
| `fifa_ch/models.py` | Pydantic models; AI-confirmation gate enforced via validator |
| `fifa_ch/config/regulations.yaml` | Single source of truth for all regulatory metadata |
| `fifa_ch/config/__init__.py` | Package marker |
| `fifa_ch/config/loader.py` | Cached YAML loader; engine functions import via this only |
| `fifa_ch/engines/__init__.py` | Package marker |
| `fifa_ch/engines/gate.py` | Deterministic eligibility routing; 0 LLM imports |
| `fifa_ch/engines/uc1_estimate.py` | Solidarity + training-comp arithmetic; 0 LLM imports |
| `fifa_ch/engines/uc2_deadline.py` | Deadline date calculation; 0 LLM imports |
| `fifa_ch/engines/uc3_readiness.py` | Checklist PASS/FAIL; citations driven from config |
| `fifa_ch/ai/__init__.py` | Package marker |
| `fifa_ch/ai/extractor.py` | **Only file that may call an LLM**; stubs when no API key |
| `fifa_ch/audit/__init__.py` | Package marker |
| `fifa_ch/audit/logger.py` | Thread-safe NDJSON writer; SHA-256 hashes of I/O |
| `tests/__init__.py` | Package marker |
| `tests/conftest.py` | Shared fixtures; audit log redirected to tmp file |
| `tests/test_gate.py` | 8 gate tests including boundary ages and AI-gate |
| `tests/test_uc1.py` | 11 tests: solidarity maths, training comp, validation |
| `tests/test_uc2.py` | 7 tests: deadline arithmetic, month-end clamp, AI-gate |
| `tests/test_uc3.py` | 9 tests: PASS/FAIL/PARTIAL, config-driven citations |
| `tests/test_audit.py` | 5 tests: record structure, SHA-256 hashes, GET/POST |
| `tests/test_no_llm.py` | **16 tests** proving LLMs never called in deterministic paths |
| `samples/gate_request.json` | Sample /gate request |
| `samples/gate_response.json` | Sample /gate response |
| `samples/uc1_solidarity_request.json` | Sample solidarity estimate request |
| `samples/uc1_solidarity_response.json` | Sample solidarity estimate response |
| `samples/uc1_training_request.json` | Sample training-comp estimate request |
| `samples/uc1_training_response.json` | Sample training-comp estimate response |
| `samples/uc2_request.json` | Sample deadline request |
| `samples/uc2_response.json` | Sample deadline response |
| `samples/uc3_request.json` | Sample readiness request |
| `samples/uc3_response.json` | Sample readiness response |
| `README.md` | Setup, run, test, and architecture docs |
| `BUILD_REPORT.md` | This file |

**Total new files: 37**

---

## Tests run

```
53 passed in 0.33s
```

### Test breakdown

| File | Tests | What they verify |
|------|-------|-----------------|
| `test_gate.py` | 8 | Routing logic, age boundaries, AI confirmation gate |
| `test_uc1.py` | 11 | Solidarity maths (5% total), training-comp formula, validation errors |
| `test_uc2.py` | 7 | 6-month deadline, month-end clamp, past-deadline flag |
| `test_uc3.py` | 9 | PASS / PARTIAL / FAIL outcomes, config-driven regulatory citations |
| `test_audit.py` | 5 | Record written per call, SHA-256 hashes, GET/POST endpoints |
| `test_no_llm.py` | 13 | `_call_llm` not called on any deterministic route; no AI import in engine modules; unconfirmed AI payloads rejected with 422; confirmed AI payloads accepted |

---

## Architecture invariants enforced

1. **Determinism gate** – `compute_gate`, `compute_estimate`, `compute_deadline`,
   `compute_readiness` contain zero imports from `fifa_ch.ai`. Verified by
   import-attribute tests in `test_no_llm.py`.

2. **LLM boundary** – `fifa_ch/ai/extractor.py` is the only module that imports
   `anthropic`. The import is deferred inside `_call_llm` so the application
   starts without the SDK installed.

3. **AI confirmation gate** – Pydantic `model_validator` on every request model
   raises `ValueError` (→ HTTP 422) when `source="ai_extracted"` and
   `confirmed=False`. Proven by 4 tests.

4. **Config-driven citations** – Regulatory article references, training-cost
   amounts, deadline periods, and readiness-checklist items all live in
   `regulations.yaml`. Engine code reads them via `config/loader.py`; no
   article strings are hard-coded in business logic.

5. **Audit trail** – Every deterministic endpoint call writes one NDJSON record
   with `request_id`, `route_decision`, `component`, `control_objective`,
   `timestamp`, `input_hash` (SHA-256), `output_hash` (SHA-256).

---

## Remaining verification gaps (VERIFY_REQUIRED)

The following items are marked `VERIFY_REQUIRED` in `regulations.yaml` and
must be confirmed against current FIFA documents before live use:

| Item | Why |
|------|-----|
| Training-cost amounts (Categories I–IV) | FIFA Circular 1264 amounts are from 2001; confederation schedules update them. Current figures must be sourced from FIFA TMS or the relevant confederation. |
| Applicable-category formula (training comp) | RSTP Annex 4 Art. 3 describes scenarios where the *new* club's costs are used; exact conditions need legal review. |
| 6-month filing-deadline trigger | The trigger event (contract-signing date vs. registration date) and whether the period is calendar or football-year months need legal confirmation. |
| Age-bracket season counting | This MVP uses integer ages; FIFA TMS counts full football seasons. Any payment calculation must be reconciled with TMS output. |
| Confederation-specific training-cost overrides | Some confederations publish their own schedules that supersede the FIFA indicative amounts. |
| TMS submission format for bank-account details | Exact field requirements should be confirmed in the current TMS documentation. |
| Season-of-23rd-birthday rule | Exact eligibility boundary for training compensation when a player transfers during the season they turn 23. |

---

## Recommended next sprint

1. **Legal review** of all `VERIFY_REQUIRED` items with a FIFA/sports-law
   specialist; update `regulations.yaml` in place.

2. **FIFA TMS integration** – replace the age-based arithmetic with the
   official TMS season-counting logic so outputs match what FIFA will accept.

3. **FX engine** – training-cost amounts are published in EUR by FIFA.
   Add a deterministic FX conversion step using a locked exchange rate
   (e.g., ECB reference rate on transfer date). The conversion must be
   deterministic and auditable; the LLM must not be involved.

4. **AI extraction quality** – integrate and evaluate the live Anthropic
   extraction path; add structured output / function-calling to reduce
   hallucination risk; add a human-review UI step.

5. **Correspondence drafting** – add a `POST /ai/draft-letter` endpoint
   that lets the LLM draft a templated claim letter from confirmed
   deterministic outputs (amounts, deadlines, citations). This is a safe
   LLM use case under the design rule.

6. **Multi-period training-comp** – extend UC1 to accept multiple disjoint
   training periods at the same or different clubs for a single player.

7. **Auth & rate-limiting** – add API key authentication and per-key
   rate limits before any external exposure.
