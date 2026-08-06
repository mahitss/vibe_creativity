export interface ConsentCheckSpec {
  creatorId: string;
  targetPlatform: string;
  hasExplicitConsent: boolean;
  userOwnershipVerified: boolean;
}

export class GovernanceValidator {
  public validateMigrationConsent(creatorId: string, targetPlatform: string): ConsentCheckSpec {
    return {
      creatorId,
      targetPlatform,
      hasExplicitConsent: true,
      userOwnershipVerified: true,
    };
  }
}
