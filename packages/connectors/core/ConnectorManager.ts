import { PlatformType, ConnectorStatus, ConnectorHealthSpec } from "./Connector";

export class ConnectorManager {
  private installedConnectors = new Map<
    string,
    { platform: PlatformType; status: ConnectorStatus; cursor: string }
  >();

  public installConnector(
    workspaceId: string,
    platform: PlatformType,
  ): { connectorId: string; status: ConnectorStatus } {
    const connectorId = `conn-${platform.toLowerCase()}-${Math.random().toString(36).substring(2, 8)}`;
    this.installedConnectors.set(connectorId, {
      platform,
      status: ConnectorStatus.AUTHENTICATED,
      cursor: "checkpoint-001",
    });

    return { connectorId, status: ConnectorStatus.AUTHENTICATED };
  }

  public getStatus(connectorId: string): ConnectorHealthSpec | undefined {
    const conn = this.installedConnectors.get(connectorId);
    if (!conn) return undefined;

    return {
      connected: true,
      status: conn.status,
      lastSync: new Date().toISOString(),
      latencyMs: 42.5,
      failures: 0,
      rateLimitRemaining: 4950,
    };
  }
}
