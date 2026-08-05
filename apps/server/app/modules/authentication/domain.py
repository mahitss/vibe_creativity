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
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
