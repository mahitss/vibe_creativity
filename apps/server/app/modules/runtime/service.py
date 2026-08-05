"""Service layer for OMNIA Runtime OS Kernel."""

from collections.abc import Callable
from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.runtime.domain import (
    EventType,
    ExecutionContext,
    ExecutionStep,
    ExecutionTrace,
    RuntimeEvent,
    RuntimeState,
)


class ContextManager:
    """Builds complete execution context combining workspace, memory, goals, sponsors, community, and analytics."""

    def build_context(self, creator_id: str, workspace_id: str = "ws-101") -> ExecutionContext:
        return ExecutionContext(
            workspace_id=workspace_id,
            creator_id=creator_id,
            active_goals=["Reach 100K subscribers", "Secure CloudCorp $15k Title Sponsorship"],
            memory_namespaces=[f"omnia.{creator_id}.mind", f"omnia.{creator_id}.graph"],
            community_signals=["142 comments requesting React Part 5", "60 requests for Docker Masterclass"],
            sponsor_deals=["CloudCorp $15,000 Title Read (Pending Approval)"],
            analytics_summary={"avg_retention": "11m42s", "growth_rate": "+14.2%"},
            current_missions=["Record & Publish React Series Part 5"],
        )


class AgentRegistry:
    """Registry tracking all 9 specialist agents inside OMNIA OS Kernel."""

    def __init__(self) -> None:
        self._agents = {
            "Executive Agent": {"role": "CEO & Strategy", "status": "ACTIVE", "health": "100%"},
            "Planner Agent": {"role": "DAG & Task Orchestration", "status": "ACTIVE", "health": "100%"},
            "Community Agent": {"role": "Audience & VIP Intelligence", "status": "ACTIVE", "health": "100%"},
            "Content Agent": {"role": "Scripting & Roadmap", "status": "ACTIVE", "health": "98%"},
            "Sponsor Agent": {"role": "Deals & Revenue", "status": "ACTIVE", "health": "96%"},
            "Analytics Agent": {"role": "Telemetry & Performance", "status": "ACTIVE", "health": "100%"},
            "Reflection Agent": {"role": "Self-Improvement & Closed Loop", "status": "ACTIVE", "health": "100%"},
            "Notification Agent": {"role": "UI & Alert Dispatch", "status": "ACTIVE", "health": "100%"},
            "Memory Agent": {"role": "Substrate & Graph Provenance", "status": "SYNCED", "health": "100%"},
        }

    def get_agents(self) -> dict[str, dict[str, str]]:
        return self._agents

    def select_agents_for_event(self, event_type: EventType) -> list[str]:
        if event_type == EventType.MISSION_CREATED:
            return ["Executive Agent", "Planner Agent", "Content Agent"]
        elif event_type == EventType.COMMENT_RECEIVED:
            return ["Community Agent", "Memory Agent", "Executive Agent"]
        elif event_type == EventType.SPONSOR_REPLY:
            return ["Sponsor Agent", "Executive Agent", "Notification Agent"]
        return ["Executive Agent", "Planner Agent", "Memory Agent", "Reflection Agent"]


class RuntimeEventBus:
    """Decoupled event publisher/subscriber bus."""

    def __init__(self) -> None:
        self._subscribers: dict[EventType, list[Callable[[RuntimeEvent], None]]] = {}

    def subscribe(self, event_type: EventType, callback: Callable[[RuntimeEvent], None]) -> None:
        if event_type not in self._subscribers:
            self._subscribers[event_type] = []
        self._subscribers[event_type].append(callback)

    def publish(self, event: RuntimeEvent) -> int:
        callbacks = self._subscribers.get(event.event_type, [])
        for cb in callbacks:
            cb(event)
        return len(callbacks)


