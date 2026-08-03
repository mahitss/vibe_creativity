"""Domain models for OMNIA Cognitive Loop Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any
from uuid import UUID, uuid4


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


class CognitiveStage(StrEnum):
    OBSERVE = "OBSERVE"
    UNDERSTAND = "UNDERSTAND"
    RETRIEVE_MEMORY = "RETRIEVE_MEMORY"
    GENERATE_CONTEXT = "GENERATE_CONTEXT"
    REASON = "REASON"
    EVALUATE_OPTIONS = "EVALUATE_OPTIONS"
    CREATE_PLAN = "CREATE_PLAN"
    EXECUTE_SAFE_ACTIONS = "EXECUTE_SAFE_ACTIONS"
    WAIT_FOR_OUTCOME = "WAIT_FOR_OUTCOME"
    EVALUATE_SUCCESS = "EVALUATE_SUCCESS"
    LEARN = "LEARN"
    UPDATE_MEMORY = "UPDATE_MEMORY"


class RiskLevel(StrEnum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


@dataclass(slots=True)
class CognitiveStrategy:
    """A strategy option generated and evaluated by the cognitive loop."""

    id: str = field(default_factory=lambda: f"strat-{uuid4().hex[:6]}")
    name: str = ""
    description: str = ""
    expected_impact: float = 0.8
    risk_level: RiskLevel = RiskLevel.LOW
    selected: bool = False
    rejection_reason: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "expected_impact": self.expected_impact,
            "risk_level": self.risk_level.value,
            "selected": self.selected,
            "rejection_reason": self.rejection_reason,
        }


@dataclass(slots=True)
class CognitiveCycle:
    """An immutable record of a completed or active 12-stage cognitive thinking cycle."""

    id: UUID = field(default_factory=uuid4)
    creator_id: str = ""
    cycle_number: int = 1
    started_at: datetime = field(default_factory=utc_now)
    completed_at: datetime | None = None
    current_stage: CognitiveStage = CognitiveStage.UPDATE_MEMORY
    observation_summary: str = ""
    strategies_considered: list[CognitiveStrategy] = field(default_factory=list)
    selected_strategy: CognitiveStrategy | None = None
    actions_executed: list[str] = field(default_factory=list)
    learnings_extracted: list[str] = field(default_factory=list)
    confidence_delta: float = 0.04

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": str(self.id),
            "creator_id": self.creator_id,
            "cycle_number": self.cycle_number,
            "started_at": self.started_at.isoformat(),
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "current_stage": self.current_stage.value,
            "observation_summary": self.observation_summary,
            "strategies_considered": [s.to_dict() for s in self.strategies_considered],
            "selected_strategy": self.selected_strategy.to_dict() if self.selected_strategy else None,
            "actions_executed": self.actions_executed,
            "learnings_extracted": self.learnings_extracted,
            "confidence_delta": self.confidence_delta,
        }
