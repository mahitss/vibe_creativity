import { AgentManifest } from "./AgentManifest";

export class DependencyResolver {
  public resolveStartupOrder(agents: AgentManifest[]): AgentManifest[] {
    const agentMap = new Map<string, AgentManifest>();
    const inDegree = new Map<string, number>();
    const adjList = new Map<string, string[]>();

    for (const agent of agents) {
      agentMap.set(agent.id, agent);
      inDegree.set(agent.id, 0);
      adjList.set(agent.id, []);
    }

    for (const agent of agents) {
      for (const depId of agent.dependencies) {
        if (agentMap.has(depId)) {
          adjList.get(depId)!.push(agent.id);
          inDegree.set(agent.id, (inDegree.get(agent.id) || 0) + 1);
        }
      }
    }

    const queue: string[] = [];
    for (const [id, deg] of inDegree.entries()) {
      if (deg === 0) queue.push(id);
    }

    const sortedOrder: AgentManifest[] = [];

    while (queue.length > 0) {
      const currId = queue.shift()!;
      const currAgent = agentMap.get(currId);
      if (currAgent) sortedOrder.push(currAgent);

      const neighbors = adjList.get(currId) || [];
      for (const nxtId of neighbors) {
        const newDeg = (inDegree.get(nxtId) || 0) - 1;
        inDegree.set(nxtId, newDeg);
        if (newDeg === 0) queue.push(nxtId);
      }
    }

    if (sortedOrder.length !== agents.length) {
      // Circular dependency fallback: return agents sorted by priority
      return [...agents].sort((a, b) => b.priority - a.priority);
    }

    return sortedOrder;
  }
}
