"""FastAPI route handlers for OMNIA Agent & Capability Registry."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from app.modules.agents.domain import AgentCapability, AgentManifest
from app.modules.agents.service import AgentRegistryEngine

router = APIRouter(tags=["registry"])

_registry_engine = AgentRegistryEngine()


def get_registry_engine() -> AgentRegistryEngine:
    return _registry_engine


def _format_health(h: Any) -> dict[str, Any] | None:
    if not h:
        return None
    return {
        "heartbeat": h.heartbeat.isoformat(),
        "latency_ms": h.latency_ms,
        "error_rate": h.error_rate,
        "success_rate": h.success_rate,
        "queue_size": h.queue_size,
        "memory_usage_mb": h.memory_usage_mb,
        "cpu_usage_pct": h.cpu_usage_pct,
    }


def _format_tool(t: Any) -> dict[str, Any]:
    return {
        "name": t.name,
        "description": t.description,
        "input_schema": t.input_schema,
        "output_schema": t.output_schema,
        "permissions": t.permissions,
        "timeout_sec": t.timeout_sec,
        "retry_policy": t.retry_policy,
        "owner_agent_id": t.owner_agent_id,
    }


def _format_manifest(m: AgentManifest) -> dict[str, Any]:
    return {
        "id": m.id,
        "name": m.name,
        "version": m.version,
        "description": m.description,
        "owner": m.owner,
        "capabilities": [c.value for c in m.capabilities],
        "dependencies": m.dependencies,
        "priority": m.priority,
        "supported_events": m.supported_events,
        "supported_tools": [_format_tool(t) for t in m.supported_tools],
        "supported_memory_types": m.supported_memory_types,
        "supported_workflows": m.supported_workflows,
        "state": m.state.value,
        "health": _format_health(m.health),
    }


@router.get("/runtime/agents")
async def get_all_agents(
    engine: AgentRegistryEngine = Depends(get_registry_engine),
) -> list[dict[str, Any]]:
    manifests = engine.get_all_agents()
    return [_format_manifest(m) for m in manifests]


@router.get("/runtime/agents/{agent_id}")
async def get_agent_details(
    agent_id: str,
    engine: AgentRegistryEngine = Depends(get_registry_engine),
) -> dict[str, Any]:
    try:
        manifest = engine.get_agent(agent_id)
        return _format_manifest(manifest)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/runtime/capabilities")
async def get_capabilities_matrix(
    engine: AgentRegistryEngine = Depends(get_registry_engine),
) -> dict[str, list[dict[str, Any]]]:
    matrix: dict[str, list[dict[str, Any]]] = {}
    for cap in AgentCapability:
        agents = engine.get_agents_by_capability(cap)
        matrix[cap.value] = [
            {"id": a.id, "name": a.name, "version": a.version, "priority": a.priority} for a in agents
        ]
    return matrix


@router.get("/runtime/registry/tools")
async def get_tool_registry(
    engine: AgentRegistryEngine = Depends(get_registry_engine),
) -> list[dict[str, Any]]:
    tools = engine.get_all_tools()
    return [_format_tool(t) for t in tools]


@router.post("/runtime/agents/reload")
async def reload_agent_registry(
    engine: AgentRegistryEngine = Depends(get_registry_engine),
) -> dict[str, Any]:
    return engine.reload_registry()
