"""Domain models for OMNIA 2080 Human Potential Amplification Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class AmplificationDimension(StrEnum):
    CREATIVITY = "CREATIVITY"
    DISCOVERY = "DISCOVERY"
    LEARNING = "LEARNING"
    TEACHING = "TEACHING"
    PROBLEM_SOLVING = "PROBLEM_SOLVING"


@dataclass(slots=True)
class HumanAmplificationMetrics:
    baseline_capability: float = 100.0
    amplified_capability: float = 1420.0
    amplification_multiplier: float = 14.2
    human_agency_score: float = 1.0  # 100% Human Agency


@dataclass(slots=True)
class GenerationalKnowledgeArchive:
    archive_id: str
    title: str
    creator_lineage: str
    preservation_tier: str = "CENTURY_IMMUTABLE"
    evidence_nodes_count: int = 142
    preserved_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class HumanDecisionAudit:
    decision_id: str
    action_proposed: str
    human_approver_id: str
    reasoning_explanation: str
    approved: bool = False
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
