"""Automated Pytest suite for OMNIA Workflow Execution Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.workflow_engine.domain import (
    ExecutionMode,
    TaskState,
    WorkflowState,
    WorkflowTask,
    WorkflowType,
)
from app.modules.workflow_engine.service import DAGValidator, WorkflowEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_dag_validator_topological_sort() -> None:
    validator = DAGValidator()

    t1 = WorkflowTask(
        task_id="t1",
        workflow_id="wf1",
        stage_id="s1",
        assigned_agent="Agent A",
        priority=10,
        dependencies=[],
        execution_mode=ExecutionMode.SEQUENTIAL,
        approval_required=False,
        estimated_duration_sec=5,
        retry_policy="RETRY",
    )
    t2 = WorkflowTask(
        task_id="t2",
        workflow_id="wf1",
        stage_id="s1",
        assigned_agent="Agent B",
        priority=20,
        dependencies=["t1"],
        execution_mode=ExecutionMode.SEQUENTIAL,
        approval_required=False,
        estimated_duration_sec=5,
        retry_policy="RETRY",
    )

    sorted_tasks = validator.sort_tasks([t2, t1])
    assert [t.task_id for t in sorted_tasks] == ["t1", "t2"]


def test_workflow_engine_pause_and_resume() -> None:
    engine = WorkflowEngine()

    plan = engine.create_workflow(
        title="Test Campaign Workflow",
        workflow_type=WorkflowType.SPONSOR_CAMPAIGN,
        workspace_id="ws-101",
    )
    assert plan.state == WorkflowState.QUEUED

    # Pause
    paused = engine.pause_workflow(plan.workflow_id)
    assert paused.state == WorkflowState.PAUSED
    assert "paused_at" in paused.checkpoint_data

    # Resume & Run
    resumed = engine.resume_workflow(plan.workflow_id)
    assert resumed.state == WorkflowState.COMPLETED


def test_workflow_engine_api_endpoints() -> None:
    # 1. POST /api/runtime/workflows
    create_resp = client.post(
        "/api/runtime/workflows",
        headers=TEST_CREATOR_HEADER,
        json={"title": "Community Moderation Run", "workflow_type": "COMMUNITY_REVIEW"},
    )
    assert create_resp.status_code == 200
    plan_data = create_resp.json()
    wf_id = plan_data["workflow_id"]

    # 2. POST /api/runtime/workflows/run
    run_resp = client.post("/api/runtime/workflows/run", json={"workflow_id": wf_id})
    assert run_resp.status_code == 200
    assert run_resp.json()["state"] == "COMPLETED"

    # 3. GET /api/runtime/workflows/{wf_id}
    details_resp = client.get(f"/api/runtime/workflows/{wf_id}")
    assert details_resp.status_code == 200
    assert details_resp.json()["workflow_id"] == wf_id

    # 4. GET /api/runtime/workflows/history
    hist_resp = client.get("/api/runtime/workflows/history", headers=TEST_CREATOR_HEADER)
    assert hist_resp.status_code == 200
    assert len(hist_resp.json()) >= 2
