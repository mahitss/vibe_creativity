"""FastAPI route handlers for OMNIA Continuous Evolution & Infinite Loop Engine Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.modules.infinite_loop.domain import (
    ContinuousTelemetry,
    LoopCycleState,
    LoopType,
)
from app.modules.infinite_loop.service import InfiniteLoopService

router = APIRouter(prefix="/infinite-loop", tags=["infinite_loop"])

_infinite_loop_service = InfiniteLoopService()


def get_infinite_loop_service() -> InfiniteLoopService:
    return _infinite_loop_service


class AdvanceLoopPayload(BaseModel):
    loop_type: LoopType = Field(..., description="Target loop type")
    current_step: str = Field(..., description="Current step in the loop")


def _format_telemetry(t: ContinuousTelemetry) -> dict[str, Any]:
    return {
        "total_commits_pushed": t.total_commits_pushed,
        "features_iterated": t.features_iterated,
        "feedback_cycles_completed": t.feedback_cycles_completed,
        "active_developers": t.active_developers,
        "final_message": t.final_message,
    }


def _format_state(s: LoopCycleState) -> dict[str, Any]:
    return {
        "cycle_id": s.cycle_id,
        "loop_type": s.loop_type.value,
        "current_step": s.current_step,
        "next_step": s.next_step,
        "total_commits": s.total_commits,
        "iterations_count": s.iterations_count,
        "updated_at": s.updated_at.isoformat(),
    }


@router.get("/telemetry")
async def get_continuous_telemetry(
    service: InfiniteLoopService = Depends(get_infinite_loop_service),
) -> dict[str, Any]:
    t = service.get_telemetry()
    return _format_telemetry(t)


@router.post("/step")
async def advance_loop_step(
    payload: AdvanceLoopPayload,
    service: InfiniteLoopService = Depends(get_infinite_loop_service),
) -> dict[str, Any]:
    state = service.advance_loop(loop_type=payload.loop_type, current_step=payload.current_step)
    return _format_state(state)


@router.get("/loops")
async def list_loops(
    service: InfiniteLoopService = Depends(get_infinite_loop_service),
) -> list[dict[str, Any]]:
    return service.list_loops()
