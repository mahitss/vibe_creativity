import { ContextPackage, ContextIntent, TokenBudgetSize } from "./ContextAssembler";
import { ContextCache } from "./ContextCache";

export class ContextBuilder {
  private cache = new ContextCache();

  public buildPackage(
    workspaceId: string,
    intent: ContextIntent,
    budgetSize: TokenBudgetSize = TokenBudgetSize.MEDIUM,
  ): ContextPackage {
    const pkg: ContextPackage = {
      contextId: `ctx-${Math.random().toString(36).substring(2, 8)}`,
      workspaceId,
      mindId: `mind-${workspaceId}`,
      currentUser: "Creator User",
      currentGoals: ["Reach 100K Subscribers", "Secure Title Sponsor"],
      activeMissions: ["Publish React Part 5"],
      relevantMemories: [
        { id: "mem-101", content: "Audience requested Docker Masterclass", score: 0.94 },
        { id: "mem-102", content: "CloudCorp offer $15,000 pending review", score: 0.89 },
      ],
      recentEvents: ["CommentReceived", "MissionCreated"],
      knowledgeGraphNeighbors: ["Docker Course", "React Series", "CloudCorp"],
      communitySignals: ["142 comments requesting React Part 5"],
      sponsorSignals: ["CloudCorp $15,000 Title Read"],
      analyticsSummary: { avgRetention: "11m42s", growthRate: "+14.2%" },
      openWorkflows: ["Launch YouTube Series"],
      platformConnections: ["YouTube", "Discord"],
      currentTime: new Date().toISOString(),
      timezone: "UTC",
    };

    this.cache.set(pkg);
    return pkg;
  }

  public getCache(): ContextCache {
    return this.cache;
  }
}
