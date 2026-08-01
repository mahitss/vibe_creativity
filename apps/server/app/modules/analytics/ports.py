from typing import Protocol


class AnalyticsSink(Protocol):
    async def track(self, event_name: str, properties: dict[str, object]) -> None:
        """Record an analytics event through an adapter."""

