from typing import Protocol


class SessionVerifier(Protocol):
    async def verify(self, token: str) -> str:
        """Return the authenticated subject identifier for a valid token."""

