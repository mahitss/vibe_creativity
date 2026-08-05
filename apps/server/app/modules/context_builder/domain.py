"""Domain models for OMNIA Context Builder."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class ContextIntent(StrEnum):
    PLANNING = "PLANNING"
    REFLECTION = "REFLECTION"
    CONTENT_STRATEGY = "CONTENT_STRATEGY"
    SPONSOR_FOLLOWUP = "SPONSOR_FOLLOWUP"
    COMMUNITY_MODERATION = "COMMUNITY_MODERATION"
    ANALYTICS_REVIEW = "ANALYTICS_REVIEW"
    GOAL_EVALUATION = "GOAL_EVALUATION"
    WORKFLOW_EXECUTION = "WORKFLOW_EXECUTION"
    SEARCH = "SEARCH"


class TokenBudgetSize(StrEnum):
    SMALL = "SMALL"  # ~4k tokens
    MEDIUM = "MEDIUM"  # ~16k tokens
    LARGE = "LARGE"  # ~64k tokens


@dataclass(slots=True)
class ContextPackage:
    context_id: str
    workspace_id: str
    mind_id: str
    current_user: str
    current_goals: list[str]
    active_missions: list[str]
    relevant_memories: list[dict[str, Any]]
    recent_events: list[str]
    knowledge_graph_neighbors: list[str]
    community_signals: list[str]
    sponsor_signals: list[str]
    analytics_summary: dict[str, Any]
    open_workflows: list[str]
    platform_connections: list[str]
    current_time: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    timezone: str = "UTC"


@dataclass(slots=True)
class ContextBuildRequest:
    intent: ContextIntent
    workspace_id: str = "ws-101"
    creator_id: str = "user-101"
    budget_size: TokenBudgetSize = TokenBudgetSize.MEDIUM
    query_hint: str = ""
