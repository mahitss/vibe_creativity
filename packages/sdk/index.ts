import { PluginManifestSpec, PluginType } from "../plugin-api";

export class OmniaPluginSDK {
  public validateManifest(manifest: PluginManifestSpec): boolean {
    return (
      manifest.pluginId.length > 0 && manifest.version.length > 0 && manifest.entryPoint.length > 0
    );
  }

  public registerPlugin(manifest: PluginManifestSpec): { pluginId: string; status: string } {
    if (!this.validateManifest(manifest)) {
      throw new Error("Invalid plugin manifest schema");
    }
    return { pluginId: manifest.pluginId, status: "REGISTERED" };
  }
}

export * from "../plugin-api";
