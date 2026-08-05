"""AgentPlatformService facade for multi-agent execution."""

from datetime import UTC, datetime
from typing import Any

from app.modules.agents.domain import (
    AgentCapability,
    AgentDescriptor,
    AgentFinding,
    AgentHealthStatus,
    AgentLifecycleState,
    AgentManifest,
    AgentStatus,
    AgentToolSpec,
    TaskPriority,
)
from app.modules.agents.executive import CycleOutcome


class DependencyResolver:
    """Implements topological sorting for automatic agent startup order resolution."""

    def resolve_startup_order(self, manifests: list[AgentManifest]) -> list[AgentManifest]:
        agent_map = {a.id: a for a in manifests}
        in_degree = {a.id: 0 for a in manifests}
        adj_list: dict[str, list[str]] = {a.id: [] for a in manifests}

        for agent in manifests:
            for dep_id in agent.dependencies:
                if dep_id in agent_map:
                    adj_list[dep_id].append(agent.id)
                    in_degree[agent.id] += 1

        queue = [agent_id for agent_id, deg in in_degree.items() if deg == 0]
        sorted_order: list[AgentManifest] = []

        while queue:
            curr_id = queue.pop(0)
            curr_agent = agent_map.get(curr_id)
            if curr_agent:
                sorted_order.append(curr_agent)

            for nxt_id in adj_list.get(curr_id, []):
                in_degree[nxt_id] -= 1
                if in_degree[nxt_id] == 0:
                    queue.append(nxt_id)

        if len(sorted_order) != len(manifests):
            return sorted(manifests, key=lambda a: a.priority, reverse=True)

        return sorted_order


