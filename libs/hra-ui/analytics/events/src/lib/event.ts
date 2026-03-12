import { Tagged } from 'type-fest';
import { EventPayloadContainer } from './payload';
import { EventTrigger } from './trigger';

/** Event type */
export type EventType = Tagged<string, 'EventType'>;

/** Event categories used to filter events based on privacy settings */
export enum EventCategory {
  Necessary = 'necessary',
  Statistics = 'statistics',
  Preferences = 'preferences',
  Marketing = 'marketing',
}

/** An event specification */
export interface AnalyticsEvent<P = object> extends EventPayloadContainer<P> {
  /** Event type */
  type: EventType;
  /** Event category */
  category: EventCategory;
  /** Event default trigger */
  trigger?: EventTrigger;
}

/**
 * Create a new event specification.
 *
 * @template P Event payload type
 * @param type Event type
 * @param category Event category
 * @param trigger Default event trigger
 * @returns A new event specification
 */
export function createEvent<P>(type: string, category: EventCategory, trigger?: EventTrigger): AnalyticsEvent<P> {
  return { type: type as EventType, category, trigger };
}
