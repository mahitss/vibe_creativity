"""Automated Pytest suite for OMNIA Production Runtime Event Bus System."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.event_bus.domain import (
    EventCategory,
    EventFilter,
    EventPriority,
    EventType,
    ReplayRequest,
)
from app.modules.event_bus.service import EventBusEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_event_bus_engine_publish_and_subscribe() -> None:
    engine = EventBusEngine()
    received_events = []

    def subscriber_callback(evt):
        received_events.append(evt)

    filter_spec = EventFilter(
        workspace_id="ws-101",
        event_types=[EventType.MissionCreated],
    )
    engine.subscribe(filter_spec, subscriber_callback)

    # Publish matching event
    e1 = engine.create_and_publish(
        event_type=EventType.MissionCreated,
        category=EventCategory.MISSION,
        payload={"title": "Test Mission"},
        workspace_id="ws-101",
    )

    assert len(received_events) == 1
    assert received_events[0].event_id == e1.event_id
    assert engine.store.count() >= 3


def test_event_bus_replay() -> None:
    engine = EventBusEngine()

    req = ReplayRequest(range_type="ALL", workspace_id="ws-101")
    replayed = engine.replay(req)

    assert len(replayed) >= 2
    assert replayed[0].workspace_id == "ws-101"


def test_event_bus_api_endpoints() -> None:
    # 1. POST /api/runtime/events
    pub_resp = client.post(
        "/api/runtime/events",
        headers=TEST_CREATOR_HEADER,
        json={
            "event_type": "CommentReceived",
            "category": "COMMUNITY",
            "payload": {"text": "Awesome React tutorial!"},
            "priority": "HIGH",
            "source_agent": "Community Agent",
        },
    )
    assert pub_resp.status_code == 200
    evt_data = pub_resp.json()
    assert evt_data["event_type"] == "CommentReceived"

    # 2. GET /api/runtime/events/history
    hist_resp = client.get("/api/runtime/events/history")
    assert hist_resp.status_code == 200
    assert len(hist_resp.json()) >= 3

    # 3. GET /api/runtime/events
    filt_resp = client.get("/api/runtime/events?workspace_id=ws-101")
    assert filt_resp.status_code == 200
    assert len(filt_resp.json()) >= 1

    # 4. POST /api/runtime/events/replay
    rep_resp = client.post(
        "/api/runtime/events/replay",
        headers=TEST_CREATOR_HEADER,
        json={"range_type": "LAST_DAY", "workspace_id": "ws-101"},
    )
    assert rep_resp.status_code == 200
    assert rep_resp.json()["status"] == "SUCCESS"
