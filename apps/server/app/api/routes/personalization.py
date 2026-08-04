"""FastAPI routes for OMNIA Adaptive Personalization Engine."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.personalization.domain import AdaptationStatus
from app.modules.personalization.service import PersonalizationEngine

router = APIRouter(prefix="/personalization", tags=["personalization"])

_personalization_engine = PersonalizationEngine()


def get_personalization_engine() -> PersonalizationEngine:
    return _personalization_engine


class PreferenceUpdatePayload(BaseModel):
    preferred_work_hours: str | None = None
    preferred_tone: str | None = None
    notification_window: str | None = None
    auto_adaptation_enabled: bool | None = None
    pinned_preferences: list[str] | None = None


class HabitStatusUpdatePayload(BaseModel):
    habit_id: str = Field(..., description="Target habit ID")
    status: AdaptationStatus = Field(..., description="New status (ACCEPTED, REJECTED, PINNED)")


def _format_habit(h: Any) -> dict[str, Any]:
    return {
        "id": h.id,
        "category": h.category.value,
        "title": h.title,
        "description": h.description,
        "confidence": h.confidence,
        "evidence_count": h.evidence_count,
        "trend": h.trend.value,
        "status": h.status.value,
        "decay_score": h.decay_score,
        "last_observed": h.last_observed.isoformat(),
        "metadata": h.metadata,
    }


def _format_model(model: Any) -> dict[str, Any]:
    return {
        "creator_id": model.creator_id,
        "preferences": {
            "preferred_work_hours": model.preferences.preferred_work_hours,
            "preferred_tone": model.preferences.preferred_tone,
            "notification_window": model.preferences.notification_window,
            "auto_adaptation_enabled": model.preferences.auto_adaptation_enabled,
            "pinned_preferences": model.preferences.pinned_preferences,
        },
        "habits": [_format_habit(h) for h in model.habits],
        "experiments": [
            {
                "id": exp.id,
                "name": exp.name,
                "hypothesis": exp.hypothesis,
                "variant_a": exp.variant_a,
                "variant_b": exp.variant_b,
                "winner": exp.winner,
                "confidence": exp.confidence,
                "status": exp.status,
            }
            for exp in model.experiments
        ],
        "insights": [
            {
                "key": ins.key,
                "title": ins.title,
                "value": ins.value,
                "impact_score": ins.impact_score,
                "grounded_memories": ins.grounded_memories,
            }
            for ins in model.insights
        ],
        "updated_at": model.updated_at.isoformat(),
    }


@router.get("")
async def get_personalization_model(
    context: CreatorContext = Depends(require_creator_context),
    engine: PersonalizationEngine = Depends(get_personalization_engine),
) -> dict[str, Any]:
    model = engine.get_model(context.creator_id)
    return _format_model(model)


@router.get("/habits")
async def get_habits(
    context: CreatorContext = Depends(require_creator_context),
    engine: PersonalizationEngine = Depends(get_personalization_engine),
) -> list[dict[str, Any]]:
    habits = engine.get_habits(context.creator_id)
    return [_format_habit(h) for h in habits]


@router.get("/insights")
async def get_insights(
    context: CreatorContext = Depends(require_creator_context),
    engine: PersonalizationEngine = Depends(get_personalization_engine),
) -> list[dict[str, Any]]:
    insights = engine.get_insights(context.creator_id)
    return [
        {
            "key": ins.key,
            "title": ins.title,
            "value": ins.value,
            "impact_score": ins.impact_score,
            "grounded_memories": ins.grounded_memories,
        }
        for ins in insights
    ]


@router.patch("/habit-status")
async def update_habit_status(
    payload: HabitStatusUpdatePayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: PersonalizationEngine = Depends(get_personalization_engine),
) -> dict[str, Any]:
    try:
        habit = engine.update_habit_status(context.creator_id, payload.habit_id, payload.status)
        return _format_habit(habit)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/preferences")
async def update_preferences(
    payload: PreferenceUpdatePayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: PersonalizationEngine = Depends(get_personalization_engine),
) -> dict[str, Any]:
    updates = payload.model_dump(exclude_none=True)
    prefs = engine.update_preferences(context.creator_id, updates)
    return {
        "preferred_work_hours": prefs.preferred_work_hours,
        "preferred_tone": prefs.preferred_tone,
        "notification_window": prefs.notification_window,
        "auto_adaptation_enabled": prefs.auto_adaptation_enabled,
        "pinned_preferences": prefs.pinned_preferences,
    }


@router.post("/reset")
async def reset_personalization_model(
    context: CreatorContext = Depends(require_creator_context),
    engine: PersonalizationEngine = Depends(get_personalization_engine),
) -> dict[str, Any]:
    model = engine.reset_model(context.creator_id)
    return _format_model(model)
