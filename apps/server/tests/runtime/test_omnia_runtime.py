"""Automated Pytest suite for OMNIA Runtime OS Kernel."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.runtime.domain import EventType, RuntimeState
from app.modules.runtime.service import OmniaRuntimeEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "user-101"}


def test_runtime_engine_execution_flow() -> None:
    engine = OmniaRuntimeEngine()

    trace = engine.execute_run(
        creator_id="user-101",
        event_type=EventType.MISSION_CREATED,
        payload={"mission": "Record React Part 5"},
    )

    assert trace.trace_id.startswith("trc-")
    assert trace.state == RuntimeState.COMPLETED
    assert len(trace.steps) == 3
    assert trace.steps[0].agent_name == "Executive Agent"
    assert trace.total_duration_ms > 0

    status = engine.get_status()
    assert status["current_state"] == "IDLE"
    assert status["agent_registry_count"] == 9


def test_runtime_api_endpoints() -> None:
    # 1. GET /api/runtime/status
    status_resp = client.get("/api/runtime/status")
    assert status_resp.status_code == 200
    assert status_resp.json()["agent_registry_count"] == 9

    # 2. POST /api/runtime/event
    evt_resp = client.post(
        "/api/runtime/event",
        json={"event_type": "COMMENT_RECEIVED", "payload": {"text": "Part 5 please!"}},
    )
    assert evt_resp.status_code == 200
    assert evt_resp.json()["event_type"] == "COMMENT_RECEIVED"

    # 3. POST /api/runtime/run
    run_resp = client.post(
        "/api/runtime/run",
        headers=TEST_CREATOR_HEADER,
        json={"event_type": "SPONSOR_REPLY", "payload": {"deal": "CloudCorp"}},
    )
    assert run_resp.status_code == 200
    trace_data = run_resp.json()
    assert trace_data["state"] == "COMPLETED"
    trace_id = trace_data["trace_id"]

    # 4. GET /api/runtime/history
    hist_resp = client.get("/api/runtime/history")
    assert hist_resp.status_code == 200
    assert len(hist_resp.json()) >= 2

    # 5. GET /api/runtime/trace/{trace_id}
    details_resp = client.get(f"/api/runtime/trace/{trace_id}")
    assert details_resp.status_code == 200
    assert details_resp.json()["trace_id"] == trace_id
