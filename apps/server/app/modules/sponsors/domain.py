"""Domain models for OMNIA Sponsor Intelligence & Opportunity Engine."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class SponsorStatus(StrEnum):
    DISCOVERY = "DISCOVERY"
    CONTACTED = "CONTACTED"
    CONVERSATION = "CONVERSATION"
    NEGOTIATION = "NEGOTIATION"
    PROPOSAL = "PROPOSAL"
    AGREEMENT = "AGREEMENT"
    CAMPAIGN = "CAMPAIGN"
    DELIVERED = "DELIVERED"
    PAYMENT_PENDING = "PAYMENT_PENDING"
    COMPLETED = "COMPLETED"
    LONG_TERM_PARTNER = "LONG_TERM_PARTNER"


class RiskType(StrEnum):
    UNANSWERED_REPLY = "UNANSWERED_REPLY"
    PAYMENT_OVERDUE = "PAYMENT_OVERDUE"
    DEADLINE_APPROACHING = "DEADLINE_APPROACHING"
    EXCLUSIVITY_CONFLICT = "EXCLUSIVITY_CONFLICT"


@dataclass(slots=True)
class NegotiationTerms:
    offered_price: float
    counter_offer: float | None = None
    deliverables: list[str] = field(default_factory=list)
    usage_rights: str = "Digital / Social Media (1 Year)"
    exclusivity_days: int = 30
    payment_terms: str = "Net 30"
    special_requests: str = ""


@dataclass(slots=True)
class SponsorEntity:
    id: str
    company_name: str
    brand: str
    industry: str
    primary_contact: str
    email: str
    website: str
    country: str
    status: SponsorStatus
    relationship_score: float
    trust_score: float
    lifetime_value: float
    creator_id: str = "creator-default"
    first_contact: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    last_interaction: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    negotiation_terms: NegotiationTerms = field(default_factory=lambda: NegotiationTerms(offered_price=15000.0))
    campaign_history: list[str] = field(default_factory=list)
    notes: str = ""
    memory_references: list[str] = field(default_factory=list)
    knowledge_graph_links: list[str] = field(default_factory=list)


@dataclass(slots=True)
class SponsorOpportunity:
    id: str
    brand_name: str
    industry: str
    niche_match_score: float
    estimated_value: float
    reason: str
    suggested_action: str


@dataclass(slots=True)
class SponsorRiskAlert:
    id: str
    risk_type: RiskType
    sponsor_id: str
    company_name: str
    severity: str
    message: str
    suggested_action: str
