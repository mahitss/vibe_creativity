"""FastAPI routes for OMNIA Production Auth, Workspace & Executive Mind Management."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.authentication.domain import AuthProvider
from app.modules.authentication.service import AuthWorkspaceEngine

router = APIRouter(tags=["authentication"])

_auth_engine = AuthWorkspaceEngine()


def get_auth_engine() -> AuthWorkspaceEngine:
    return _auth_engine


class LoginPayload(BaseModel):
    email: str = Field(..., description="User email address")
    provider: AuthProvider = Field(default=AuthProvider.EMAIL, description="Auth provider")


class LogoutPayload(BaseModel):
    session_id: str = Field(..., description="Active session ID to revoke")


class CreateWorkspacePayload(BaseModel):
    name: str = Field(..., description="Workspace name")
    timezone: str = Field(default="UTC", description="Workspace timezone")
    language: str = Field(default="en", description="Primary language")
    region: str = Field(default="us-east", description="Deployment region")


class UpdateWorkspacePayload(BaseModel):
    workspace_id: str = Field(..., description="Workspace ID")
    name: str | None = Field(default=None, description="Updated workspace name")
    timezone: str | None = Field(default=None, description="Updated timezone")


def _format_mind(m: Any) -> dict[str, Any]:
    return {
        "mind_id": m.mind_id,
        "workspace_id": m.workspace_id,
        "memory_namespace": m.memory_namespace,
        "knowledge_graph_namespace": m.knowledge_graph_namespace,
        "default_goals": m.default_goals,
        "default_preferences": m.default_preferences,
        "reflection_store_path": m.reflection_store_path,
        "agent_registry_count": m.agent_registry_count,
        "created_at": m.created_at.isoformat(),
    }


def _format_workspace(w: Any) -> dict[str, Any]:
    return {
        "workspace_id": w.workspace_id,
        "name": w.name,
        "slug": w.slug,
        "owner_id": w.owner_id,
        "timezone": w.timezone,
        "language": w.language,
        "region": w.region,
        "plan": w.plan,
        "executive_mind": _format_mind(w.executive_mind) if w.executive_mind else None,
        "created_at": w.created_at.isoformat(),
    }


@router.post("/auth/login")
async def login_user(
    payload: LoginPayload,
    engine: AuthWorkspaceEngine = Depends(get_auth_engine),
) -> dict[str, Any]:
    user, session, workspace = engine.login(payload.email, payload.provider)
    return {
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "avatar_url": user.avatar_url,
            "role": user.role.value,
            "provider": user.provider.value,
        },
        "session": {
            "session_id": session.session_id,
            "token": session.token,
            "device_info": session.device_info,
            "expires_at": session.expires_at.isoformat(),
        },
        "workspace": _format_workspace(workspace),
    }


@router.post("/auth/logout")
async def logout_user(
    payload: LogoutPayload,
    engine: AuthWorkspaceEngine = Depends(get_auth_engine),
) -> dict[str, Any]:
    success = engine.logout(payload.session_id)
    return {"status": "SUCCESS" if success else "SESSION_NOT_FOUND"}


@router.get("/workspace")
async def get_active_workspace(
    context: CreatorContext = Depends(require_creator_context),
    engine: AuthWorkspaceEngine = Depends(get_auth_engine),
) -> dict[str, Any]:
    ws = engine.get_workspace(context.creator_id)
    return _format_workspace(ws)


@router.post("/workspace")
async def create_new_workspace(
    payload: CreateWorkspacePayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: AuthWorkspaceEngine = Depends(get_auth_engine),
) -> dict[str, Any]:
    ws = engine.create_workspace(
        name=payload.name,
        owner_id=context.creator_id,
        timezone=payload.timezone,
        language=payload.language,
        region=payload.region,
    )
    return _format_workspace(ws)


@router.patch("/workspace")
async def update_existing_workspace(
    payload: UpdateWorkspacePayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: AuthWorkspaceEngine = Depends(get_auth_engine),
) -> dict[str, Any]:
    try:
        ws = engine.update_workspace(payload.workspace_id, name=payload.name, timezone=payload.timezone)
        return _format_workspace(ws)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/mind")
async def get_executive_mind_status(
    context: CreatorContext = Depends(require_creator_context),
    engine: AuthWorkspaceEngine = Depends(get_auth_engine),
) -> dict[str, Any]:
    ws = engine.get_workspace(context.creator_id)
    mind = engine.get_mind(ws.workspace_id)
    return _format_mind(mind)


class OnboardingPayload(BaseModel):
    full_name: str = Field(..., description="Creator full name")
    username: str = Field(..., description="Creator username")
    bio: str = Field(default="", description="Creator bio")
    country: str = Field(default="US", description="Country")
    timezone: str = Field(default="America/New_York", description="Timezone")
    creator_types: list[str] = Field(default_factory=list, description="Creator types")
    goals: list[str] = Field(default_factory=list, description="Creator goals")
    connected_platforms: list[str] = Field(default_factory=list, description="Platforms")
    brand_voice: str = Field(default="Technical", description="Brand voice")
    audience_type: str = Field(default="Engineers", description="Audience type")
    preferred_tone: str = Field(default="Direct", description="Preferred tone")


@router.post("/onboarding")
async def submit_onboarding_data(
    payload: OnboardingPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: AuthWorkspaceEngine = Depends(get_auth_engine),
) -> dict[str, Any]:
    from app.modules.authentication.domain import (
        BrandDNA,
        CreatorGoals,
        CreatorProfile,
        OnboardingSubmission,
        WorkingStyle,
    )

    sub = OnboardingSubmission(
        profile=CreatorProfile(
            full_name=payload.full_name,
            username=payload.username,
            bio=payload.bio,
            country=payload.country,
            timezone=payload.timezone,
            creator_types=payload.creator_types,
        ),
        goals=CreatorGoals(goals_list=payload.goals),
        brand_dna=BrandDNA(voice=payload.brand_voice, audience_type=payload.audience_type),
        working_style=WorkingStyle(preferred_tone=payload.preferred_tone),
        connected_platforms=payload.connected_platforms,
    )
    ws = engine.submit_onboarding(context.creator_id, sub)
    return {
        "status": "COMPLETED",
        "workspace": _format_workspace(ws),
        "executive_mind": _format_mind(ws.executive_mind) if ws.executive_mind else None,
    }


@router.get("/onboarding/status")
async def get_onboarding_status(
    context: CreatorContext = Depends(require_creator_context),
    engine: AuthWorkspaceEngine = Depends(get_auth_engine),
) -> dict[str, Any]:
    return engine.get_onboarding_status(context.creator_id)

