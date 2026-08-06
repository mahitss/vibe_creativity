"""Domain models for OMNIA Universal Platform Connector Framework."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum


class PlatformType(StrEnum):
    YOUTUBE = "YOUTUBE"
    GITHUB = "GITHUB"
    DISCORD = "DISCORD"
    LINKEDIN = "LINKEDIN"
    INSTAGRAM = "INSTAGRAM"
    TIKTOK = "TIKTOK"
    TWITTER = "TWITTER"
    REDDIT = "REDDIT"
    RSS = "RSS"
    NOTION = "NOTION"
    GOOGLE_DRIVE = "GOOGLE_DRIVE"
    SLACK = "SLACK"
    EMAIL = "EMAIL"
    MCP_SERVER = "MCP_SERVER"


class ConnectorStatus(StrEnum):
    INSTALLED = "INSTALLED"
    AUTHENTICATED = "AUTHENTICATED"
    SYNCING = "SYNCING"
    HEALTHY = "HEALTHY"
    DEGRADED = "DEGRADED"
    DISCONNECTED = "DISCONNECTED"
    ERROR = "ERROR"


class SyncMode(StrEnum):
    INITIAL_SNAPSHOT = "INITIAL_SNAPSHOT"
    DELTA_CURSOR = "DELTA_CURSOR"
    TIMESTAMP_INCREMENTAL = "TIMESTAMP_INCREMENTAL"
    WEBHOOK_REALTIME = "WEBHOOK_REALTIME"


@dataclass(slots=True)
class ConnectorCapabilities:
    supports_webhooks: bool = True
    supports_delta_sync: bool = True
    rate_limit_per_min: int = 5000
    max_payload_bytes: int = 10485760


@dataclass(slots=True)
class ConnectorState:
    connector_id: str
    workspace_id: str
    platform: PlatformType
    status: ConnectorStatus
    access_token_enc: str
    refresh_token_enc: str
    scopes: list[str]
    last_sync_checkpoint: str
    latency_ms: float = 45.0
    error_count: int = 0
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
    updated_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))


@dataclass(slots=True)
class SyncResult:
    sync_id: str
    connector_id: str
    mode: SyncMode
    records_imported: int
    checkpoint_cursor: str
    duration_ms: float
    status: str = "COMPLETED"
    timestamp: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
