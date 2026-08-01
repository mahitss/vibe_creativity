from typing import Protocol


class LLMProvider(Protocol):
    async def complete(self, prompt: str, *, model: str) -> str:
        """Complete a prompt through a configured model provider."""


class MindsAgent(Protocol):
    async def resume(self, workspace_id: str) -> None:
        """Resume persistent agent state for a workspace."""

