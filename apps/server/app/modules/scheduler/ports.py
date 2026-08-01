from typing import Protocol


class AutonomousScheduler(Protocol):
    async def schedule(self, workspace_id: str, mission_id: str) -> str:
        """Schedule authorized autonomous work."""

