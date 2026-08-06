export interface PersonalIntelligenceSpec {
  userId: string;
  persistentContextActive: boolean;
  privacyGuarantee: string;
}

export class PersonalIntelligence {
  public getContext(userId: string): PersonalIntelligenceSpec {
    return {
      userId,
      persistentContextActive: true,
      privacyGuarantee: "DIFFERENTIAL_PRIVACY_LOCAL_STRICT",
    };
  }
}
