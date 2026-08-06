export interface DevelopersStageSpec {
  currentStage: string;
  nextStage: string;
}

export class DevelopersLoop {
  private stages = [
    "Write Code",
    "Test",
    "Debug",
    "Review",
    "Deploy",
    "Monitor",
    "Refactor",
    "Write Better Code",
  ];

  public advance(current: string): DevelopersStageSpec {
    const idx = this.stages.findIndex((s) => s.toLowerCase() === current.toLowerCase());
    const nextIdx = (idx + 1) % this.stages.length;
    return {
      currentStage: this.stages[idx >= 0 ? idx : 0],
      nextStage: this.stages[nextIdx],
    };
  }
}
