import { AgentManifest, AgentCapability } from "./AgentManifest";
import { DependencyResolver } from "./DependencyResolver";

export class AgentRegistry {
  private agents = new Map<string, AgentManifest>();
  private dependencyResolver = new DependencyResolver();

  public register(manifest: AgentManifest): void {
    this.agents.set(manifest.id, Object.freeze({ ...manifest }));
  }

  public get(id: string): AgentManifest | undefined {
    return this.agents.get(id);
  }

  public getAll(): AgentManifest[] {
    return Array.from(this.agents.values());
  }

  public getByCapability(capability: AgentCapability): AgentManifest[] {
    return this.getAll().filter((a) => a.capabilities.includes(capability));
  }

  public getStartupOrder(): AgentManifest[] {
    return this.dependencyResolver.resolveStartupOrder(this.getAll());
  }
}
