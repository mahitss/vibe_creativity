export class PrivacyEngine {
  private minSampleSize = 100;

  public isPrivacySafe(sampleSize: number): boolean {
    return sampleSize >= this.minSampleSize;
  }
}