class OmniaRuntimeEngine:
    """Master Operating System Kernel managing state machine, execution traces, and agent coordination."""

    def __init__(self) -> None:
        self.context_manager = ContextManager()
        self.agent_registry = AgentRegistry()
        self.event_bus = RuntimeEventBus()
        self._current_state = RuntimeState.IDLE
        self._traces: dict[str, ExecutionTrace] = {}
        self._event_history: list[RuntimeEvent] = []
        self._seed_default_traces()

    def _seed_default_traces(self) -> None:
        now = datetime.now(tz=UTC)
        t1 = ExecutionTrace(
            trace_id="trc-101",
            event_id="evt-101",
            state=RuntimeState.COMPLETED,
            steps=[
                ExecutionStep(
                    step_id="step-1",
                    agent_name="Executive Agent",
                    action="Loaded Creator Goals & Prioritized React Part 5",
                    reasoning="React Part 5 is 8 days overdue.",
                    memory_grounding_ids=["mem-promise-react5"],
                    duration_ms=120,
                ),
                ExecutionStep(
                    step_id="step-2",
                    agent_name="Content Agent",
                    action="Drafted Video Script & Code Snippets",
                    reasoning="142 audience comments requested Part 5 code.",
                    memory_grounding_ids=["mem-community-react-requests"],
                    duration_ms=240,
                ),
            ],
            start_time=now - timedelta(minutes=15),
            end_time=now - timedelta(minutes=14),
            total_duration_ms=360,
        )
        self._traces[t1.trace_id] = t1

    def get_state(self) -> RuntimeState:
        return self._current_state

    def dispatch_event(self, event_type: EventType, payload: dict[str, Any], source: str = "UI") -> RuntimeEvent:
        evt = RuntimeEvent(
            event_id=f"evt-{uuid4().hex[:6]}",
            event_type=event_type,
            payload=payload,
            source=source,
        )
        self._event_history.append(evt)
        self.event_bus.publish(evt)
        return evt

    def execute_run(self, creator_id: str, event_type: EventType, payload: dict[str, Any]) -> ExecutionTrace:
        trace_id = f"trc-{uuid4().hex[:6]}"
        evt = self.dispatch_event(event_type, payload)

        self._current_state = RuntimeState.THINKING
        context = self.context_manager.build_context(creator_id)

        self._current_state = RuntimeState.PLANNING
        selected_agents = self.agent_registry.select_agents_for_event(event_type)

        self._current_state = RuntimeState.EXECUTING
        steps: list[ExecutionStep] = []
        for agent_name in selected_agents:
            step = ExecutionStep(
                step_id=f"step-{uuid4().hex[:4]}",
                agent_name=agent_name,
                action=f"Processed event {event_type.value} within {context.workspace_id}",
                reasoning=f"Agent {agent_name} executed domain reasoning cycle.",
                memory_grounding_ids=[f"mem-runtime-{uuid4().hex[:4]}"],
                duration_ms=150,
            )
            steps.append(step)

        self._current_state = RuntimeState.REFLECTING
        now = datetime.now(tz=UTC)

        self._current_state = RuntimeState.COMPLETED
        trace = ExecutionTrace(
            trace_id=trace_id,
            event_id=evt.event_id,
            state=RuntimeState.COMPLETED,
            steps=steps,
            start_time=now - timedelta(milliseconds=450),
            end_time=now,
            total_duration_ms=450,
        )
        self._traces[trace.trace_id] = trace
        self._current_state = RuntimeState.IDLE
        return trace

    def get_status(self) -> dict[str, Any]:
        return {
            "current_state": self._current_state.value,
            "agent_registry_count": len(self.agent_registry.get_agents()),
            "agents": self.agent_registry.get_agents(),
            "total_traces_recorded": len(self._traces),
            "event_history_count": len(self._event_history),
        }

    def get_history(self) -> list[ExecutionTrace]:
        traces = list(self._traces.values())
        traces.sort(key=lambda x: x.start_time, reverse=True)
        return traces

    def get_trace(self, trace_id: str) -> ExecutionTrace:
        trace = self._traces.get(trace_id)
        if not trace:
            raise KeyError(f"Execution trace {trace_id} not found")
        return trace
