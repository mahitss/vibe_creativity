"""Domain models for OMNIA Sponsor Intelligence Platform."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class PipelineStage(StrEnum):
    PROSPECT = "PROSPECT"
    QUALIFIED = "QUALIFIED"
    CONTACTED = "CONTACTED"
    NEGOTIATION = "NEGOTIATION"
    PROPOSAL = "PROPOSAL"
    AGREEMENT = "AGREEMENT"
    CAMPAIGN = "CAMPAIGN"
    DELIVERED = "DELIVERED"
    PAYMENT_PENDING = "PAYMENT_PENDING"
    COMPLETED = "COMPLETED"
    RENEWAL = "RENEWAL"


class CampaignStatus(StrEnum):
    DRAFT = "DRAFT"
    IN_REVIEW = "IN_REVIEW"
    APPROVED = "APPROVED"
    RECORDING = "RECORDING"
    PUBLISHED = "PUBLISHED"
    COMPLETED = "COMPLETED"


@dataclass(slots=True)
class SponsorProfile:
    sponsor_id: str
    workspace_id: str
    company: str
    brand: str
    industry: str
    primary_contact: str
    email: str
    website: str
    status: PipelineStage
    relationship_score: float
    trust_score: float
    revenue_generated: float
    active_campaigns: list[str] = field(default_factory=list)
    memory_links: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class SponsorCampaign:
    campaign_id: str
    sponsor_id: str
    deliverables: list[str]
    platforms: list[str]
    budget: float
    status: CampaignStatus
    approval_state: str = "PENDING_CREATOR_REVIEW"
    performance_metrics: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class SponsorOpportunity:
    opportunity_id: str
    brand_name: str
    industry: str
    estimated_deal_value: float
    confidence: float
    match_reason: str


@dataclass(slots=True)
class FollowupDraft:
    draft_id: str
    sponsor_id: str
    subject: str
    body: str
    suggested_timing: str
