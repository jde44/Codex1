"""Tests for /uc2/deadline."""
from __future__ import annotations

import pytest
from datetime import date


def test_uc2_deadline_training_comp(client):
    resp = client.post(
        "/uc2/deadline",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "trigger_event_type": "FIRST_PROFESSIONAL_CONTRACT_REGISTRATION",
            "trigger_event_date": "2024-01-15",
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["deadline_date"] == "2024-07-15"
    assert data["mechanism"] == "TRAINING_COMPENSATION"
    assert "RSTP_ART_20" in data["regulatory_basis"]
    assert any("VERIFY_REQUIRED" in w for w in data["verify_required_warnings"])


def test_uc2_deadline_solidarity(client):
    resp = client.post(
        "/uc2/deadline",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "trigger_event_type": "TRANSFER_REGISTRATION",
            "trigger_event_date": "2024-03-01",
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["deadline_date"] == "2024-09-01"
    assert "RSTP_ART_21" in data["regulatory_basis"]


def test_uc2_deadline_passed(client):
    resp = client.post(
        "/uc2/deadline",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "trigger_event_type": "FIRST_PROFESSIONAL_CONTRACT_REGISTRATION",
            "trigger_event_date": "2020-01-01",
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["deadline_date"] == "2020-07-01"
    assert data["deadline_passed"] is True
    assert data["days_remaining"] < 0


def test_uc2_deadline_end_of_month_clamp(client):
    """Aug 31 + 6 months = Feb 28/29 (month-end clamp)."""
    resp = client.post(
        "/uc2/deadline",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "trigger_event_type": "FIRST_PROFESSIONAL_CONTRACT_REGISTRATION",
            "trigger_event_date": "2024-08-31",
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    # 2025-02-28 (not a leap year)
    assert data["deadline_date"] == "2025-02-28"


def test_uc2_deadline_unknown_mechanism(client):
    resp = client.post(
        "/uc2/deadline",
        json={
            "mechanism": "UNKNOWN_MECHANISM",
            "trigger_event_type": "SOME_EVENT",
            "trigger_event_date": "2024-01-01",
        },
    )
    assert resp.status_code == 422


def test_uc2_ai_extracted_unconfirmed_rejected(client):
    resp = client.post(
        "/uc2/deadline",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "trigger_event_type": "FIRST_PROFESSIONAL_CONTRACT_REGISTRATION",
            "trigger_event_date": "2024-01-15",
            "source": "ai_extracted",
            "confirmed": False,
        },
    )
    assert resp.status_code == 422


def test_uc2_response_has_request_id(client):
    resp = client.post(
        "/uc2/deadline",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "trigger_event_type": "FIRST_PROFESSIONAL_CONTRACT_REGISTRATION",
            "trigger_event_date": "2024-04-01",
        },
    )
    assert resp.status_code == 200
    assert "request_id" in resp.json()
