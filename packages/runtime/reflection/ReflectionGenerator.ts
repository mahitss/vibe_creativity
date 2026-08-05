export enum ReflectionTrigger {
  WORKFLOW_COMPLETED = "WORKFLOW_COMPLETED",
  MISSION_COMPLETED = "MISSION_COMPLETED",
  MISSION_REJECTED = "MISSION_REJECTED",
  RECOMMENDATION_ACCEPTED = "RECOMMENDATION_ACCEPTED",
  RECOMMENDATION_IGNORED = "RECOMMENDATION_IGNORED",
  GOAL_ACHIEVED = "GOAL_ACHIEVED",
  GOAL_ABANDONED = "GOAL_ABANDONED",
  SPONSOR_CAMPAIGN_COMPLETED = "SPONSOR_CAMPAIGN_COMPLETED",
  PREDICTION_EVALUATED = "PREDICTION_EVALUATED",
}

export enum LearningType {
  SUCCESS_PATTERN = "SUCCESS_PATTERN",
  FAILURE_PATTERN = "FAILURE_PATTERN",
  BEHAVIOR_PATTERN = "BEHAVIOR_PATTERN",
  COMMUNITY_PATTERN = "COMMUNITY_PATTERN",
  SPONSOR_PATTERN = "SPONSOR_PATTERN",
  CONTENT_PATTERN = "CONTENT_PATTERN",
  SCHEDULING_PATTERN = "SCHEDULING_PATTERN",
  PERSONAL_PREFERENCE = "PERSONAL_PREFERENCE",
  WORKFLOW_OPTIMIZATION = "WORKFLOW_OPTIMIZATION",
}

export interface LearningPattern {
  patternId: string;
  workspaceId: string;
  title: string;
  learningType: LearningType;
  confidenceScore: number;
  evidenceCount: number;
  description: string;
  timestamp: string;
}

export interface ReflectionRecord {
  reflectionId: string;
  workspaceId: string;
  mindId: string;
  sourceWorkflowId: string;
  triggerEvent: ReflectionTrigger;
  observation: string;
  outcome: string;
  expectedResult: string;
  actualResult: string;
  rootCause: string;
  lessonsLearned: string[];
  recommendedImprovements: string[];
  confidenceAdjustment: number;
  timestamp: string;
}
