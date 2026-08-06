import { CommunityMemberSpec, VIPStatus } from "./MemberService";

export class CommunityService {
  private members = new Map<string, CommunityMemberSpec>();

  public addMember(
    workspaceId: string,
    platform: string,
    displayName: string,
    username: string,
    relationshipScore: number = 75,
  ): CommunityMemberSpec {
    const member: CommunityMemberSpec = {
      memberId: `mem-usr-${Math.random().toString(36).substring(2, 8)}`,
      workspaceId,
      platform,
      displayName,
      username,
      relationshipScore,
      trustScore: 0.9,
      vipStatus: relationshipScore >= 85 ? VIPStatus.TOP_SUPPORTER : VIPStatus.NONE,
      topics: ["Docker", "TypeScript", "Kubernetes"],
      sentimentTrend: "POSITIVE",
      memoryLinks: ["mem-101", "mem-204"],
    };

    this.members.set(member.memberId, member);
    return member;
  }

  public getMember(memberId: string): CommunityMemberSpec | undefined {
    return this.members.get(memberId);
  }
}
