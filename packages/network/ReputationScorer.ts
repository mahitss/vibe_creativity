export class ReputationScorer {
  public calculateScore(reliability: number, quality: number, completionRate: number): number {
    return Math.min(100, Math.round(reliability * 0.4 + quality * 0.4 + completionRate * 0.2));
  }
}
