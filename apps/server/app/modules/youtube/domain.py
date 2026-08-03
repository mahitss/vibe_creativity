"""Domain models for OMNIA YouTube Intelligence Connector."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


class YouTubeConnectionStatus(StrEnum):
    DISCONNECTED = "DISCONNECTED"
    CONNECTING = "CONNECTING"
    CONNECTED = "CONNECTED"
    SYNCING = "SYNCING"
    ERROR = "ERROR"


class CommentSentiment(StrEnum):
    POSITIVE = "POSITIVE"
    NEUTRAL = "NEUTRAL"
    NEGATIVE = "NEGATIVE"


@dataclass(slots=True)
class YouTubeVideo:
    """Synchronized YouTube Video or Short entity."""

    video_id: str
    title: str
    description: str
    published_at: datetime = field(default_factory=utc_now)
    views: int = 0
    watch_time_hours: float = 0.0
    ctr_percent: float = 0.0
    retention_percent: float = 0.0
    category: str = "Technology"
    is_short: bool = False
    status: str = "PUBLIC"
    thumbnail_url: str = ""
    playlist_name: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "video_id": self.video_id,
            "title": self.title,
            "description": self.description,
            "published_at": self.published_at.isoformat(),
            "views": self.views,
            "watch_time_hours": self.watch_time_hours,
            "ctr_percent": self.ctr_percent,
            "retention_percent": self.retention_percent,
            "category": self.category,
            "is_short": self.is_short,
            "status": self.status,
            "thumbnail_url": self.thumbnail_url,
            "playlist_name": self.playlist_name,
        }


@dataclass(slots=True)
class YouTubeComment:
    """Synchronized YouTube Comment or Reply entity."""

    comment_id: str
    video_id: str
    author_name: str
    text: str
    published_at: datetime = field(default_factory=utc_now)
    like_count: int = 0
    sentiment: CommentSentiment = CommentSentiment.POSITIVE
    is_audience_request: bool = False
    is_vip: bool = False

    def to_dict(self) -> dict[str, Any]:
        return {
            "comment_id": self.comment_id,
            "video_id": self.video_id,
            "author_name": self.author_name,
            "text": self.text,
            "published_at": self.published_at.isoformat(),
            "like_count": self.like_count,
            "sentiment": self.sentiment.value,
            "is_audience_request": self.is_audience_request,
            "is_vip": self.is_vip,
        }


@dataclass(slots=True)
class YouTubeChannelMetrics:
    """Synchronized YouTube Channel-level performance metrics."""

    channel_id: str = "UC_omnia_creator_101"
    channel_name: str = "Mahit Tech & Code"
    subscriber_count: int = 124000
    total_views: int = 4850000
    video_count: int = 86
    watch_time_hours_28d: float = 48200.0
    ctr_percent_28d: float = 8.4
    retention_percent_28d: float = 58.2
    status: YouTubeConnectionStatus = YouTubeConnectionStatus.CONNECTED
    last_sync_at: datetime = field(default_factory=utc_now)
    sync_cursor: str = "cursor-yt-20260803"

    def to_dict(self) -> dict[str, Any]:
        return {
            "channel_id": self.channel_id,
            "channel_name": self.channel_name,
            "subscriber_count": self.subscriber_count,
            "total_views": self.total_views,
            "video_count": self.video_count,
            "watch_time_hours_28d": self.watch_time_hours_28d,
            "ctr_percent_28d": self.ctr_percent_28d,
            "retention_percent_28d": self.retention_percent_28d,
            "status": self.status.value,
            "last_sync_at": self.last_sync_at.isoformat(),
            "sync_cursor": self.sync_cursor,
        }
