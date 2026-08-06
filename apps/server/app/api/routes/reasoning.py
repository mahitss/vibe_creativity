"""FastAPI routes for OMNIA Executive Reasoning & Explainability Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query

from app.core.security import CreatorContext, require_creator_context
from app.modules.reasoning.service import ReasoningEngineService

router = APIRouter(prefix="/reasoning", tags=["reasoning"])

_reasoning_service = ReasoningEngineService()


def get_reasoning_service() -> ReasoningEngineService:
    return _reasoning_service


@router.get("")
@router.get("/executive")
async def get_executive_reasoning(
    limit: int = Query(default=50, ge=1, le=200),
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> list[dict[str, Any]]:
    return service.get_reasonings(context.creator_id)[:limit]


@router.get("/history")
async def get_reasoning_history(
    limit: int = Query(default=50, ge=1, le=200),
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> list[dict[str, Any]]:
    return service.get_reasonings(context.creator_id)[:limit]


@router.get("/evidence")
async def get_reasoning_evidence(
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> dict[str, Any]:
    return service.get_evidence_by_category(context.creator_id)


@router.get("/mission/{mission_id}/explanation")
async def get_mission_explanation(
    mission_id: str,
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> dict[str, Any]:
    return service.get_mission_explanation(mission_id)


@router.get("/{reasoning_id}")
async def get_reasoning_by_id(
    reasoning_id: str,
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> dict[str, Any]:
    item = service.get_reasoning_by_id(reasoning_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Reasoning object {reasoning_id} not found")
    return item
