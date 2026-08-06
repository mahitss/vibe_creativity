export enum VIPStatus {
  NONE = "NONE",
  TOP_SUPPORTER = "TOP_SUPPORTER",
  HELPFUL_MEMBER = "HELPFUL_MEMBER",
  MODERATOR_CANDIDATE = "MODERATOR_CANDIDATE",
  ADVOCATE = "ADVOCATE",
}

export interface CommunityMemberSpec {
  memberId: string;
  workspaceId: string;
  platform: string;
  displayName: string;
  username: string;
  relationshipScore: number;
  trustScore: number;
  vipStatus: VIPStatus;
  topics: string[];
  sentimentTrend: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  memoryLinks: string[];
}
