"""FastAPI routes for OMNIA Demo Mode & Presenter Mode."""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.demo.service import DemoStoryService

router = APIRouter(prefix="/demo", tags=["demo"])

# Module singleton service instance
_demo_service = DemoStoryService()


def get_demo_service() -> DemoStoryService:
    return _demo_service


class SetSceneRequest(BaseModel):
    scene_index: int = Field(..., ge=0, le=6, description="Index of target demo scene (0 to 6)")


@router.get("/session")
async def get_demo_session(
    context: CreatorContext = Depends(require_creator_context),
    service: DemoStoryService = Depends(get_demo_service),
) -> dict[str, object]:
    return service.get_session()


@router.post("/reset")
async def reset_demo_session(
    context: CreatorContext = Depends(require_creator_context),
    service: DemoStoryService = Depends(get_demo_service),
) -> dict[str, object]:
    return service.reset_session()


@router.get("/scenes")
async def get_demo_scenes(
    context: CreatorContext = Depends(require_creator_context),
    service: DemoStoryService = Depends(get_demo_service),
) -> list[dict[str, object]]:
    return service.get_scenes()


@router.get("/story")
async def get_demo_story(
    context: CreatorContext = Depends(require_creator_context),
    service: DemoStoryService = Depends(get_demo_service),
) -> dict[str, object]:
    return service.get_story()


@router.post("/scene")
async def set_demo_scene(
    payload: SetSceneRequest,
    context: CreatorContext = Depends(require_creator_context),
    service: DemoStoryService = Depends(get_demo_service),
) -> dict[str, object]:
    return service.set_scene(payload.scene_index)


@router.post("/toggle-play")
async def toggle_play(
    context: CreatorContext = Depends(require_creator_context),
    service: DemoStoryService = Depends(get_demo_service),
) -> dict[str, object]:
    return service.toggle_play()


@router.post("/toggle-presenter")
async def toggle_presenter_mode(
    context: CreatorContext = Depends(require_creator_context),
    service: DemoStoryService = Depends(get_demo_service),
) -> dict[str, object]:
    return service.toggle_presenter_mode()
