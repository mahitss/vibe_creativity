"""FastAPI routes for Multi-Agent Intelligence Platform."""

from fastapi import APIRouter, Depends, Query
from app.core.security import CreatorContext, require_creator_context
from app.modules.agents.dependencies import agent_platform
from app.modules.agents.domain import TaskPriority
from app.modules.agents.executive import CycleOutcome
from app.modules.agents.schemas import CycleRequest, DispatchRequest
from app.modules.agents.service import AgentPlatformService

router = APIRouter(prefix="/agents", tags=["agents"])


def _outcome_read(outcome: CycleOutcome) -> dict[str, object]:
    return {
        "creator_id": outcome.creator_id,
        "findings": [
            {
                "agent_id": f.agent_id,
                "topic": f.topic,
                "summary": f.summary,
                "confidence": f.confidence,
                "proposed_action": f.proposed_action,
                "evidence": list(f.evidence),
                "priority_hint": f.priority_hint.value,
            }
            for f in outcome.findings
        ],
        "lifecycle": list(outcome.lifecycle),
    }


@router.get("/registry")
async def agent_registry(
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> list[dict[str, object]]:
    return [
        {
            "agent_id": d.agent_id,
            "name": d.name,
            "version": d.version,
            "description": d.description,
            "capabilities": list(d.capabilities),
            "dependencies": list(d.dependencies),
            "status": d.status.value,
            "health": d.health,
            "average_latency_ms": d.average_latency_ms,
            "last_execution_at": d.last_execution_at.isoformat() if d.last_execution_at else None,
        }
        for d in await platform.list_agents()
    ]


@router.post("/cycle")
async def run_cycle(
    payload: CycleRequest,
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> dict[str, object]:
    outcome = await platform.run_cycle(
        context.creator_id,
        focus=payload.focus,
        mission_objective=payload.mission_objective,
    )
    return _outcome_read(outcome)


@router.post("/dispatch")
async def dispatch(
    payload: DispatchRequest,
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> dict[str, object]:
    outcome = await platform.dispatch(
        context.creator_id,
        target_agent=payload.target_agent,
        purpose=payload.purpose,
        payload=payload.payload,
        priority=TaskPriority(payload.priority.value),
    )
    return _outcome_read(outcome)


@router.get("/dashboard")
async def agents_dashboard(
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> dict[str, object]:
    return await platform.dashboard(context.creator_id)


@router.get("/tasks")
async def list_tasks(
    limit: int = Query(default=100, ge=1, le=500),
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> list[dict[str, object]]:
    return await platform.bus_snapshot_tasks(context.creator_id, limit)


@router.get("/executions")
async def list_executions(
    limit: int = Query(default=100, ge=1, le=500),
    agent_id: str | None = Query(default=None),
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> list[dict[str, object]]:
    return await platform.bus_snapshot_executions(context.creator_id, limit, agent_id)


@router.get("/decisions")
async def list_decisions(
    limit: int = Query(default=100, ge=1, le=500),
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> list[dict[str, object]]:
    return await platform.bus_snapshot_decisions(context.creator_id, limit)


@router.get("/delegations")
async def list_delegations(
    limit: int = Query(default=100, ge=1, le=500),
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> list[dict[str, object]]:
    return await platform.bus_snapshot_delegations(context.creator_id, limit)


@router.get("/conflicts")
async def list_conflicts(
    limit: int = Query(default=100, ge=1, le=500),
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> list[dict[str, object]]:
    return await platform.bus_snapshot_conflicts(context.creator_id, limit)


@router.get("/bus")
async def bus_health(
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> dict[str, object]:
    return {
        "metrics": platform.bus.metrics(),
        "dead_letter_count": len(platform.bus.dead_letter()),
        "dead_letter": [
            {
                "id": str(t.id),
                "task_type": t.task_type,
                "target_agent": t.target_agent,
                "error": t.error,
            }
            for t in platform.bus.dead_letter()
        ],
    }


@router.post("/decisions/{decision_id}/approve")
async def approve_decision(
    decision_id: str,
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> dict[str, str]:
    await platform.approve_decision(context.creator_id, decision_id)
    return {"status": "approved"}


@router.post("/decisions/{decision_id}/reject")
async def reject_decision(
    decision_id: str,
    context: CreatorContext = Depends(require_creator_context),
    platform: AgentPlatformService = Depends(agent_platform),
) -> dict[str, str]:
    await platform.reject_decision(context.creator_id, decision_id)
    return {"status": "rejected"}
