export enum EnterpriseRole {
  ORG_OWNER = "ORG_OWNER",
  ORG_ADMIN = "ORG_ADMIN",
  WORKSPACE_ADMIN = "WORKSPACE_ADMIN",
  TEAM_LEAD = "TEAM_LEAD",
  CREATOR = "CREATOR",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
  AUDITOR = "AUDITOR",
}

export interface OrganizationSpec {
  orgId: string;
  name: string;
  ownerId: string;
  departments: string[];
  workspaces: string[];
}

export interface PolicySpec {
  policyId: string;
  ruleName: string;
  ruleValue: string;
  enabled: boolean;
}

export class OrganizationService {
  private orgs = new Map<string, OrganizationSpec>();

  public createOrganization(name: string, ownerId: string): OrganizationSpec {
    const org: OrganizationSpec = {
      orgId: `org-${Math.random().toString(36).substring(2, 8)}`,
      name,
      ownerId,
      departments: ["Content Production", "Brand Sponsorships"],
      workspaces: ["ws-101", "ws-102"],
    };
    this.orgs.set(org.orgId, org);
    return org;
  }
}
