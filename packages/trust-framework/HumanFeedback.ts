export enum FeedbackAction {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  REQUEST_MORE_EVIDENCE = "REQUEST_MORE_EVIDENCE",
  CHALLENGE_ASSUMPTION = "CHALLENGE_ASSUMPTION",
  PROVIDE_CORRECTION = "PROVIDE_CORRECTION",
}

export interface HumanFeedbackItemSpec {
  feedbackId: string;
  cardId: string;
  actorId: string;
  action: FeedbackAction;
  correctionNotes: string;
}

export class HumanFeedback {
  private feedbackLog: HumanFeedbackItemSpec[] = [];

  public recordFeedback(
    cardId: string,
    actorId: string,
    action: FeedbackAction,
    correctionNotes: string,
  ): HumanFeedbackItemSpec {
    const item: HumanFeedbackItemSpec = {
      feedbackId: `fb-${Math.random().toString(36).substring(2, 8)}`,
      cardId,
      actorId,
      action,
      correctionNotes,
    };
    this.feedbackLog.push(item);
    return item;
  }
}
