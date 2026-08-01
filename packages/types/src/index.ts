export type EntityId = string & { readonly __brand: "EntityId" };

export type ISODateTime = string & { readonly __brand: "ISODateTime" };

export type Result<T, E extends Error = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly error: E; readonly ok: false };

export interface DomainEvent {
  readonly aggregateId: EntityId;
  readonly occurredAt: ISODateTime;
  readonly type: string;
}

