import { MemoryRowSpec, MemoryType, MemoryLifecycleStage } from "./MemoryRepository";

export class MemoryService {
  private memories = new Map<string, MemoryRowSpec>();

  public storeMemory(
    workspaceId: string,
    type: MemoryType,
    title: string,
    summary: string,
    content: string,
    tags: string[] = [],
  ): MemoryRowSpec {
    const row: MemoryRowSpec = {
      memoryId: `mem-${Math.random().toString(36).substring(2, 8)}`,
      workspaceId,
      mindId: `mind-${workspaceId}`,
      type,
      title,
      summary,
      content,
      embedding: Array(384).fill(0.01),
      source: "Runtime Engine",
      importance: 0.85,
      confidence: 0.9,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      accessCount: 1,
      version: 1,
      relationships: [],
      tags,
      stage: MemoryLifecycleStage.ACTIVE,
    };

    this.memories.set(row.memoryId, row);
    return row;
  }

  public getMemory(memoryId: string): MemoryRowSpec | undefined {
    return this.memories.get(memoryId);
  }

  public searchMemories(workspaceId: string, query: string): MemoryRowSpec[] {
    return Array.from(this.memories.values()).filter(
      (m) =>
        m.workspaceId === workspaceId && (m.title.includes(query) || m.summary.includes(query)),
    );
  }
}
