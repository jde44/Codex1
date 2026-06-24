"""Tests for /audit/log."""
from __future__ import annotations

import json


def test_audit_log_written_after_gate(client, tmp_audit_log):
    client.post(
        "/gate",
        json={
            "transfer_type": "PROFESSIONAL_INTERNATIONAL",
            "player_dob": "2003-01-01",
            "transfer_date": "2024-06-01",
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "AFC",
            "is_first_professional_contract": False,
            "transfer_fee_usd": 1_000_000,
        },
    )
    assert tmp_audit_log.exists()
    records = [json.loads(line) for line in tmp_audit_log.read_text().splitlines() if line]
    assert len(records) >= 1
    rec = records[-1]
    assert rec["route_decision"] == "/gate"
    assert rec["component"] == "gate_engine"
    assert rec["control_objective"] == "ELIGIBILITY_ROUTING"
    assert "input_hash" in rec
    assert "output_hash" in rec
    assert "timestamp" in rec
    assert "request_id" in rec


def test_audit_get_endpoint(client):
    # Generate a record first
    client.post(
        "/uc2/deadline",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "trigger_event_type": "CONTRACT_REGISTRATION",
            "trigger_event_date": "2024-03-01",
        },
    )
    resp = client.get("/audit/log")
    assert resp.status_code == 200
    data = resp.json()
    assert "records" in data
    assert "count" in data
    assert data["count"] >= 1


def test_audit_post_explicit_record(client):
    payload = {
        "request_id": "test-001",
        "route_decision": "/external",
        "component": "external_system",
        "control_objective": "EXTERNAL_AUDIT",
        "timestamp": "2024-01-01T00:00:00+00:00",
        "input_hash": "abc123",
        "output_hash": "def456",
    }
    resp = client.post("/audit/log", json=payload)
    assert resp.status_code == 200
    assert resp.json()["request_id"] == "test-001"


def test_audit_record_has_all_required_fields(client, tmp_audit_log):
    client.post(
        "/uc1/estimate",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "transfer_fee_usd": 500_000,
            "training_periods": [{"club_name": "Club A", "from_age": 12, "to_age": 18}],
        },
    )
    records = [json.loads(line) for line in tmp_audit_log.read_text().splitlines() if line]
    rec = records[-1]
    required_fields = {
        "request_id", "route_decision", "component",
        "control_objective", "timestamp", "input_hash", "output_hash",
    }
    assert required_fields.issubset(rec.keys())


def test_audit_hashes_are_hex_strings(client, tmp_audit_log):
    client.post(
        "/gate",
        json={
            "transfer_type": "DOMESTIC_PROFESSIONAL",
            "player_dob": "1998-01-01",
            "transfer_date": "2024-06-01",
            "player_former_club_confederation": "UEFA",
            "player_new_club_confederation": "UEFA",
            "is_first_professional_contract": False,
            "transfer_fee_usd": None,
        },
    )
    records = [json.loads(line) for line in tmp_audit_log.read_text().splitlines() if line]
    rec = records[-1]
    # SHA-256 hex digest is 64 chars
    assert len(rec["input_hash"]) == 64
    assert len(rec["output_hash"]) == 64
