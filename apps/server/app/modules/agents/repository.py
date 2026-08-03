"""InMemoryAgentStore for agents platform."""

from typing import Any


class InMemoryAgentStore:
    def __init__(self) -> None:
        self._agents: list[dict[str, Any]] = [
            {"id": "agent-content", "name": "Content Agent", "status": "IDLE"},
            {"id": "agent-sponsor", "name": "Sponsor Agent", "status": "ACTIVE"},
            {"id": "agent-community", "name": "Community Agent", "status": "ACTIVE"},
        ]

    async def list_agents(self) -> list[dict[str, Any]]:
        return self._agents
