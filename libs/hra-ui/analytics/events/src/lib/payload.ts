import { HasRequiredKeys, Simplify } from 'type-fest';

/**
 * Unique symbol used to store payload type information.
 * No need to initialize as it is only ever used in type contexts.
 */
declare const PAYLOAD: unique symbol;

/** Whether the payload has no required properties */
type SupportsEmptyPayload<P> = P extends object ? (HasRequiredKeys<P> extends true ? false : true) : false;

/** Common properties that may be available on any analytics event */
export interface CommonEventProps {
  /** Full feature path to the triggering component */
  path?: string;
  /** The underlying (usually DOM) event that triggered analytics */
  trigger?: string;
  /** Additional data related to the triggering event */
  triggerData?: Event;
}

/**
 * A container type with payload type information.
 * Used to bind the payload type to an event type without
 * requiring an actual payload property on event objects.
 */
export interface EventPayloadContainer<P> {
  /**
   * Payload type. Not actually present on event objects.
   * @private
   */
  [PAYLOAD]?: EventPayload<P>;
}

/** Event payload type with common and event specific properties */
export type EventPayload<P> = Simplify<CommonEventProps & P & Record<string, unknown>>;

/** Extract the payload type for an event */
export type EventPayloadFor<T> = T extends EventPayloadContainer<infer P> ? EventPayload<P> : never;

/**
 * Event properties type, which is either the full payload or an empty string if the payload has no required properties.
 * Used by event directives to allow omitting the payload argument when all payload properties are optional.
 */
export type EventProps<P> = EventPayload<P> | (SupportsEmptyPayload<P> extends true ? '' : never);

/** Extract the properties type for an event */
export type EventPropsFor<T> = T extends EventPayloadContainer<infer P> ? EventProps<P> : never;
