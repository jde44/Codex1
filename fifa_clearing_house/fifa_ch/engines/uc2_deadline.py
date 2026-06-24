"""
UC2 – Deadline Calculation engine.
All date arithmetic is purely deterministic; no LLM calls.
"""
from __future__ import annotations

import calendar
from datetime import date

from ..config.loader import get_deadline_config
from ..models import UC2DeadlineRequest


def compute_deadline(req: UC2DeadlineRequest, today: date | None = None) -> dict:
    """
    Calculate the filing deadline from a trigger-event date.
    `today` is injectable so tests can run without clock drift.
    """
    mech_key = _mechanism_key(req.mechanism)
    cfg = get_deadline_config(mech_key)
    months = cfg["months_from_event"]

    deadline = _add_months(req.trigger_event_date, months)
    reference_today = today or date.today()
    days_remaining = (deadline - reference_today).days
    deadline_passed = days_remaining < 0

    warnings = [cfg["note"]] if cfg.get("note") else []
    warnings.append(
        f"VERIFY_REQUIRED: The {months}-month deadline window is derived from "
        f"config (citation: {cfg.get('citation', 'unknown')}). Confirm the exact "
        "deadline against the current RSTP and any relevant FIFA circular before "
        "relying on this date."
    )

    return {
        "mechanism": req.mechanism,
        "trigger_event_type": req.trigger_event_type,
        "trigger_event_date": req.trigger_event_date,
        "deadline_date": deadline,
        "days_remaining": days_remaining,
        "deadline_passed": deadline_passed,
        "regulatory_basis": [cfg.get("citation", "RSTP_ART_20")],
        "verify_required_warnings": warnings,
    }


def _mechanism_key(mechanism: str) -> str:
    mapping = {
        "TRAINING_COMPENSATION": "training_compensation",
        "SOLIDARITY_CONTRIBUTION": "solidarity_contribution",
    }
    key = mapping.get(mechanism)
    if key is None:
        raise ValueError(f"Unknown mechanism for deadline lookup: {mechanism}")
    return key


def _add_months(d: date, months: int) -> date:
    """Add calendar months to a date, clamping to the last day of the target month."""
    total_months = d.month + months
    year = d.year + (total_months - 1) // 12
    month = (total_months - 1) % 12 + 1
    day = min(d.day, calendar.monthrange(year, month)[1])
    return date(year, month, day)
