"""Tests for /uc1/estimate."""
from __future__ import annotations

import pytest


# ---------------------------------------------------------------------------
# Solidarity Contribution
# ---------------------------------------------------------------------------

def test_uc1_solidarity_basic(client):
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "transfer_fee_usd": 1_000_000,
            "training_periods": [
                {"club_name": "Academy FC", "from_age": 12, "to_age": 16},
                {"club_name": "Youth Club B", "from_age": 16, "to_age": 20},
            ],
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["mechanism"] == "SOLIDARITY_CONTRIBUTION"
    # Academy FC: 4 years × 0.25% = $10,000
    # Youth Club B: 4 years × 0.5% = $20,000
    assert abs(data["estimated_amount_usd"] - 30_000.0) < 0.01


def test_uc1_solidarity_full_12_to_23(client):
    """Ages 12-23 fully covered → exactly 5% of fee."""
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "transfer_fee_usd": 1_000_000,
            "training_periods": [
                {"club_name": "One Club", "from_age": 12, "to_age": 24},
            ],
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert abs(data["estimated_amount_usd"] - 50_000.0) < 0.01


def test_uc1_solidarity_out_of_range(client):
    """Training before age 12 and after 23 earns nothing."""
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "transfer_fee_usd": 500_000,
            "training_periods": [
                {"club_name": "Too Young", "from_age": 8, "to_age": 12},
                {"club_name": "Too Old", "from_age": 24, "to_age": 30},
            ],
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["estimated_amount_usd"] == 0.0


def test_uc1_solidarity_split_bracket(client):
    """Period spanning age-15/16 boundary is correctly split."""
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "transfer_fee_usd": 2_000_000,
            "training_periods": [
                {"club_name": "Cross Club", "from_age": 13, "to_age": 19},
                # 3 lower-bracket years (13,14,15) × 0.25% = 0.75% = $15,000
                # 3 upper-bracket years (16,17,18) × 0.5%  = 1.50% = $30,000
            ],
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert abs(data["estimated_amount_usd"] - 45_000.0) < 0.01


def test_uc1_solidarity_multiple_clubs(client):
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "transfer_fee_usd": 10_000_000,
            "training_periods": [
                {"club_name": "A", "from_age": 12, "to_age": 15},  # 3yr × 0.25% = $75k
                {"club_name": "B", "from_age": 15, "to_age": 18},  # 1yr lower + 2yr upper = $125k
                {"club_name": "C", "from_age": 18, "to_age": 23},  # 5yr × 0.5% = $250k
            ],
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    # A: 3 × 0.0025 × 10M = 75,000
    # B: 1 × 0.0025 × 10M + 2 × 0.005 × 10M = 25,000 + 100,000 = 125,000
    # C: 5 × 0.005 × 10M = 250,000
    # Total = 450,000
    assert abs(data["estimated_amount_usd"] - 450_000.0) < 0.01


# ---------------------------------------------------------------------------
# Training Compensation
# ---------------------------------------------------------------------------

def test_uc1_training_comp_cat3(client):
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "training_club_category": 3,
            "receiving_club_category": 1,
            "player_dob": "2004-01-01",
            "training_start_date": "2016-07-01",
            "training_end_date": "2022-06-30",
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["mechanism"] == "TRAINING_COMPENSATION"
    # Cat 3 = $30,000/yr, ~6 years
    assert data["estimated_amount_usd"] > 170_000
    assert data["estimated_amount_usd"] < 185_000


def test_uc1_training_comp_invalid_category(client):
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "training_club_category": 9,
            "receiving_club_category": 1,
            "player_dob": "2005-01-01",
            "training_start_date": "2017-01-01",
            "training_end_date": "2022-01-01",
        },
    )
    assert resp.status_code == 422


def test_uc1_training_comp_verify_warnings_present(client):
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "training_club_category": 2,
            "receiving_club_category": 2,
            "player_dob": "2004-05-01",
            "training_start_date": "2018-07-01",
            "training_end_date": "2022-06-30",
        },
    )
    assert resp.status_code == 200
    data = resp.json()
    warnings = data["verify_required_warnings"]
    assert any("VERIFY_REQUIRED" in w for w in warnings)


# ---------------------------------------------------------------------------
# Missing required fields
# ---------------------------------------------------------------------------

def test_uc1_solidarity_missing_fee(client):
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "training_periods": [{"club_name": "X", "from_age": 12, "to_age": 18}],
        },
    )
    assert resp.status_code == 422


def test_uc1_training_missing_category(client):
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "TRAINING_COMPENSATION",
            "player_dob": "2005-01-01",
            "training_start_date": "2017-01-01",
            "training_end_date": "2022-01-01",
        },
    )
    assert resp.status_code == 422


# ---------------------------------------------------------------------------
# AI confirmation gate
# ---------------------------------------------------------------------------

def test_uc1_ai_extracted_unconfirmed_rejected(client):
    resp = client.post(
        "/uc1/estimate",
        json={
            "mechanism": "SOLIDARITY_CONTRIBUTION",
            "transfer_fee_usd": 1_000_000,
            "training_periods": [{"club_name": "Club X", "from_age": 12, "to_age": 18}],
            "source": "ai_extracted",
            "confirmed": False,
        },
    )
    assert resp.status_code == 422
