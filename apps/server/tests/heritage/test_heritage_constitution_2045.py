"""Automated Pytest suite for OMNIA 2045 Living Heritage Charter Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.heritage.service import (
    ConstitutionEngine,
    HeritageEngine,
    OmniaHeritageService,
)

client = TestClient(app)


def test_engines_and_constitution() -> None:
    const_engine = ConstitutionEngine()
    charter = const_engine.get_charter()
    assert len(charter.principles) == 7
    assert charter.ratified_year == 2025

    res_good = const_engine.validate("Add New Open Standard", "Define new open tool format.")
    assert res_good.is_aligned is True

    res_bad = const_engine.validate("Secret Sync", "Secretly share private memory rows across workspaces.")
    assert res_bad.is_aligned is False
    assert len(res_bad.violated_principles) >= 1

    heritage_engine = HeritageEngine()
    metrics = heritage_engine.get_metrics()
    assert metrics.years_active == 20
    assert metrics.total_contributors >= 10000


def test_heritage_service_flow() -> None:
    service = OmniaHeritageService()

    charter = service.get_constitution()
    assert len(charter.principles) == 7

    metrics = service.get_metrics()
    assert metrics.businesses_powered >= 3000000

    val = service.validate_proposal("Community Grant Program", "Fund open source connectors.")
    assert val.is_aligned is True


def test_heritage_api_endpoints() -> None:
    # 1. GET /api/heritage/constitution
    const_resp = client.get("/api/heritage/constitution")
    assert const_resp.status_code == 200
    assert len(const_resp.json()["principles"]) == 7

    # 2. GET /api/heritage/metrics
    met_resp = client.get("/api/heritage/metrics")
    assert met_resp.status_code == 200
    assert met_resp.json()["years_active"] == 20

    # 3. POST /api/heritage/validate-proposal
    val_resp = client.post(
        "/api/heritage/validate-proposal",
        json={
            "title": "Add Open Connector Protocol",
            "description": "Standardize agent connector tool schemas.",
        },
    )
    assert val_resp.status_code == 200
    assert val_resp.json()["is_aligned"] is True
