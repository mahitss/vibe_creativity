export interface MemoryExchangeSpec {
  schemaVersion: string;
  creatorId: string;
  memoryId: string;
  provenance: string;
  confidenceScore: number;
  encryptedContent: string;
}

export class MemoryExchangeFormat {
  public validateMemoryPayload(payload: any): boolean {
    return (
      typeof payload.memoryId === "string" &&
      typeof payload.creatorId === "string" &&
      typeof payload.confidenceScore === "number"
    );
  }
}
