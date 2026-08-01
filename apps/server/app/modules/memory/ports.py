from typing import Protocol


class MemoryStore(Protocol):
    async def append(self, workspace_id: str, payload: dict[str, object]) -> None:
        """Persist a memory record through an infrastructure adapter."""

