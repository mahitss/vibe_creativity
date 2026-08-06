export enum EvolutionStage {
  RAW_MEMORY = "RAW_MEMORY",
  VALIDATED_MEMORY = "VALIDATED_MEMORY",
  PATTERN = "PATTERN",
  INSIGHT = "INSIGHT",
  KNOWLEDGE = "KNOWLEDGE",
  STRATEGY = "STRATEGY",
}

export interface KnowledgeObjectSpec {
  knowledgeId: string;
  workspaceId: string;
  stage: EvolutionStage;
  title: string;
  sourceMemories: string[];
  confidence: number;
  qualityScore: number;
  businessImpact: string;
}
