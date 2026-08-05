export enum CreatorScenario {
  NEW_CREATOR = "NEW_CREATOR",
  DORMANT_CREATOR = "DORMANT_CREATOR",
  VIRAL_CREATOR = "VIRAL_CREATOR",
  SPONSOR_CAMPAIGN = "SPONSOR_CAMPAIGN",
  COMMUNITY_CRISIS = "COMMUNITY_CRISIS",
  MISSED_UPLOAD_SCHEDULE = "MISSED_UPLOAD_SCHEDULE",
  ANALYTICS_DROP = "ANALYTICS_DROP",
  ANALYTICS_SPIKE = "ANALYTICS_SPIKE",
  PLATFORM_DISCONNECT = "PLATFORM_DISCONNECT",
  MEMORY_RECOVERY = "MEMORY_RECOVERY",
}

export enum CertificationGrade {
  A_PLUS = "A+",
  A = "A",
  B = "B",
  C = "C",
  FAIL = "FAIL",
}

export interface CategoryScore {
  category: string;
  score: number;
  status: "PASSED" | "FAILED";
}

export interface CertificationReport {
  certificationId: string;
  workspaceId: string;
  overallScore: number;
  grade: CertificationGrade;
  categoryScores: CategoryScore[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  timestamp: string;
}
