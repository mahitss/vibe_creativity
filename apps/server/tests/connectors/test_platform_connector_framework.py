"""Automated Pytest suite for OMNIA Universal Platform Connector Framework."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.connector_framework.domain import PlatformType, SyncMode
from app.modules.connector_framework.service import (
    ConnectorFrameworkEngine,
    DeltaSyncEngine,
    OAuthManager,
    WebhookManager,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_oauth_and_delta_sync() -> None:
    oauth = OAuthManager()
    token = "secret-oauth-token-123"
    enc = oauth.encrypt_token(token)
    assert enc != token
    assert oauth.decrypt_token(enc) == token

    delta = DeltaSyncEngine()
    records, cursor = delta.execute_delta_sync("conn-101", "cursor-001")
    assert records > 0
    assert cursor.startswith("cursor-")

    wh = WebhookManager()
    assert wh.verify_signature(b"payload", "sig", "secret") is True


def test_connector_framework_engine_flow() -> None:
    engine = ConnectorFrameworkEngine()

    state = engine.install_connector(
        workspace_id="ws-101",
        platform=PlatformType.NOTION,
        access_token="secret-notion-token",
        refresh_token="notion-refresh",
        scopes=["read:page"],
    )
    assert state.platform == PlatformType.NOTION
    assert state.connector_id.startswith("conn-notion-")

    res = engine.sync_connector(state.connector_id, mode=SyncMode.DELTA_CURSOR)
    assert res.status == "COMPLETED"
    assert res.records_imported > 0

    status = engine.get_status("ws-101")
    assert status["total_connectors"] >= 3


def test_connector_framework_api_endpoints() -> None:
    # 1. GET /api/connectors
    list_resp = client.get("/api/connectors", headers=TEST_CREATOR_HEADER)
    assert list_resp.status_code == 200
    assert len(list_resp.json()) >= 2

    # 2. POST /api/connectors/install
    inst_resp = client.post(
        "/api/connectors/install",
        headers=TEST_CREATOR_HEADER,
        json={
            "platform": "SLACK",
            "access_token": "slack-bot-token-101",
            "scopes": ["channels:read", "chat:write"],
        },
    )
    assert inst_resp.status_code == 200
    conn_id = inst_resp.json()["connector_id"]
    assert inst_resp.json()["platform"] == "SLACK"

    # 3. POST /api/connectors/sync
    sync_resp = client.post(
        "/api/connectors/sync",
        json={"connector_id": conn_id, "mode": "DELTA_CURSOR"},
    )
    assert sync_resp.status_code == 200
    assert sync_resp.json()["status"] == "COMPLETED"

    # 4. GET /api/connectors/status
    stat_resp = client.get("/api/connectors/status", headers=TEST_CREATOR_HEADER)
    assert stat_resp.status_code == 200
    assert stat_resp.json()["healthy_count"] >= 3
