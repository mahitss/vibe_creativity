export interface ProtocolMessageSpec {
  msgId: string;
  protocolType: string;
  senderRuntime: string;
  receiverRuntime: string;
  payload: any;
  signature: string;
}

export class EcosystemProtocol {
  public dispatchMessage(msg: ProtocolMessageSpec): boolean {
    return (
      typeof msg.msgId === "string" &&
      typeof msg.senderRuntime === "string" &&
      typeof msg.signature === "string"
    );
  }
}
