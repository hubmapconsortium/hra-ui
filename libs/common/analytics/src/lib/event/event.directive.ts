import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { AnalyticsEvent, EventPayloadFor, EventTrigger } from '@hra-ui/common/analytics/events';
import { injectLogEvent } from '../analytics.service';

/**
 * Directive that log events to analytics whenever a built-in trigger event is dispatched
 * on the host element. It can also be configured for manual logging events programatically.
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
export class EventDirective<T extends AnalyticsEvent> {
  /** Event type */
  readonly event = input.required<T>({ alias: 'hraEvent' });
  /** Event properties */
  readonly props = input.required<EventPayloadFor<T>>({ alias: 'hraEventProps' });
  /** Built-in trigger to log events on or 'none' if events are sent programatically */
  readonly triggerOn = input<EventTrigger | 'none' | undefined>(undefined, { alias: 'hraEventTriggerOn' });

  /** Reference to renderer for dom interactions */
  private readonly renderer = inject(Renderer2);
  /** Host element */
  private readonly el = inject(ElementRef).nativeElement;
  /** Raw logEvent function */
  private readonly logEvent_ = injectLogEvent()<T>;

  /** Initialize the directive */
  constructor() {
    effect((onCleanup) => {
      const trigger = this.triggerOn() ?? this.event().trigger ?? 'click';
      if (trigger !== 'none') {
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
      triggerData: this.getPropsFromEvent(event),
      ...this.props(),
    });
  }

  /**
   * Extract properties from an event object
   *
   * @param _event Event object
   * @returns Extracted properties from the event
   */
  private getPropsFromEvent(_event?: unknown): Partial<unknown> {
    // TODO move
    return {};
  }
}