class AgentRegistryEngine:
    """Central Directory of all 12 intelligent capabilities inside OMNIA Platform."""

    def __init__(self) -> None:
        self.dependency_resolver = DependencyResolver()
        self._manifests: dict[str, AgentManifest] = {}
        self._seed_default_12_agents()

    def _seed_default_12_agents(self) -> None:
        now = datetime.now(tz=UTC)

        m_exec = AgentManifest(
            id="agent-executive",
            name="Executive Agent",
            version="1.0.0",
            description="CEO of all OMNIA agents owning delegation, conflict resolution, and long-term planning.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.REASONING, AgentCapability.PLANNING, AgentCapability.WORKFLOW],
            dependencies=[],
            priority=100,
            supported_events=["MissionCreated", "MissionCompleted", "RuntimeStarted"],
            supported_tools=[
                AgentToolSpec(
                    name="run_executive_cycle",
                    description="Synthesize reports and resolve agent conflicts.",
                    input_schema={"creator_id": "string"},
                    output_schema={"strategy": "object"},
                    permissions=["ADMIN"],
                    timeout_sec=10,
                    retry_policy="RETRY_3",
                    owner_agent_id="agent-executive",
                )
            ],
            supported_memory_types=["identity", "goal", "strategy"],
            supported_workflows=["Launch YouTube Series", "Run Sponsor Campaign"],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=12.5,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=45.2,
                cpu_usage_pct=1.2,
            ),
        )

        m_planner = AgentManifest(
            id="agent-planner",
            name="Planner Agent",
            version="1.0.0",
            description="Constructs Directed Acyclic Graph (DAG) task workflows and dependency order.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.PLANNING, AgentCapability.WORKFLOW, AgentCapability.SCHEDULING],
            dependencies=["agent-executive"],
            priority=90,
            supported_events=["MissionCreated", "WorkflowStarted"],
            supported_tools=[
                AgentToolSpec(
                    name="build_dag_workflow",
                    description="Build DAG execution graph for multi-agent missions.",
                    input_schema={"mission_id": "string"},
                    output_schema={"dag": "object"},
                    permissions=["WRITE"],
                    timeout_sec=5,
                    retry_policy="RETRY_2",
                    owner_agent_id="agent-planner",
                )
            ],
            supported_memory_types=["workflow_template", "task_dependency"],
            supported_workflows=["Launch YouTube Series"],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=15.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=38.0,
                cpu_usage_pct=0.8,
            ),
        )

        m_memory = AgentManifest(
            id="agent-memory",
            name="Memory Agent",
            version="1.0.0",
            description="Manages persistent memory substrate, namespace isolation, and provenance grounding.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.MEMORY, AgentCapability.RETRIEVAL],
            dependencies=[],
            priority=95,
            supported_events=["MemoryStored", "MemoryUpdated"],
            supported_tools=[],
            supported_memory_types=["all"],
            supported_workflows=[],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=8.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=52.0,
                cpu_usage_pct=1.5,
            ),
        )

        m_graph = AgentManifest(
            id="agent-graph",
            name="Knowledge Graph Agent",
            version="1.0.0",
            description="Maintains entity relationships, semantic graph nodes, and creator knowledge universe.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.MEMORY, AgentCapability.RETRIEVAL, AgentCapability.REASONING],
            dependencies=["agent-memory"],
            priority=85,
            supported_events=["MemoryStored", "VideoImported"],
            supported_tools=[],
            supported_memory_types=["knowledge_node", "entity_edge"],
            supported_workflows=[],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=22.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=64.0,
                cpu_usage_pct=2.1,
            ),
        )

        m_content = AgentManifest(
            id="agent-content",
            name="Content Agent",
            version="1.0.0",
            description="Analyzes content performance, generates video scripts, and builds content roadmaps.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.CONTENT_STRATEGY, AgentCapability.PREDICTION],
            dependencies=["agent-executive", "agent-memory", "agent-planner"],
            priority=80,
            supported_events=["VideoImported", "MissionCreated"],
            supported_tools=[],
            supported_memory_types=["content_script", "topic_cluster"],
            supported_workflows=["Launch YouTube Series"],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=28.0,
                error_rate=0.0,
                success_rate=0.98,
                queue_size=1,
                memory_usage_mb=58.0,
                cpu_usage_pct=2.5,
            ),
        )

        m_community = AgentManifest(
            id="agent-community",
            name="Community Agent",
            version="1.0.0",
            description="Monitors audience sentiment, tracks VIP contributors, and detects demand trends.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.MODERATION, AgentCapability.PREDICTION],
            dependencies=["agent-memory"],
            priority=75,
            supported_events=["CommentReceived", "CommunityTrendDetected"],
            supported_tools=[],
            supported_memory_types=["member_profile", "sentiment_trend"],
            supported_workflows=[],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=18.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=42.0,
                cpu_usage_pct=1.1,
            ),
        )

        m_sponsor = AgentManifest(
            id="agent-sponsor",
            name="Sponsor Agent",
            version="1.0.0",
            description="Tracks sponsorship deals, calculates brand alignment, and manages media kit proposals.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.PREDICTION, AgentCapability.ANALYTICS],
            dependencies=["agent-memory"],
            priority=75,
            supported_events=["SponsorOpportunityDetected", "SponsorReply"],
            supported_tools=[],
            supported_memory_types=["sponsor_deal", "rate_card"],
            supported_workflows=["Run Sponsor Campaign"],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=20.0,
                error_rate=0.0,
                success_rate=0.96,
                queue_size=0,
                memory_usage_mb=40.0,
                cpu_usage_pct=1.0,
            ),
        )

        m_analytics = AgentManifest(
            id="agent-analytics",
            name="Analytics Agent",
            version="1.0.0",
            description="Measures cross-platform telemetry, audience watch time retention, and growth metrics.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.ANALYTICS, AgentCapability.PREDICTION],
            dependencies=[],
            priority=70,
            supported_events=["VideoImported"],
            supported_tools=[],
            supported_memory_types=["analytics_metric"],
            supported_workflows=[],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=10.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=35.0,
                cpu_usage_pct=0.7,
            ),
        )

        m_reflection = AgentManifest(
            id="agent-reflection",
            name="Reflection Agent",
            version="1.0.0",
            description="Evaluates decision outcomes, recalibrates confidence scores, and maintains reflection store.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.REFLECTION, AgentCapability.REASONING],
            dependencies=["agent-executive", "agent-memory"],
            priority=85,
            supported_events=["ReflectionGenerated", "MissionCompleted"],
            supported_tools=[],
            supported_memory_types=["reflection_entry", "confidence_audit"],
            supported_workflows=[],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=25.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=48.0,
                cpu_usage_pct=1.4,
            ),
        )

        m_notify = AgentManifest(
            id="agent-notification",
            name="Notification Agent",
            version="1.0.0",
            description="Dispatches UI alerts, WebSocket notifications, and high-priority action reminders.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.SCHEDULING],
            dependencies=[],
            priority=60,
            supported_events=["SponsorReply", "RuntimeFailed"],
            supported_tools=[],
            supported_memory_types=["notification_log"],
            supported_workflows=[],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=5.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=25.0,
                cpu_usage_pct=0.4,
            ),
        )

        m_search = AgentManifest(
            id="agent-search",
            name="Search Agent",
            version="1.0.0",
            description="Performs hybrid semantic and keyword search across memory substrate and knowledge graph.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.RETRIEVAL],
            dependencies=["agent-memory"],
            priority=70,
            supported_events=[],
            supported_tools=[],
            supported_memory_types=["search_index"],
            supported_workflows=[],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=14.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=50.0,
                cpu_usage_pct=1.3,
            ),
        )

        m_eval = AgentManifest(
            id="agent-evaluation",
            name="Evaluation Agent",
            version="1.0.0",
            description="Closed-loop self-improvement engine tracking decision quality and A/B strategy experiments.",
            owner="OMNIA Core",
            capabilities=[AgentCapability.REFLECTION, AgentCapability.ANALYTICS],
            dependencies=["agent-reflection"],
            priority=65,
            supported_events=["MissionCompleted"],
            supported_tools=[],
            supported_memory_types=["experiment_result"],
            supported_workflows=[],
            state=AgentLifecycleState.READY,
            health=AgentHealthStatus(
                heartbeat=now,
                latency_ms=19.0,
                error_rate=0.0,
                success_rate=1.0,
                queue_size=0,
                memory_usage_mb=44.0,
                cpu_usage_pct=1.1,
            ),
        )

        for manifest in [
            m_exec,
            m_planner,
            m_memory,
            m_graph,
            m_content,
            m_community,
            m_sponsor,
            m_analytics,
            m_reflection,
            m_notify,
            m_search,
            m_eval,
        ]:
            self._manifests[manifest.id] = manifest

    def register_agent(self, manifest: AgentManifest) -> AgentManifest:
        self._manifests[manifest.id] = manifest
        return manifest

    def get_agent(self, agent_id: str) -> AgentManifest:
        manifest = self._manifests.get(agent_id)
        if not manifest:
            raise KeyError(f"Agent {agent_id} not registered")
        return manifest

    def get_all_agents(self) -> list[AgentManifest]:
        return list(self._manifests.values())

    def get_agents_by_capability(self, capability: AgentCapability) -> list[AgentManifest]:
        return [a for a in self.get_all_agents() if capability in a.capabilities]

    def get_all_tools(self) -> list[AgentToolSpec]:
        tools: list[AgentToolSpec] = []
        for agent in self.get_all_agents():
            tools.extend(agent.supported_tools)
        return tools

    def get_startup_order(self) -> list[AgentManifest]:
        return self.dependency_resolver.resolve_startup_order(self.get_all_agents())

    def reload_registry(self) -> dict[str, Any]:
        ordered = self.get_startup_order()
        return {
            "total_agents": len(ordered),
            "startup_sequence": [a.id for a in ordered],
            "timestamp": datetime.now(tz=UTC).isoformat(),
        }


