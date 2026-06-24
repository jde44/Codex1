"""
Gate engine – pure deterministic routing.
No LLM calls; no monetary computation.
"""
from __future__ import annotations

from datetime import date

from ..config.loader import get_regulation
from ..models import GateRequest, Mechanism, TransferType


def compute_gate(req: GateRequest) -> dict:
    """
    Determine which clearing-house mechanisms apply and route accordingly.
    Returns a plain dict; the route handler wraps it in GateResponse.
    """
    age = _age_at(req.player_dob, req.transfer_date)
    mechanisms: list[str] = []
    regulatory_basis: list[str] = []
    warnings: list[str] = []

    # Solidarity Contribution (RSTP Art. 21)
    if req.transfer_type == TransferType.PROFESSIONAL_INTERNATIONAL:
        if req.transfer_fee_usd and req.transfer_fee_usd > 0:
            mechanisms.append(Mechanism.SOLIDARITY_CONTRIBUTION.value)
            regulatory_basis.append("RSTP_ART_21")
        else:
            warnings.append(
                "Solidarity contribution requires a documented, non-zero transfer fee. "
                "Solidarity not routed."
            )

    # Training Compensation (RSTP Art. 20)
    tc_eligible = (
        req.is_first_professional_contract
        or (age < 23 and req.transfer_type != TransferType.DOMESTIC_PROFESSIONAL)
    )
    if tc_eligible:
        mechanisms.append(Mechanism.TRAINING_COMPENSATION.value)
        regulatory_basis.append("RSTP_ART_20")
        warnings.append(
            "VERIFY_REQUIRED: Training compensation eligibility depends on whether the "
            "player was previously registered as an amateur at the claiming club and "
            "whether the season-of-23rd-birthday rule applies. Verify with current "
            "RSTP Art. 20 before relying on this routing."
        )

    if not mechanisms:
        mechanisms.append(Mechanism.NEITHER.value)

    routing: list[str] = []
    if any(m != Mechanism.NEITHER.value for m in mechanisms):
        routing = ["/uc1/estimate", "/uc2/deadline", "/uc3/readiness"]

    return {
        "applicable_mechanisms": mechanisms,
        "player_age_at_transfer": age,
        "routing": routing,
        "regulatory_basis": list(dict.fromkeys(regulatory_basis)),
        "verify_required_warnings": warnings,
    }


def _age_at(dob: date, event_date: date) -> int:
    years = event_date.year - dob.year
    if (event_date.month, event_date.day) < (dob.month, dob.day):
        years -= 1
    return years
