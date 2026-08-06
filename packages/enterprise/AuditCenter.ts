export interface AuditEventSpec {
  auditId: string;
  orgId: string;
  workspaceId: string;
  actorId: string;
  action: string;
  details: string;
  timestamp: string;
}

export class AuditCenter {
  private events: AuditEventSpec[] = [];

  public logEvent(
    orgId: string,
    workspaceId: string,
    actorId: string,
    action: string,
    details: string,
  ): AuditEventSpec {
    const evt: AuditEventSpec = {
      auditId: `aud-${Math.random().toString(36).substring(2, 8)}`,
      orgId,
      workspaceId,
      actorId,
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    this.events.push(evt);
    return evt;
  }
}
