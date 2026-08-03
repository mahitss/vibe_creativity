"""FastAPI routes for OMNIA Cognitive Loop Engine."""

from fastapi import APIRouter, Depends, Query

from app.core.security import CreatorContext, require_creator_context
from app.modules.cognition.service import CognitiveLoopService

router = APIRouter(prefix="/cognition", tags=["cognition"])

# Module singleton service instance
_cognition_service = CognitiveLoopService()


def get_cognition_service() -> CognitiveLoopService:
    return _cognition_service


@router.get("/status")
async def get_cognition_status(
    context: CreatorContext = Depends(require_creator_context),
    service: CognitiveLoopService = Depends(get_cognition_service),
) -> dict[str, object]:
    return service.get_status(context.creator_id)


@router.get("/history")
async def get_cognition_history(
    limit: int = Query(default=50, ge=1, le=200),
    context: CreatorContext = Depends(require_creator_context),
    service: CognitiveLoopService = Depends(get_cognition_service),
) -> list[dict[str, object]]:
    return service.get_history(context.creator_id, limit=limit)


@router.post("/run")
async def run_cognitive_cycle(
    context: CreatorContext = Depends(require_creator_context),
    service: CognitiveLoopService = Depends(get_cognition_service),
) -> dict[str, object]:
    return service.run_cognitive_cycle(context.creator_id)


@router.get("/metrics")
async def get_cognition_metrics(
    context: CreatorContext = Depends(require_creator_context),
    service: CognitiveLoopService = Depends(get_cognition_service),
) -> dict[str, object]:
    return service.get_metrics(context.creator_id)
