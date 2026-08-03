"""Security and tenant isolation for OMNIA Platform API routes."""

from dataclasses import dataclass

from fastapi import Header, HTTPException


@dataclass(frozen=True, slots=True)
class CreatorContext:
    creator_id: str


async def require_creator_context(
    x_creator_id: str | None = Header(default="creator-101", alias="X-Creator-Id"),
) -> CreatorContext:
    if not x_creator_id:
        raise HTTPException(status_code=401, detail="X-Creator-Id header required")
    return CreatorContext(creator_id=x_creator_id)
