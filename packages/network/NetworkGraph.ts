export interface VerifiedCreatorProfile {
  creatorId: string;
  displayName: string;
  handle: string;
  primaryTopics: string[];
  audienceSize: number;
  reputationScore: number;
  verified: boolean;
}

export interface CreatorMatchSpec {
  matchId: string;
  targetCreatorId: string;
  matchedCreatorId: string;
  topicOverlap: string[];
  audienceOverlapPct: number;
  executiveReasoning: string;
}

export class NetworkGraph {
  private profiles = new Map<string, VerifiedCreatorProfile>();

  public registerProfile(profile: VerifiedCreatorProfile): VerifiedCreatorProfile {
    this.profiles.set(profile.creatorId, profile);
    return profile;
  }

  public getProfile(creatorId: string): VerifiedCreatorProfile | undefined {
    return this.profiles.get(creatorId);
  }
}
