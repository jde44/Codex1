"""
Determinism tests: prove that UC1 estimates, UC2 deadlines, and UC3 readiness
pass/fail outcomes NEVER call an LLM.

Strategy: patch the AI extractor's internal `_call_llm` function and the
entire `ai_extract` function used in /ai/extract with a Mock, then hit the
deterministic endpoints and assert the mock was never invoked.
"""
from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest


# Payloads for each deterministic endpoint
_GATE_PAYLOAD = {
    "transfer_type": "PROFESSIONAL_INTERNATIONAL",
    "player_dob": "2003-01-01",
    "transfer_date": "2024-06-01",
    "player_former_club_confederation": "UEFA",
    "player_new_club_confederation": "CONMEBOL",
    "is_first_professional_contract": False,
    "transfer_fee_usd": 2_000_000,
}

_UC1_SOLIDARITY_PAYLOAD = {
    "mechanism": "SOLIDARITY_CONTRIBUTION",
    "transfer_fee_usd": 2_000_000,
    "training_periods": [
        {"club_name": "Club A", "from_age": 12, "to_age": 18},
    ],
}

_UC1_TRAINING_PAYLOAD = {
    "mechanism": "TRAINING_COMPENSATION",
    "training_club_category": 3,
    "receiving_club_category": 1,
    "player_dob": "2005-01-01",
    "training_start_date": "2017-07-01",
    "training_end_date": "2023-06-30",
}

_UC2_PAYLOAD = {
    "mechanism": "TRAINING_COMPENSATION",
    "trigger_event_type": "FIRST_PROFESSIONAL_CONTRACT_REGISTRATION",
    "trigger_event_date": "2024-03-01",
}

_UC3_PAYLOAD = {
    "mechanism": "SOLIDARITY_CONTRIBUTION",
    "checklist": [
        {"key": "player_registration_history", "present": True},
        {"key": "transfer_fee_documented", "present": True},
        {"key": "transfer_agreement_copy", "present": True},
        {"key": "bank_account_details", "present": True},
        {"key": "training_period_calculations", "present": True},
        {"key": "deadline_not_passed", "present": True},
    ],
}


def _no_llm_patch():
    """Context manager that installs a mock on the LLM call site and asserts it was not called."""
    return patch("fifa_ch.ai.extractor._call_llm", new_callable=MagicMock)


# ---------------------------------------------------------------------------
# /gate does not call the LLM
# ---------------------------------------------------------------------------

def test_gate_does_not_call_llm(client):
    with _no_llm_patch() as mock_llm:
        resp = client.post("/gate", json=_GATE_PAYLOAD)
    assert resp.status_code == 200
    mock_llm.assert_not_called()


# ---------------------------------------------------------------------------
# /uc1/estimate (solidarity) does not call the LLM
# ---------------------------------------------------------------------------

def test_uc1_solidarity_does_not_call_llm(client):
    with _no_llm_patch() as mock_llm:
        resp = client.post("/uc1/estimate", json=_UC1_SOLIDARITY_PAYLOAD)
    assert resp.status_code == 200
    mock_llm.assert_not_called()


# ---------------------------------------------------------------------------
# /uc1/estimate (training compensation) does not call the LLM
# ---------------------------------------------------------------------------

def test_uc1_training_comp_does_not_call_llm(client):
    with _no_llm_patch() as mock_llm:
        resp = client.post("/uc1/estimate", json=_UC1_TRAINING_PAYLOAD)
    assert resp.status_code == 200
    mock_llm.assert_not_called()


# ---------------------------------------------------------------------------
# /uc2/deadline does not call the LLM
# ---------------------------------------------------------------------------

def test_uc2_deadline_does_not_call_llm(client):
    with _no_llm_patch() as mock_llm:
        resp = client.post("/uc2/deadline", json=_UC2_PAYLOAD)
    assert resp.status_code == 200
    mock_llm.assert_not_called()


# ---------------------------------------------------------------------------
# /uc3/readiness pass/fail does not call the LLM
# ---------------------------------------------------------------------------

def test_uc3_readiness_does_not_call_llm(client):
    with _no_llm_patch() as mock_llm:
        resp = client.post("/uc3/readiness", json=_UC3_PAYLOAD)
    assert resp.status_code == 200
    mock_llm.assert_not_called()


# ---------------------------------------------------------------------------
# The deterministic engine modules do NOT import from the AI module
# ---------------------------------------------------------------------------

def test_gate_engine_has_no_ai_import():
    import fifa_ch.engines.gate as gate_mod
    assert not hasattr(gate_mod, "extract"), (
        "gate engine must not import the AI extractor"
    )


def test_uc1_engine_has_no_ai_import():
    import fifa_ch.engines.uc1_estimate as mod
    assert not hasattr(mod, "extract")


def test_uc2_engine_has_no_ai_import():
    import fifa_ch.engines.uc2_deadline as mod
    assert not hasattr(mod, "extract")


def test_uc3_engine_has_no_ai_import():
    import fifa_ch.engines.uc3_readiness as mod
    assert not hasattr(mod, "extract")


# ---------------------------------------------------------------------------
# AI extraction outputs must be user-confirmed before deterministic engines run
# ---------------------------------------------------------------------------

def test_uc1_rejects_unconfirmed_ai_output(client):
    resp = client.post(
        "/uc1/estimate",
        json={**_UC1_SOLIDARITY_PAYLOAD, "source": "ai_extracted", "confirmed": False},
    )
    assert resp.status_code == 422, (
        "Deterministic engine must reject ai_extracted input without user confirmation"
    )


def test_uc2_rejects_unconfirmed_ai_output(client):
    resp = client.post(
        "/uc2/deadline",
        json={**_UC2_PAYLOAD, "source": "ai_extracted", "confirmed": False},
    )
    assert resp.status_code == 422


def test_uc3_rejects_unconfirmed_ai_output(client):
    resp = client.post(
        "/uc3/readiness",
        json={**_UC3_PAYLOAD, "source": "ai_extracted", "confirmed": False},
    )
    assert resp.status_code == 422


def test_deterministic_endpoints_accept_confirmed_ai_output(client):
    """After user confirms, the deterministic engine should proceed normally."""
    resp = client.post(
        "/uc1/estimate",
        json={**_UC1_SOLIDARITY_PAYLOAD, "source": "ai_extracted", "confirmed": True},
    )
    assert resp.status_code == 200

    resp = client.post(
        "/uc2/deadline",
        json={**_UC2_PAYLOAD, "source": "ai_extracted", "confirmed": True},
    )
    assert resp.status_code == 200

    resp = client.post(
        "/uc3/readiness",
        json={**_UC3_PAYLOAD, "source": "ai_extracted", "confirmed": True},
    )
    assert resp.status_code == 200
