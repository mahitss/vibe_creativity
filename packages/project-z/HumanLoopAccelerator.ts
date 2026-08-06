export interface HumanLoopSpec {
  cycleId: string;
  creatorId: string;
  currentStage: string;
  nextStage: string;
  accelerationFactor: number;
  destinationDefinedByHuman: boolean;
}

export class HumanLoopAccelerator {
  private stages = ["DREAM", "IMAGINE", "PLAN", "CREATE", "LEARN", "REFLECT", "TEACH", "INSPIRE"];

  public advanceStage(currentStage: string, creatorId: string): HumanLoopSpec {
    const idx = this.stages.indexOf(currentStage.toUpperCase());
    const nextIdx = (idx + 1) % this.stages.length;
    return {
      cycleId: `loop-${Math.random().toString(36).substring(2, 8)}`,
      creatorId,
      currentStage: this.stages[idx >= 0 ? idx : 0],
      nextStage: this.stages[nextIdx],
      accelerationFactor: 14.2,
      destinationDefinedByHuman: true,
    };
  }
}
