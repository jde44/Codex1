"""
FIFA Clearing House Navigator – FastAPI application.

MVP endpoints:
  POST /gate             – eligibility routing (deterministic)
  POST /uc1/estimate     – fee estimation (deterministic)
  POST /uc2/deadline     – deadline calculation (deterministic)
  POST /uc3/readiness    – readiness check (deterministic)
  POST /ai/extract       – unstructured-to-structured extraction (LLM only)
  GET  /audit/log        – retrieve audit records
  POST /audit/log        – write an explicit audit record

DESIGN RULE: LLMs are called ONLY inside /ai/extract. All other routes are
strictly deterministic. AI-extracted inputs carry confirmed=False and source=
"ai_extracted"; the Pydantic models reject them unless confirmed=True.
"""
from __future__ import annotations

import uuid
from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse

from .ai.extractor import extract as ai_extract
from .audit.logger import read_records, write_record
from .engines.gate import compute_gate
from .engines.uc1_estimate import compute_estimate
from .engines.uc2_deadline import compute_deadline
from .engines.uc3_readiness import compute_readiness
from .models import (
    AIExtractRequest,
    AIExtractResponse,
    AuditRecord,
    GateRequest,
    GateResponse,
    UC1EstimateRequest,
    UC1EstimateResponse,
    UC2DeadlineRequest,
    UC2DeadlineResponse,
    UC3ReadinessRequest,
    UC3ReadinessResponse,
)

app = FastAPI(
    title="FIFA Clearing House Navigator",
    description=(
        "Deterministic-first MVP for training compensation and solidarity "
        "contribution workflows. LLMs are restricted to the /ai/extract endpoint."
    ),
    version="0.1.0",
)


# ---------------------------------------------------------------------------
# Gate
# ---------------------------------------------------------------------------

@app.post("/gate", response_model=GateResponse, tags=["routing"])
def gate(req: GateRequest) -> GateResponse:
    """Deterministic eligibility routing. No LLM calls."""
    result = compute_gate(req)
    rid = str(uuid.uuid4())
    write_record(
        request_id=rid,
        route_decision="/gate",
        component="gate_engine",
        control_objective="ELIGIBILITY_ROUTING",
        input_payload=req.model_dump(mode="json"),
        output_payload=result,
    )
    return GateResponse(request_id=rid, **result)


# ---------------------------------------------------------------------------
# UC1 – Fee Estimate
# ---------------------------------------------------------------------------

@app.post("/uc1/estimate", response_model=UC1EstimateResponse, tags=["uc1"])
def uc1_estimate(req: UC1EstimateRequest) -> UC1EstimateResponse:
    """
    Deterministic fee estimate.
    - SOLIDARITY_CONTRIBUTION: pro-rates 5 % of transfer fee per RSTP Annex 5.
    - TRAINING_COMPENSATION:   multiplies category cost by training years per RSTP Annex 4.
    No LLM calls.
    """
    try:
        result = compute_estimate(req)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    rid = str(uuid.uuid4())
    write_record(
        request_id=rid,
        route_decision="/uc1/estimate",
        component="uc1_estimate_engine",
        control_objective="FEE_ESTIMATION",
        input_payload=req.model_dump(mode="json"),
        output_payload=result,
    )
    return UC1EstimateResponse(request_id=rid, **result)


# ---------------------------------------------------------------------------
# UC2 – Deadline
# ---------------------------------------------------------------------------

@app.post("/uc2/deadline", response_model=UC2DeadlineResponse, tags=["uc2"])
def uc2_deadline(req: UC2DeadlineRequest) -> UC2DeadlineResponse:
    """Deterministic deadline calculation. No LLM calls."""
    try:
        result = compute_deadline(req)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    rid = str(uuid.uuid4())
    write_record(
        request_id=rid,
        route_decision="/uc2/deadline",
        component="uc2_deadline_engine",
        control_objective="DEADLINE_CALCULATION",
        input_payload=req.model_dump(mode="json"),
        output_payload=result,
    )
    return UC2DeadlineResponse(request_id=rid, **result)


# ---------------------------------------------------------------------------
# UC3 – Readiness
# ---------------------------------------------------------------------------

@app.post("/uc3/readiness", response_model=UC3ReadinessResponse, tags=["uc3"])
def uc3_readiness(req: UC3ReadinessRequest) -> UC3ReadinessResponse:
    """Deterministic readiness check. No LLM calls."""
    try:
        result = compute_readiness(req)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    rid = str(uuid.uuid4())
    write_record(
        request_id=rid,
        route_decision="/uc3/readiness",
        component="uc3_readiness_engine",
        control_objective="READINESS_CHECK",
        input_payload=req.model_dump(mode="json"),
        output_payload=result,
    )
    return UC3ReadinessResponse(request_id=rid, **result)


# ---------------------------------------------------------------------------
# AI Extraction (LLM boundary)
# ---------------------------------------------------------------------------

@app.post("/ai/extract", response_model=AIExtractResponse, tags=["ai"])
def ai_extract_endpoint(req: AIExtractRequest) -> AIExtractResponse:
    """
    LLM extraction: converts free-form text into structured fields.
    Returns confirmed=False; the caller MUST review and set confirmed=True
    before sending extracted fields to a deterministic engine.
    """
    try:
        response = ai_extract(req.raw_text, req.extraction_target)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    return response


# ---------------------------------------------------------------------------
# Audit log
# ---------------------------------------------------------------------------

@app.get("/audit/log", tags=["audit"])
def audit_log_get(limit: int = Query(default=100, le=1000)) -> JSONResponse:
    """Retrieve recent audit records (newest last)."""
    records = read_records(limit=limit)
    return JSONResponse({"count": len(records), "records": records})


@app.post("/audit/log", response_model=AuditRecord, tags=["audit"])
def audit_log_post(record: AuditRecord) -> AuditRecord:
    """Write an explicit audit record (for external system integration)."""
    write_record(
        request_id=record.request_id,
        route_decision=record.route_decision,
        component=record.component,
        control_objective=record.control_objective,
        input_payload={"external": True, "input_hash": record.input_hash},
        output_payload={"external": True, "output_hash": record.output_hash},
    )
    return record
