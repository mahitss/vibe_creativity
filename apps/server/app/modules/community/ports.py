from typing import Protocol


class CommunityBrain(Protocol):
    async def summarize_context(self, workspace_id: str) -> str:
        """Summarize audience and community context."""


class SponsorBrain(Protocol):
    async def evaluate_fit(self, workspace_id: str, sponsor_id: str) -> str:
        """Evaluate sponsor fit through a future implementation."""

