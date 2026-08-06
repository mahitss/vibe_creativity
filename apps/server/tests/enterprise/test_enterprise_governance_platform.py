"""Automated Pytest suite for OMNIA Enterprise Governance Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.enterprise.service import (
    AuditCenterEngine,
    EnterpriseEngine,
    OrganizationService,
    PolicyEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_policies() -> None:
    org_service = OrganizationService()
    org = org_service.create_org("Test Network", "usr-owner")
    assert org.owner_id == "usr-owner"
    assert len(org.workspaces) >= 2

    pol_engine = PolicyEngine()
    pols = pol_engine.get_default_policies(org.org_id)
    assert len(pols) >= 2

    audit_engine = AuditCenterEngine()
    evt = audit_engine.record_event(org.org_id, "ws-101", "usr-owner", "TEST_ACTION", "Testing audit log")
    assert evt.org_id == org.org_id
    assert evt.action == "TEST_ACTION"


def test_enterprise_engine_flow() -> None:
    engine = EnterpriseEngine()

    orgs = engine.get_organizations()
    assert len(orgs) >= 1

    org_id = orgs[0].org_id
    found_org = engine.get_organization_by_id(org_id)
    assert found_org is not None
    assert found_org.org_id == org_id

    audits = engine.get_audit_logs(org_id)
    assert len(audits) >= 1

    policies = engine.get_policies(org_id)
    assert len(policies) >= 1

    pol_id = policies[0].policy_id
    updated_pol = engine.update_policy(pol_id, "730", True)
    assert updated_pol.rule_value == "730"


def test_enterprise_api_endpoints() -> None:
    # 1. GET /api/organizations
    list_resp = client.get("/api/organizations")
    assert list_resp.status_code == 200
    assert len(list_resp.json()) >= 1
    org_id = list_resp.json()[0]["org_id"]

    # 2. GET /api/organizations/{id}
    get_resp = client.get(f"/api/organizations/{org_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["org_id"] == org_id

    # 3. POST /api/organizations
    create_resp = client.post(
        "/api/organizations",
        headers=TEST_CREATOR_HEADER,
        json={"name": "New Enterprise Network"},
    )
    assert create_resp.status_code == 200
    assert create_resp.json()["name"] == "New Enterprise Network"

    # 4. GET /api/audit
    aud_resp = client.get("/api/audit")
    assert aud_resp.status_code == 200
    assert len(aud_resp.json()) >= 1

    # 5. GET /api/policies
    pol_resp = client.get("/api/policies")
    assert pol_resp.status_code == 200
    assert len(pol_resp.json()) >= 1
    pol_id = pol_resp.json()[0]["policy_id"]

    # 6. PATCH /api/policies
    patch_resp = client.patch(
        "/api/policies",
        json={"policy_id": pol_id, "rule_value": "180", "enabled": True},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["rule_value"] == "180"
