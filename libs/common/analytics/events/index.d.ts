import * as _hra_ui_common_analytics_events from '@hra-ui/common/analytics/events';
import { Tagged, HasRequiredKeys, OmitIndexSignature, RemovePrefix } from 'type-fest';

/** Core events type map */
type CoreEvents = typeof CoreEvents;
/** Core events for use in all applications */
declare const CoreEvents: {
    readonly Click: _hra_ui_common_analytics_events.AnalyticsEvent<object>;
    readonly DoubleClick: _hra_ui_common_analytics_events.AnalyticsEvent<object>;
    readonly Error: _hra_ui_common_analytics_events.AnalyticsEvent<_hra_ui_common_analytics_events.ErrorEventProps>;
    readonly Hover: _hra_ui_common_analytics_events.AnalyticsEvent<object>;
    readonly Keyboard: _hra_ui_common_analytics_events.AnalyticsEvent<object>;
    readonly ModelChange: _hra_ui_common_analytics_events.AnalyticsEvent<_hra_ui_common_analytics_events.ModelChangeEventProps>;
    readonly PageView: _hra_ui_common_analytics_events.AnalyticsEvent<_hra_ui_common_analytics_events.PageViewEventProps>;
};

/** Tiny helper to prettify intersection types */
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

/**
 * Unique symbol type used to store the payload type in event objects.
 * Doesn't need to be initialized as it should only ever be used as a type.
 */
declare const PAYLOAD: unique symbol;
/** Event type */
type EventType = Tagged<string, 'EventType'>;
/** Categories used to filter events */
declare enum EventCategory {
    Necessary = "necessary",
    Statistics = "statistics",
    Preferences = "preferences",
    Marketing = "marketing"
}
/** Union of all builtin dom events */
type DOMEvent = keyof GlobalEventHandlersEventMap;
/** Modifiers that can be applied to triggers */
type EventTriggerModifier = 'window:' | 'document:' | 'body:';
/** DOM events that can trigger an analytics events */
type EventTrigger<E extends DOMEvent = DOMEvent> = E | `${EventTriggerModifier}${E}`;
/** DOM event data for a trigger */
type EventTriggerPayloadFor<T> = T extends EventTrigger ? GlobalEventHandlersEventMap[RemovePrefix<T, EventTriggerModifier> & DOMEvent] : never;
/** Event payload */
type EventPayload<P> = Prettify<CommonEventProps & {
    [K in keyof P]: P[K];
} & {
    [key: string]: unknown;
}>;
/** Extract the event payload */
type EventPayloadFor<T> = T extends AnalyticsEvent ? NonNullable<T[typeof PAYLOAD]> : never;
/** Same as the event payload or the empty string if all payload properties are optional */
type EventPropsFor<T extends AnalyticsEvent> = EventPayloadFor<T> | (HasRequiredKeys<OmitIndexSignature<EventPayloadFor<T>>> extends true ? never : '');
/** An event specification */
interface AnalyticsEvent<P = object> {
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
interface CommonEventProps {
    /** Feature path for this event */
    path?: string;
    /** DOM event that triggered this event */
    trigger?: string;
    /** DOM event data */
    triggerData?: Event;
}
/**
 * Create a new event
 *
 * @param type Event type
 * @param category Event category
 * @param trigger Default event trigger
 * @returns A new event
 */
declare function createEvent<P>(type: string, category: EventCategory, trigger?: EventTrigger): AnalyticsEvent<P>;

/** Click event properties */
type ClickEventProps = object;

/** Error event properties */
interface ErrorEventProps {
    /** An error message */
    message: string;
    /** Contextual data */
    context?: unknown;
    /** Reason for the error (usually an `Error` object) */
    reason?: unknown;
}

/** Hover event properties */
type HoverEventProps = object;

/** Keyboard event properties */
type KeyboardEventProps = object;

/** Model change event properties */
interface ModelChangeEventProps {
    /** Model value */
    value?: unknown;
}

/**
 * Page view properties
 * Provided by [`analytics`](https://github.com/DavidWells/analytics/blob/analytics%400.8.19/packages/analytics-core/src/modules/page.js#L54)
 */
interface PageViewEventProps {
    /** Page title */
    title: string;
    /** Page origin */
    url: string;
    /** Current path */
    path: string;
    /** Current hash */
    hash: string;
    /** Current search (query parameters) */
    search: string;
    /** Viewport width at time of event */
    width: number;
    /** Viewport height at time of event */
    height: number;
    /** Referrer page */
    referrer?: string;
}

export { CoreEvents, EventCategory, createEvent };
export type { AnalyticsEvent, ClickEventProps, CommonEventProps, ErrorEventProps, EventPayload, EventPayloadFor, EventPropsFor, EventTrigger, EventTriggerModifier, EventTriggerPayloadFor, EventType, HoverEventProps, KeyboardEventProps, ModelChangeEventProps, PageViewEventProps };
