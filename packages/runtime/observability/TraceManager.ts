export enum SpanType {
  RUNTIME = "RUNTIME",
  AGENT = "AGENT",
  MEMORY = "MEMORY",
  WORKFLOW = "WORKFLOW",
  TOOL = "TOOL",
  DATABASE = "DATABASE",
  LLM = "LLM",
  KNOWLEDGE_GRAPH = "KNOWLEDGE_GRAPH",
  SCHEDULER = "SCHEDULER",
  NOTIFICATION = "NOTIFICATION",
}

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL",
}

export interface TraceSpan {
  spanId: string;
  traceId: string;
  parentSpanId?: string;
  spanType: SpanType;
  name: string;
  startTime: string;
  endTime?: string;
  durationMs: number;
  status: string;
  metadata: Record<string, unknown>;
}

export interface SystemTrace {
  traceId: string;
  workspaceId: string;
  workflowId?: string;
  correlationId: string;
  spans: TraceSpan[];
  startTime: string;
  endTime?: string;
  durationMs: number;
  status: string;
}
