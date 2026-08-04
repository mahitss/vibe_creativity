"""Service layer for OMNIA Workflow Automation & Agent Orchestration Engine."""

from uuid import uuid4

from app.modules.workflows.domain import (
    DAGTask,
    TaskStatus,
    WorkflowInstance,
    WorkflowStatus,
    WorkflowTemplate,
    WorkflowType,
)


class WorkflowOrchestratorEngine:
    """Central engine managing multi-agent DAG task execution, dependency resolution, approval gates, and state persistence."""

    def __init__(self) -> None:
        self._workflows: dict[str, WorkflowInstance] = {}
        self._templates: list[WorkflowTemplate] = []
        self._seed_default_workflows()

    def _seed_default_workflows(self) -> None:
        # 1. Seed Templates
        tmpl1 = WorkflowTemplate(
            template_id="tmpl-series-launch",
            name="Launch YouTube Series Episode",
            description="Coordinates Community demand detection, Memory retrieval, Content drafting, Analytics estimation, and Executive briefing.",
            workflow_type=WorkflowType.SERIES_PUBLISHING,
            default_tasks=[
                {
                    "name": "Community Demand Detection",
                    "assigned_agent": "Community Agent",
                    "dependencies": [],
                    "requires_approval": False,
                },
                {
                    "name": "Memory Prior Art Retrieval",
                    "assigned_agent": "Memory Agent",
                    "dependencies": ["Community Demand Detection"],
                    "requires_approval": False,
                },
                {
                    "name": "Content Roadmap & Script Drafting",
                    "assigned_agent": "Content Agent",
                    "dependencies": ["Memory Prior Art Retrieval"],
                    "requires_approval": True,
                },
                {
                    "name": "Analytics Impact Estimation",
                    "assigned_agent": "Analytics Agent",
                    "dependencies": ["Content Roadmap & Script Drafting"],
                    "requires_approval": False,
                },
                {
                    "name": "Executive Mission Finalization",
                    "assigned_agent": "Executive Agent",
                    "dependencies": ["Analytics Impact Estimation"],
                    "requires_approval": True,
                },
            ],
        )

        tmpl2 = WorkflowTemplate(
            template_id="tmpl-sponsor-campaign",
            name="Run Sponsor Campaign Workflow",
            description="Coordinates Sponsor contract retrieval, Planner calendar blocking, Content deliverable drafting, and Follow-up monitoring.",
            workflow_type=WorkflowType.SPONSOR_CAMPAIGN,
            default_tasks=[
                {
                    "name": "Sponsor Contract Retrieval",
                    "assigned_agent": "Sponsor Agent",
                    "dependencies": [],
                    "requires_approval": False,
                },
                {
                    "name": "Planner Calendar Blocking",
                    "assigned_agent": "Planner Agent",
                    "dependencies": ["Sponsor Contract Retrieval"],
                    "requires_approval": False,
                },
                {
                    "name": "Content Integration Read Drafting",
                    "assigned_agent": "Content Agent",
                    "dependencies": ["Planner Calendar Blocking"],
                    "requires_approval": True,
                },
                {
                    "name": "Executive Campaign Prioritization",
                    "assigned_agent": "Executive Agent",
                    "dependencies": ["Content Integration Read Drafting"],
                    "requires_approval": True,
                },
            ],
        )

        self._templates = [tmpl1, tmpl2]

        # 2. Seed Active Workflow Instance
        wf1 = WorkflowInstance(
            workflow_id="wf-101",
            name="React Series Part 5 End-to-End Release",
            workflow_type=WorkflowType.SERIES_PUBLISHING,
            status=WorkflowStatus.ACTIVE,
            current_step=3,
            tasks=[
                DAGTask(
                    task_id="tsk-1",
                    workflow_id="wf-101",
                    name="Community Demand Detection",
                    assigned_agent="Community Agent",
                    dependencies=[],
                    priority=1,
                    status=TaskStatus.COMPLETED,
                    estimated_time_mins=5,
                    requires_approval=False,
                    expected_output="142 subscribers waiting for React Part 5.",
                    actual_output="Demand verified with 98% confidence score.",
                ),
                DAGTask(
                    task_id="tsk-2",
                    workflow_id="wf-101",
                    name="Memory Prior Art Retrieval",
                    assigned_agent="Memory Agent",
                    dependencies=["tsk-1"],
                    priority=2,
                    status=TaskStatus.COMPLETED,
                    estimated_time_mins=10,
                    requires_approval=False,
                    expected_output="Retrieve React Part 4 script & code samples.",
                    actual_output="Retrieved memory #mem-promise-react5.",
                ),
                DAGTask(
                    task_id="tsk-3",
                    workflow_id="wf-101",
                    name="Content Roadmap & Script Drafting",
                    assigned_agent="Content Agent",
                    dependencies=["tsk-2"],
                    priority=3,
                    status=TaskStatus.WAITING_APPROVAL,
                    estimated_time_mins=30,
                    requires_approval=True,
                    expected_output="Complete 15-min video script & code repository.",
                    actual_output="Draft script generated and queued for creator review.",
                ),
                DAGTask(
                    task_id="tsk-4",
                    workflow_id="wf-101",
                    name="Executive Mission Finalization",
                    assigned_agent="Executive Agent",
                    dependencies=["tsk-3"],
                    priority=4,
                    status=TaskStatus.PENDING,
                    estimated_time_mins=15,
                    requires_approval=True,
                    expected_output="Publish video & notify Discord community.",
                    actual_output=None,
                ),
            ],
            creator_id="creator-default",
        )

        self._workflows[wf1.workflow_id] = wf1

    def get_workflows(self, creator_id: str) -> list[WorkflowInstance]:
        results = [w for w in self._workflows.values() if w.creator_id in (creator_id, "creator-default")]
        results.sort(key=lambda x: x.created_at, reverse=True)
        return results

    def get_workflow_by_id(self, workflow_id: str, creator_id: str) -> WorkflowInstance:
        wf = self._workflows.get(workflow_id)
        if not wf:
            raise KeyError(f"Workflow {workflow_id} not found")
        return wf

    def get_templates(self) -> list[WorkflowTemplate]:
        return self._templates

    def create_workflow(self, template_id: str, name: str, creator_id: str) -> WorkflowInstance:
        tmpl = next((t for t in self._templates if t.template_id == template_id), None)
        wf_id = f"wf-{uuid4().hex[:6]}"

        tasks: list[DAGTask] = []
        if tmpl:
            for idx, dt in enumerate(tmpl.default_tasks):
                t_id = f"tsk-{idx+1}"
                tasks.append(
                    DAGTask(
                        task_id=t_id,
                        workflow_id=wf_id,
                        name=dt["name"],
                        assigned_agent=dt["assigned_agent"],
                        dependencies=[],
                        priority=idx + 1,
                        status=TaskStatus.PENDING if idx > 0 else TaskStatus.RUNNING,
                        estimated_time_mins=15,
                        requires_approval=dt.get("requires_approval", False),
                        expected_output=f"Output for {dt['name']}",
                        actual_output=None,
                    )
                )

        wf = WorkflowInstance(
            workflow_id=wf_id,
            name=name,
            workflow_type=tmpl.workflow_type if tmpl else WorkflowType.CONTENT_PRODUCTION,
            status=WorkflowStatus.ACTIVE,
            current_step=1,
            tasks=tasks,
            creator_id=creator_id,
        )
        self._workflows[wf.workflow_id] = wf
        return wf

    def run_workflow(self, workflow_id: str, creator_id: str) -> WorkflowInstance:
        wf = self.get_workflow_by_id(workflow_id, creator_id)
        for task in wf.tasks:
            if task.status == TaskStatus.WAITING_APPROVAL:
                task.status = TaskStatus.COMPLETED
                task.actual_output = "Approved by creator and completed successfully."
            elif task.status == TaskStatus.PENDING:
                task.status = TaskStatus.RUNNING
                task.actual_output = "Task executed in parallel across specialist agent."
                break

        # Check if all completed
        if all(t.status == TaskStatus.COMPLETED for t in wf.tasks):
            wf.status = WorkflowStatus.COMPLETED

        return wf

    def pause_workflow(self, workflow_id: str, creator_id: str) -> WorkflowInstance:
        wf = self.get_workflow_by_id(workflow_id, creator_id)
        wf.status = WorkflowStatus.PAUSED
        return wf

    def resume_workflow(self, workflow_id: str, creator_id: str) -> WorkflowInstance:
        wf = self.get_workflow_by_id(workflow_id, creator_id)
        wf.status = WorkflowStatus.ACTIVE
        return wf
