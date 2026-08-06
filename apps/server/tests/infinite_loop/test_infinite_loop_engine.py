"""Automated Pytest suite for OMNIA Continuous Evolution & Infinite Loop Engine Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.infinite_loop.domain import LoopType
from app.modules.infinite_loop.service import (
    CommitTrackerService,
    InfiniteLoopService,
    LoopOrchestrator,
)

client = TestClient(app)


def test_engines_and_loops() -> None:
    orch = LoopOrchestrator()
    eng_state = orch.advance(LoopType.ENGINEERING, "Imagine")
    assert eng_state.current_step == "Imagine"
    assert eng_state.next_step == "Build"

    founder_state = orch.advance(LoopType.FOUNDER, "Vision")
    assert founder_state.next_step == "Prototype"

    dev_state = orch.advance(LoopType.DEVELOPER, "Write Code")
    assert dev_state.next_step == "Test"

    tracker = CommitTrackerService()
    telem = tracker.get_telemetry()
    assert telem.total_commits_pushed == 142800


def test_infinite_loop_service_flow() -> None:
    service = InfiniteLoopService()

    telem = service.get_telemetry()
    assert telem.features_iterated == 8900

    cycle = service.advance_loop(LoopType.PRODUCT, "Ideas Finite")
    assert cycle.next_step == "Execution Infinite"

    loops = service.list_loops()
    assert len(loops) == 4


def test_infinite_loop_api_endpoints() -> None:
    # 1. GET /api/infinite-loop/telemetry
    tel_resp = client.get("/api/infinite-loop/telemetry")
    assert tel_resp.status_code == 200
    assert tel_resp.json()["total_commits_pushed"] == 142800

    # 2. POST /api/infinite-loop/step
    step_resp = client.post(
        "/api/infinite-loop/step",
        json={"loop_type": "DEVELOPER", "current_step": "Deploy"},
    )
    assert step_resp.status_code == 200
    assert step_resp.json()["next_step"] == "Monitor"

    # 3. GET /api/infinite-loop/loops
    loops_resp = client.get("/api/infinite-loop/loops")
    assert loops_resp.status_code == 200
    assert len(loops_resp.json()) == 4
