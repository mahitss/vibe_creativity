"""FastAPI routes for OMNIA YouTube Intelligence Connector."""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.youtube.service import YouTubeConnectorService

router = APIRouter(prefix="/integrations/youtube", tags=["youtube-integration"])

# Module singleton service instance
_youtube_service = YouTubeConnectorService()


def get_youtube_service() -> YouTubeConnectorService:
    return _youtube_service


class ConnectRequest(BaseModel):
    auth_code: str | None = Field(default=None, description="OAuth authorization code")


@router.get("")
async def get_youtube_overview(
    context: CreatorContext = Depends(require_creator_context),
    service: YouTubeConnectorService = Depends(get_youtube_service),
) -> dict[str, object]:
    return service.get_overview(context.creator_id)


@router.post("/connect")
async def connect_youtube(
    payload: ConnectRequest,
    context: CreatorContext = Depends(require_creator_context),
    service: YouTubeConnectorService = Depends(get_youtube_service),
) -> dict[str, object]:
    return service.connect_account(context.creator_id, auth_code=payload.auth_code)


@router.post("/sync")
async def sync_youtube(
    context: CreatorContext = Depends(require_creator_context),
    service: YouTubeConnectorService = Depends(get_youtube_service),
) -> dict[str, object]:
    return service.sync_channel_data(context.creator_id)


@router.get("/status")
async def get_youtube_status(
    context: CreatorContext = Depends(require_creator_context),
    service: YouTubeConnectorService = Depends(get_youtube_service),
) -> dict[str, object]:
    return service.get_sync_status(context.creator_id)
