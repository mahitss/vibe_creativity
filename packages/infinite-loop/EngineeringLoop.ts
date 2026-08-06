export interface EngineeringStageSpec {
  currentStage: string;
  nextStage: string;
}

export class EngineeringLoop {
  private stages = ["Imagine", "Build", "Ship", "Listen", "Learn", "Improve", "Repeat"];

  public advance(current: string): EngineeringStageSpec {
    const idx = this.stages.findIndex((s) => s.toLowerCase() === current.toLowerCase());
    const nextIdx = (idx + 1) % this.stages.length;
    return {
      currentStage: this.stages[idx >= 0 ? idx : 0],
      nextStage: this.stages[nextIdx],
    };
  }
}
