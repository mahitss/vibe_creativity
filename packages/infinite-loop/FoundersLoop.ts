export interface FoundersStageSpec {
  currentStage: string;
  nextStage: string;
}

export class FoundersLoop {
  private stages = [
    "Vision",
    "Prototype",
    "Users",
    "Feedback",
    "Iteration",
    "Growth",
    "New Vision",
  ];

  public advance(current: string): FoundersStageSpec {
    const idx = this.stages.findIndex((s) => s.toLowerCase() === current.toLowerCase());
    const nextIdx = (idx + 1) % this.stages.length;
    return {
      currentStage: this.stages[idx >= 0 ? idx : 0],
      nextStage: this.stages[nextIdx],
    };
  }
}
