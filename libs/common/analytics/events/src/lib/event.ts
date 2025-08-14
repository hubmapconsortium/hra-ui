/**
 * Unique symbol type used to store the payload on event types.
 * Doesn't need to be initialized as it should only ever be used as a type.
 */
declare const PAYLOAD: unique symbol;

/** Tiny helper to prettify intersection types */
type Prettify<T> = { [K in keyof T]: T[K] };

/** Event type with a payload */
export type EventType<T extends string, P> = T & { [PAYLOAD]: EventPayload<P> };
/** Any `EventType`. Primarily useful as a constraint for generics, i.e. `<T extends AnyEventType>` */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyEventType = EventType<string, any>;

/** Payload type that adds common event properties and generic properties to a user defined payload */
export type EventPayload<P> = Prettify<CommonEventProps & P & { [prop: string]: unknown }>;

/** Extract the payload of an event type */
export type EventPayloadFor<T> = T extends AnyEventType ? T[typeof PAYLOAD] : never;

/** Common event properties shared by all event types */
export interface CommonEventProps {
  /** Feature path for this event */
  path?: string;
  /** DOM event that triggered this event */
  trigger?: string;
}

/**
 * Create a new event type with the specified name and payload
 *
 * @param type Event type name
 * @param _payload Event payload
 * @returns A new event type
 */
export function createEventType<T extends string, P>(type: T, _payload: EventPayload<P>): EventType<T, P> {
  void _payload; // Suppress unused parameter warnings
  return type as EventType<T, P>;
}

/**
 * Create an event payload type.
 * Do **not** use the return value except as the second parameter to a `createEventType` call.
 *
 * @returns A payload type
 */
export function payload<P>(): EventPayload<P> {
  return undefined as unknown as EventPayload<P>;
}
