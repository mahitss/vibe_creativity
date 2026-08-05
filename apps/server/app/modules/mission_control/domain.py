"""Domain models for OMNIA Mission Control Command Center."""

from dataclasses import dataclass
from typing import Any


@dataclass(slots=True)
class ExecutiveSummaryItem:
    category: str  # COMPLETED, FOLLOWUP, RISK, OPPORTUNITY
    headline: str
    description: str
    evidence_memory_id: str


@dataclass(slots=True)
class PrimaryMission:
    mission_id: str
    title: str
    reason: str
    supporting_memories: list[str]
    expected_impact: str
    estimated_effort_mins: int
    confidence: float
    status: str  # PENDING, APPROVED, POSTPONED


@dataclass(slots=True)
class AutonomousWorkItem:
    action_id: str
    agent_name: str
    title: str
    reason: str
    evidence: str
    timestamp: str


@dataclass(slots=True)
class StrategicInsightItem:
    insight_id: str
    headline: str
    reasoning: str
    evidence_memory_ids: list[str]
    category: str


@dataclass(slots=True)
class ActivityTimelineItem:
    item_id: str
    actor: str
    action: str
    timestamp: str
    memory_id: str


@dataclass(slots=True)
class UpcomingItem:
    item_id: str
    title: str
    date_str: str
    type: str  # DEADLINE, MILESTONE, EVENT


@dataclass(slots=True)
class MissionControlPayload:
    creator_name: str
    greeting: str
    executive_summary: list[ExecutiveSummaryItem]
    primary_mission: PrimaryMission
    autonomous_work: list[AutonomousWorkItem]
    strategic_insights: list[StrategicInsightItem]
    timeline: list[ActivityTimelineItem]
    upcoming: list[UpcomingItem]
    agent_health: dict[str, Any]
