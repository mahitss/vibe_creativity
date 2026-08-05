import { OmniaEvent, EventType, EventCategory } from "./EventRegistry";

export class EventStore {
  private events: OmniaEvent[] = [];

  public append(event: OmniaEvent): void {
    this.events.push(Object.freeze({ ...event }));
  }

  public getHistory(filter?: {
    workspaceId?: string;
    eventType?: EventType;
    category?: EventCategory;
    limit?: number;
  }): OmniaEvent[] {
    let result = [...this.events];

    if (filter?.workspaceId) {
      result = result.filter((e) => e.workspaceId === filter.workspaceId);
    }
    if (filter?.eventType) {
      result = result.filter((e) => e.eventType === filter.eventType);
    }
    if (filter?.category) {
      result = result.filter((e) => e.category === filter.category);
    }

    if (filter?.limit) {
      result = result.slice(-filter.limit);
    }

    return result;
  }

  public clear(): void {
    this.events = [];
  }
}
