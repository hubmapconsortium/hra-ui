import * as i0 from '@angular/core';
import { AfterViewInit, Signal, EnvironmentProviders } from '@angular/core';
import * as _hra_ui_common_analytics_events from '@hra-ui/common/analytics/events';
import { AnalyticsEvent, EventPropsFor, EventTrigger, EventTriggerPayloadFor, EventPayloadFor, CoreEvents, EventCategory, EventType } from '@hra-ui/common/analytics/events';
import { PageData, AnalyticsPlugin } from 'analytics';
import { ProviderFeature } from '@hra-ui/common/util/providers';

/** Configuration for the analytics error handler */
interface AnalyticsErrorHandlerConfig {
    /** Whether to log errors to console in addition to analytics */
    console?: boolean;
}

/** Shared base implementation for event directives */
declare abstract class BaseEventDirective<T extends AnalyticsEvent> {
    /** Event type */
    abstract readonly event: () => T;
    /** Event properties */
    abstract readonly props: () => EventPropsFor<T>;
    /** Built-in trigger to log events on or 'none' if events are sent programatically */
    abstract readonly triggerOn: () => EventTrigger | 'none' | undefined;
    /** Whether this event is disabled */
    abstract readonly disabled: () => boolean;
    /** Reference to renderer for dom interactions */
    private readonly renderer;
    /** Host element */
    private readonly el;
    /** Raw logEvent function */
    private readonly logEvent_;
    /** Initialize the directive */
    constructor();
    /**
     * Logs an event to analytics
     *
     * @param trigger Built-in event that triggered the call
     * @param event Event object
     * @param extraProps Additional event properties
     */
    logEvent<E extends EventTrigger>(trigger?: E, event?: EventTriggerPayloadFor<E>, extraProps?: Partial<EventPayloadFor<T>>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseEventDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseEventDirective<any>, never, never, {}, {}, never, never, true, never>;
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
declare class EventDirective<T extends AnalyticsEvent> extends BaseEventDirective<T> {
    /** Event type */
    readonly event: i0.InputSignal<T>;
    /** Event properties */
    readonly props: i0.InputSignal<EventPropsFor<T>>;
    /** Built-in trigger to log events on or 'none' if events are sent programatically */
    readonly triggerOn: i0.InputSignal<EventTrigger | "none" | undefined>;
    /** Whether this event is disabled */
    readonly disabled: i0.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EventDirective<any>, "[hraEvent]", ["hraEvent"], { "event": { "alias": "hraEvent"; "required": true; "isSignal": true; }; "props": { "alias": "hraEventProps"; "required": true; "isSignal": true; }; "triggerOn": { "alias": "hraEventTriggerOn"; "required": false; "isSignal": true; }; "disabled": { "alias": "hraEventDisabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/**
 * Specialized version of `hraEvent` that only emits click events
 *
 * @see {@link EventDirective}
 */
declare class ClickEventDirective extends BaseEventDirective<CoreEvents['Click']> {
    /** Event type */
    readonly event: () => AnalyticsEvent<object>;
    /** Event properties */
    readonly props: i0.InputSignal<EventPropsFor<AnalyticsEvent<object>>>;
    /** 'none' if events are sent programatically */
    readonly triggerOn: i0.InputSignal<"none" | undefined>;
    /** Whether this event is disabled */
    readonly disabled: i0.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickEventDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickEventDirective, "[hraClickEvent]", ["hraClickEvent"], { "props": { "alias": "hraClickEvent"; "required": false; "isSignal": true; }; "triggerOn": { "alias": "hraClickEventTriggerOn"; "required": false; "isSignal": true; }; "disabled": { "alias": "hraClickEventDisabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/**
 * Specialized version of `hraEvent` that only emits double click events
 *
 * @see {@link EventDirective}
 */
declare class DoubleClickEventDirective extends BaseEventDirective<CoreEvents['DoubleClick']> {
    /** Event type */
    readonly event: () => AnalyticsEvent<object>;
    /** Event properties */
    readonly props: i0.InputSignal<EventPropsFor<AnalyticsEvent<object>>>;
    /** 'none' if events are sent programatically */
    readonly triggerOn: i0.InputSignal<"none" | undefined>;
    /** Whether this event is disabled */
    readonly disabled: i0.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DoubleClickEventDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DoubleClickEventDirective, "[hraDoubleClickEvent]", ["hraDoubleClickEvent"], { "props": { "alias": "hraDoubleClickEvent"; "required": false; "isSignal": true; }; "triggerOn": { "alias": "hraDoubleClickEventTriggerOn"; "required": false; "isSignal": true; }; "disabled": { "alias": "hraDoubleClickEventDisabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/**
 * Specialized version of `hraEvent` that only emits hover events
 *
 * @see {@link EventDirective}
 */
declare class HoverEventDirective extends BaseEventDirective<CoreEvents['Hover']> {
    /** Event type */
    readonly event: () => AnalyticsEvent<object>;
    /** Event properties */
    readonly props: i0.InputSignal<EventPropsFor<AnalyticsEvent<object>>>;
    /** mouseenter, mouseleave, mouseover, mouseout, or 'none' if events are sent programatically */
    readonly triggerOn: i0.InputSignal<"none" | EventTrigger<"mouseenter" | "mouseleave" | "mouseout" | "mouseover"> | undefined>;
    /** Whether this event is disabled */
    readonly disabled: i0.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HoverEventDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<HoverEventDirective, "[hraHoverEvent]", ["hraHoverEvent"], { "props": { "alias": "hraHoverEvent"; "required": false; "isSignal": true; }; "triggerOn": { "alias": "hraHoverEventTriggerOn"; "required": false; "isSignal": true; }; "disabled": { "alias": "hraHoverEventDisabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/**
 * Specialized version of `hraEvent` that only emits keyboard events
 *
 * @see {@link EventDirective}
 */
declare class KeyboardEventDirective extends BaseEventDirective<CoreEvents['Keyboard']> {
    /** Event type */
    readonly event: () => AnalyticsEvent<object>;
    /** Event properties */
    readonly props: i0.InputSignal<EventPropsFor<AnalyticsEvent<object>>>;
    /** keydown (default), keyup, or 'none' if events are sent programatically */
    readonly triggerOn: i0.InputSignal<"none" | EventTrigger<"keydown" | "keyup"> | undefined>;
    /** Whether this event is disabled */
    readonly disabled: i0.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardEventDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<KeyboardEventDirective, "[hraKeyboardEvent]", ["hraKeyboardEvent"], { "props": { "alias": "hraKeyboardEvent"; "required": false; "isSignal": true; }; "triggerOn": { "alias": "hraKeyboardEventTriggerOn"; "required": false; "isSignal": true; }; "disabled": { "alias": "hraKeyboardEventDisabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/** A list of property keys or a filter function */
type ModelChangeFilter = PropertyKey[] | ((value: unknown) => unknown);
/** Either additional event props or a model value filter */
type ModelChangePropsOrFilter = EventPropsFor<CoreEvents['ModelChange']> | ModelChangeFilter;
/**
 * Specialized version of `hraEvent` that only emits when a NgControl's value changes
 *
 * @see {@link EventDirective}
 */
declare class ModelChangeEventDirective extends BaseEventDirective<CoreEvents['ModelChange']> implements AfterViewInit {
    /** Event type */
    readonly event: () => AnalyticsEvent<_hra_ui_common_analytics_events.ModelChangeEventProps>;
    /** Event properties */
    readonly props: () => "";
    /** Event props or a model value filter */
    readonly propsOrFilter: i0.InputSignal<ModelChangePropsOrFilter>;
    /** Always triggered programatically */
    readonly triggerOn: () => "none";
    /** Whether this event is disabled */
    readonly disabled: i0.InputSignalWithTransform<boolean, unknown>;
    /** Model control reference */
    private readonly ngControl;
    /** Cleanup manager */
    private readonly destroyRef;
    /** Connect to the NgControl */
    ngAfterViewInit(): void;
    /**
     * Selects event properties based on the current model value
     *
     * @param value Latest model value
     * @param propsOrFilter Additional event properties or a value filter
     * @returns Event properties
     */
    private selectProps;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModelChangeEventDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ModelChangeEventDirective, "[hraModelChangeEvent]", ["hraModelChangeEvent"], { "propsOrFilter": { "alias": "hraModelChangeEvent"; "required": false; "isSignal": true; }; "disabled": { "alias": "hraModelChangeEventDisabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Injects the feature path for the current location
 *
 * @returns A signal with the current feature path
 */
declare function injectFeaturePath(): Signal<string>;
/**
 * Names a feature in the application.
 * Used by analytics to determine where in the application an event originates.
 */
declare class FeatureDirective {
    /** Feature name */
    readonly name: i0.InputSignal<string>;
    /** Full path of this feature. Each name along the path is separated by a dot */
    readonly path: Signal<string>;
    /** Direct parent feature in the injection tree */
    private readonly parent;
    static ɵfac: i0.ɵɵFactoryDeclaration<FeatureDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FeatureDirective, "[hraFeature]", never, { "name": { "alias": "hraFeature"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class AnalyticsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AnalyticsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AnalyticsModule, never, [typeof ClickEventDirective, typeof DoubleClickEventDirective, typeof EventDirective, typeof FeatureDirective, typeof HoverEventDirective, typeof KeyboardEventDirective, typeof ModelChangeEventDirective], [typeof ClickEventDirective, typeof DoubleClickEventDirective, typeof EventDirective, typeof FeatureDirective, typeof HoverEventDirective, typeof KeyboardEventDirective, typeof ModelChangeEventDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AnalyticsModule>;
}

/**
 * Injects a functional equivalent of `AnalyticsService.logEvent`
 * for ease of use in components/directive/etc.
 * The function also automatically adds the feature path to the event props on each call.
 *
 * @returns A function to log events
 */
declare function injectLogEvent(): <T extends AnalyticsEvent>(event: T, props: EventPayloadFor<T>) => void;
/**
 * Service wrapping `analytics`
 */
declare class AnalyticsService {
    /** Application configuration */
    private readonly appConfig;
    /** Application specific `analytics` plugins */
    private readonly plugins;
    /** User consent settings */
    private readonly consent;
    /** `analytics` instance */
    private readonly instance;
    /**
     * Logs a page view to analytics
     *
     * @param data Additional page data
     */
    logPageView(data?: PageData): void;
    /**
     * Logs an event to analytics
     *
     * @param event Event to log
     * @param props Event data
     */
    logEvent<T extends AnalyticsEvent>(event: T, props: EventPayloadFor<T>): void;
    /**
     * Retrieves or creates a session id
     *
     * @returns A session id
     */
    private getSessionId;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnalyticsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnalyticsService>;
}

/** Set of categories and whether each is enabled/disabled */
type ConsentCategories = Record<EventCategory, boolean>;
/** Initial categories settings */
declare const INITIAL_CATEGORY_SETTINGS: {
    necessary: boolean;
    statistics: boolean;
    preferences: boolean;
    marketing: boolean;
};
/**
 * User preferences manager service
 */
declare class ConsentService {
    /** Writable signal containing record of enabled/disable categories */
    private readonly categories_;
    /** Record of enabled/disable categories */
    readonly categories: i0.Signal<{
        necessary: boolean;
        statistics: boolean;
        preferences: boolean;
        marketing: boolean;
    }>;
    /**
     * Test whether a category is enabled or disabled
     *
     * @param category Category to test
     * @returns true if the event category is enabled, false otherwise
     */
    isCategoryEnabled(category: EventCategory): boolean;
    /**
     * Check whether an event is enabled or disabled
     *
     * @param _type Event type
     * @param category Event category
     * @returns Whether the event is enabled
     */
    isEventEnabled(_type: EventType, category?: EventCategory): boolean;
    /**
     * Enables all event categories
     */
    enableAllCategories(): void;
    /**
     * Disable all event categories except the ones
     * that should always be enabled, i.e. `EventCategory.Necessary`
     */
    disableAllCategories(): void;
    /**
     * Update the enabled/disabled event categories
     *
     * @param updates Category updates
     */
    updateCategories(updates: Partial<ConsentCategories>): void;
    /**
     * Enable a single event category
     *
     * @param category Category to enable
     */
    enableCategory(category: EventCategory): void;
    /**
     * Disable a single event category except if it is a category
     * that is always enabled, i.e. `EventCategory.Necessary`
     *
     * @param category Category to disable
     */
    disableCategory(category: EventCategory): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConsentService>;
}

/** Features that can be passed to `provideAnalytics` */
type AnalyticsFeature = ProviderFeature<AnalyticsFeatureKind>;
/** Different kinds of features */
declare const enum AnalyticsFeatureKind {
    ErrorHandler = 0,
    Plugins = 1,
    RouterEvents = 2
}
/**
 * Install a global `ErrorHandler` that logs errors to analytics
 *
 * @returns An analytics feature
 */
declare function withErrorHandler(config?: AnalyticsErrorHandlerConfig): AnalyticsFeature;
/**
 * Add one or more `analytics` plugins
 *
 * @param plugins Plugins and plugin factories
 * @returns An analytics feature
 */
declare function withPlugins(...plugins: (AnalyticsPlugin | (() => AnalyticsPlugin))[]): AnalyticsFeature;
/**
 * Log events from the angular router to analytics
 *
 * @returns An analytics feature
 */
declare function withRouterEvents(): AnalyticsFeature;
/**
 * Provide analytics with features
 *
 * @param features Any number of analytics features
 * @returns Environment providers
 */
declare function provideAnalytics(...features: AnalyticsFeature[]): EnvironmentProviders;

export { AnalyticsModule, AnalyticsService, ClickEventDirective, ConsentService, DoubleClickEventDirective, EventDirective, FeatureDirective, HoverEventDirective, INITIAL_CATEGORY_SETTINGS, KeyboardEventDirective, ModelChangeEventDirective, injectFeaturePath, injectLogEvent, provideAnalytics, withErrorHandler, withPlugins, withRouterEvents };
export type { AnalyticsErrorHandlerConfig, AnalyticsFeature, ConsentCategories };
