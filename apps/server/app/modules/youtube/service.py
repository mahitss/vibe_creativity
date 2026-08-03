"""YouTube Intelligence Connector service for OMNIA Platform."""

from typing import Any
from uuid import uuid4

from app.modules.youtube.domain import (
    CommentSentiment,
    YouTubeChannelMetrics,
    YouTubeComment,
    YouTubeConnectionStatus,
    YouTubeVideo,
    utc_now,
)


class YouTubeMemoryTransformer:
    """Transforms YouTube videos, comments, and metrics into OMNIA persistent memories."""

    def transform_video(self, video: YouTubeVideo) -> dict[str, Any]:
        return {
            "id": f"mem-yt-vid-{video.video_id}",
            "category": "PERFORMANCE",
            "title": f"YouTube Performance: {video.title}",
            "description": f"Synced video achieved {video.views:,} views with {video.retention_percent}% retention and {video.ctr_percent}% CTR.",
            "confidence": 0.95,
            "created_at": video.published_at.isoformat(),
        }

    def transform_comment(self, comment: YouTubeComment) -> dict[str, Any]:
        category = "COMMUNITY" if comment.is_audience_request else "EPISODE"
        return {
            "id": f"mem-yt-cmt-{comment.comment_id}",
            "category": category,
            "title": f"Audience Request from {comment.author_name}" if comment.is_audience_request else f"Comment from {comment.author_name}",
            "description": comment.text,
            "confidence": 0.92,
            "created_at": comment.published_at.isoformat(),
        }


class YouTubeConnectorService:
    """Service facade for YouTube OAuth, incremental sync, memory transformation, and status metrics."""

    def __init__(self) -> None:
        self._transformer = YouTubeMemoryTransformer()
        self._metrics = YouTubeChannelMetrics()
        self._videos: list[YouTubeVideo] = []
        self._comments: list[YouTubeComment] = []
        self._synced_memories: list[dict[str, Any]] = []
        self._seed_default_youtube_data()

    def _seed_default_youtube_data(self) -> None:
        now = utc_now()
        v1 = YouTubeVideo(
            video_id="yt-vid-101",
            title="Docker Multi-Agent System Deep Dive",
            description="Complete architectural guide to running 9 specialized autonomous agents in containerized clusters.",
            published_at=now,
            views=18400,
            watch_time_hours=1420.5,
            ctr_percent=9.2,
            retention_percent=64.5,
            category="Technology",
            playlist_name="Autonomous Systems Series",
        )
        v2 = YouTubeVideo(
            video_id="yt-vid-102",
            title="Building an AI Operating System from Scratch",
            description="How we designed OMNIA persistent memory layer and Task Bus.",
            published_at=now,
            views=34200,
            watch_time_hours=2850.0,
            ctr_percent=8.8,
            retention_percent=59.1,
            category="Technology",
            playlist_name="Autonomous Systems Series",
        )
        self._videos.extend([v1, v2])

        c1 = YouTubeComment(
            comment_id="yt-cmt-201",
            video_id="yt-vid-101",
            author_name="DevMaster99",
            text="Can you please publish a step-by-step GitHub code repository for the Docker orchestration setup?",
            like_count=42,
            sentiment=CommentSentiment.POSITIVE,
            is_audience_request=True,
            is_vip=True,
        )
        c2 = YouTubeComment(
            comment_id="yt-cmt-202",
            video_id="yt-vid-101",
            author_name="CloudArchitect",
            text="CloudCorp sponsorship integration in this video was super clean!",
            like_count=18,
            sentiment=CommentSentiment.POSITIVE,
            is_audience_request=False,
            is_vip=False,
        )
        self._comments.extend([c1, c2])

        self._synced_memories.append(self._transformer.transform_video(v1))
        self._synced_memories.append(self._transformer.transform_video(v2))
        self._synced_memories.append(self._transformer.transform_comment(c1))

    def get_overview(self, creator_id: str) -> dict[str, Any]:
        return {
            "metrics": self._metrics.to_dict(),
            "videos_count": len(self._videos),
            "comments_count": len(self._comments),
            "synced_memories_count": len(self._synced_memories),
            "recent_videos": [v.to_dict() for v in self._videos[:10]],
            "recent_comments": [c.to_dict() for c in self._comments[:10]],
            "synced_memories": self._synced_memories[-10:],
        }

    def connect_account(self, creator_id: str, auth_code: str | None = None) -> dict[str, Any]:
        self._metrics.status = YouTubeConnectionStatus.CONNECTED
        self._metrics.last_sync_at = utc_now()
        return {
            "status": "SUCCESS",
            "message": "YouTube OAuth account successfully connected.",
            "metrics": self._metrics.to_dict(),
        }

    def sync_channel_data(self, creator_id: str) -> dict[str, Any]:
        self._metrics.status = YouTubeConnectionStatus.SYNCING
        now = utc_now()
        self._metrics.last_sync_at = now
        self._metrics.sync_cursor = f"cursor-yt-{now.strftime('%Y%m%d%H%M%S')}"

        # Add new synced video item
        new_vid = YouTubeVideo(
            video_id=f"yt-vid-auto-{uuid4().hex[:4]}",
            title="OMNIA Living Memory Timeline Architecture",
            description="Explaining cause-and-effect creator journey replay.",
            published_at=now,
            views=4500,
            watch_time_hours=380.0,
            ctr_percent=10.1,
            retention_percent=68.0,
        )
        self._videos.insert(0, new_vid)
        mem = self._transformer.transform_video(new_vid)
        self._synced_memories.append(mem)

        self._metrics.status = YouTubeConnectionStatus.CONNECTED

        return {
            "status": "SYNC_COMPLETE",
            "sync_cursor": self._metrics.sync_cursor,
            "videos_synced_count": 1,
            "memories_created_count": 1,
            "metrics": self._metrics.to_dict(),
        }

    def get_sync_status(self, creator_id: str) -> dict[str, Any]:
        return {
            "status": self._metrics.status.value,
            "last_sync_at": self._metrics.last_sync_at.isoformat(),
            "sync_cursor": self._metrics.sync_cursor,
            "channel_id": self._metrics.channel_id,
            "channel_name": self._metrics.channel_name,
        }
