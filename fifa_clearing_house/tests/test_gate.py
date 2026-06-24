"""Tests for the /gate endpoint."""
from __future__ import annotations

import pytest


# ---------------------------------------------------------------------------
# Professional international transfer with fee → both mechanisms
# ---------------------------------------------------------------------------

def test_gate_professional_international_with_fee(client):
    resp = client.post(
        "/gate",
        json={
            "transfer_type": "PROFESSIONAL_INTERNATIONAL",
            "player_dob": "2002-03-15",
            "transfer_date": "2024-01-10",
            "player_former_club_confederation": "CONMEBOL",
            "player_new_club_confederation": "UEFA",
            "is_first_professional_contract": False,
            "transfer_fee_usd": 5_000_000,
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "TRAINING_COMPENSATION" in data["applicable_mechanisms"]
    assert "SOLIDARITY_CONTRIBUTION" in data["applicable_mechanisms"]
    assert data["player_age_at_transfer"] == 21
    assert "/uc1/estimate" in data["routing"]
    assert "RSTP_ART_20" in data["regulatory_basis"]
    assert "RSTP_ART_21" in data["regulatory_basis"]


# ---------------------------------------------------------------------------
# First professional contract → training compensation only (no fee → no solidarity)
# ---------------------------------------------------------------------------

def test_gate_first_professional_contract_no_fee(client):
    resp = client.post(
        "/gate",
        json={
            "transfer_type": "AMATEUR_TO_PROFESSIONAL",
            "player_dob": "2005-06-01",
            "transfer_date": "2023-07-01",
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "UEFA",
            "is_first_professional_contract": True,
            "transfer_fee_usd": None,
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "TRAINING_COMPENSATION" in data["applicable_mechanisms"]
    assert "SOLIDARITY_CONTRIBUTION" not in data["applicable_mechanisms"]


# ---------------------------------------------------------------------------
# Domestic transfer, player 25+, not first contract → NEITHER
# ---------------------------------------------------------------------------

def test_gate_domestic_over_23_returns_neither(client):
    resp = client.post(
        "/gate",
        json={
            "transfer_type": "DOMESTIC_PROFESSIONAL",
            "player_dob": "1995-01-01",
            "transfer_date": "2024-06-01",
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "UEFA",
            "is_first_professional_contract": False,
            "transfer_fee_usd": 2_000_000,
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["applicable_mechanisms"] == ["NEITHER"]
    assert data["routing"] == []


# ---------------------------------------------------------------------------
# Player exactly 22 (borderline) → training comp applies
# ---------------------------------------------------------------------------

def test_gate_age_22_borderline(client):
    resp = client.post(
        "/gate",
        json={
            "transfer_type": "PROFESSIONAL_INTERNATIONAL",
            "player_dob": "2002-07-01",
            "transfer_date": "2024-06-30",  # day before 22nd birthday
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "CONMEBOL",
            "is_first_professional_contract": False,
            "transfer_fee_usd": 1_000_000,
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["player_age_at_transfer"] == 21
    assert "TRAINING_COMPENSATION" in data["applicable_mechanisms"]


# ---------------------------------------------------------------------------
# Player 23+ not first contract → no training comp, solidarity only
# ---------------------------------------------------------------------------

def test_gate_age_23_no_first_contract(client):
    resp = client.post(
        "/gate",
        json={
            "transfer_type": "PROFESSIONAL_INTERNATIONAL",
            "player_dob": "2000-01-01",
            "transfer_date": "2024-01-01",
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "AFC",
            "is_first_professional_contract": False,
            "transfer_fee_usd": 3_000_000,
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["player_age_at_transfer"] == 24
    assert "TRAINING_COMPENSATION" not in data["applicable_mechanisms"]
    assert "SOLIDARITY_CONTRIBUTION" in data["applicable_mechanisms"]


# ---------------------------------------------------------------------------
# AI-extracted input without confirmation → 422
# ---------------------------------------------------------------------------

def test_gate_ai_extracted_unconfirmed_rejected(client):
    resp = client.post(
        "/gate",
        json={
            "transfer_type": "PROFESSIONAL_INTERNATIONAL",
            "player_dob": "2002-03-15",
            "transfer_date": "2024-01-10",
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "UEFA",
            "is_first_professional_contract": False,
            "transfer_fee_usd": 5_000_000,
            "source": "ai_extracted",
            "confirmed": False,
        },
    )
    assert resp.status_code == 422


# ---------------------------------------------------------------------------
# AI-extracted input WITH confirmation → accepted
# ---------------------------------------------------------------------------

def test_gate_ai_extracted_confirmed_accepted(client):
    resp = client.post(
        "/gate",
        json={
            "transfer_type": "PROFESSIONAL_INTERNATIONAL",
            "player_dob": "2002-03-15",
            "transfer_date": "2024-01-10",
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "UEFA",
            "is_first_professional_contract": False,
            "transfer_fee_usd": 5_000_000,
            "source": "ai_extracted",
            "confirmed": True,
        },
    )
    assert resp.status_code == 200


# ---------------------------------------------------------------------------
# Response includes a request_id
# ---------------------------------------------------------------------------

def test_gate_response_has_request_id(client):
    resp = client.post(
        "/gate",
        json={
            "transfer_type": "PROFESSIONAL_INTERNATIONAL",
            "player_dob": "2003-05-20",
            "transfer_date": "2024-08-01",
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "CONMEBOL",
            "is_first_professional_contract": False,
            "transfer_fee_usd": 10_000_000,
        },
    )
    assert resp.status_code == 200
    assert "request_id" in resp.json()
    assert resp.json()["request_id"]
