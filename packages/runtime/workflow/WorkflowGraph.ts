import { WorkflowTaskSpec } from "./WorkflowStateMachine";

export class WorkflowGraph {
  public resolveTopologicalSort(tasks: WorkflowTaskSpec[]): WorkflowTaskSpec[] {
    const taskMap = new Map<string, WorkflowTaskSpec>();
    const inDegree = new Map<string, number>();
    const adjList = new Map<string, string[]>();

    for (const t of tasks) {
      taskMap.set(t.taskId, t);
      inDegree.set(t.taskId, 0);
      adjList.set(t.taskId, []);
    }

    for (const t of tasks) {
      for (const depId of t.dependencies) {
        if (taskMap.has(depId)) {
          adjList.get(depId)!.push(t.taskId);
          inDegree.set(t.taskId, (inDegree.get(t.taskId) || 0) + 1);
        }
      }
    }

    const queue: string[] = [];
    for (const [id, deg] of inDegree.entries()) {
      if (deg === 0) queue.push(id);
    }

    const sortedOrder: WorkflowTaskSpec[] = [];

    while (queue.length > 0) {
      const currId = queue.shift()!;
      const currTask = taskMap.get(currId);
      if (currTask) sortedOrder.push(currTask);

      const neighbors = adjList.get(currId) || [];
      for (const nxtId of neighbors) {
        const newDeg = (inDegree.get(nxtId) || 0) - 1;
        inDegree.set(nxtId, newDeg);
        if (newDeg === 0) queue.push(nxtId);
      }
    }

    return sortedOrder.length === tasks.length ? sortedOrder : tasks;
  }
}
