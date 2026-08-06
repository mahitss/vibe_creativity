import { TeamRole } from "./TeamService";

export class ApprovalFlow {
  public canApproveAction(role: TeamRole, actionType: string): boolean {
    if (role === TeamRole.OWNER || role === TeamRole.ADMIN) {
      return true;
    }
    if (role === TeamRole.CREATOR && actionType !== "DELETE_WORKSPACE") {
      return true;
    }
    return false;
  }
}
