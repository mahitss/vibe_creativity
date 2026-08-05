import { OmniaEvent, EventType, EventCategory, EventPriority } from "./EventRegistry";
import { EventStore } from "./EventStore";

export type EventCallback = (event: OmniaEvent) => void | Promise<void>;

export class EventBus {
  private store = new EventStore();
  private subscribers = new Map<EventType, EventCallback[]>();

  public subscribe(eventType: EventType, callback: EventCallback): () => void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(callback);

    return () => {
      const subs = this.subscribers.get(eventType);
      if (subs) {
        this.subscribers.set(
          eventType,
          subs.filter((cb) => cb !== callback),
        );
      }
    };
  }

  public async publish(event: OmniaEvent): Promise<void> {
    this.store.append(event);
    const callbacks = this.subscribers.get(event.eventType) || [];

    for (const cb of callbacks) {
      try {
        await cb(event);
      } catch (error) {
        // Handle subscriber errors gracefully
      }
    }
  }

  public getStore(): EventStore {
    return this.store;
  }
}
