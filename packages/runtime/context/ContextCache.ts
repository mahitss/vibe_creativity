import { ContextPackage } from "./ContextAssembler";

export class ContextCache {
  private cache = new Map<string, ContextPackage>();
  private hits = 0;
  private misses = 0;

  public get(id: string): ContextPackage | undefined {
    const pkg = this.cache.get(id);
    if (pkg) {
      this.hits += 1;
      return pkg;
    }
    this.misses += 1;
    return undefined;
  }

  public set(pkg: ContextPackage): void {
    this.cache.set(pkg.contextId, pkg);
  }

  public clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  public stats(): { size: number; hits: number; misses: number; hitRate: number } {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? this.hits / total : 0,
    };
  }
}
