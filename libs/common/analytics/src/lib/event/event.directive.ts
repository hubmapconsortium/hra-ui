import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { EventPropsMap, EventType } from '@hra-ui/common/analytics/events';
import { injectAnalyticsLogEventFn } from '../analytics.service';

/** Built-in event triggers */
export type EventTrigger = keyof GlobalEventHandlersEventMap;

/**
 * Directive that log events to analytics whenever a built-in trigger event is dispatched
 * on the host element. It can also be configured for manual logging events programatically.
 *
 * @example <caption>Basic usage</caption>
 * <button [hraEvent]="EventType.Click" [hraEventProps]="{...}" >
 *
 * @example <caption>Different trigger</caption>
 * <button [hraEvent]="EventType.Click" [hraEventProps]="{...}" hraEventTriggerOn="dblclick" >
 *
 * @example <caption>Manual/custom logging</caption>
 * <button [hraEvent]="EventType.Click" [hraEventProps]="{...}" hraEventTriggerOn="custom" #eventDir="hraEvent"
 *   (hover)="eventDir.logEvent(...)" >
 */
@Directive({
  selector: '[hraEvent]',
  exportAs: 'hraEvent',
})
export class EventDirective<T extends EventType> {
  /** Event type */
  readonly event = input.required<T>({ alias: 'hraEvent' });
  /** Event properties */
  readonly props = input.required<EventPropsMap[T]>({ alias: 'hraEventProps' });
  /** Built-in trigger to log events on or 'custom' if events are sent programatically */
  readonly triggerOn = input<EventTrigger | 'custom' | undefined>(undefined, { alias: 'hraEventTriggerOn' });

  /** Reference to renderer for dom interactions */
  private readonly renderer = inject(Renderer2);
  /** Host element */
  private readonly el = inject(ElementRef).nativeElement;
  /** Raw logEvent function */
  private readonly logEvent_ = injectAnalyticsLogEventFn();

  /** Initialize the directive */
  constructor() {
    effect((onCleanup) => {
      const trigger = this.triggerOn() ?? this.selectTrigger(this.event());
      if (trigger && trigger !== 'custom') {
        const { el, renderer } = this;
        const handler = this.logEvent.bind(this, trigger);
        const dispose = renderer.listen(el, trigger, handler);
        onCleanup(dispose);
      }
    });
  }

  /**
   * Logs an event to analytics
   *
   * @param trigger Built-in event that triggered the call
   * @param event Event object
   */
  logEvent<E extends EventTrigger>(trigger?: E, event?: GlobalEventHandlersEventMap[E]): void {
    this.logEvent_(this.event(), {
      trigger: trigger,
      ...this.getPropsFromEvent(event),
      ...this.props(),
    });
  }

  /**
   * Selects a built-in trigger based on the event type
   *
   * @param _type Hra event type
   * @returns A built-in trigger for the event type or undefined
   */
  private selectTrigger(_type: EventType): EventTrigger | undefined {
    // TODO move to /events entrypoint
    return 'click';
  }

  /**
   * Extract properties from an event object
   *
   * @param _event Event object
   * @returns Extracted properties from the event
   */
  private getPropsFromEvent(_event?: unknown): Partial<EventPropsMap[T]> {
    // TODO
    return {};
  }
}
