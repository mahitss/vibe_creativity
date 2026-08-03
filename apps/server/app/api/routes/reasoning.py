"""FastAPI routes for OMNIA Executive Reasoning Engine."""

from fastapi import APIRouter, Depends, HTTPException, Query

from app.core.security import CreatorContext, require_creator_context
from app.modules.reasoning.service import ReasoningEngineService

router = APIRouter(prefix="/reasoning", tags=["reasoning"])

# Module singleton service instance
_reasoning_service = ReasoningEngineService()


def get_reasoning_service() -> ReasoningEngineService:
    return _reasoning_service


@router.get("")
async def get_reasoning_chains(
    limit: int = Query(default=50, ge=1, le=200),
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> list[dict[str, object]]:
    return service.get_reasoning_chains(context.creator_id, limit=limit)


@router.get("/history")
async def get_reasoning_history(
    limit: int = Query(default=50, ge=1, le=200),
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> list[dict[str, object]]:
    return service.get_reasoning_chains(context.creator_id, limit=limit)


@router.get("/evidence")
async def get_reasoning_evidence(
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> dict[str, object]:
    return service.get_evidence_by_category(context.creator_id)


@router.get("/{chain_id}")
async def get_reasoning_chain(
    chain_id: str,
    context: CreatorContext = Depends(require_creator_context),
    service: ReasoningEngineService = Depends(get_reasoning_service),
) -> dict[str, object]:
    chain = service.get_chain_by_id(chain_id)
    if not chain:
        raise HTTPException(status_code=404, detail="Reasoning chain not found")
    return chain
