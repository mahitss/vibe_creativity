"""Domain models for OMNIA Platform SDK & Admin Extension Layer."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class PluginType(StrEnum):
    AGENT = "AGENT"
    TOOL = "TOOL"
    CONNECTOR = "CONNECTOR"
    WORKFLOW = "WORKFLOW"
    UI_EXTENSION = "UI_EXTENSION"


@dataclass(slots=True)
class PluginState:
    plugin_id: str
    version: str
    author: str
    description: str
    permissions: list[str]
    status: str = "ACTIVE"
    installed_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class FeatureFlag:
    flag_id: str
    name: str
    enabled: bool
    rollout_percentage: float = 100.0
    target_workspaces: list[str] = field(default_factory=list)


@dataclass(slots=True)
class WorkspaceBackup:
    backup_id: str
    workspace_id: str
    memory_count: int
    knowledge_nodes: int
    checksum: str
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
