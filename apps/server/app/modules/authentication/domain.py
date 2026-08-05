"""Domain models for OMNIA Production Auth, Workspace & Executive Mind Management."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


class UserRole(StrEnum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    EDITOR = "EDITOR"
    VIEWER = "VIEWER"


class AuthProvider(StrEnum):
    EMAIL = "EMAIL"
    GOOGLE = "GOOGLE"
    GITHUB = "GITHUB"
    MAGIC_LINK = "MAGIC_LINK"


@dataclass(slots=True)
class User:
    id: str
    email: str
    name: str
    avatar_url: str | None = None
    role: UserRole = UserRole.OWNER
    provider: AuthProvider = AuthProvider.EMAIL


@dataclass(slots=True)
class Session:
    session_id: str
    user_id: str
    token: str
    device_info: str
    expires_at: datetime
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class ExecutiveMind:
    mind_id: str
    workspace_id: str
    memory_namespace: str
    knowledge_graph_namespace: str
    default_goals: list[str]
    default_preferences: dict[str, Any]
    reflection_store_path: str
    agent_registry_count: int = 6
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class CreatorProfile:
    full_name: str
    username: str
    avatar_url: str | None = None
    bio: str = ""
    country: str = "US"
    timezone: str = "America/New_York"
    language: str = "en"
    creator_types: list[str] = field(default_factory=list)


@dataclass(slots=True)
class CreatorGoals:
    goals_list: list[str] = field(default_factory=list)
    custom_goal: str | None = None


@dataclass(slots=True)
class BrandDNA:
    voice: str = "Technical & Authoritative"
    audience_type: str = "Software Engineers & AI Builders"
    topics: list[str] = field(default_factory=list)
    content_style: str = "Architectural Walkthroughs"
    things_to_avoid: str = "Clickbait & Hype"
    vision: str = "Build the premier AI engineering channel"
    core_values: list[str] = field(default_factory=list)


@dataclass(slots=True)
class WorkingStyle:
    working_hours: str = "9am - 6pm EST"
    publishing_frequency: str = "Weekly"
    planning_style: str = "Structured"
    reminder_frequency: str = "Daily Briefing"
    preferred_tone: str = "Direct & Concise"


@dataclass(slots=True)
class OnboardingSubmission:
    profile: CreatorProfile
    goals: CreatorGoals
    brand_dna: BrandDNA
    working_style: WorkingStyle
    connected_platforms: list[str] = field(default_factory=list)


@dataclass(slots=True)
class Workspace:
    workspace_id: str
    name: str
    slug: str
    owner_id: str
    timezone: str = "UTC"
    language: str = "en"
    region: str = "us-east"
    plan: str = "PRO"
    executive_mind: ExecutiveMind | None = None
    creator_profile: CreatorProfile | None = None
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
