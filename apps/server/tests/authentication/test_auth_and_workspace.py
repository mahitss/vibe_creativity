"""Automated Pytest suite for OMNIA Production Auth, Workspace & Executive Mind Management."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.authentication.domain import AuthProvider
from app.modules.authentication.service import AuthWorkspaceEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "user-101"}


def test_auth_login_and_workspace_creation() -> None:
    engine = AuthWorkspaceEngine()
    user, session, workspace = engine.login("sarah@creator.ai", AuthProvider.GOOGLE)

    assert user.email == "sarah@creator.ai"
    assert session.session_id.startswith("sess-")
    assert workspace.workspace_id.startswith("ws-")
    assert workspace.executive_mind is not None
    assert "mind-" in workspace.executive_mind.mind_id
    assert workspace.executive_mind.memory_namespace == f"omnia.{workspace.slug}.mind"


def test_auth_logout() -> None:
    engine = AuthWorkspaceEngine()
    user, session, workspace = engine.login("test@omnia.ai")
    assert engine.logout(session.session_id) is True
    assert engine.logout(session.session_id) is False


def test_auth_and_workspace_api_endpoints() -> None:
    # 1. POST /api/auth/login
    login_resp = client.post(
        "/api/auth/login",
        json={"email": "alex@omnia.ai", "provider": "GITHUB"},
    )
    assert login_resp.status_code == 200
    data = login_resp.json()
    assert data["user"]["email"] == "alex@omnia.ai"
    assert data["workspace"]["executive_mind"] is not None
    sess_id = data["session"]["session_id"]

    # 2. GET /api/workspace
    ws_resp = client.get("/api/workspace", headers=TEST_CREATOR_HEADER)
    assert ws_resp.status_code == 200
    assert ws_resp.json()["workspace_id"] == "ws-101"

    # 3. GET /api/mind
    mind_resp = client.get("/api/mind", headers=TEST_CREATOR_HEADER)
    assert mind_resp.status_code == 200
    assert mind_resp.json()["memory_namespace"] == "omnia.mahit.mind"

    # 4. POST /api/workspace
    create_ws_resp = client.post(
        "/api/workspace",
        headers=TEST_CREATOR_HEADER,
        json={"name": "New Venture Studio", "timezone": "Europe/London"},
    )
    assert create_ws_resp.status_code == 200
    new_ws = create_ws_resp.json()
    assert new_ws["name"] == "New Venture Studio"
    assert new_ws["executive_mind"]["memory_namespace"] == "omnia.new-venture-studio.mind"

    # 5. POST /api/auth/logout
    logout_resp = client.post("/api/auth/logout", json={"session_id": sess_id})
    assert logout_resp.status_code == 200
    assert logout_resp.json()["status"] == "SUCCESS"
