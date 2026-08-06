export enum PipelineStage {
  PROSPECT = "PROSPECT",
  QUALIFIED = "QUALIFIED",
  CONTACTED = "CONTACTED",
  NEGOTIATION = "NEGOTIATION",
  PROPOSAL = "PROPOSAL",
  AGREEMENT = "AGREEMENT",
  CAMPAIGN = "CAMPAIGN",
  DELIVERED = "DELIVERED",
  PAYMENT_PENDING = "PAYMENT_PENDING",
  COMPLETED = "COMPLETED",
  RENEWAL = "RENEWAL",
}

export interface SponsorSpec {
  sponsorId: string;
  workspaceId: string;
  company: string;
  brand: string;
  industry: string;
  primaryContact: string;
  email: string;
  status: PipelineStage;
  relationshipScore: number;
  revenueGenerated: number;
}

export class SponsorService {
  private sponsors = new Map<string, SponsorSpec>();

  public createSponsor(
    workspaceId: string,
    company: string,
    brand: string,
    industry: string,
    primaryContact: string,
    email: string,
  ): SponsorSpec {
    const sp: SponsorSpec = {
      sponsorId: `sp-${Math.random().toString(36).substring(2, 8)}`,
      workspaceId,
      company,
      brand,
      industry,
      primaryContact,
      email,
      status: PipelineStage.NEGOTIATION,
      relationshipScore: 85.0,
      revenueGenerated: 12500,
    };
    this.sponsors.set(sp.sponsorId, sp);
    return sp;
  }

  public getSponsor(sponsorId: string): SponsorSpec | undefined {
    return this.sponsors.get(sponsorId);
  }
}
