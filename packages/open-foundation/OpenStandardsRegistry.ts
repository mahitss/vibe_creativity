export interface OpenStandardSpec {
  specId: string;
  category: string;
  title: string;
  version: string;
  specUrl: string;
}

export class OpenStandardsRegistry {
  public getStandards(): OpenStandardSpec[] {
    return [
      {
        specId: "std-mem-1",
        category: "MEMORY_EXCHANGE",
        title: "OMNIA Open Memory Exchange Format (OMEF-1.0)",
        version: "1.0.0",
        specUrl: "https://foundation.omnia.ai/specs/omef-1.0",
      },
      {
        specId: "std-agent-1",
        category: "AGENT_MANIFEST",
        title: "OMNIA Agent Capability & Manifest Specification (OAC-1.0)",
        version: "1.0.0",
        specUrl: "https://foundation.omnia.ai/specs/oac-1.0",
      },
    ];
  }
}
