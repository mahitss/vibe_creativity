"""Automated Pytest suite for OMNIA Workflow Automation & Agent Orchestration Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.workflows.domain import TaskStatus, WorkflowStatus
from app.modules.workflows.service import WorkflowOrchestratorEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "creator-test-workflows"}


def test_workflow_service_lifecycle() -> None:
    engine = WorkflowOrchestratorEngine()
    workflows = engine.get_workflows("creator-test-workflows")

    assert len(workflows) >= 1
    wf = workflows[0]
    assert wf.workflow_id == "wf-101"
    assert len(wf.tasks) == 4
    assert wf.tasks[0].status == TaskStatus.COMPLETED

    # Advance workflow
    updated_wf = engine.run_workflow("wf-101", "creator-test-workflows")
    assert updated_wf.tasks[2].status == TaskStatus.COMPLETED

    # Pause & Resume
    paused_wf = engine.pause_workflow("wf-101", "creator-test-workflows")
    assert paused_wf.status == WorkflowStatus.PAUSED

    resumed_wf = engine.resume_workflow("wf-101", "creator-test-workflows")
    assert resumed_wf.status == WorkflowStatus.ACTIVE


def test_create_workflow_from_template() -> None:
    engine = WorkflowOrchestratorEngine()
    new_wf = engine.create_workflow("tmpl-sponsor-campaign", "Q3 CloudCorp Campaign", "creator-test-workflows")

    assert new_wf.workflow_id.startswith("wf-")
    assert new_wf.name == "Q3 CloudCorp Campaign"
    assert len(new_wf.tasks) == 4


def test_workflow_api_endpoints() -> None:
    # 1. GET /api/workflows
    list_resp = client.get("/api/workflows", headers=TEST_CREATOR_HEADER)
    assert list_resp.status_code == 200
    list_data = list_resp.json()
    assert len(list_data) >= 1

    # 2. GET /api/workflows/templates
    tmpl_resp = client.get("/api/workflows/templates", headers=TEST_CREATOR_HEADER)
    assert tmpl_resp.status_code == 200
    assert len(tmpl_resp.json()) >= 2

    # 3. GET /api/workflows/wf-101
    get_resp = client.get("/api/workflows/wf-101", headers=TEST_CREATOR_HEADER)
    assert get_resp.status_code == 200
    assert get_resp.json()["workflow_id"] == "wf-101"

    # 4. POST /api/workflows
    create_resp = client.post(
        "/api/workflows",
        headers=TEST_CREATOR_HEADER,
        json={"template_id": "tmpl-series-launch", "name": "React Part 6 Launch"},
    )
    assert create_resp.status_code == 200
    new_id = create_resp.json()["workflow_id"]

    # 5. POST /api/workflows/run
    run_resp = client.post(
        "/api/workflows/run",
        headers=TEST_CREATOR_HEADER,
        json={"workflow_id": new_id},
    )
    assert run_resp.status_code == 200

    # 6. POST /api/workflows/pause
    pause_resp = client.post(
        "/api/workflows/pause",
        headers=TEST_CREATOR_HEADER,
        json={"workflow_id": new_id},
    )
    assert pause_resp.status_code == 200
    assert pause_resp.json()["status"] == "PAUSED"

    # 7. POST /api/workflows/resume
    resume_resp = client.post(
        "/api/workflows/resume",
        headers=TEST_CREATOR_HEADER,
        json={"workflow_id": new_id},
    )
    assert resume_resp.status_code == 200
    assert resume_resp.json()["status"] == "ACTIVE"
