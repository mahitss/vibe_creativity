export interface EcosystemTrendSpec {
  trendId: string;
  category: string;
  title: string;
  growthPct: number;
  sampleSize: number;
}

export interface PeerBenchmarkSpec {
  benchmarkId: string;
  niche: string;
  metricName: string;
  creatorPercentile: number;
  industryAverage: number;
}

export class TrendEngine {
  public getTopTrends(): EcosystemTrendSpec[] {
    return [
      {
        trendId: "tr-101",
        category: "CREATOR_NICHE",
        title: "Autonomous Multi-Agent AI System Tutorials",
        growthPct: 148.5,
        sampleSize: 1420,
      },
    ];
  }
}
