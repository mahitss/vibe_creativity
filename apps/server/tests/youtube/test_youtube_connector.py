"""Automated Test Suite for OMNIA YouTube Intelligence Connector."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.youtube.domain import CommentSentiment, YouTubeComment, YouTubeVideo
from app.modules.youtube.service import YouTubeConnectorService, YouTubeMemoryTransformer


@pytest.fixture
def transformer() -> YouTubeMemoryTransformer:
    return YouTubeMemoryTransformer()


@pytest.fixture
def youtube_service() -> YouTubeConnectorService:
    return YouTubeConnectorService()


def test_youtube_memory_transformer(transformer: YouTubeMemoryTransformer) -> None:
    v = YouTubeVideo(
        video_id="yt-test-1",
        title="Test Video Title",
        description="Test Video Description",
        views=5000,
        retention_percent=62.0,
        ctr_percent=8.5,
    )
    mem_v = transformer.transform_video(v)
    assert mem_v["category"] == "PERFORMANCE"
    assert "5,000 views" in mem_v["description"]

    c = YouTubeComment(
        comment_id="cmt-test-1",
        video_id="yt-test-1",
        author_name="Alice",
        text="Please make Docker tutorial!",
        is_audience_request=True,
    )
    mem_c = transformer.transform_comment(c)
    assert mem_c["category"] == "COMMUNITY"
    assert "Alice" in mem_c["title"]


def test_youtube_service_sync_cursor(youtube_service: YouTubeConnectorService) -> None:
    overview = youtube_service.get_overview("creator-101")
    assert overview["metrics"]["subscriber_count"] == 124000
    assert overview["videos_count"] >= 2

    # Trigger sync
    sync_res = youtube_service.sync_channel_data("creator-101")
    assert sync_res["status"] == "SYNC_COMPLETE"
    assert "cursor-yt-" in sync_res["sync_cursor"]
    assert sync_res["memories_created_count"] == 1


def test_youtube_api_endpoints() -> None:
    client = TestClient(app)

    # GET /api/integrations/youtube
    response = client.get("/api/integrations/youtube", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert response.json()["metrics"]["channel_name"] == "Mahit Tech & Code"

    # POST /api/integrations/youtube/sync
    response = client.post("/api/integrations/youtube/sync", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert response.json()["status"] == "SYNC_COMPLETE"

    # GET /api/integrations/youtube/status
    response = client.get("/api/integrations/youtube/status", headers={"X-Creator-Id": "creator-101"})
    assert response.status_code == 200
    assert response.json()["status"] == "CONNECTED"
