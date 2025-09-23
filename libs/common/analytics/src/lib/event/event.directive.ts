import { booleanAttribute, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import {
  AnalyticsEvent,
  CoreEvents,
  EventPayloadFor,
  EventPropsFor,
  EventTrigger,
  EventTriggerPayloadFor,
} from '@hra-ui/common/analytics/events';
import { injectLogEvent } from '../analytics/analytics.service';

/** Shared base implementation for event directives */
@Directive()
abstract class BaseEventDirective<T extends AnalyticsEvent> {
  /** Event type */
  abstract readonly event: () => T;
  /** Event properties */
  abstract readonly props: () => EventPropsFor<T>;
  /** Built-in trigger to log events on or 'none' if events are sent programatically */
  abstract readonly triggerOn: () => EventTrigger | 'none' | undefined;
  /** Whether this event is disabled */
  abstract readonly disabled: () => boolean;

  /** Reference to renderer for dom interactions */
  private readonly renderer = inject(Renderer2);
  /** Host element */
  private readonly el = inject(ElementRef).nativeElement;
  /** Raw logEvent function */
  private readonly logEvent_ = injectLogEvent();

  /** Initialize the directive */
  constructor() {
    effect((onCleanup) => {
      const trigger = this.triggerOn() ?? this.event().trigger ?? 'click';
      if (trigger !== 'none' && !this.disabled()) {
        const { el, renderer } = this;
        const handler = this.logEvent.bind(this, trigger);
        const unlisten = renderer.listen(el, trigger, handler);
        // Delay cleanup to avoid issues with Angular destroying the element before the event is fully processed
        onCleanup(() => setTimeout(() => unlisten()));
      }
    });
  }

  /**
   * Logs an event to analytics
   *
   * @param trigger Built-in event that triggered the call
   * @param event Event object
   */
  logEvent<E extends EventTrigger>(trigger?: E, event?: EventTriggerPayloadFor<E>): void {
    const props = this.props();
    this.logEvent_(this.event(), {
      trigger: trigger,
      triggerData: event,
      ...(props !== '' ? props : ({} as EventPayloadFor<T>)),
    });
  }
}

/**
 * Directive that log events to analytics whenever a built-in trigger event is dispatched
 * on the host element. It can also be configured for manual logging.
 *
 * @example <caption>Basic usage</caption>
 * ```html
 * <button [hraEvent]="EventType.Click" [hraEventProps]="{...}" >
 * ```
 *
 * @example <caption>Different trigger</caption>
 * ```html
 * <button [hraEvent]="EventType.Click" [hraEventProps]="{...}" hraEventTriggerOn="dblclick" >
 * ```
 *
 * @example <caption>Manual logging</caption>
 * ```html
 * <button [hraEvent]="EventType.Click" [hraEventProps]="{...}" hraEventTriggerOn="none" #eventDir="hraEvent"
 *   (hover)="eventDir.logEvent(...)" >
 * ```
 */
@Directive({
  selector: '[hraEvent]',
  exportAs: 'hraEvent',
})
export class EventDirective<T extends AnalyticsEvent> extends BaseEventDirective<T> {
  /** Event type */
  override readonly event = input.required<T>({ alias: 'hraEvent' });
  /** Event properties */
  override readonly props = input.required<EventPropsFor<T>>({ alias: 'hraEventProps' });
  /** Built-in trigger to log events on or 'none' if events are sent programatically */
  override readonly triggerOn = input<EventTrigger | 'none' | undefined>(undefined, { alias: 'hraEventTriggerOn' });
  /** Whether this event is disabled */
  override readonly disabled = input(false, { alias: 'hraEventDisabled', transform: booleanAttribute });
}

/**
 * Specialized version of `hraEvent` that only emits click events
 *
 * @see {@link EventDirective}
 */
@Directive({
  selector: '[hraClickEvent]',
  exportAs: 'hraClickEvent',
})
export class ClickEventDirective extends BaseEventDirective<CoreEvents['Click']> {
  /** Event type */
  override readonly event = () => CoreEvents.Click;
  /** Event properties */
  override readonly props = input<EventPropsFor<CoreEvents['Click']>>('', { alias: 'hraClickEvent' });
  /** 'none' if events are sent programatically */
  override readonly triggerOn = input<'none' | undefined>(undefined, { alias: 'hraClickEventTriggerOn' });
  /** Whether this event is disabled */
  override readonly disabled = input(false, { alias: 'hraClickEventDisabled', transform: booleanAttribute });
}

/**
 * Specialized version of `hraEvent` that only emits hover events
 *
 * @see {@link EventDirective}
 */
@Directive({
  selector: '[hraHoverEvent]',
  exportAs: 'hraHoverEvent',
})
export class HoverEventDirective extends BaseEventDirective<CoreEvents['Hover']> {
  /** Event type */
  override readonly event = () => CoreEvents.Hover;
  /** Event properties */
  override readonly props = input<EventPropsFor<CoreEvents['Hover']>>('', { alias: 'hraHoverEvent' });
  /** 'none' if events are sent programatically */
  override readonly triggerOn = input<'none' | undefined>(undefined, { alias: 'hraHoverEventTriggerOn' });
  /** Whether this event is disabled */
  override readonly disabled = input(false, { alias: 'hraHoverEventDisabled', transform: booleanAttribute });
}

/**
 * Specialized version of `hraEvent` that only emits double click events
 *
 * @see {@link EventDirective}
 */
@Directive({
  selector: '[hraDoubleClickEvent]',
  exportAs: 'hraDoubleClickEvent',
})
export class DoubleClickEventDirective extends BaseEventDirective<CoreEvents['DoubleClick']> {
  /** Event type */
  override readonly event = () => CoreEvents.DoubleClick;
  /** Event properties */
  override readonly props = input<EventPropsFor<CoreEvents['DoubleClick']>>('', { alias: 'hraDoubleClickEvent' });
  /** 'none' if events are sent programatically */
  override readonly triggerOn = input<'none' | undefined>(undefined, { alias: 'hraDoubleClickEventTriggerOn' });
  /** Whether this event is disabled */
  override readonly disabled = input(false, { alias: 'hraDoubleClickEventDisabled', transform: booleanAttribute });
}
