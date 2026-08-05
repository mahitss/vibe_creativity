"""Service layer for OMNIA Workflow Execution Engine."""

from datetime import UTC, datetime
from uuid import uuid4

from app.modules.workflow_engine.domain import (
    ExecutionMode,
    TaskState,
    WorkflowExecutionPlan,
    WorkflowStage,
    WorkflowState,
    WorkflowTask,
    WorkflowType,
)


class DAGValidator:
    """Validates Directed Acyclic Graph (DAG) task dependencies and topological sorting."""

    def sort_tasks(self, tasks: list[WorkflowTask]) -> list[WorkflowTask]:
        task_map = {t.task_id: t for t in tasks}
        in_degree = {t.task_id: 0 for t in tasks}
        adj_list: dict[str, list[str]] = {t.task_id: [] for t in tasks}

        for task in tasks:
            for dep_id in task.dependencies:
                if dep_id in task_map:
                    adj_list[dep_id].append(task.task_id)
                    in_degree[task.task_id] += 1

        queue = [t_id for t_id, deg in in_degree.items() if deg == 0]
        sorted_tasks: list[WorkflowTask] = []

        while queue:
            curr_id = queue.pop(0)
            curr_task = task_map.get(curr_id)
            if curr_task:
                sorted_tasks.append(curr_task)

            for nxt_id in adj_list.get(curr_id, []):
                in_degree[nxt_id] -= 1
                if in_degree[nxt_id] == 0:
                    queue.append(nxt_id)

        if len(sorted_tasks) != len(tasks):
            return sorted(tasks, key=lambda t: t.priority, reverse=True)

        return sorted_tasks


