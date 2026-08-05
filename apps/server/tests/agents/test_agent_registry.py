"""Automated Pytest suite for OMNIA Agent & Capability Registry."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.agents.domain import AgentCapability, AgentLifecycleState, AgentManifest
from app.modules.agents.service import AgentRegistryEngine, DependencyResolver

client = TestClient(app)


def test_dependency_resolver_topological_sort() -> None:
    resolver = DependencyResolver()

    a1 = AgentManifest(
        id="a1",
        name="A1",
        version="1.0",
        description="",
        owner="",
        capabilities=[],
        dependencies=[],
        priority=1,
        supported_events=[],
        supported_tools=[],
        supported_memory_types=[],
        supported_workflows=[],
    )
    a2 = AgentManifest(
        id="a2",
        name="A2",
        version="1.0",
        description="",
        owner="",
        capabilities=[],
        dependencies=["a1"],
        priority=2,
        supported_events=[],
        supported_tools=[],
        supported_memory_types=[],
        supported_workflows=[],
    )

    ordered = resolver.resolve_startup_order([a2, a1])
    assert [a.id for a in ordered] == ["a1", "a2"]


def test_agent_registry_engine_capabilities_and_tools() -> None:
    engine = AgentRegistryEngine()

    all_agents = engine.get_all_agents()
    assert len(all_agents) == 12

    planning_agents = engine.get_agents_by_capability(AgentCapability.PLANNING)
    assert len(planning_agents) >= 2
    agent_ids = [a.id for a in planning_agents]
    assert "agent-executive" in agent_ids
    assert "agent-planner" in agent_ids

    tools = engine.get_all_tools()
    assert len(tools) >= 2


def test_agent_registry_api_endpoints() -> None:
    # 1. GET /api/runtime/agents
    agents_resp = client.get("/api/runtime/agents")
    assert agents_resp.status_code == 200
    agents = agents_resp.json()
    assert len(agents) == 12

    # 2. GET /api/runtime/agents/agent-executive
    exec_resp = client.get("/api/runtime/agents/agent-executive")
    assert exec_resp.status_code == 200
    assert exec_resp.json()["name"] == "Executive Agent"

    # 3. GET /api/runtime/capabilities
    cap_resp = client.get("/api/runtime/capabilities")
    assert cap_resp.status_code == 200
    assert "PLANNING" in cap_resp.json()

    # 4. GET /api/runtime/tools
    tools_resp = client.get("/api/runtime/tools")
    assert tools_resp.status_code == 200
    assert len(tools_resp.json()) >= 2

    # 5. POST /api/runtime/agents/reload
    reload_resp = client.post("/api/runtime/agents/reload")
    assert reload_resp.status_code == 200
    assert reload_resp.json()["total_agents"] == 12
