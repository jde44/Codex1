"""
UC1 – Fee Estimation engine.
All arithmetic is purely deterministic; no LLM calls anywhere in this module.
"""
from __future__ import annotations

from datetime import date

from ..config.loader import get_solidarity_config, get_training_comp_config
from ..models import TrainingPeriod, UC1EstimateRequest


def compute_estimate(req: UC1EstimateRequest) -> dict:
    if req.mechanism == "SOLIDARITY_CONTRIBUTION":
        return _solidarity(req.transfer_fee_usd, req.training_periods)
    return _training_compensation(
        req.training_club_category,
        req.receiving_club_category,
        req.player_dob,
        req.training_start_date,
        req.training_end_date,
    )


# ---------------------------------------------------------------------------
# Solidarity Contribution  (RSTP Art. 21 + Annex 5)
# ---------------------------------------------------------------------------

def _solidarity(transfer_fee_usd: float, periods: list[TrainingPeriod]) -> dict:
    cfg = get_solidarity_config()
    lower_rate = cfg["distribution"]["age_12_to_15"]["rate_per_year"]
    upper_rate = cfg["distribution"]["age_16_to_23"]["rate_per_year"]
    age_lo = cfg["age_lower_bound"]        # 12
    age_hi = cfg["age_upper_bound"]        # 24 (exclusive)
    split = cfg["age_bracket_split"]       # 16

    breakdown: list[dict] = []
    total = 0.0

    for p in periods:
        eff_from = max(p.from_age, age_lo)
        eff_to = min(p.to_age, age_hi)
        if eff_from >= eff_to:
            breakdown.append(
                {
                    "club_name": p.club_name,
                    "from_age": p.from_age,
                    "to_age": p.to_age,
                    "amount_usd": 0.0,
                    "note": "Outside eligible age range 12-23; no contribution.",
                }
            )
            continue

        lower_years = max(0, min(eff_to, split) - eff_from)
        upper_years = max(0, eff_to - max(eff_from, split))
        amount = round(
            lower_years * lower_rate * transfer_fee_usd
            + upper_years * upper_rate * transfer_fee_usd,
            2,
        )
        total += amount
        breakdown.append(
            {
                "club_name": p.club_name,
                "from_age": p.from_age,
                "to_age": p.to_age,
                "effective_from_age": eff_from,
                "effective_to_age": eff_to,
                "lower_bracket_years": lower_years,  # ages 12-15
                "upper_bracket_years": upper_years,  # ages 16-23
                "rate_lower": f"{lower_rate*100:.2f}%/yr (ages 12-15)",
                "rate_upper": f"{upper_rate*100:.2f}%/yr (ages 16-23)",
                "amount_usd": amount,
            }
        )

    return {
        "mechanism": "SOLIDARITY_CONTRIBUTION",
        "transfer_fee_usd": transfer_fee_usd,
        "estimated_amount_usd": round(total, 2),
        "breakdown": breakdown,
        "regulatory_basis": ["RSTP_ART_21", "RSTP_ANNEX_5"],
        "verify_required_warnings": [
            "VERIFY_REQUIRED: Training-period dates must be confirmed in FIFA TMS.",
            "VERIFY_REQUIRED: Transfer fee must be the final settled amount including "
            "all add-ons triggered at the time of calculation.",
            "VERIFY_REQUIRED: Age brackets use integer ages as supplied; FIFA TMS "
            "uses full seasons. Reconcile with TMS output before any payment.",
        ],
    }


# ---------------------------------------------------------------------------
# Training Compensation  (RSTP Art. 20 + Annex 4)
# ---------------------------------------------------------------------------

def _training_compensation(
    training_cat: int,
    receiving_cat: int,
    player_dob: date,
    training_start: date,
    training_end: date,
) -> dict:
    cfg = get_training_comp_config()
    cat_costs: dict = cfg["categories"]

    if str(training_cat) not in cat_costs:
        raise ValueError(f"Unknown training club category: {training_cat}. Must be 1-4.")
    if str(receiving_cat) not in cat_costs:
        raise ValueError(f"Unknown receiving club category: {receiving_cat}. Must be 1-4.")

    cost_per_year = cat_costs[str(training_cat)]["usd_per_year"]
    verify_status = cat_costs[str(training_cat)]["verify_status"]

    # Fractional training years (VERIFY_REQUIRED: RSTP uses full seasons)
    days_trained = (training_end - training_start).days
    years_trained = round(days_trained / 365.25, 4)
    estimated_amount = round(cost_per_year * years_trained, 2)

    warnings = [
        f"VERIFY_REQUIRED: Training cost for Category {training_cat} "
        f"({cost_per_year:,} USD/yr) must be verified against the current "
        "FIFA circular and confederation-specific schedule.",
        "VERIFY_REQUIRED: Cost basis used is the training club's own category. "
        "RSTP Annex 4 Art. 3 may specify the new club's costs in some scenarios; "
        "verify the applicable formula for this transfer.",
        "VERIFY_REQUIRED: Years-trained uses calendar days / 365.25. FIFA TMS "
        "counts full football seasons. Reconcile with TMS before any payment.",
    ]
    if verify_status == "VERIFY_REQUIRED":
        warnings.insert(
            0,
            f"VERIFY_REQUIRED: Category {training_cat} training cost is an "
            "indicative figure; confirm the current FIFA-published amount.",
        )

    return {
        "mechanism": "TRAINING_COMPENSATION",
        "training_club_category": training_cat,
        "receiving_club_category": receiving_cat,
        "cost_per_year_usd": cost_per_year,
        "days_trained": days_trained,
        "years_trained": years_trained,
        "estimated_amount_usd": estimated_amount,
        "breakdown": [
            {
                "training_start_date": training_start.isoformat(),
                "training_end_date": training_end.isoformat(),
                "days_trained": days_trained,
                "years_trained": years_trained,
                "cost_per_year_usd": cost_per_year,
                "subtotal_usd": estimated_amount,
            }
        ],
        "regulatory_basis": ["RSTP_ART_20", "RSTP_ANNEX_4"],
        "verify_required_warnings": warnings,
    }
