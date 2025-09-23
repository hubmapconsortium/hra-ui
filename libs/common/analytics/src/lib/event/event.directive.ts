import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import {
  AnalyticsEvent,
  CoreEvents,
  EventPayloadFor,
  EventPropsFor,
  EventTrigger,
  EventTriggerPayloadFor,
} from '@hra-ui/common/analytics/events';
import { EMPTY } from 'rxjs';
import { UnknownRecord } from 'type-fest';
import { injectLogEvent } from '../analytics/analytics.service';

/** Shared base implementation for event directives */
@Directive()
export abstract class BaseEventDirective<T extends AnalyticsEvent> {
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
        onCleanup(unlisten);
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

/** A list of property keys or a filter function */
export type ModelChangeFilter = PropertyKey[] | ((value: unknown) => unknown);
/** Either additional event props or a model value filter */
export type ModelChangePropsOrFilter = EventPropsFor<CoreEvents['ModelChange']> | ModelChangeFilter;

/** Unique value to indicate that a value has not been set */
const NOT_SET_VALUE = Symbol('not set');

/**
 * Specialized version of `hraEvent` that only emits when a NgControl's value changes
 *
 * @see {@link EventDirective}
 */
@Directive({
  selector: '[hraModelChangeEvent]',
  exportAs: 'hraModelChangeEvent',
})
export class ModelChangeEventDirective extends BaseEventDirective<CoreEvents['ModelChange']> {
  /** Event type */
  override readonly event = () => CoreEvents.ModelChange;
  /** Event props or a model value filter */
  readonly propsOrFilter = input<ModelChangePropsOrFilter>('', { alias: 'hraModelChangeEvent' });
  /** Always triggered programatically */
  override readonly triggerOn = () => 'none' as const;
  /** Whether this event is disabled */
  override readonly disabled = input(false, { alias: 'hraModelChangeEventDisabled', transform: booleanAttribute });

  /** Model control reference */
  private readonly ngControl = inject(NgControl);

  /** Latest model value */
  private readonly value = toSignal(this.ngControl.valueChanges ?? EMPTY, { initialValue: NOT_SET_VALUE });

  /** Event properties */
  override readonly props = computed(() => this.selectProps(this.value(), this.propsOrFilter()));

  /** Setup model value change listeners */
  constructor() {
    super();
    effect(() => {
      if (this.value() !== NOT_SET_VALUE) {
        untracked(() => this.logEvent());
      }
    });
  }

  /**
   * Selects event properties based on the current model value
   *
   * @param value Latest model value
   * @param propsOrFilter Additional event properties or a value filter
   * @returns Event properties
   */
  private selectProps(
    value: unknown,
    propsOrFilter: ModelChangePropsOrFilter,
  ): EventPayloadFor<CoreEvents['ModelChange']> {
    if (propsOrFilter === '') {
      return { value };
    } else if (typeof propsOrFilter === 'function') {
      return { value: propsOrFilter(value) };
    } else if (typeof propsOrFilter === 'object' && !Array.isArray(propsOrFilter)) {
      return { value, ...propsOrFilter };
    } else if (value === undefined || value === null) {
      return {};
    }

    const source = value as UnknownRecord;
    const result: UnknownRecord = {};
    for (const key of propsOrFilter) {
      if (key in source) {
        result[key] = source[key];
      }
    }

    return { value: result };
  }
}
