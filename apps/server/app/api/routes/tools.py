"""FastAPI route handlers for OMNIA Tool Execution Engine."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.tools.domain import ToolExecutionRecord, ToolManifestSpec
from app.modules.tools.service import ToolExecutionEngine

router = APIRouter(tags=["tools"])

_tool_engine = ToolExecutionEngine()


def get_tool_engine() -> ToolExecutionEngine:
    return _tool_engine


class ExecuteToolPayload(BaseModel):
    tool_id: str = Field(..., description="Target tool ID to execute")
    requesting_agent_id: str = Field(default="Executive Agent", description="Requesting agent ID")
    agent_permissions: list[str] = Field(default_factory=lambda: ["READ", "WRITE"], description="Agent permissions")
    input_params: dict[str, Any] = Field(default_factory=dict, description="Input parameters")


def _format_manifest(m: ToolManifestSpec) -> dict[str, Any]:
    return {
        "id": m.id,
        "name": m.name,
        "description": m.description,
        "version": m.version,
        "owner": m.owner,
        "tool_type": m.tool_type.value,
        "input_schema": m.input_schema,
        "output_schema": m.output_schema,
        "permissions": m.permissions,
        "timeout_sec": m.timeout_sec,
        "retry_policy": m.retry_policy,
        "rate_limit_per_min": m.rate_limit_per_min,
        "cost_estimate_usd": m.cost_estimate_usd,
    }


def _format_record(r: ToolExecutionRecord) -> dict[str, Any]:
    return {
        "record_id": r.record_id,
        "tool_id": r.tool_id,
        "requesting_agent_id": r.requesting_agent_id,
        "status": r.status.value,
        "input_params": r.input_params,
        "output_data": r.output_data,
        "error_message": r.error_message,
        "latency_ms": r.latency_ms,
        "retries_taken": r.retries_taken,
        "cost_usd": r.cost_usd,
        "timestamp": r.timestamp.isoformat(),
    }


@router.post("/runtime/tools/execute")
async def execute_tool(
    payload: ExecuteToolPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: ToolExecutionEngine = Depends(get_tool_engine),
) -> dict[str, Any]:
    record = engine.execute_tool(
        tool_id=payload.tool_id,
        requesting_agent_id=payload.requesting_agent_id,
        agent_permissions=payload.agent_permissions,
        input_params=payload.input_params,
    )
    return _format_record(record)


@router.get("/runtime/tools")
async def get_all_tools(
    engine: ToolExecutionEngine = Depends(get_tool_engine),
) -> list[dict[str, Any]]:
    tools = engine.get_all_tools()
    return [_format_manifest(t) for t in tools]


@router.get("/runtime/tools/history")
async def get_tool_execution_history(
    limit: int = 100,
    engine: ToolExecutionEngine = Depends(get_tool_engine),
) -> list[dict[str, Any]]:
    history = engine.get_history(limit=limit)
    return [_format_record(r) for r in history]


@router.get("/runtime/tools/metrics")
async def get_tool_execution_metrics(
    engine: ToolExecutionEngine = Depends(get_tool_engine),
) -> dict[str, Any]:
    return engine.get_metrics()
