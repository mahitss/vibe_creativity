"""Automated Pytest suite for PROJECT Z (Year 2100): The Final Philosophy Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.project_z.domain import HumanLoopStage
from app.modules.project_z.service import (
    HumanLoopEngine,
    ProjectZService,
    ThreeLawsEngine,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_three_laws() -> None:
    laws_engine = ThreeLawsEngine()
    good = laws_engine.verify(agency_preserved=True, user_ownership_guaranteed=True, explanation_provided=True)
    assert good.complies is True

    bad = laws_engine.verify(agency_preserved=False, user_ownership_guaranteed=True, explanation_provided=True)
    assert bad.complies is False

    loop_engine = HumanLoopEngine()
    c1 = loop_engine.advance("ws-101", HumanLoopStage.DREAM)
    assert c1.current_stage == HumanLoopStage.DREAM
    assert c1.next_stage == HumanLoopStage.IMAGINE

    c8 = loop_engine.advance("ws-101", HumanLoopStage.INSPIRE)
    assert c8.next_stage == HumanLoopStage.DREAM


def test_project_z_service_flow() -> None:
    service = ProjectZService()

    laws = service.get_three_laws()
    assert "law_1" in laws
    assert "final_principle" in laws

    metrics = service.get_impact_metrics()
    assert metrics.humans_helped == 3500000000

    cycle = service.advance_human_loop("ws-101", HumanLoopStage.PLAN)
    assert cycle.next_stage == HumanLoopStage.CREATE


def test_project_z_api_endpoints() -> None:
    # 1. GET /api/project-z/three-laws
    laws_resp = client.get("/api/project-z/three-laws")
    assert laws_resp.status_code == 200
    assert "law_1" in laws_resp.json()

    # 2. POST /api/project-z/human-loop/step
    step_resp = client.post(
        "/api/project-z/human-loop/step",
        headers=TEST_CREATOR_HEADER,
        json={"current_stage": "CREATE"},
    )
    assert step_resp.status_code == 200
    assert step_resp.json()["next_stage"] == "LEARN"

    # 3. GET /api/project-z/impact-metrics
    met_resp = client.get("/api/project-z/impact-metrics")
    assert met_resp.status_code == 200
    assert met_resp.json()["humans_helped"] == 3500000000

    # 4. POST /api/project-z/verify-compliance
    ver_resp = client.post(
        "/api/project-z/verify-compliance",
        json={
            "agency_preserved": True,
            "user_ownership_guaranteed": True,
            "explanation_provided": True,
        },
    )
    assert ver_resp.status_code == 200
    assert ver_resp.json()["complies"] is True
