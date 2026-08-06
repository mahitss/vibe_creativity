export interface AgentManifestSpec {
  manifestVersion: string;
  agentId: string;
  name: string;
  capabilities: string[];
  requiredPermissions: string[];
  author: string;
}

export class AgentManifestValidator {
  public validateManifest(manifest: AgentManifestSpec): boolean {
    return (
      manifest.manifestVersion === "1.0.0" &&
      Array.isArray(manifest.capabilities) &&
      Array.isArray(manifest.requiredPermissions)
    );
  }
}
