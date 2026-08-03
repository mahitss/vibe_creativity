"""FastAPI routes for OMNIA Executive Review Engine (COO Strategy Engine)."""

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.reviews.domain import RecommendationStatus, ReviewType
from app.modules.reviews.service import ExecutiveReviewService

router = APIRouter(prefix="/reviews", tags=["reviews"])

# Module singleton service instance
_review_service = ExecutiveReviewService()


def get_review_service() -> ExecutiveReviewService:
    return _review_service


class GenerateReviewRequest(BaseModel):
    review_type: ReviewType = Field(default=ReviewType.WEEKLY_EXECUTIVE, description="Type of review to generate")


class ApproveRecommendationRequest(BaseModel):
    review_id: str = Field(..., description="ID of target executive review")
    recommendation_id: str = Field(..., description="ID of recommendation to update")
    status: RecommendationStatus = Field(default=RecommendationStatus.APPROVED, description="New status action")


@router.get("")
async def list_reviews(
    review_type: str | None = Query(default="ALL"),
    context: CreatorContext = Depends(require_creator_context),
    service: ExecutiveReviewService = Depends(get_review_service),
) -> list[dict[str, object]]:
    return service.get_reviews(context.creator_id, review_type=review_type)


@router.get("/history")
async def get_review_history(
    context: CreatorContext = Depends(require_creator_context),
    service: ExecutiveReviewService = Depends(get_review_service),
) -> list[dict[str, object]]:
    return service.get_history(context.creator_id)


@router.get("/{review_id}")
async def get_review(
    review_id: str,
    context: CreatorContext = Depends(require_creator_context),
    service: ExecutiveReviewService = Depends(get_review_service),
) -> dict[str, object]:
    review = service.get_review_by_id(review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Executive review not found")
    return review


@router.post("/generate")
async def generate_review(
    payload: GenerateReviewRequest,
    context: CreatorContext = Depends(require_creator_context),
    service: ExecutiveReviewService = Depends(get_review_service),
) -> dict[str, object]:
    return service.generate_review(context.creator_id, review_type=payload.review_type)


@router.post("/approve")
async def approve_recommendation(
    payload: ApproveRecommendationRequest,
    context: CreatorContext = Depends(require_creator_context),
    service: ExecutiveReviewService = Depends(get_review_service),
) -> dict[str, object]:
    success = service.update_recommendation_status(
        payload.review_id, payload.recommendation_id, payload.status
    )
    if not success:
        raise HTTPException(status_code=404, detail="Review or recommendation not found")
    return {
        "review_id": payload.review_id,
        "recommendation_id": payload.recommendation_id,
        "status": payload.status.value,
    }
