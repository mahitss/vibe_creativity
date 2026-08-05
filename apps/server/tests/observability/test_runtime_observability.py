"""Automated Pytest suite for OMNIA Runtime Observability Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.observability_engine.domain import HealthStatus, LogLevel
from app.modules.observability_engine.service import HealthAggregator, ObservabilityEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_health_aggregator_calculation() -> None:
    aggregator = HealthAggregator()
    subsystem = aggregator.compute_subsystem_health(
        component_name="Test Subsystem",
        latency_ms=50.0,
        error_rate=0.0,
        active_alerts=0,
    )
    assert subsystem.health_score == 95.0
    assert subsystem.status == HealthStatus.HEALTHY


def test_observability_engine_tracing_and_otel_export() -> None:
    engine = ObservabilityEngine()

    traces = engine.list_traces(workspace_id="ws-101")
    assert len(traces) >= 1

    t_id = traces[0].trace_id
    otel_export = engine.export_opentelemetry(t_id)
    assert "resourceSpans" in otel_export
    assert len(otel_export["resourceSpans"]) >= 1

    # Log recording
    log_entry = engine.record_log(
        level=LogLevel.INFO,
        component="Test Agent",
        message="Observability test log message",
        workspace_id="ws-101",
    )
    assert log_entry.message == "Observability test log message"


def test_observability_api_endpoints() -> None:
    # 1. GET /api/runtime/traces
    traces_resp = client.get("/api/runtime/traces", headers=TEST_CREATOR_HEADER)
    assert traces_resp.status_code == 200
    traces = traces_resp.json()
    assert len(traces) >= 1
    t_id = traces[0]["trace_id"]

    # 2. GET /api/runtime/traces/{t_id}
    details_resp = client.get(f"/api/runtime/traces/{t_id}")
    assert details_resp.status_code == 200
    assert details_resp.json()["trace_id"] == t_id

    # 3. GET /api/runtime/traces/{t_id}/otel
    otel_resp = client.get(f"/api/runtime/traces/{t_id}/otel")
    assert otel_resp.status_code == 200
    assert "resourceSpans" in otel_resp.json()

    # 4. GET /api/runtime/logs
    logs_resp = client.get("/api/runtime/logs", headers=TEST_CREATOR_HEADER)
    assert logs_resp.status_code == 200
    assert len(logs_resp.json()) >= 1

    # 5. GET /api/runtime/health
    health_resp = client.get("/api/runtime/health")
    assert health_resp.status_code == 200
    assert len(health_resp.json()) == 8

    # 6. GET /api/runtime/alerts
    alerts_resp = client.get("/api/runtime/alerts", headers=TEST_CREATOR_HEADER)
    assert alerts_resp.status_code == 200
    assert len(alerts_resp.json()) >= 1