class BusMetricsMock:
    def metrics(self) -> dict[str, Any]:
        return {"processed_tasks": 42, "failed_tasks": 0, "active_consumers": 4}

    def dead_letter(self) -> list[Any]:
        return []


class AgentPlatformService:
    def __init__(self) -> None:
        self.bus = BusMetricsMock()
        self.registry = AgentRegistryEngine()

    async def list_agents(self) -> list[AgentDescriptor]:
        manifests = self.registry.get_all_agents()
        return [
            AgentDescriptor(
                agent_id=m.id,
                name=m.name,
                version=m.version,
                description=m.description,
                capabilities=[c.value for c in m.capabilities],
                dependencies=m.dependencies,
                status=AgentStatus.ACTIVE if m.state == AgentLifecycleState.READY else AgentStatus.PAUSED,
                health="HEALTHY",
            )
            for m in manifests
        ]

    async def run_cycle(
        self,
        creator_id: str,
        focus: str = "",
        mission_objective: str | None = None,
    ) -> CycleOutcome:
        finding = AgentFinding(
            agent_id="agent-content",
            topic="Docker Multi-Agent Series",
            summary="Strong audience request signal detected for containerized agent walkthrough.",
            proposed_action="DRAFT_DOCKER_COURSE",
            evidence=["14 Discord comments", "42 Video likes"],
            priority_hint=TaskPriority.HIGH,
        )
        return CycleOutcome(
            creator_id=creator_id,
            focus=focus or "Weekly Channel Growth",
            findings=[finding],
            lifecycle=["START_CYCLE", "EVALUATE_COMMUNITY", "DISPATCH_RECOMMENDATIONS"],
        )

    async def dispatch(
        self,
        creator_id: str,
        target_agent: str,
        purpose: str,
        payload: dict[str, Any],
        priority: TaskPriority = TaskPriority.NORMAL,
    ) -> dict[str, Any]:
        return {
            "dispatch_id": "disp-101",
            "creator_id": creator_id,
            "target_agent": target_agent,
            "purpose": purpose,
            "status": "DISPATCHED",
        }

    async def dashboard(self, creator_id: str) -> dict[str, Any]:
        return {
            "creator_id": creator_id,
            "total_agents": 12,
            "active_tasks": 2,
            "cycles_completed": 5,
            "bus_status": "HEALTHY",
        }

    async def bus_snapshot_tasks(self, creator_id: str, limit: int = 100) -> list[dict[str, Any]]:
        return [{"id": "task-101", "target_agent": "agent-content", "status": "COMPLETED"}]

    async def bus_snapshot_executions(self, creator_id: str, limit: int = 100, agent_id: str | None = None) -> list[dict[str, Any]]:
        return [{"execution_id": "exec-101", "agent_id": agent_id or "agent-content", "status": "COMPLETED"}]

    async def bus_snapshot_decisions(self, creator_id: str, limit: int = 100) -> list[dict[str, Any]]:
        return [{"decision_id": "dec-201", "recommendation": "Produce Docker Multi-Agent video series", "confidence": 0.95}]

    async def bus_snapshot_delegations(self, creator_id: str, limit: int = 100) -> list[dict[str, Any]]:
        return [{"delegation_id": "del-301", "from_agent": "agent-coo", "to_agent": "agent-sponsor"}]

    async def bus_snapshot_conflicts(self, creator_id: str, limit: int = 100) -> list[dict[str, Any]]:
        return []

    async def approve_decision(self, creator_id: str, decision_id: str) -> None:
        pass

    async def reject_decision(self, creator_id: str, decision_id: str) -> None:
        pass

