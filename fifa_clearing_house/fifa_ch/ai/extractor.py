"""
AI Extraction layer.

DESIGN RULE: This module is the ONLY place where an LLM may be called.
The deterministic engines (gate, uc1_estimate, uc2_deadline, uc3_readiness)
must NEVER import from this module.

The extractor converts free-form text into structured fields. It never
produces eligibility verdicts, monetary amounts, deadlines, or readiness
verdicts – those are always the responsibility of the deterministic engines.

Every response carries confirmation_required=True and confirmed=False so that
callers must explicitly confirm the extracted payload before passing it to a
deterministic engine.
"""
from __future__ import annotations

import os
from typing import Any

from ..models import AIExtractResponse

# ---------------------------------------------------------------------------
# Public interface
# ---------------------------------------------------------------------------

SUPPORTED_TARGETS = {
    "gate",
    "uc1_solidarity",
    "uc1_training",
    "uc2",
    "uc3",
}

_FIELD_SCHEMAS: dict[str, dict[str, str]] = {
    "gate": {
        "transfer_type": "PROFESSIONAL_INTERNATIONAL | AMATEUR_TO_PROFESSIONAL | DOMESTIC_PROFESSIONAL",
        "player_dob": "YYYY-MM-DD",
        "transfer_date": "YYYY-MM-DD",
        "player_former_club_confederation": "string",
        "player_new_club_confederation": "string",
        "is_first_professional_contract": "boolean",
        "transfer_fee_usd": "number or null",
    },
    "uc1_solidarity": {
        "transfer_fee_usd": "number",
        "training_periods": "[{club_name, from_age, to_age, confederation}]",
    },
    "uc1_training": {
        "training_club_category": "integer 1-4",
        "receiving_club_category": "integer 1-4",
        "player_dob": "YYYY-MM-DD",
        "training_start_date": "YYYY-MM-DD",
        "training_end_date": "YYYY-MM-DD",
    },
    "uc2": {
        "mechanism": "TRAINING_COMPENSATION | SOLIDARITY_CONTRIBUTION",
        "trigger_event_type": "string",
        "trigger_event_date": "YYYY-MM-DD",
    },
    "uc3": {
        "mechanism": "TRAINING_COMPENSATION | SOLIDARITY_CONTRIBUTION",
        "checklist": "[{key: string, present: boolean}]",
    },
}


def extract(raw_text: str, extraction_target: str) -> AIExtractResponse:
    """
    Extract structured fields from `raw_text` for the given target.

    In a production deployment this calls an LLM (e.g. via Anthropic SDK).
    In the current stub implementation it returns a clearly-labelled
    placeholder so tests can verify the confirmation gate without a live key.

    Returns AIExtractResponse with confirmation_required=True, confirmed=False.
    The caller must display extracted_fields to the user, obtain confirmation,
    then pass the fields with confirmed=True to the appropriate deterministic
    endpoint.
    """
    if extraction_target not in SUPPORTED_TARGETS:
        raise ValueError(
            f"Unsupported extraction_target '{extraction_target}'. "
            f"Choose from: {sorted(SUPPORTED_TARGETS)}"
        )

    schema = _FIELD_SCHEMAS[extraction_target]

    # Production path: call LLM API
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if api_key:
        extracted = _call_llm(raw_text, extraction_target, schema, api_key)
    else:
        # Stub path: return schema shape with sentinel values
        extracted = _stub_extraction(schema)

    return AIExtractResponse(
        extraction_target=extraction_target,
        extracted_fields=extracted,
        confirmation_required=True,
        source="ai_extracted",
        confirmed=False,
        warnings=[
            "STUB: No ANTHROPIC_API_KEY set; returning field-shape placeholder.",
            "Review all extracted fields before setting confirmed=true.",
        ]
        if not api_key
        else [
            "LLM extraction is probabilistic. Review all fields before confirming.",
            "Do not pass this payload to a deterministic engine without user review.",
        ],
    )


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _stub_extraction(schema: dict[str, str]) -> dict[str, Any]:
    """Return the field schema as a placeholder when no API key is present."""
    return {k: f"<{v}>" for k, v in schema.items()}


def _call_llm(
    raw_text: str,
    target: str,
    schema: dict[str, str],
    api_key: str,
) -> dict[str, Any]:
    """
    Call the Anthropic API to extract structured fields.
    Import is deferred so the rest of the application works without the SDK.
    """
    try:
        import anthropic  # type: ignore[import]
    except ImportError as exc:
        raise RuntimeError(
            "anthropic SDK not installed. Add 'anthropic' to requirements.txt "
            "to enable live extraction."
        ) from exc

    client = anthropic.Anthropic(api_key=api_key)
    field_list = "\n".join(f"  - {k}: {v}" for k, v in schema.items())
    prompt = (
        f"Extract the following fields from the text below. "
        f"Return ONLY a valid JSON object with these keys:\n{field_list}\n\n"
        f"If a field cannot be determined, use null.\n\n"
        f"Text:\n{raw_text}"
    )
    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        messages=[{"role": "user", "content": prompt}],
    )
    import json

    text = message.content[0].text.strip()
    # Strip markdown fences if present
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text)
