"""
UC3 – Readiness Check engine.
Pass/fail determination is purely deterministic; no LLM calls.
"""
from __future__ import annotations

from ..config.loader import get_readiness_checklist
from ..models import UC3ChecklistItem, UC3ReadinessRequest


_SUPPORTED_MECHANISMS = {"TRAINING_COMPENSATION", "SOLIDARITY_CONTRIBUTION"}


def compute_readiness(req: UC3ReadinessRequest) -> dict:
    if req.mechanism not in _SUPPORTED_MECHANISMS:
        raise ValueError(
            f"Unknown mechanism: {req.mechanism}. "
            f"Must be one of {sorted(_SUPPORTED_MECHANISMS)}."
        )

    master = get_readiness_checklist(req.mechanism)
    submitted: dict[str, bool] = {item.key: item.present for item in req.checklist}

    results: list[dict] = []
    missing_required: list[str] = []
    verify_warnings: list[str] = []
    any_present = False

    for spec in master:
        key = spec["key"]
        required = spec["required"]
        present = submitted.get(key, False)
        if present:
            any_present = True

        if required and not present:
            missing_required.append(key)

        status = "PASS" if present else ("FAIL" if required else "N/A")
        results.append(
            {
                "key": key,
                "description": spec["description"],
                "required": required,
                "present": present,
                "status": status,
                "citation": spec.get("citation"),
                "verify_status": spec.get("verify_status"),
            }
        )

        if spec.get("verify_status") == "VERIFY_REQUIRED":
            note = spec.get("note", "")
            verify_warnings.append(
                f"VERIFY_REQUIRED [{key}]: {note or spec['description']}"
            )

    # Overall readiness verdict
    if not missing_required:
        overall = "PASS"
    elif any_present:
        overall = "PARTIAL"
    else:
        overall = "FAIL"

    # Derive regulatory basis from config (no hard-coded citations here)
    reg_keys = list(
        dict.fromkeys(r["citation"] for r in results if r.get("citation"))
    )

    return {
        "mechanism": req.mechanism,
        "overall_readiness": overall,
        "checklist_results": results,
        "missing_required_items": missing_required,
        "regulatory_basis": reg_keys,
        "verify_required_warnings": verify_warnings,
    }
