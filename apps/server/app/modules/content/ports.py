from typing import Protocol


class ContentPipeline(Protocol):
    async def enqueue(self, workspace_id: str, artifact_id: str) -> None:
        """Queue a content artifact for future processing."""

