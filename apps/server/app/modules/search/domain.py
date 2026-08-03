"""Domain models for OMNIA Semantic Memory Search Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from uuid import UUID, uuid4


class SearchType(StrEnum):
    NATURAL_LANGUAGE = "NATURAL_LANGUAGE"
    KEYWORD = "KEYWORD"
    HYBRID = "HYBRID"
    RELATIONSHIP = "RELATIONSHIP"
    TIMELINE = "TIMELINE"
    GOAL = "GOAL"
    SPONSOR = "SPONSOR"
    PROJECT = "PROJECT"
    COMMUNITY = "COMMUNITY"
    AGENT = "AGENT"


class MemoryType(StrEnum):
    IDENTITY = "IDENTITY"
    EPISODE = "EPISODE"
    REFLECTION = "REFLECTION"
    PERFORMANCE = "PERFORMANCE"
    COMMUNITY = "COMMUNITY"
    PROJECT = "PROJECT"
    RELATIONSHIP = "RELATIONSHIP"
    MISSION = "MISSION"
    REVIEW = "REVIEW"
    TIMELINE_EVENT = "TIMELINE_EVENT"


class IntentCategory(StrEnum):
    AUDIENCE_REQUEST = "AUDIENCE_REQUEST"
    UNFULFILLED_PROMISE = "UNFULFILLED_PROMISE"
    SPONSOR_INTERACTION = "SPONSOR_INTERACTION"
    PERFORMANCE_BENCHMARK = "PERFORMANCE_BENCHMARK"
    CONTENT_TOPIC = "CONTENT_TOPIC"
    BLOCKED_GOALS = "BLOCKED_GOALS"
    GENERAL_RECALL = "GENERAL_RECALL"


@dataclass(slots=True)
class SearchIntent:
    category: IntentCategory
    confidence: float
    extracted_keywords: list[str] = field(default_factory=list)
    suggested_hop_depth: int = 1
    target_memory_types: list[MemoryType] = field(default_factory=list)


@dataclass(slots=True)
class SearchQuery:
    query_text: str
    creator_id: str
    search_type: SearchType = SearchType.HYBRID
    memory_types: list[MemoryType] = field(default_factory=list)
    min_importance: float = 0.0
    hop_depth: int = 1
    limit: int = 10


@dataclass(slots=True)
class GraphHopNeighbor:
    node_id: str
    label: str
    node_type: str
    relationship: str
    hop_distance: int


@dataclass(slots=True)
class SearchResultItem:
    id: str
    title: str
    summary: str
    memory_type: MemoryType
    confidence: float
    importance: float
    source: str
    rank_score: float
    timestamp: datetime
    decay_score: float = 1.0
    business_impact: str = "MEDIUM"
    related_memories: list[str] = field(default_factory=list)
    related_projects: list[str] = field(default_factory=list)
    related_goals: list[str] = field(default_factory=list)
    timeline_position: int = 0
    graph_neighbors: list[GraphHopNeighbor] = field(default_factory=list)


@dataclass(slots=True)
class SearchContextPackage:
    query: str
    creator_id: str
    timestamp: datetime
    intent: SearchIntent
    relevant_memories: list[SearchResultItem]
    related_goals: list[str]
    timeline_events: list[str]
    graph_neighbors: list[GraphHopNeighbor]
    open_missions: list[str]
    previous_recommendations: list[str]
    total_token_estimate: int = 420


@dataclass(slots=True)
class SearchHistoryItem:
    id: UUID = field(default_factory=uuid4)
    creator_id: str = ""
    query_text: str = ""
    search_type: SearchType = SearchType.HYBRID
    result_count: int = 0
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
