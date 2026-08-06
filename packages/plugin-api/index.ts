export enum PluginType {
  AGENT = "AGENT",
  TOOL = "TOOL",
  CONNECTOR = "CONNECTOR",
  WORKFLOW = "WORKFLOW",
  UI_EXTENSION = "UI_EXTENSION",
  MEMORY_PROCESSOR = "MEMORY_PROCESSOR",
}

export interface PluginManifestSpec {
  pluginId: string;
  version: string;
  author: string;
  description: string;
  permissions: string[];
  capabilities: string[];
  dependencies: Record<string, string>;
  entryPoint: string;
}
