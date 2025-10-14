import * as i0 from '@angular/core';
import { signal, Injectable, assertInInjectionContext, inject, input, computed, Directive, isDevMode, Renderer2, ElementRef, effect, booleanAttribute, DestroyRef, NgModule, ErrorHandler, provideAppInitializer, makeEnvironmentProviders } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { EventCategory, CoreEvents } from '@hra-ui/common/analytics/events';
import { skip } from 'rxjs';
import { hraAnalyticsPlugin } from '@hra-ui/common/analytics/plugins/hra-analytics';
import { hraEventFilterPlugin } from '@hra-ui/common/analytics/plugins/hra-event-filter';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import { Analytics } from 'analytics';
import { nanoid } from 'nanoid';
import { createNoopInjectionToken } from 'ngxtension/create-injection-token';
import store from 'store2';
import { createFeature, getFeatureProviders } from '@hra-ui/common/util/providers';
import { Router, EventType } from '@angular/router';

/**
 * Helper for creating categories enabled/disabled records
 *
 * @param enabled Whether to set categories to enabled or disabled
 * @returns A record of all categories with their values set to `enabled`
 */
function createCategoryPreferences(enabled) {
    return Object.values(EventCategory).reduce((acc, category) => {
        acc[category] = enabled;
        return acc;
    }, {});
}
/** Record where every category is set to enabled */
const ALL_CATEGORIES_ENABLED = createCategoryPreferences(true);
/** Record where every category is set to disabled */
const ALL_CATEGORIES_DISABLED = createCategoryPreferences(false);
/** Record of categories that should always be enabled */
const ALWAYS_ENABLED_CATEGORIES = { [EventCategory.Necessary]: true };
/** Initial categories settings */
const INITIAL_CATEGORY_SETTINGS = { ...ALL_CATEGORIES_DISABLED, ...ALWAYS_ENABLED_CATEGORIES };
/**
 * User preferences manager service
 */
class ConsentService {
    /** Writable signal containing record of enabled/disable categories */
    categories_ = signal(INITIAL_CATEGORY_SETTINGS, ...(ngDevMode ? [{ debugName: "categories_" }] : []));
    /** Record of enabled/disable categories */
    categories = this.categories_.asReadonly();
    /**
     * Test whether a category is enabled or disabled
     *
     * @param category Category to test
     * @returns true if the event category is enabled, false otherwise
     */
    isCategoryEnabled(category) {
        return this.categories()[category];
    }
    /**
     * Check whether an event is enabled or disabled
     *
     * @param _type Event type
     * @param category Event category
     * @returns Whether the event is enabled
     */
    isEventEnabled(_type, category) {
        return category !== undefined && this.isCategoryEnabled(category);
    }
    /**
     * Enables all event categories
     */
    enableAllCategories() {
        this.categories_.set(ALL_CATEGORIES_ENABLED);
    }
    /**
     * Disable all event categories except the ones
     * that should always be enabled, i.e. `EventCategory.Necessary`
     */
    disableAllCategories() {
        this.categories_.set(INITIAL_CATEGORY_SETTINGS);
    }
    /**
     * Update the enabled/disabled event categories
     *
     * @param updates Category updates
     */
    updateCategories(updates) {
        this.categories_.update((current) => ({
            ...current,
            ...updates,
            ...ALWAYS_ENABLED_CATEGORIES,
        }));
    }
    /**
     * Enable a single event category
     *
     * @param category Category to enable
     */
    enableCategory(category) {
        this.updateCategories({ [category]: true });
    }
    /**
     * Disable a single event category except if it is a category
     * that is always enabled, i.e. `EventCategory.Necessary`
     *
     * @param category Category to disable
     */
    disableCategory(category) {
        this.updateCategories({ [category]: false });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ConsentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ConsentService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ConsentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Injects the feature path for the current location
 *
 * @returns A signal with the current feature path
 */
function injectFeaturePath() {
    assertInInjectionContext(injectFeaturePath);
    const feature = inject(FeatureDirective, { optional: true });
    return feature?.path ?? signal('');
}
/**
 * Names a feature in the application.
 * Used by analytics to determine where in the application an event originates.
 */
class FeatureDirective {
    /** Feature name */
    name = input.required(...(ngDevMode ? [{ debugName: "name", alias: 'hraFeature' }] : [{ alias: 'hraFeature' }]));
    /** Full path of this feature. Each name along the path is separated by a dot */
    path = computed(() => {
        const parentPath = this.parent?.path();
        const name = this.name();
        return parentPath ? `${parentPath}.${name}` : name;
    }, ...(ngDevMode ? [{ debugName: "path" }] : []));
    /** Direct parent feature in the injection tree */
    parent = inject(FeatureDirective, { skipSelf: true, optional: true });
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: FeatureDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: FeatureDirective, isStandalone: true, selector: "[hraFeature]", inputs: { name: { classPropertyName: "name", publicName: "hraFeature", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: FeatureDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraFeature]',
                }]
        }] });

