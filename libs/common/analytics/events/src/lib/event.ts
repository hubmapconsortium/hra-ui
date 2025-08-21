import { Brand, Prettify } from './util/types';

/**
 * Unique symbol type used to store the payload type in event objects.
 * Doesn't need to be initialized as it should only ever be used as a type.
 */
declare const PAYLOAD: unique symbol;

/** Event type */
export type EventType = string & Brand<'EventType'>;

/** Categories used to filter events */
export enum EventCategory {
  Necessary = 'necessary',
  Statistics = 'statistics',
  Preferences = 'preferences',
  Marketing = 'marketing',
}

/** DOM events that can trigger an analytics events */
export type EventTrigger = keyof GlobalEventHandlersEventMap;

/** Event payload */
export type EventPayload<P> = Prettify<CommonEventProps & { [K in keyof P]: P[K] } & { [key: string]: unknown }>;

/** Extract the event payload */
export type EventPayloadFor<T> = T extends AnalyticsEvent ? NonNullable<T[typeof PAYLOAD]> : never;

/** An event specification */
export interface AnalyticsEvent<P = object> {
  /** Event type */
  type: EventType;
  /** Event category */
  category: EventCategory;
  /** Event default trigger */
  trigger?: EventTrigger;
  /** Payload type. Never actually present on an event object */
  [PAYLOAD]?: EventPayload<P>;
}

/** Common event properties shared by all events */
export interface CommonEventProps {
  /** Feature path for this event */
  path?: string;
  /** DOM event that triggered this event */
  trigger?: string;
  /** DOM event data */
  triggerData?: Record<string, unknown>;
}

/**
 * Create a new event
 *
 * @param type Event type
 * @param category Event category
 * @param trigger Default event trigger
 * @returns A new event
 */
export function createEvent<P>(type: string, category: EventCategory, trigger?: EventTrigger): AnalyticsEvent<P> {
  return { type: type as EventType, category, trigger };
}
