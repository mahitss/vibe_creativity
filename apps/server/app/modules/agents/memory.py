"""InMemoryMemoryRepository for agents platform."""

from typing import Any


class InMemoryMemoryRepository:
    def __init__(self) -> None:
        self._memories: list[dict[str, Any]] = []

    async def add(self, memory: dict[str, Any]) -> None:
        self._memories.append(memory)

    async def list_recent(self, creator_id: str, limit: int = 50) -> list[dict[str, Any]]:
        return self._memories[:limit]
