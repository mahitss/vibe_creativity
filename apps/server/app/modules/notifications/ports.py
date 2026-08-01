from typing import Protocol


class NotificationGateway(Protocol):
    async def send(self, recipient_id: str, message: str) -> None:
        """Deliver a notification through a future channel adapter."""

