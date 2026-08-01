from typing import Generic, Protocol, TypeVar

from app.shared.domain import EntityId

TEntity = TypeVar("TEntity")


class Repository(Protocol, Generic[TEntity]):
    async def get(self, entity_id: EntityId) -> TEntity | None:
        """Load an entity by identity."""

    async def save(self, entity: TEntity) -> None:
        """Persist an entity through an infrastructure adapter."""

