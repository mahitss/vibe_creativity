from typing import Protocol


class MissionPlanner(Protocol):
    async def draft(self, workspace_id: str, objective: str) -> str:
        """Create a mission draft identifier without executing actions."""

