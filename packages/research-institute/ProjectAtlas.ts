export interface KnowledgeNodeSpec {
  nodeId: string;
  concept: string;
  temporalAgeDays: number;
  compressionRatio: number;
}

export class ProjectAtlas {
  public compressKnowledgeGraph(nodes: string[]): KnowledgeNodeSpec[] {
    return nodes.map((node, idx) => ({
      nodeId: `atl-${idx + 1}`,
      concept: node,
      temporalAgeDays: 365,
      compressionRatio: 4.8,
    }));
  }
}
