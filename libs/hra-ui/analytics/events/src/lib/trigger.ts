/** Union of all builtin dom event names */
export type DOMEventName = keyof GlobalEventHandlersEventMap;

/** Modifiers that can be prepended to event names to change their scope */
export type EventTriggerModifier = 'window:' | 'document:' | 'body:';

/** A source DOM event that's triggering a corresponding analytics event */
export type EventTrigger<E extends DOMEventName = DOMEventName> = E | `${EventTriggerModifier}${E}`;

/** The payload for a given DOM event */
export type EventTriggerPayload<T extends DOMEventName = DOMEventName> = GlobalEventHandlersEventMap[T];

/** Extract the payload type for a given event trigger */
export type EventTriggerPayloadFor<T> = T extends EventTrigger<infer E> ? EventTriggerPayload<E> : never;
