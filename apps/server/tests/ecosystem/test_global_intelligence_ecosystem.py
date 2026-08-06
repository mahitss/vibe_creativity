"""Automated Pytest suite for OMNIA Global Intelligence Ecosystem Platform."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.global_ecosystem.domain import MigrationStatus, ProtocolType
from app.modules.global_ecosystem.service import (
    GlobalEcosystemEngine,
    MigrationEngine,
    ProtocolRouter,
)

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "ws-101"}


def test_engines_and_protocols() -> None:
    router = ProtocolRouter()
    msg = router.dispatch(
        protocol_type=ProtocolType.AGENT_MESSAGE,
        sender_runtime="node-omnia",
        receiver_runtime="node-open-ai-os",
        payload={"query": "Handshake"},
    )
    assert msg.signature.startswith("sig-sha256-")

    mig_engine = MigrationEngine()
    pkg = mig_engine.export_package("ws-101")
    assert pkg.memory_count == 142
    assert pkg.checksum.startswith("sha256-")

    res = mig_engine.import_package(pkg.package_id, "ws-101", "Open AI OS")
    assert res.status == MigrationStatus.VERIFIED


def test_global_ecosystem_engine_flow() -> None:
    engine = GlobalEcosystemEngine()

    nodes = engine.list_nodes()
    assert len(nodes) >= 2

    pkg = engine.export_memories("ws-101")
    assert pkg.creator_id == "ws-101"

    mig = engine.import_memories(pkg.package_id, "ws-101", "Open AI OS")
    assert mig.transferred_memories == 142


def test_global_ecosystem_api_endpoints() -> None:
    # 1. POST /api/global-ecosystem/protocol/dispatch
    disp_resp = client.post(
        "/api/global-ecosystem/protocol/dispatch",
        json={
            "protocol_type": "AGENT_MESSAGE",
            "sender_runtime": "node-omnia-1",
            "receiver_runtime": "node-open-ai-os",
            "payload": {"ping": "pong"},
        },
    )
    assert disp_resp.status_code == 200
    assert disp_resp.json()["signature"].startswith("sig-sha256-")

    # 2. POST /api/global-ecosystem/migrate/export
    exp_resp = client.post("/api/global-ecosystem/migrate/export", headers=TEST_CREATOR_HEADER)
    assert exp_resp.status_code == 200
    assert exp_resp.json()["memory_count"] == 142

    # 3. POST /api/global-ecosystem/migrate/import
    imp_resp = client.post(
        "/api/global-ecosystem/migrate/import",
        headers=TEST_CREATOR_HEADER,
        json={"package_id": exp_resp.json()["package_id"], "source_platform": "Open AI OS"},
    )
    assert imp_resp.status_code == 200
    assert imp_resp.json()["status"] == "VERIFIED"

    # 4. GET /api/global-ecosystem/nodes
    nodes_resp = client.get("/api/global-ecosystem/nodes")
    assert nodes_resp.status_code == 200
    assert len(nodes_resp.json()) >= 2
