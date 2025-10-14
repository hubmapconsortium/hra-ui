import { reflectComponentType, NgZone, isSignal, EnvironmentInjector, Injector, createComponent, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { createCustomElement as createCustomElement$1 } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { ReplaySubject, merge, isObservable, firstValueFrom, filter } from 'rxjs';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs/operators';

/**
 * Copied from {@link https://github.com/angular/angular/tree/17.3.7/packages/elements/src}
 * and modified to add support for signal based components.
 *
 * Once @angular/elements support signal based components all of this code should be removed
 * in favor of the official implementation.
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Provide methods for scheduling the execution of a callback.
 */
const scheduler = {
    /**
     * Schedule a callback to be called after some delay.
     *
     * Returns a function that when executed will cancel the scheduled function.
     */
    schedule(taskFn, delay) {
        const id = setTimeout(taskFn, delay);
        return () => clearTimeout(id);
    },
    /**
     * Schedule a callback to be called before the next render.
     * (If `window.requestAnimationFrame()` is not available, use `scheduler.schedule()` instead.)
     *
     * Returns a function that when executed will cancel the scheduled function.
     */
    scheduleBeforeRender(taskFn) {
        // TODO(gkalpak): Implement a better way of accessing `requestAnimationFrame()`
        //                (e.g. accounting for vendor prefix, SSR-compatibility, etc).
        if (typeof window === 'undefined') {
            // For SSR just schedule immediately.
            return scheduler.schedule(taskFn, 0);
        }
        if (typeof window.requestAnimationFrame === 'undefined') {
            const frameMs = 16;
            return scheduler.schedule(taskFn, frameMs);
        }
        const id = window.requestAnimationFrame(taskFn);
        return () => window.cancelAnimationFrame(id);
    },
};
/**
 * Convert a camelCased string to kebab-cased.
 */
function camelToDashCase(input) {
    return input.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
/**
 * Check whether the input is an `Element`.
 */
function isElement(node) {
    return !!node && node.nodeType === Node.ELEMENT_NODE;
}
/**
 * Check whether the input is a function.
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * Convert a kebab-cased string to camelCased.
 */
function kebabToCamelCase(input) {
    return input.replace(/-([a-z\d])/g, (_, char) => char.toUpperCase());
}
let _matches;
/**
 * Check whether an `Element` matches a CSS selector.
 * NOTE: this is duplicated from @angular/upgrade, and can
 * be consolidated in the future
 */
function matchesSelector(el, selector) {
    if (!_matches) {
        const elProto = Element.prototype;
        _matches =
            elProto.matches ||
                elProto.matchesSelector ||
                elProto.mozMatchesSelector ||
                elProto.msMatchesSelector ||
                elProto.oMatchesSelector ||
                elProto.webkitMatchesSelector;
    }
    return el.nodeType === Node.ELEMENT_NODE ? _matches.call(el, selector) : false;
}
/**
 * Test two values for strict equality, accounting for the fact that `NaN !== NaN`.
 */
function strictEquals(value1, value2) {
    return value1 === value2 || (value1 !== value1 && value2 !== value2);
}
/** Gets a map of default set of attributes to observe and the properties they affect. */
function getDefaultAttributeToPropertyInputs(inputs) {
    const attributeToPropertyInputs = {};
    inputs.forEach(({ propName, templateName, transform }) => {
        attributeToPropertyInputs[camelToDashCase(templateName)] = [propName, transform];
    });
    return attributeToPropertyInputs;
}

/**
 * Copied from {@link https://github.com/angular/angular/tree/17.3.7/packages/elements/src}
 * and modified to add support for signal based components.
 *
 * Once @angular/elements support signal based components all of this code should be removed
 * in favor of the official implementation.
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// NOTE: This is a (slightly improved) version of what is used in ngUpgrade's
//       `DowngradeComponentAdapter`.
// TODO(gkalpak): Investigate if it makes sense to share the code.
function extractProjectableNodes(host, ngContentSelectors) {
    const nodes = host.childNodes;
    const projectableNodes = ngContentSelectors.map(() => []);
    let wildcardIndex = -1;
    ngContentSelectors.some((selector, i) => {
        if (selector === '*') {
            wildcardIndex = i;
            return true;
        }
        return false;
    });
    for (let i = 0, ii = nodes.length; i < ii; ++i) {
        const node = nodes[i];
        const ngContentIndex = findMatchingIndex(node, ngContentSelectors, wildcardIndex);
        if (ngContentIndex !== -1) {
            projectableNodes[ngContentIndex].push(node);
        }
    }
    return projectableNodes;
}
function findMatchingIndex(node, selectors, defaultIndex) {
    let matchingIndex = defaultIndex;
    if (isElement(node)) {
        selectors.some((selector, i) => {
            if (selector !== '*' && matchesSelector(node, selector)) {
                matchingIndex = i;
                return true;
            }
            return false;
        });
    }
    return matchingIndex;
}

/**
 * Copied from {@link https://github.com/angular/angular/tree/17.3.7/packages/elements/src}
 * and modified to add support for signal based components.
 *
 * Once @angular/elements support signal based components all of this code should be removed
 * in favor of the official implementation.
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/** Time in milliseconds to wait before destroying the component ref when disconnected. */
const DESTROY_DELAY = 10;
/**
 * Factory that creates new ComponentNgElementStrategy instance. Gets the component factory with the
 * constructor's injector's factory resolver and passes that factory to each strategy.
 */
class ComponentNgElementStrategyFactory {
    component;
    constructor(component) {
        this.component = component;
    }
    create(injector) {
        return new ComponentNgElementStrategy(this.component, injector);
    }
}
/**
 * Creates and destroys a component ref using a component factory and handles change detection
 * in response to input changes.
 */
class ComponentNgElementStrategy {
    component;
    injector;
    // Subject of `NgElementStrategyEvent` observables corresponding to the component's outputs.
    eventEmitters = new ReplaySubject(1);
    /** Merged stream of the component's output events. */
    events = this.eventEmitters.pipe(switchMap((emitters) => merge(...emitters)));
    /** Reference to the component that was created on connect. */
    componentRef = null;
    /** Reference to the component view's `ChangeDetectorRef`. */
    viewChangeDetectorRef = null;
    /** Whether changes have been made to component inputs since the last change detection run. */
    hasInputChanges = false;
    /** Whether a change detection has been scheduled to run on the component. */
    scheduledChangeDetectionFn = null;
    /** Callback function that when called will cancel a scheduled destruction on the component. */
    scheduledDestroyFn = null;
    /** Initial input values that were set before the component was created. */
    initialInputValues = new Map();
    /**
     * Set of component inputs that have not yet changed, i.e. for which `recordInputChange()` has not
     * fired.
     * (This helps detect the first change of an input, even if it is explicitly set to `undefined`.)
     */
    unchangedInputs;
    /** Service for setting zone context. */
    ngZone;
    /** The zone the element was created in or `null` if Zone.js is not loaded. */
    elementZone;
    componentMirror;
    constructor(component, injector) {
        this.component = component;
        this.injector = injector;
        this.componentMirror = reflectComponentType(this.component);
        this.unchangedInputs = new Set(this.componentMirror.inputs.map(({ propName }) => propName));
        this.ngZone = this.injector.get(NgZone);
        this.elementZone = typeof Zone === 'undefined' ? null : this.ngZone.run(() => Zone.current);
    }
    /**
     * Initializes a new component if one has not yet been created and cancels any scheduled
     * destruction.
     */
    connect(element) {
        this.runInZone(() => {
            // If the element is marked to be destroyed, cancel the task since the component was
            // reconnected
            if (this.scheduledDestroyFn !== null) {
                this.scheduledDestroyFn();
                this.scheduledDestroyFn = null;
                return;
            }
            if (this.componentRef === null) {
                this.initializeComponent(element);
            }
        });
    }
    /**
     * Schedules the component to be destroyed after some small delay in case the element is just
     * being moved across the DOM.
     */
    disconnect() {
        this.runInZone(() => {
            // Return if there is no componentRef or the component is already scheduled for destruction
            if (this.componentRef === null || this.scheduledDestroyFn !== null) {
                return;
            }
            // Schedule the component to be destroyed after a small timeout in case it is being
            // moved elsewhere in the DOM
            this.scheduledDestroyFn = scheduler.schedule(() => {
                if (this.componentRef !== null) {
                    this.componentRef.destroy();
                    this.componentRef = null;
                    this.viewChangeDetectorRef = null;
                }
            }, DESTROY_DELAY);
        });
    }
    /**
     * Returns the component property value. If the component has not yet been created, the value is
     * retrieved from the cached initialization values.
     */
    getInputValue(property) {
        return this.runInZone(() => {
            if (this.componentRef === null) {
                return this.initialInputValues.get(property);
            }
            const value = this.componentRef.instance[property];
            return isSignal(value) ? value() : value;
        });
    }
    /**
     * Sets the input value for the property. If the component has not yet been created, the value is
     * cached and set when the component is created.
     */
    setInputValue(property, value, transform) {
        this.runInZone(() => {
            if (transform) {
                value = transform.call(this.componentRef?.instance, value);
            }
            if (this.componentRef === null) {
                this.initialInputValues.set(property, value);
                return;
            }
            // Ignore the value if it is strictly equal to the current value, except if it is `undefined`
            // and this is the first change to the value (because an explicit `undefined` _is_ strictly
            // equal to not having a value set at all, but we still need to record this as a change).
            if (strictEquals(value, this.getInputValue(property)) &&
                !(value === undefined && this.unchangedInputs.has(property))) {
                return;
            }
            // Record the changed value and update internal state to reflect the fact that this input has
            // changed.
            this.unchangedInputs.delete(property);
            this.hasInputChanges = true;
            // Update the component instance and schedule change detection.
            this.componentRef.setInput(property, value);
            this.scheduleDetectChanges();
        });
    }
    /**
     * Creates a new component through the component factory with the provided element host and
     * sets up its initial inputs, listens for outputs changes, and runs an initial change detection.
     */
    initializeComponent(element) {
        const environmentInjector = this.injector.get(EnvironmentInjector);
        const elementInjector = Injector.create({ providers: [], parent: this.injector });
        const projectableNodes = extractProjectableNodes(element, [...this.componentMirror.ngContentSelectors]);
        this.componentRef = createComponent(this.component, {
            environmentInjector,
            elementInjector,
            projectableNodes,
            hostElement: element,
        });
        this.viewChangeDetectorRef = this.componentRef.injector.get(ChangeDetectorRef);
        this.initializeInputs();
        this.initializeOutputs(this.componentRef);
        this.detectChanges();
        const applicationRef = this.injector.get(ApplicationRef);
        applicationRef.attachView(this.componentRef.hostView);
    }
    /** Set any stored initial inputs on the component's properties. */
    initializeInputs() {
        this.componentMirror.inputs.forEach(({ propName, transform }) => {
            if (this.initialInputValues.has(propName)) {
                // Call `setInputValue()` now that the component has been instantiated to update its
                // properties and fire `ngOnChanges()`.
                this.setInputValue(propName, this.initialInputValues.get(propName), transform);
            }
        });
        this.initialInputValues.clear();
    }
    /** Sets up listeners for the component's outputs so that the events stream emits the events. */
    initializeOutputs(componentRef) {
        const eventEmitters = this.componentMirror.outputs.map(({ propName, templateName }) => {
            const emitter = componentRef.instance[propName];
            const emitterObservable = isObservable(emitter) ? emitter : outputToObservable(emitter);
            return emitterObservable.pipe(map((value) => ({ name: templateName, value })));
        });
        this.eventEmitters.next(eventEmitters);
    }
    /**
     * Marks the component view for check, if necessary.
     * (NOTE: This is required when the `ChangeDetectionStrategy` is set to `OnPush`.)
     */
    markViewForCheck(viewChangeDetectorRef) {
        if (this.hasInputChanges) {
            this.hasInputChanges = false;
            viewChangeDetectorRef.markForCheck();
        }
    }
    /**
     * Schedules change detection to run on the component.
     * Ignores subsequent calls if already scheduled.
     */
    scheduleDetectChanges() {
        if (this.scheduledChangeDetectionFn) {
            return;
        }
        this.scheduledChangeDetectionFn = scheduler.scheduleBeforeRender(() => {
            this.scheduledChangeDetectionFn = null;
            this.detectChanges();
        });
    }
    /** Runs change detection on the component. */
    detectChanges() {
        if (this.componentRef === null) {
            return;
        }
        this.markViewForCheck(this.viewChangeDetectorRef);
        this.componentRef.changeDetectorRef.detectChanges();
    }
    /** Runs in the angular zone, if present. */
    runInZone(fn) {
        return this.elementZone && Zone.current !== this.elementZone ? this.ngZone.run(fn) : fn();
    }
}

/**
 * Adds additional methods to an NgElement class
 *
 * @param base Base element class
 * @param injector Application injector
 * @returns A new class with extension methods added
 */
function mixinExtensions(base, injector) {
    class NgElementWithExtensions extends base {
        get instance() {
            // componentRef is not public...
            const strategy = this.ngElementStrategy;
            return strategy.componentRef?.instance;
        }
        async whenStable() {
            const appRef = injector.get(ApplicationRef);
            await firstValueFrom(appRef.isStable.pipe(filter((stable) => stable)));
        }
    }
    return NgElementWithExtensions;
}
/**
 * Converts and registers an angular component as a custom element
 *
 * @param name Tag name for custom element
 * @param component Angular component to convert into a custom element
 * @param applicationConfig Additional application configuration
 * @returns A custom element class
 */
async function createCustomElement(name, component, applicationConfig) {
    const { injector } = await createApplication(applicationConfig);
    const strategyFactory = new ComponentNgElementStrategyFactory(component);
    const base = createCustomElement$1(component, { injector, strategyFactory });
    const element = mixinExtensions(base, injector);
    customElements.define(name, element);
    return element;
}

/**
 * Generated bundle index. Do not edit.
 */

export { createCustomElement };
//# sourceMappingURL=hra-ui-webcomponents.mjs.map
