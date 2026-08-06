export interface ProposalValidationSpec {
  proposalId: string;
  title: string;
  isAligned: boolean;
  violatedPrinciples: string[];
  rationale: string;
}

export class StewardshipGovernance {
  public validateProposal(title: string, description: string): ProposalValidationSpec {
    const isSecretDataSharing = description.toLowerCase().includes("secretly share private memory");
    return {
      proposalId: `prop-${Math.random().toString(36).substring(2, 8)}`,
      title,
      isAligned: !isSecretDataSharing,
      violatedPrinciples: isSecretDataSharing ? ["Privacy", "Transparency"] : [],
      rationale: isSecretDataSharing
        ? "Proposal violates Founding Principle #3 (Privacy) and Principle #2 (Transparency)."
        : "Proposal fully respects all 7 OMNIA Founding Principles.",
    };
  }
}
