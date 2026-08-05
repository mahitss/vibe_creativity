"""Domain models for OMNIA Reflection & Learning Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class ReflectionTrigger(StrEnum):
    WORKFLOW_COMPLETED = "WORKFLOW_COMPLETED"
    MISSION_COMPLETED = "MISSION_COMPLETED"
    MISSION_REJECTED = "MISSION_REJECTED"
    RECOMMENDATION_ACCEPTED = "RECOMMENDATION_ACCEPTED"
    RECOMMENDATION_IGNORED = "RECOMMENDATION_IGNORED"
    GOAL_ACHIEVED = "GOAL_ACHIEVED"
    GOAL_ABANDONED = "GOAL_ABANDONED"
    SPONSOR_CAMPAIGN_COMPLETED = "SPONSOR_CAMPAIGN_COMPLETED"
    PREDICTION_EVALUATED = "PREDICTION_EVALUATED"


class LearningType(StrEnum):
    SUCCESS_PATTERN = "SUCCESS_PATTERN"
    FAILURE_PATTERN = "FAILURE_PATTERN"
    BEHAVIOR_PATTERN = "BEHAVIOR_PATTERN"
    COMMUNITY_PATTERN = "COMMUNITY_PATTERN"
    SPONSOR_PATTERN = "SPONSOR_PATTERN"
    CONTENT_PATTERN = "CONTENT_PATTERN"
    SCHEDULING_PATTERN = "SCHEDULING_PATTERN"
    PERSONAL_PREFERENCE = "PERSONAL_PREFERENCE"
    WORKFLOW_OPTIMIZATION = "WORKFLOW_OPTIMIZATION"


@dataclass(slots=True)
class LearningPatternSpec:
    pattern_id: str
    workspace_id: str
    title: str
    learning_type: LearningType
    confidence_score: float
    evidence_count: int
    description: str
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ReflectionRecord:
    reflection_id: str
    workspace_id: str
    mind_id: str
    source_workflow_id: str
    trigger_event: ReflectionTrigger
    observation: str
    outcome: str
    expected_result: str
    actual_result: str
    root_cause: str
    lessons_learned: list[str]
    recommended_improvements: list[str]
    confidence_adjustment: float
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