class WorkflowEngine:
    """Master Workflow Engine coordinating multi-agent execution plans, checkpoints, and approval gates."""

    def __init__(self) -> None:
        self.dag_validator = DAGValidator()
        self._workflows: dict[str, WorkflowExecutionPlan] = {}
        self._seed_default_workflows()

    def _seed_default_workflows(self) -> None:
        now = datetime.now(tz=UTC)

        w1_id = "wf-content-production-101"
        t1 = WorkflowTask(
            task_id="task-scripting",
            workflow_id=w1_id,
            stage_id="stage-1",
            assigned_agent="Content Agent",
            priority=90,
            dependencies=[],
            execution_mode=ExecutionMode.SEQUENTIAL,
            approval_required=False,
            estimated_duration_sec=30,
            retry_policy="RETRY_2",
            state=TaskState.COMPLETED,
            result_payload={"script_title": "React Part 5 State Management"},
        )
        t2 = WorkflowTask(
            task_id="task-publish-approval",
            workflow_id=w1_id,
            stage_id="stage-2",
            assigned_agent="Executive Agent",
            priority=100,
            dependencies=["task-scripting"],
            execution_mode=ExecutionMode.APPROVAL_GATE,
            approval_required=True,
            estimated_duration_sec=0,
            retry_policy="NO_RETRY",
            state=TaskState.WAITING_APPROVAL,
            result_payload={},
        )
        t3 = WorkflowTask(
            task_id="task-memory-consolidation",
            workflow_id=w1_id,
            stage_id="stage-3",
            assigned_agent="Memory Agent",
            priority=80,
            dependencies=["task-publish-approval"],
            execution_mode=ExecutionMode.SEQUENTIAL,
            approval_required=False,
            estimated_duration_sec=15,
            retry_policy="RETRY_3",
            state=TaskState.QUEUED,
            result_payload={},
        )

        stage1 = WorkflowStage(stage_id="stage-1", name="Drafting & Scripting", tasks=[t1], state=WorkflowState.COMPLETED)
        stage2 = WorkflowStage(stage_id="stage-2", name="Creator Approval Gate", tasks=[t2], state=WorkflowState.WAITING)
        stage3 = WorkflowStage(stage_id="stage-3", name="Publishing & Memory Update", tasks=[t3], state=WorkflowState.QUEUED)

        plan = WorkflowExecutionPlan(
            workflow_id=w1_id,
            workspace_id="ws-101",
            title="Produce React Series Part 5",
            workflow_type=WorkflowType.CONTENT_PRODUCTION,
            stages=[stage1, stage2, stage3],
            state=WorkflowState.WAITING,
            current_stage_index=1,
            checkpoint_data={"last_completed_stage": "stage-1"},
            created_at=now,
            updated_at=now,
        )
        self._workflows[plan.workflow_id] = plan

    def create_workflow(
        self,
        title: str,
        workflow_type: WorkflowType,
        workspace_id: str = "ws-101",
    ) -> WorkflowExecutionPlan:
        w_id = f"wf-{uuid4().hex[:6]}"
        now = datetime.now(tz=UTC)

        t_plan = WorkflowTask(
            task_id=f"task-plan-{uuid4().hex[:4]}",
            workflow_id=w_id,
            stage_id="stage-1",
            assigned_agent="Planner Agent",
            priority=90,
            dependencies=[],
            execution_mode=ExecutionMode.SEQUENTIAL,
            approval_required=False,
            estimated_duration_sec=10,
            retry_policy="RETRY_2",
            state=TaskState.QUEUED,
        )
        t_exec = WorkflowTask(
            task_id=f"task-exec-{uuid4().hex[:4]}",
            workflow_id=w_id,
            stage_id="stage-2",
            assigned_agent="Content Agent",
            priority=80,
            dependencies=[t_plan.task_id],
            execution_mode=ExecutionMode.SEQUENTIAL,
            approval_required=False,
            estimated_duration_sec=20,
            retry_policy="RETRY_2",
            state=TaskState.QUEUED,
        )

        stage1 = WorkflowStage(stage_id="stage-1", name="Task Planning", tasks=[t_plan], state=WorkflowState.QUEUED)
        stage2 = WorkflowStage(stage_id="stage-2", name="Task Execution", tasks=[t_exec], state=WorkflowState.QUEUED)

        plan = WorkflowExecutionPlan(
            workflow_id=w_id,
            workspace_id=workspace_id,
            title=title,
            workflow_type=workflow_type,
            stages=[stage1, stage2],
            state=WorkflowState.QUEUED,
            current_stage_index=0,
            created_at=now,
            updated_at=now,
        )
        self._workflows[plan.workflow_id] = plan
        return plan

    def run_workflow(self, workflow_id: str) -> WorkflowExecutionPlan:
        plan = self.get_workflow(workflow_id)
        plan.state = WorkflowState.EXECUTING
        plan.updated_at = datetime.now(tz=UTC)

        while plan.current_stage_index < len(plan.stages) and plan.state == WorkflowState.EXECUTING:
            current_stage = plan.stages[plan.current_stage_index]
            current_stage.state = WorkflowState.EXECUTING

            for task in current_stage.tasks:
                if task.approval_required:
                    task.state = TaskState.WAITING_APPROVAL
                    plan.state = WorkflowState.WAITING
                else:
                    task.state = TaskState.COMPLETED
                    task.result_payload = {"status": "SUCCESS", "executed_at": datetime.now(tz=UTC).isoformat()}

            if all(t.state == TaskState.COMPLETED for t in current_stage.tasks):
                current_stage.state = WorkflowState.COMPLETED
                plan.checkpoint_data["last_completed_stage"] = current_stage.stage_id
                plan.current_stage_index += 1

                if plan.current_stage_index >= len(plan.stages):
                    plan.state = WorkflowState.COMPLETED

        return plan

    def pause_workflow(self, workflow_id: str) -> WorkflowExecutionPlan:
        plan = self.get_workflow(workflow_id)
        plan.state = WorkflowState.PAUSED
        plan.checkpoint_data["paused_at"] = datetime.now(tz=UTC).isoformat()
        plan.updated_at = datetime.now(tz=UTC)
        return plan

    def resume_workflow(self, workflow_id: str) -> WorkflowExecutionPlan:
        plan = self.get_workflow(workflow_id)
        plan.state = WorkflowState.EXECUTING
        plan.updated_at = datetime.now(tz=UTC)
        return self.run_workflow(workflow_id)

    def get_workflow(self, workflow_id: str) -> WorkflowExecutionPlan:
        plan = self._workflows.get(workflow_id)
        if not plan:
            raise KeyError(f"Workflow {workflow_id} not found")
        return plan

    def list_history(self, workspace_id: str = "ws-101", limit: int = 50) -> list[WorkflowExecutionPlan]:
        plans = [p for p in self._workflows.values() if p.workspace_id == workspace_id]
        plans.sort(key=lambda x: x.created_at, reverse=True)
        return plans[:limit]
