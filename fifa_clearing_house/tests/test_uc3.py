"""Tests for /uc3/readiness."""
from __future__ import annotations

import pytest


_FULL_SOLIDARITY_CHECKLIST = [
    {"key": "player_registration_history", "present": True},
    {"key": "transfer_fee_documented", "present": True},
    {"key": "transfer_agreement_copy", "present": True},
    {"key": "bank_account_details", "present": True},
    {"key": "training_period_calculations", "present": True},
    {"key": "deadline_not_passed", "present": True},
]

_FULL_TC_CHECKLIST = [
    {"key": "player_registration_history", "present": True},
    {"key": "training_period_evidence", "present": True},
    {"key": "club_category_documentation", "present": True},
    {"key": "player_dob_documentation", "present": True},
    {"key": "first_professional_contract_copy", "present": True},
    {"key": "deadline_not_passed", "present": True},
]


def test_uc3_solidarity_pass(client):
    resp = client.post(
        "/uc3/readiness",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "checklist": _FULL_SOLIDARITY_CHECKLIST,
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["overall_readiness"] == "PASS"
    assert data["missing_required_items"] == []


def test_uc3_solidarity_fail(client):
    """Missing two required items → PARTIAL (some others are present)."""
    partial = [
        {"key": "player_registration_history", "present": True},
        {"key": "transfer_fee_documented", "present": False},
        {"key": "transfer_agreement_copy", "present": False},
        {"key": "bank_account_details", "present": True},
        {"key": "training_period_calculations", "present": True},
        {"key": "deadline_not_passed", "present": True},
    ]
    resp = client.post(
        "/uc3/readiness",
        json={"mechanism": "SOLIDARITY_CONTRIBUTION", "checklist": partial},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["overall_readiness"] == "PARTIAL"
    assert "transfer_fee_documented" in data["missing_required_items"]
    assert "transfer_agreement_copy" in data["missing_required_items"]


def test_uc3_solidarity_all_missing(client):
    resp = client.post(
        "/uc3/readiness",
        json={"mechanism": "SOLIDARITY_CONTRIBUTION", "checklist": []},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["overall_readiness"] == "FAIL"
    assert len(data["missing_required_items"]) > 0


def test_uc3_training_comp_pass(client):
    resp = client.post(
        "/uc3/readiness",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "checklist": _FULL_TC_CHECKLIST,
        },
    )
    assert resp.status_code == 200
    assert resp.json()["overall_readiness"] == "PASS"


def test_uc3_training_comp_missing_category(client):
    checklist = [item for item in _FULL_TC_CHECKLIST
                 if item["key"] != "club_category_documentation"]
    resp = client.post(
        "/uc3/readiness",
        json={"mechanism": "TRAINING_COMPENSATION", "checklist": checklist},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["overall_readiness"] in {"FAIL", "PARTIAL"}
    assert "club_category_documentation" in data["missing_required_items"]


def test_uc3_verify_warnings_present(client):
    resp = client.post(
        "/uc3/readiness",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "checklist": _FULL_TC_CHECKLIST,
        },
    )
    data = resp.json()
    # At least one VERIFY_REQUIRED warning should exist (from config)
    assert any("VERIFY_REQUIRED" in w for w in data["verify_required_warnings"])


def test_uc3_unknown_mechanism(client):
    resp = client.post(
        "/uc3/readiness",
        json={"mechanism": "INVALID", "checklist": []},
    )
    assert resp.status_code == 422


def test_uc3_ai_extracted_unconfirmed_rejected(client):
    resp = client.post(
        "/uc3/readiness",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "checklist": _FULL_SOLIDARITY_CHECKLIST,
            "source": "ai_extracted",
            "confirmed": False,
        },
    )
    assert resp.status_code == 422


def test_uc3_regulatory_basis_from_config(client):
    """Regulatory citations must come from config, not hard-coded in engine."""
    resp = client.post(
        "/uc3/readiness",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "checklist": _FULL_SOLIDARITY_CHECKLIST,
        },
    )
    data = resp.json()
    # At minimum RSTP_ART_21 should appear
    assert "RSTP_ART_21" in data["regulatory_basis"]
