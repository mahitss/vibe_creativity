"""FastAPI route handlers for OMNIA Mission Control Command Center."""

from typing import Any

from fastapi import APIRouter, Depends

from app.core.security import CreatorContext, require_creator_context
from app.modules.mission_control.service import MissionControlEngine

router = APIRouter(tags=["mission_control"])

_mc_engine = MissionControlEngine()


def get_mc_engine() -> MissionControlEngine:
    return _mc_engine


def _format_payload(p: Any) -> dict[str, Any]:
    return {
        "creator_name": p.creator_name,
        "greeting": p.greeting,
        "executive_summary": [
            {
                "category": item.category,
                "headline": item.headline,
                "description": item.description,
                "evidence_memory_id": item.evidence_memory_id,
            }
            for item in p.executive_summary
        ],
        "primary_mission": {
            "mission_id": p.primary_mission.mission_id,
            "title": p.primary_mission.title,
            "reason": p.primary_mission.reason,
            "supporting_memories": p.primary_mission.supporting_memories,
            "expected_impact": p.primary_mission.expected_impact,
            "estimated_effort_mins": p.primary_mission.estimated_effort_mins,
            "confidence": p.primary_mission.confidence,
            "status": p.primary_mission.status,
        },
        "autonomous_work": [
            {
                "action_id": w.action_id,
                "agent_name": w.agent_name,
                "title": w.title,
                "reason": w.reason,
                "evidence": w.evidence,
                "timestamp": w.timestamp,
            }
            for w in p.autonomous_work
        ],
        "strategic_insights": [
            {
                "insight_id": ins.insight_id,
                "headline": ins.headline,
                "reasoning": ins.reasoning,
                "evidence_memory_ids": ins.evidence_memory_ids,
                "category": ins.category,
            }
            for ins in p.strategic_insights
        ],
        "timeline": [
            {
                "item_id": t.item_id,
                "actor": t.actor,
                "action": t.action,
                "timestamp": t.timestamp,
                "memory_id": t.memory_id,
            }
            for t in p.timeline
        ],
        "upcoming": [
            {
                "item_id": u.item_id,
                "title": u.title,
                "date_str": u.date_str,
                "type": u.type,
            }
            for u in p.upcoming
        ],
        "agent_health": p.agent_health,
    }


@router.get("/mission-control/summary")
async def get_mission_control_summary(
    context: CreatorContext = Depends(require_creator_context),
    engine: MissionControlEngine = Depends(get_mc_engine),
) -> dict[str, Any]:
    payload = engine.get_payload(context.creator_id, creator_name="Mahit")
    return _format_payload(payload)


@router.post("/mission-control/mission/approve")
async def approve_primary_mission(
    context: CreatorContext = Depends(require_creator_context),
    engine: MissionControlEngine = Depends(get_mc_engine),
) -> dict[str, Any]:
    status = engine.approve_primary_mission()
    return {"status": status}


@router.post("/mission-control/mission/postpone")
async def postpone_primary_mission(
    context: CreatorContext = Depends(require_creator_context),
    engine: MissionControlEngine = Depends(get_mc_engine),
) -> dict[str, Any]:
    status = engine.postpone_primary_mission()
    return {"status": status}


@router.get("/missions/{mission_id}/explanation")
async def get_mission_explanation(
    mission_id: str,
    context: CreatorContext = Depends(require_creator_context),
) -> dict[str, Any]:
    from app.modules.reasoning.service import ReasoningEngineService
    svc = ReasoningEngineService()
    return svc.get_mission_explanation(mission_id)
