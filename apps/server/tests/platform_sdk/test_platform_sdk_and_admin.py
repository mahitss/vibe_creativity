"""Automated Pytest suite for OMNIA Platform SDK & Admin Extension Layer."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.platform_sdk.service import (
    BackupRestoreEngine,
    FeatureFlagEngine,
    PlatformSdkEngine,
    PluginRegistryService,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_feature_flags() -> None:
    plugin_service = PluginRegistryService()
    p = plugin_service.install_plugin("p-101", "1.0.0", "Dev", "Test Plugin", ["READ"])
    assert p.plugin_id == "p-101"
    assert p.status == "ACTIVE"

    ff_engine = FeatureFlagEngine()
    assert ff_engine.is_enabled("ff-realtime-voice", "ws-101") is True
    assert ff_engine.is_enabled("non-existent-flag") is False

    bak_engine = BackupRestoreEngine()
    backup = bak_engine.export_workspace("ws-101")
    assert backup.workspace_id == "ws-101"
    assert len(backup.checksum) > 0
    assert bak_engine.import_workspace(backup.backup_id, "ws-101") is True


def test_platform_sdk_engine_flow() -> None:
    engine = PlatformSdkEngine()

    plugins = engine.list_plugins()
    assert len(plugins) >= 1

    health = engine.get_runtime_health()
    assert health["status"] == "HEALTHY"

    workspaces = engine.get_workspaces()
    assert len(workspaces) >= 1


def test_platform_sdk_api_endpoints() -> None:
    # 1. GET /api/admin/workspaces
    ws_resp = client.get("/api/admin/workspaces")
    assert ws_resp.status_code == 200
    assert len(ws_resp.json()) >= 1

    # 2. GET /api/admin/runtime
    rt_resp = client.get("/api/admin/runtime")
    assert rt_resp.status_code == 200
    assert rt_resp.json()["status"] == "HEALTHY"

    # 3. GET /api/plugins
    plg_resp = client.get("/api/plugins")
    assert plg_resp.status_code == 200
    assert len(plg_resp.json()) >= 1

    # 4. POST /api/plugins/install
    inst_resp = client.post(
        "/api/plugins/install",
        json={
            "plugin_id": "plugin-custom-agent",
            "version": "2.0.0",
            "author": "Partner Studio",
            "description": "Custom Agent Extension",
            "permissions": ["EXECUTE_WORKFLOW"],
        },
    )
    assert inst_resp.status_code == 200
    assert inst_resp.json()["plugin_id"] == "plugin-custom-agent"

    # 5. POST /api/workspace/export
    exp_resp = client.post("/api/workspace/export", headers=TEST_CREATOR_HEADER)
    assert exp_resp.status_code == 200
    bak_id = exp_resp.json()["backup_id"]

    # 6. POST /api/workspace/import
    imp_resp = client.post(
        "/api/workspace/import",
        headers=TEST_CREATOR_HEADER,
        json={"backup_id": bak_id},
    )
    assert imp_resp.status_code == 200
    assert imp_resp.json()["status"] == "SUCCESS"
