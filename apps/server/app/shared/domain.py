from abc import ABC
from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Generic, NewType, TypeVar
from uuid import UUID, uuid4

EntityId = NewType("EntityId", UUID)
TEvent = TypeVar("TEvent", bound="DomainEvent")


@dataclass(frozen=True, slots=True)
class DomainEvent:
    aggregate_id: EntityId
    event_type: str
    occurred_at: datetime


class AggregateRoot(Generic[TEvent], ABC):
    def __init__(self, entity_id: EntityId | None = None) -> None:
        self.id = entity_id or EntityId(uuid4())
        self._events: list[TEvent] = []

    def pull_events(self) -> list[TEvent]:
        events = self._events.copy()
        self._events.clear()
        return events

    def record_event(self, event: TEvent) -> None:
        self._events.append(event)


def utc_now() -> datetime:
    return datetime.now(tz=UTC)

