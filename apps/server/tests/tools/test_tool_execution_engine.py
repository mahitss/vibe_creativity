"""Automated Pytest suite for OMNIA Tool Execution Engine."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.tools.domain import ToolExecutionStatus
from app.modules.tools.service import CircuitBreaker, ToolAuthorizer, ToolExecutionEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_tool_authorizer() -> None:
    authorizer = ToolAuthorizer()
    assert authorizer.authorize(["ADMIN"], ["WRITE", "EXECUTE"]) is True
    assert authorizer.authorize(["READ", "WRITE"], ["READ"]) is True
    assert authorizer.authorize(["READ"], ["WRITE"]) is False


def test_circuit_breaker() -> None:
    cb = CircuitBreaker(failure_threshold=2)
    assert cb.is_tripped("t1") is False

    cb.record_failure("t1")
    assert cb.is_tripped("t1") is False

    cb.record_failure("t1")
    assert cb.is_tripped("t1") is True

    cb.record_success("t1")
    assert cb.is_tripped("t1") is False


def test_tool_execution_engine_flow() -> None:
    engine = ToolExecutionEngine()

    # Successful execution
    rec_ok = engine.execute_tool(
        tool_id="tool-http-fetch",
        requesting_agent_id="Content Agent",
        agent_permissions=["READ"],
        input_params={"url": "https://api.github.com", "api_key": "secret-123"},
    )
    assert rec_ok.status == ToolExecutionStatus.SUCCEEDED
    assert rec_ok.input_params["api_key"] == "[REDACTED_SECRET]"

    # Unauthorized execution
    rec_unauth = engine.execute_tool(
        tool_id="tool-notify",
        requesting_agent_id="Analytics Agent",
        agent_permissions=["READ"],  # Needs WRITE
        input_params={"title": "Alert"},
    )
    assert rec_unauth.status == ToolExecutionStatus.FAILED
    assert "unauthorized" in rec_unauth.error_message.lower()

    metrics = engine.get_metrics()
    assert metrics["total_executions"] == 2
    assert metrics["succeeded"] == 1
    assert metrics["failed"] == 1


def test_tool_execution_api_endpoints() -> None:
    # 1. POST /api/runtime/tools/execute
    exec_resp = client.post(
        "/api/runtime/tools/execute",
        headers=TEST_CREATOR_HEADER,
        json={
            "tool_id": "tool-notify",
            "requesting_agent_id": "Notification Agent",
            "agent_permissions": ["WRITE"],
            "input_params": {"title": "Mission Alert", "message": "Part 5 ready"},
        },
    )
    assert exec_resp.status_code == 200
    res_data = exec_resp.json()
    assert res_data["status"] == "SUCCEEDED"

    # 2. GET /api/runtime/tools
    tools_resp = client.get("/api/runtime/tools")
    assert tools_resp.status_code == 200
    assert len(tools_resp.json()) >= 3

    # 3. GET /api/runtime/tools/history
    hist_resp = client.get("/api/runtime/tools/history")
    assert hist_resp.status_code == 200
    assert len(hist_resp.json()) >= 1

    # 4. GET /api/runtime/tools/metrics
    met_resp = client.get("/api/runtime/tools/metrics")
    assert met_resp.status_code == 200
    assert met_resp.json()["total_executions"] >= 1
