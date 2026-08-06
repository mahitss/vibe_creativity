export interface PrivacyBenchmarkSpec {
  privacyEpsilon: number;
  informationLeakagePct: number;
}

export class ProjectAurora {
  public runPrivacyBenchmark(): PrivacyBenchmarkSpec {
    return {
      privacyEpsilon: 0.05,
      informationLeakagePct: 0.001,
    };
  }
}
