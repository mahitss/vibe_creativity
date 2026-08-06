"""Automated Pytest suite for OMNIA Open Intelligence Foundation Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.open_foundation.domain import ComplianceStatus, StandardCategory
from app.modules.open_foundation.service import (
    CertificationEngine,
    FoundationEngine,
    StandardsEngine,
)

client = TestClient(app)


def test_engines_and_standards() -> None:
    std_engine = StandardsEngine()
    stds = std_engine.list_standards()
    assert len(stds) >= 2
    assert stds[0].category == StandardCategory.MEMORY_EXCHANGE

    cert_engine = CertificationEngine()
    res = cert_engine.certify("Test Plugin", "CONNECTOR")
    assert res.compliance_status == ComplianceStatus.PASSED
    assert res.score >= 90.0


def test_foundation_engine_flow() -> None:
    engine = FoundationEngine()

    stds = engine.get_standards()
    assert len(stds) >= 2

    cert = engine.certify_target("Acme Discord Plugin", "CONNECTOR")
    assert cert.target_name == "Acme Discord Plugin"

    certs = engine.get_certifications()
    assert len(certs) >= 2

    grants = engine.get_grants()
    assert len(grants) >= 2


def test_foundation_api_endpoints() -> None:
    # 1. GET /api/foundation/standards
    std_resp = client.get("/api/foundation/standards")
    assert std_resp.status_code == 200
    assert len(std_resp.json()) >= 2

    # 2. POST /api/foundation/certify
    cert_resp = client.post(
        "/api/foundation/certify",
        json={"target_name": "Custom Agent Service", "target_type": "AGENT"},
    )
    assert cert_resp.status_code == 200
    assert cert_resp.json()["compliance_status"] == "PASSED"

    # 3. GET /api/foundation/certifications
    certs_resp = client.get("/api/foundation/certifications")
    assert certs_resp.status_code == 200
    assert len(certs_resp.json()) >= 2

    # 4. GET /api/foundation/grants
    g_resp = client.get("/api/foundation/grants")
    assert g_resp.status_code == 200
    assert len(g_resp.json()) >= 2
