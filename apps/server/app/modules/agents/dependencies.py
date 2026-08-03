"""Dependency injection providers for agent platform."""

from fastapi import Request
from app.modules.agents.memory import InMemoryMemoryRepository
from app.modules.agents.repository import InMemoryAgentStore
from app.modules.agents.service import AgentPlatformService

_fallback_memory = InMemoryMemoryRepository()
_fallback_store = InMemoryAgentStore()
_fallback_service = AgentPlatformService(store=_fallback_store, memory=_fallback_memory)


async def agent_platform(request: Request) -> AgentPlatformService:
    if hasattr(request.app.state, "agent_platform") and request.app.state.agent_platform:
        return request.app.state.agent_platform
    return _fallback_service
