"""Pydantic schemas for agent platform API routes."""

from pydantic import BaseModel, Field

from app.modules.agents.domain import TaskPriority


class CycleRequest(BaseModel):
    focus: str = Field(default="", description="Focus area for the executive planning cycle")
    mission_objective: str | None = Field(default=None, description="Target mission objective")


class DispatchRequest(BaseModel):
    target_agent: str = Field(..., description="Target specialized agent ID")
    purpose: str = Field(..., description="Purpose or action name")
    payload: dict[str, object] = Field(default_factory=dict, description="Task payload")
    priority: TaskPriority = Field(default=TaskPriority.NORMAL, description="Task priority")
