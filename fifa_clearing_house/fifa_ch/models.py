from __future__ import annotations

import uuid
from datetime import date
from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, Field, model_validator


# ---------------------------------------------------------------------------
# Enumerations
# ---------------------------------------------------------------------------

class TransferType(str, Enum):
    PROFESSIONAL_INTERNATIONAL = "PROFESSIONAL_INTERNATIONAL"
    AMATEUR_TO_PROFESSIONAL = "AMATEUR_TO_PROFESSIONAL"
    DOMESTIC_PROFESSIONAL = "DOMESTIC_PROFESSIONAL"


class Mechanism(str, Enum):
    TRAINING_COMPENSATION = "TRAINING_COMPENSATION"
    SOLIDARITY_CONTRIBUTION = "SOLIDARITY_CONTRIBUTION"
    NEITHER = "NEITHER"


class InputSource(str, Enum):
    MANUAL = "manual"
    AI_EXTRACTED = "ai_extracted"


# ---------------------------------------------------------------------------
# Gate
# ---------------------------------------------------------------------------

class GateRequest(BaseModel):
    transfer_type: TransferType
    player_dob: date
    transfer_date: date
    player_former_club_confederation: str
    player_new_club_confederation: str
    is_first_professional_contract: bool
    transfer_fee_usd: Optional[float] = None
    source: InputSource = InputSource.MANUAL
    confirmed: bool = True

    @model_validator(mode="after")
    def require_confirmation_for_ai_input(self) -> "GateRequest":
        if self.source == InputSource.AI_EXTRACTED and not self.confirmed:
            raise ValueError(
                "AI-extracted inputs must be user-confirmed (set confirmed=true) "
                "before the deterministic engine runs."
            )
        return self


class GateResponse(BaseModel):
    request_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    applicable_mechanisms: list[str]
    player_age_at_transfer: int
    routing: list[str]
    regulatory_basis: list[str]
    verify_required_warnings: list[str]


# ---------------------------------------------------------------------------
# UC1 – Fee Estimate
# ---------------------------------------------------------------------------

class TrainingPeriod(BaseModel):
    club_name: str
    from_age: int
    to_age: int
    confederation: str = ""


class UC1EstimateRequest(BaseModel):
    mechanism: str  # "SOLIDARITY_CONTRIBUTION" or "TRAINING_COMPENSATION"
    # Solidarity fields
    transfer_fee_usd: Optional[float] = None
    training_periods: Optional[list[TrainingPeriod]] = None
    # Training compensation fields
    training_club_category: Optional[int] = None   # 1-4
    receiving_club_category: Optional[int] = None  # 1-4
    player_dob: Optional[date] = None
    training_start_date: Optional[date] = None
    training_end_date: Optional[date] = None
    source: InputSource = InputSource.MANUAL
    confirmed: bool = True

    @model_validator(mode="after")
    def require_confirmation_for_ai_input(self) -> "UC1EstimateRequest":
        if self.source == InputSource.AI_EXTRACTED and not self.confirmed:
            raise ValueError(
                "AI-extracted inputs must be user-confirmed (set confirmed=true) "
                "before the deterministic engine runs."
            )
        return self

    @model_validator(mode="after")
    def validate_mechanism_fields(self) -> "UC1EstimateRequest":
        mech = self.mechanism
        if mech == "SOLIDARITY_CONTRIBUTION":
            if self.transfer_fee_usd is None:
                raise ValueError("transfer_fee_usd is required for SOLIDARITY_CONTRIBUTION")
            if not self.training_periods:
                raise ValueError("training_periods is required for SOLIDARITY_CONTRIBUTION")
        elif mech == "TRAINING_COMPENSATION":
            missing = [
                f for f, v in [
                    ("training_club_category", self.training_club_category),
                    ("receiving_club_category", self.receiving_club_category),
                    ("player_dob", self.player_dob),
                    ("training_start_date", self.training_start_date),
                    ("training_end_date", self.training_end_date),
                ]
                if v is None
            ]
            if missing:
                raise ValueError(
                    f"TRAINING_COMPENSATION requires: {', '.join(missing)}"
                )
        else:
            raise ValueError(f"Unknown mechanism: {mech}")
        return self


class UC1EstimateResponse(BaseModel):
    request_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    mechanism: str
    estimated_amount_usd: float
    breakdown: list[dict[str, Any]]
    regulatory_basis: list[str]
    verify_required_warnings: list[str]


# ---------------------------------------------------------------------------
# UC2 – Deadline
# ---------------------------------------------------------------------------

class UC2DeadlineRequest(BaseModel):
    mechanism: str
    trigger_event_type: str
    trigger_event_date: date
    source: InputSource = InputSource.MANUAL
    confirmed: bool = True

    @model_validator(mode="after")
    def require_confirmation_for_ai_input(self) -> "UC2DeadlineRequest":
        if self.source == InputSource.AI_EXTRACTED and not self.confirmed:
            raise ValueError(
                "AI-extracted inputs must be user-confirmed (set confirmed=true) "
                "before the deterministic engine runs."
            )
        return self


class UC2DeadlineResponse(BaseModel):
    request_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    mechanism: str
    trigger_event_type: str
    trigger_event_date: date
    deadline_date: date
    days_remaining: int
    deadline_passed: bool
    regulatory_basis: list[str]
    verify_required_warnings: list[str]


# ---------------------------------------------------------------------------
# UC3 – Readiness
# ---------------------------------------------------------------------------

class UC3ChecklistItem(BaseModel):
    key: str
    present: bool


class UC3ReadinessRequest(BaseModel):
    mechanism: str
    checklist: list[UC3ChecklistItem]
    source: InputSource = InputSource.MANUAL
    confirmed: bool = True

    @model_validator(mode="after")
    def require_confirmation_for_ai_input(self) -> "UC3ReadinessRequest":
        if self.source == InputSource.AI_EXTRACTED and not self.confirmed:
            raise ValueError(
                "AI-extracted inputs must be user-confirmed (set confirmed=true) "
                "before the deterministic engine runs."
            )
        return self


class UC3ReadinessResponse(BaseModel):
    request_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    mechanism: str
    overall_readiness: str  # "PASS" | "FAIL" | "PARTIAL"
    checklist_results: list[dict[str, Any]]
    missing_required_items: list[str]
    regulatory_basis: list[str]
    verify_required_warnings: list[str]


# ---------------------------------------------------------------------------
# AI Extraction
# ---------------------------------------------------------------------------

class AIExtractRequest(BaseModel):
    raw_text: str
    extraction_target: str  # "gate" | "uc1_solidarity" | "uc1_training" | "uc2" | "uc3"


class AIExtractResponse(BaseModel):
    extraction_target: str
    extracted_fields: dict[str, Any]
    confirmation_required: bool = True
    source: str = "ai_extracted"
    confirmed: bool = False
    warnings: list[str] = []


# ---------------------------------------------------------------------------
# Audit
# ---------------------------------------------------------------------------

class AuditRecord(BaseModel):
    request_id: str
    route_decision: str
    component: str
    control_objective: str
    timestamp: str
    input_hash: str
    output_hash: str
