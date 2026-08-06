export enum PlatformType {
  YOUTUBE = "YOUTUBE",
  GITHUB = "GITHUB",
  DISCORD = "DISCORD",
  LINKEDIN = "LINKEDIN",
  INSTAGRAM = "INSTAGRAM",
  TIKTOK = "TIKTOK",
  TWITTER = "TWITTER",
  REDDIT = "REDDIT",
  RSS = "RSS",
  NOTION = "NOTION",
  GOOGLE_DRIVE = "GOOGLE_DRIVE",
  SLACK = "SLACK",
  EMAIL = "EMAIL",
  MCP_SERVER = "MCP_SERVER",
}

export enum ConnectorStatus {
  INSTALLED = "INSTALLED",
  AUTHENTICATED = "AUTHENTICATED",
  SYNCING = "SYNCING",
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  DISCONNECTED = "DISCONNECTED",
  ERROR = "ERROR",
}

export interface ConnectorHealthSpec {
  connected: boolean;
  status: ConnectorStatus;
  lastSync: string;
  latencyMs: number;
  failures: number;
  rateLimitRemaining: number;
}

export interface Connector {
  connect(credentials: Record<string, string>): Promise<boolean>;
  disconnect(): Promise<boolean>;
  refresh(): Promise<boolean>;
  sync(): Promise<{ recordsImported: number }>;
  deltaSync(cursor: string): Promise<{ recordsImported: number; newCursor: string }>;
  health(): Promise<ConnectorHealthSpec>;
  capabilities(): { supportsWebhooks: boolean; supportsDeltaSync: boolean };
  permissions(): string[];
}
