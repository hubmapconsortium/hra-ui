/**
 * Unique symbol type used to store the payload on event types.
 * Doesn't need to be initialized as it should only ever be used as a type.
 */
declare const PAYLOAD: unique symbol;

/** Tiny helper to prettify intersection types */
type Prettify<T> = { [K in keyof T]: T[K] };

/** Event type with a payload */
export type AnalyticsEvent<T extends string, P> = T & { [PAYLOAD]: AnalyticsEventPayload<P> };
/** Any `AnalyticsEvent`. Primarily useful as a constraint for generics, i.e. `<T extends AnyAnalyticsEvent>` */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyAnalyticsEvent = AnalyticsEvent<string, any>;

/** Payload type that adds common event properties and generic properties to a user defined payload */
export type AnalyticsEventPayload<P> = Prettify<CommonAnalyticsEventProps & P & { [prop: string]: unknown }>;

/** Extract the payload of an event type */
export type AnalyticsEventPayloadFor<T> = T extends AnyAnalyticsEvent ? T[typeof PAYLOAD] : never;

/** Common event properties shared by all event types */
export interface CommonAnalyticsEventProps {
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
export function createEvent<T extends string, P>(type: T, _payload: AnalyticsEventPayload<P>): AnalyticsEvent<T, P> {
  void _payload; // Suppress unused parameter warnings
  return type as AnalyticsEvent<T, P>;
}

/**
 * Create an event payload type.
 * Do **not** use the return value except as the second parameter to a `createEventType` call.
 *
 * @returns A payload type
 */
export function payload<P>(): AnalyticsEventPayload<P> {
  return undefined as unknown as AnalyticsEventPayload<P>;
}
