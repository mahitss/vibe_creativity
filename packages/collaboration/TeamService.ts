export enum TeamRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  CREATOR = "CREATOR",
  EDITOR = "EDITOR",
  MODERATOR = "MODERATOR",
  DESIGNER = "DESIGNER",
  MARKETING = "MARKETING",
  FINANCE = "FINANCE",
  VIEWER = "VIEWER",
}

export interface TeamMemberSpec {
  memberId: string;
  workspaceId: string;
  userId: string;
  displayName: string;
  email: string;
  role: TeamRole;
  permissions: string[];
}

export interface SharedMissionSpec {
  missionId: string;
  workspaceId: string;
  title: string;
  assigneeId: string;
  priority: string;
  status: string;
}

export class TeamService {
  private members = new Map<string, TeamMemberSpec>();

  public addMember(
    workspaceId: string,
    userId: string,
    displayName: string,
    email: string,
    role: TeamRole,
  ): TeamMemberSpec {
    const member: TeamMemberSpec = {
      memberId: `team-mem-${Math.random().toString(36).substring(2, 8)}`,
      workspaceId,
      userId,
      displayName,
      email,
      role,
      permissions: ["VIEW_WORKSPACE", "EXECUTE_ASSIGNED_TASKS"],
    };
    this.members.set(member.memberId, member);
    return member;
  }

  public getMember(memberId: string): TeamMemberSpec | undefined {
    return this.members.get(memberId);
  }
}
