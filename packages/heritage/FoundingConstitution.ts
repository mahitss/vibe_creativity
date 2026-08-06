export interface PrincipleSpec {
  id: string;
  name: string;
  description: string;
}

export class FoundingConstitution {
  public getPrinciples(): PrincipleSpec[] {
    return [
      {
        id: "p-1",
        name: "Human-first AI",
        description:
          "Technology designed to empower and assist human creators, never replace them.",
      },
      {
        id: "p-2",
        name: "Transparency",
        description: "Every autonomous action and recommendation must explain itself.",
      },
      {
        id: "p-3",
        name: "Privacy",
        description: "Individual creator memories and data are never uploaded or shared.",
      },
      {
        id: "p-4",
        name: "Open standards",
        description: "Zero vendor lock-in with open memory and connector protocols.",
      },
      {
        id: "p-5",
        name: "Evidence-based decisions",
        description: "Zero hallucination; every action must cite persistent memory nodes.",
      },
      {
        id: "p-6",
        name: "Continuous learning",
        description: "Systems adapt safely over multi-decade horizons.",
      },
      {
        id: "p-7",
        name: "Community governance",
        description: "Stewarded by open community governance and transparent consensus.",
      },
    ];
  }
}
