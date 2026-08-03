"""Dependency injection providers for agent platform."""

from fastapi import Request

from app.modules.agents.service import AgentPlatformService

_fallback_service = AgentPlatformService()


async def agent_platform(request: Request) -> AgentPlatformService:
    if hasattr(request.app.state, "agent_platform") and request.app.state.agent_platform:
        val = request.app.state.agent_platform
        if isinstance(val, AgentPlatformService):
            return val
    return _fallback_service
