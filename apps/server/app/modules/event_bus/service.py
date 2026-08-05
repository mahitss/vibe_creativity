"""Service layer for OMNIA Production Runtime Event Bus System."""

from collections.abc import Callable
from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.event_bus.domain import (
    EventCategory,
    EventFilter,
    EventPriority,
    EventType,
    OmniaEvent,
    ReplayRequest,
)


class EventStore:
    """Append-only event log with time-range queries and filtering."""

    def __init__(self) -> None:
        self._log: list[OmniaEvent] = []

    def append(self, event: OmniaEvent) -> None:
        self._log.append(event)

    def query(
        self,
        filter_spec: EventFilter | None = None,
        limit: int = 100,
        start_time: datetime | None = None,
    ) -> list[OmniaEvent]:
        result = list(self._log)

        if start_time:
            result = [e for e in result if e.timestamp >= start_time]

        if filter_spec:
            if filter_spec.workspace_id:
                result = [e for e in result if e.workspace_id == filter_spec.workspace_id]
            if filter_spec.event_types:
                result = [e for e in result if e.event_type in filter_spec.event_types]
            if filter_spec.categories:
                result = [e for e in result if e.category in filter_spec.categories]
            if filter_spec.source_agent:
                result = [e for e in result if e.source_agent == filter_spec.source_agent]

        result.sort(key=lambda x: x.timestamp, reverse=True)
        return result[:limit]

    def count(self) -> int:
        return len(self._log)


class DeadLetterQueue:
    """Dead Letter Queue capturing failed event deliveries."""

    def __init__(self) -> None:
        self._dlq: list[tuple[OmniaEvent, str]] = []

    def add_failed_delivery(self, event: OmniaEvent, reason: str) -> None:
        self._dlq.append((event, reason))

    def get_failed(self) -> list[dict[str, Any]]:
        return [
            {
                "event_id": item[0].event_id,
                "event_type": item[0].event_type.value,
                "reason": item[1],
                "timestamp": item[0].timestamp.isoformat(),
            }
            for item in self._dlq
        ]


class EventBusEngine:
    """Master Event Bus Engine managing strongly typed event publishing, filtered subscriptions, and replay."""

    def __init__(self) -> None:
        self.store = EventStore()
        self.dlq = DeadLetterQueue()
        self._subscribers: list[tuple[EventFilter, Callable[[OmniaEvent], None]]] = []
        self._seed_default_events()

    def _seed_default_events(self) -> None:
        now = datetime.now(tz=UTC)

        e1 = OmniaEvent(
            event_id="evt-seed-101",
            workspace_id="ws-101",
            mind_id="mind-101",
            event_type=EventType.WorkspaceCreated,
            category=EventCategory.WORKSPACE,
            aggregate_type="Workspace",
            aggregate_id="ws-101",
            version=1,
            timestamp=now - timedelta(days=1),
            correlation_id="corr-101",
            causation_id="cause-101",
            source_agent="Auth Engine",
            priority=EventPriority.HIGH,
            payload={"name": "OMNIA Creator Studio"},
            metadata={"environment": "production"},
        )

        e2 = OmniaEvent(
            event_id="evt-seed-102",
            workspace_id="ws-101",
            mind_id="mind-101",
            event_type=EventType.MissionCreated,
            category=EventCategory.MISSION,
            aggregate_type="Mission",
            aggregate_id="mission-101",
            version=1,
            timestamp=now - timedelta(hours=2),
            correlation_id="corr-102",
            causation_id="cause-102",
            source_agent="Executive Agent",
            priority=EventPriority.CRITICAL,
            payload={"title": "Publish React Series Part 5"},
            metadata={"confidence": 0.97},
        )

        self.store.append(e1)
        self.store.append(e2)

    def subscribe(self, filter_spec: EventFilter, callback: Callable[[OmniaEvent], None]) -> None:
        self._subscribers.append((filter_spec, callback))

    def publish(self, event: OmniaEvent) -> int:
        self.store.append(event)
        delivered_count = 0

        for filter_spec, callback in self._subscribers:
            if filter_spec.workspace_id and filter_spec.workspace_id != event.workspace_id:
                continue
            if filter_spec.event_types and event.event_type not in filter_spec.event_types:
                continue
            if filter_spec.categories and event.category not in filter_spec.categories:
                continue

            try:
                callback(event)
                delivered_count += 1
            except Exception as exc:
                self.dlq.add_failed_delivery(event, str(exc))

        return delivered_count

    def create_and_publish(
        self,
        event_type: EventType,
        category: EventCategory,
        payload: dict[str, Any],
        workspace_id: str = "ws-101",
        mind_id: str = "mind-101",
        source_agent: str = "UI Dispatcher",
        priority: EventPriority = EventPriority.MEDIUM,
    ) -> OmniaEvent:
        now = datetime.now(tz=UTC)
        evt = OmniaEvent(
            event_id=f"evt-{uuid4().hex[:8]}",
            workspace_id=workspace_id,
            mind_id=mind_id,
            event_type=event_type,
            category=category,
            aggregate_type="EventBusAggregate",
            aggregate_id=f"agg-{uuid4().hex[:6]}",
            version=1,
            timestamp=now,
            correlation_id=f"corr-{uuid4().hex[:6]}",
            causation_id=f"cause-{uuid4().hex[:6]}",
            source_agent=source_agent,
            priority=priority,
            payload=payload,
            metadata={"runtime": "OMNIA Kernel v1.0"},
        )
        self.publish(evt)
        return evt

    def query_history(self, filter_spec: EventFilter | None = None, limit: int = 100) -> list[OmniaEvent]:
        return self.store.query(filter_spec=filter_spec, limit=limit)

    def replay(self, request: ReplayRequest) -> list[OmniaEvent]:
        now = datetime.now(tz=UTC)
        start_time = None

        if request.range_type == "LAST_HOUR":
            start_time = now - timedelta(hours=1)
        elif request.range_type == "LAST_DAY":
            start_time = now - timedelta(days=1)
        elif request.range_type == "LAST_WEEK":
            start_time = now - timedelta(days=7)

        filter_spec = EventFilter(
            workspace_id=request.workspace_id,
            event_types=request.filter_event_types,
        )
        events = self.store.query(filter_spec=filter_spec, start_time=start_time, limit=500)

        for evt in events:
            self.publish(evt)

        return events