/** Storage key for session id */
const SESSION_ID_STORAGE_KEY = '__hra-analytics-session-id';
/** User defined `analytics` plugins */
const PLUGINS = createNoopInjectionToken('Analytics plugins', {
    multi: true,
});
/** Inject all user defined `analytics` plugins */
const injectPlugins = PLUGINS[0];
/** Provide an user defined `analytics` plugin */
const providePlugin = PLUGINS[1];
/**
 * Injects a functional equivalent of `AnalyticsService.logEvent`
 * for ease of use in components/directive/etc.
 * The function also automatically adds the feature path to the event props on each call.
 *
 * @returns A function to log events
 */
function injectLogEvent() {
    assertInInjectionContext(injectLogEvent);
    const analytics = inject(AnalyticsService);
    const path = injectFeaturePath();
    return (event, props) => analytics.logEvent(event, { path: path(), ...props });
}
/**
 * Service wrapping `analytics`
 */
class AnalyticsService {
    /** Application configuration */
    appConfig = injectAppConfiguration();
    /** Application specific `analytics` plugins */
    plugins = injectPlugins({ optional: true }) ?? [];
    /** User consent settings */
    consent = inject(ConsentService);
    /** `analytics` instance */
    instance = Analytics({
        app: this.appConfig.name,
        version: this.appConfig.version,
        debug: isDevMode(),
        storage: null, // Disable localStorage
        plugins: [
            hraEventFilterPlugin({
                isEventEnabled: (type, category) => this.consent.isEventEnabled(type, category),
            }),
            hraAnalyticsPlugin({
                sessionId: this.getSessionId(),
            }),
            ...this.plugins,
        ],
    });
    /**
     * Logs a page view to analytics
     *
     * @param data Additional page data
     */
    logPageView(data) {
        this.instance.page(data);
    }
    /**
     * Logs an event to analytics
     *
     * @param event Event to log
     * @param props Event data
     */
    logEvent(event, props) {
        const { type, category } = event;
        this.instance.track(type, props, { eventObj: event, category });
    }
    /**
     * Retrieves or creates a session id
     *
     * @returns A session id
     */
    getSessionId() {
        let id = store.session.get(SESSION_ID_STORAGE_KEY);
        if (!id || typeof id !== 'string') {
            id = nanoid(10);
            store.session.set(SESSION_ID_STORAGE_KEY, id);
        }
        return id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/** Shared base implementation for event directives */
class BaseEventDirective {
    /** Reference to renderer for dom interactions */
    renderer = inject(Renderer2);
    /** Host element */
    el = inject(ElementRef).nativeElement;
    /** Raw logEvent function */
    logEvent_ = injectLogEvent();
    /** Initialize the directive */
    constructor() {
        effect((onCleanup) => {
            const trigger = this.triggerOn() ?? this.event().trigger ?? 'click';
            if (trigger !== 'none' && !this.disabled()) {
                const { el, renderer } = this;
                const handler = this.logEvent.bind(this, trigger);
                const parts = trigger.split(':', 2);
                const [target, eventName] = parts.length === 2 ? parts : [el, trigger];
                const unlisten = renderer.listen(target, eventName, handler);
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
     * @param extraProps Additional event properties
     */
    logEvent(trigger, event, extraProps = {}) {
        const props = this.props();
        this.logEvent_(this.event(), {
            trigger: trigger,
            triggerData: event,
            ...(props !== '' ? props : {}),
            ...extraProps,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: BaseEventDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.3", type: BaseEventDirective, isStandalone: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: BaseEventDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [] });
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
class EventDirective extends BaseEventDirective {
    /** Event type */
    event = input.required(...(ngDevMode ? [{ debugName: "event", alias: 'hraEvent' }] : [{ alias: 'hraEvent' }]));
    /** Event properties */
    props = input.required(...(ngDevMode ? [{ debugName: "props", alias: 'hraEventProps' }] : [{ alias: 'hraEventProps' }]));
    /** Built-in trigger to log events on or 'none' if events are sent programatically */
    triggerOn = input(undefined, ...(ngDevMode ? [{ debugName: "triggerOn", alias: 'hraEventTriggerOn' }] : [{ alias: 'hraEventTriggerOn' }]));
    /** Whether this event is disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", alias: 'hraEventDisabled', transform: booleanAttribute }] : [{ alias: 'hraEventDisabled', transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: EventDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: EventDirective, isStandalone: true, selector: "[hraEvent]", inputs: { event: { classPropertyName: "event", publicName: "hraEvent", isSignal: true, isRequired: true, transformFunction: null }, props: { classPropertyName: "props", publicName: "hraEventProps", isSignal: true, isRequired: true, transformFunction: null }, triggerOn: { classPropertyName: "triggerOn", publicName: "hraEventTriggerOn", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "hraEventDisabled", isSignal: true, isRequired: false, transformFunction: null } }, exportAs: ["hraEvent"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: EventDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraEvent]',
                    exportAs: 'hraEvent',
                }]
        }] });
/**
 * Specialized version of `hraEvent` that only emits click events
 *
 * @see {@link EventDirective}
 */
class ClickEventDirective extends BaseEventDirective {
    /** Event type */
    event = () => CoreEvents.Click;
    /** Event properties */
    props = input('', ...(ngDevMode ? [{ debugName: "props", alias: 'hraClickEvent' }] : [{ alias: 'hraClickEvent' }]));
    /** 'none' if events are sent programatically */
    triggerOn = input(undefined, ...(ngDevMode ? [{ debugName: "triggerOn", alias: 'hraClickEventTriggerOn' }] : [{ alias: 'hraClickEventTriggerOn' }]));
    /** Whether this event is disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", alias: 'hraClickEventDisabled', transform: booleanAttribute }] : [{ alias: 'hraClickEventDisabled', transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ClickEventDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: ClickEventDirective, isStandalone: true, selector: "[hraClickEvent]", inputs: { props: { classPropertyName: "props", publicName: "hraClickEvent", isSignal: true, isRequired: false, transformFunction: null }, triggerOn: { classPropertyName: "triggerOn", publicName: "hraClickEventTriggerOn", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "hraClickEventDisabled", isSignal: true, isRequired: false, transformFunction: null } }, exportAs: ["hraClickEvent"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ClickEventDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraClickEvent]',
                    exportAs: 'hraClickEvent',
                }]
        }] });
/**
 * Specialized version of `hraEvent` that only emits double click events
 *
 * @see {@link EventDirective}
 */
class DoubleClickEventDirective extends BaseEventDirective {
    /** Event type */
    event = () => CoreEvents.DoubleClick;
    /** Event properties */
    props = input('', ...(ngDevMode ? [{ debugName: "props", alias: 'hraDoubleClickEvent' }] : [{ alias: 'hraDoubleClickEvent' }]));
    /** 'none' if events are sent programatically */
    triggerOn = input(undefined, ...(ngDevMode ? [{ debugName: "triggerOn", alias: 'hraDoubleClickEventTriggerOn' }] : [{ alias: 'hraDoubleClickEventTriggerOn' }]));
    /** Whether this event is disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", alias: 'hraDoubleClickEventDisabled', transform: booleanAttribute }] : [{ alias: 'hraDoubleClickEventDisabled', transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: DoubleClickEventDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: DoubleClickEventDirective, isStandalone: true, selector: "[hraDoubleClickEvent]", inputs: { props: { classPropertyName: "props", publicName: "hraDoubleClickEvent", isSignal: true, isRequired: false, transformFunction: null }, triggerOn: { classPropertyName: "triggerOn", publicName: "hraDoubleClickEventTriggerOn", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "hraDoubleClickEventDisabled", isSignal: true, isRequired: false, transformFunction: null } }, exportAs: ["hraDoubleClickEvent"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: DoubleClickEventDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraDoubleClickEvent]',
                    exportAs: 'hraDoubleClickEvent',
                }]
        }] });
/**
 * Specialized version of `hraEvent` that only emits hover events
 *
 * @see {@link EventDirective}
 */
class HoverEventDirective extends BaseEventDirective {
    /** Event type */
    event = () => CoreEvents.Hover;
    /** Event properties */
    props = input('', ...(ngDevMode ? [{ debugName: "props", alias: 'hraHoverEvent' }] : [{ alias: 'hraHoverEvent' }]));
    /** mouseenter, mouseleave, mouseover, mouseout, or 'none' if events are sent programatically */
    triggerOn = input(undefined, ...(ngDevMode ? [{ debugName: "triggerOn", alias: 'hraHoverEventTriggerOn' }] : [{ alias: 'hraHoverEventTriggerOn' }]));
    /** Whether this event is disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", alias: 'hraHoverEventDisabled', transform: booleanAttribute }] : [{ alias: 'hraHoverEventDisabled', transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: HoverEventDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: HoverEventDirective, isStandalone: true, selector: "[hraHoverEvent]", inputs: { props: { classPropertyName: "props", publicName: "hraHoverEvent", isSignal: true, isRequired: false, transformFunction: null }, triggerOn: { classPropertyName: "triggerOn", publicName: "hraHoverEventTriggerOn", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "hraHoverEventDisabled", isSignal: true, isRequired: false, transformFunction: null } }, exportAs: ["hraHoverEvent"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: HoverEventDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraHoverEvent]',
                    exportAs: 'hraHoverEvent',
                }]
        }] });
/**
 * Specialized version of `hraEvent` that only emits keyboard events
 *
 * @see {@link EventDirective}
 */
class KeyboardEventDirective extends BaseEventDirective {
    /** Event type */
    event = () => CoreEvents.Keyboard;
    /** Event properties */
    props = input('', ...(ngDevMode ? [{ debugName: "props", alias: 'hraKeyboardEvent' }] : [{ alias: 'hraKeyboardEvent' }]));
    /** keydown (default), keyup, or 'none' if events are sent programatically */
    triggerOn = input(undefined, ...(ngDevMode ? [{ debugName: "triggerOn", alias: 'hraKeyboardEventTriggerOn' }] : [{
            alias: 'hraKeyboardEventTriggerOn',
        }]));
    /** Whether this event is disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", alias: 'hraKeyboardEventDisabled', transform: booleanAttribute }] : [{ alias: 'hraKeyboardEventDisabled', transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: KeyboardEventDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: KeyboardEventDirective, isStandalone: true, selector: "[hraKeyboardEvent]", inputs: { props: { classPropertyName: "props", publicName: "hraKeyboardEvent", isSignal: true, isRequired: false, transformFunction: null }, triggerOn: { classPropertyName: "triggerOn", publicName: "hraKeyboardEventTriggerOn", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "hraKeyboardEventDisabled", isSignal: true, isRequired: false, transformFunction: null } }, exportAs: ["hraKeyboardEvent"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: KeyboardEventDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraKeyboardEvent]',
                    exportAs: 'hraKeyboardEvent',
                }]
        }] });
/**
 * Specialized version of `hraEvent` that only emits when a NgControl's value changes
 *
 * @see {@link EventDirective}
 */
class ModelChangeEventDirective extends BaseEventDirective {
    /** Event type */
    event = () => CoreEvents.ModelChange;
    /** Event properties */
    props = () => '';
    /** Event props or a model value filter */
    propsOrFilter = input('', ...(ngDevMode ? [{ debugName: "propsOrFilter", alias: 'hraModelChangeEvent' }] : [{ alias: 'hraModelChangeEvent' }]));
    /** Always triggered programatically */
    triggerOn = () => 'none';
    /** Whether this event is disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", alias: 'hraModelChangeEventDisabled', transform: booleanAttribute }] : [{ alias: 'hraModelChangeEventDisabled', transform: booleanAttribute }]));
    /** Model control reference */
    ngControl = inject(NgControl);
    /** Cleanup manager */
    destroyRef = inject(DestroyRef);
    /** Connect to the NgControl */
    ngAfterViewInit() {
        const { valueChanges } = this.ngControl;
        valueChanges?.pipe(takeUntilDestroyed(this.destroyRef), skip(1)).subscribe((value) => {
            const props = this.selectProps(value, this.propsOrFilter());
            this.logEvent(undefined, undefined, props);
        });
    }
    /**
     * Selects event properties based on the current model value
     *
     * @param value Latest model value
     * @param propsOrFilter Additional event properties or a value filter
     * @returns Event properties
     */
    selectProps(value, propsOrFilter) {
        if (propsOrFilter === '') {
            return { value };
        }
        else if (typeof propsOrFilter === 'function') {
            return { value: propsOrFilter(value) };
        }
        else if (typeof propsOrFilter === 'object' && !Array.isArray(propsOrFilter)) {
            return { value, ...propsOrFilter };
        }
        else if (value === undefined || value === null) {
            return {};
        }
        const source = value;
        const result = {};
        for (const key of propsOrFilter) {
            if (key in source) {
                result[key] = source[key];
            }
        }
        return { value: result };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ModelChangeEventDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: ModelChangeEventDirective, isStandalone: true, selector: "[hraModelChangeEvent]", inputs: { propsOrFilter: { classPropertyName: "propsOrFilter", publicName: "hraModelChangeEvent", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "hraModelChangeEventDisabled", isSignal: true, isRequired: false, transformFunction: null } }, exportAs: ["hraModelChangeEvent"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ModelChangeEventDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraModelChangeEvent]',
                    exportAs: 'hraModelChangeEvent',
                }]
        }] });

class AnalyticsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsModule, imports: [ClickEventDirective,
            DoubleClickEventDirective,
            EventDirective,
            FeatureDirective,
            HoverEventDirective,
            KeyboardEventDirective,
            ModelChangeEventDirective], exports: [ClickEventDirective,
            DoubleClickEventDirective,
            EventDirective,
            FeatureDirective,
            HoverEventDirective,
            KeyboardEventDirective,
            ModelChangeEventDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ClickEventDirective,
                        DoubleClickEventDirective,
                        EventDirective,
                        FeatureDirective,
                        HoverEventDirective,
                        KeyboardEventDirective,
                        ModelChangeEventDirective,
                    ],
                    exports: [
                        ClickEventDirective,
                        DoubleClickEventDirective,
                        EventDirective,
                        FeatureDirective,
                        HoverEventDirective,
                        KeyboardEventDirective,
                        ModelChangeEventDirective,
                    ],
                }]
        }] });

/** Configuration */
const CONFIG = createNoopInjectionToken('AnalyticsErrorHandlerConfig');
/** Injects the configuration */
const injectAnalyticsErrorHandlerConfig = CONFIG[0];
/** Provide analytics error handler configuration */
const provideAnalyticsErrorHandlerConfig = CONFIG[1];
/** Custom error handler that logs to analytics */
class AnalyticsErrorHandler {
    /** Configuration */
    config = injectAnalyticsErrorHandlerConfig();
    /** Analytics service */
    analytics = inject(AnalyticsService);
    /**
     * Log an error to analytics
     *
     * @param error Error data
     */
    handleError(error) {
        this.analytics.logEvent(CoreEvents.Error, {
            message: 'Uncaught error',
            reason: error,
        });
        if (this.config.console ?? isDevMode()) {
            // eslint-disable-next-line no-console
            console.error('Uncaught error:', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsErrorHandler, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsErrorHandler, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AnalyticsErrorHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Setup a router event listener that logs page views and errors to analytics
 */
function setupRouterEventListener() {
    assertInInjectionContext(setupRouterEventListener);
    const analytics = inject(AnalyticsService);
    const router = inject(Router);
    router.events.subscribe((event) => {
        switch (event.type) {
            case EventType.NavigationEnd:
                analytics.logPageView();
                break;
            case EventType.NavigationError:
                analytics.logEvent(CoreEvents.Error, {
                    message: 'NavigationError',
                    context: { url: event.url },
                    reason: event.error,
                });
                break;
        }
    });
}

/**
 * Install a global `ErrorHandler` that logs errors to analytics
 *
 * @returns An analytics feature
 */
function withErrorHandler(config = {}) {
    return createFeature(0 /* AnalyticsFeatureKind.ErrorHandler */, [
        provideAnalyticsErrorHandlerConfig(config),
        {
            provide: ErrorHandler,
            useExisting: AnalyticsErrorHandler,
        },
    ]);
}
/**
 * Add one or more `analytics` plugins
 *
 * @param plugins Plugins and plugin factories
 * @returns An analytics feature
 */
function withPlugins(...plugins) {
    return createFeature(1 /* AnalyticsFeatureKind.Plugins */, plugins.map((plugin) => providePlugin(plugin)));
}
/**
 * Log events from the angular router to analytics
 *
 * @returns An analytics feature
 */
function withRouterEvents() {
    return createFeature(2 /* AnalyticsFeatureKind.RouterEvents */, [provideAppInitializer(setupRouterEventListener)]);
}
/**
 * Provide analytics with features
 *
 * @param features Any number of analytics features
 * @returns Environment providers
 */
function provideAnalytics(...features) {
    return makeEnvironmentProviders([...features.flatMap(getFeatureProviders)]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { AnalyticsModule, AnalyticsService, ClickEventDirective, ConsentService, DoubleClickEventDirective, EventDirective, FeatureDirective, HoverEventDirective, INITIAL_CATEGORY_SETTINGS, KeyboardEventDirective, ModelChangeEventDirective, injectFeaturePath, injectLogEvent, provideAnalytics, withErrorHandler, withPlugins, withRouterEvents };
//# sourceMappingURL=hra-ui-common-analytics.mjs.map
