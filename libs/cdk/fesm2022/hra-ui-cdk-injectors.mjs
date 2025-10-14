import * as i0 from '@angular/core';
import { inject, ElementRef, Component, ViewContainerRef, NgModuleRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, ReplaySubject, tap, takeUntil } from 'rxjs';

/** Identity function returning the first argument passed */
function identity(value) {
    return value;
}
/** Maps all emits to an action value */
function pipeActionInstance(action, obs$) {
    return obs$.pipe(map(() => action));
}
/**
 * Creates an action factory function
 * @param type Action constructor
 * @param boundArgs Initial bound arguments
 * @returns A factory function creating a new action on each call
 */
function createActionFactory(type, boundArgs) {
    return (...args) => new type(...boundArgs, ...args);
}
/**
 * Common dispatch functionality used to implement all dispatch functions
 * @param actionFactory Creates an action or array of actions from the user provided arguments
 * @param resultHandler Selects the output value from the action and the dispatch observable
 * @returns A new dispatch function taking user arguments, dispatches actions, and returns a value
 */
function dispatchImpl(actionFactory, resultHandler) {
    const store = inject(Store);
    return (...args) => {
        const action = actionFactory(...args);
        const obs$ = store.dispatch(action);
        return resultHandler(action, obs$);
    };
}
/**
 * Wraps an action constructor with automatic dispatching on each call to the function.
 *
 * @param type Action constructor to create new instances
 * @param boundArgs Bound arguments to the action constructor
 * @returns A function that dispatches an action on the store each time it is called
 */
function dispatch(type, ...boundArgs) {
    return dispatchImpl(createActionFactory(type, boundArgs), identity);
}
/**
 * Wraps an action constructor with automatic dispatching on each call to the function.
 * Each call to the wrapper returns an observable that emits the action instance once the
 * dispatch action has completed.
 *
 * @param type Action constructor to create new instances
 * @param boundArgs Bound arguments to the action constructor
 * @returns A function that dispatches an action on the store each time it is called
 */
function dispatch$(type, ...boundArgs) {
    return dispatchImpl(createActionFactory(type, boundArgs), pipeActionInstance);
}
/**
 * Creates a callback that can dispatch any action or array of actions.
 * Each call returns passed actions unchanged
 *
 * @returns A function that dispatches actions on the store each time it is called
 */
function dispatchAction() {
    return dispatchImpl(identity, identity);
}
/**
 * Creates a callback that can dispatch any action or array of actions.
 * Each call returns an observable that emits the passed actions when the dispatch has finished
 *
 * @returns A function that dispatches actions on the store each time it is called
 */
function dispatchAction$() {
    return dispatchImpl(identity, pipeActionInstance);
}

/**
 * Component used when attaching destroy lifecycle observables to a component/directive/pipe
 */
class DestroyHostComponent {
    constructor() {
        /** Reference to own dom element */
        this.el = inject(ElementRef).nativeElement;
    }
    /**
     * Creates a new DestroyHostComponent inside the provided container.
     * The element is inserted as the first child (index '0') in the container.
     * @param container View in which to create the element
     * @returns The ComponentRef of the newly inserted element
     */
    static create(container) {
        return container.createComponent(DestroyHostComponent, { index: 0 });
    }
    /** Disconnects the component from the dom tree */
    ngAfterViewInit() {
        this.el.remove();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: DestroyHostComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: DestroyHostComponent, isStandalone: true, selector: "hra-destroy-host", ngImport: i0, template: '', isInline: true, styles: [":host{display:none}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: DestroyHostComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-destroy-host', standalone: true, template: '', styles: [":host{display:none}\n"] }]
        }] });

/**
 * Determines whether an object is destructor scope like
 * @param obj Value to test
 * @returns true if the object seems to be a destructor scope, otherwise false
 */
function isDestructorScopeLike(obj) {
    const isObject = typeof obj === 'object' && obj !== null;
    return isObject && 'onDestroy' in obj && typeof obj.onDestroy === 'function';
}
/**
 * A subject type that is associated with a destructor scope.
 * When the cleanup function is run the subject emits a single
 * undefined value and immediately completes
 */
class ScopedDestructorSubject extends ReplaySubject {
    /**
     * Creates a new subject and attaches cleanup to the destructor scope
     * @param scope Associated scope
     */
    constructor(scope) {
        super(1);
        scope.onDestroy(() => {
            this.next();
            this.complete();
        });
    }
}

/** Cached destructor observables */
const DESTRUCTOR_CACHE = new WeakMap();
/**
 * Get the first defined value returned by a generator
 *
 * @param genFn Generator function taking no arguments
 * @returns The first non-null value
 * @throws If the generator doesn't yield any non-null values
 */
function firstDefinedValue(genFn) {
    for (const value of genFn()) {
        if (value != null) {
            return value;
        }
    }
    throw new Error('Unreachable');
}
/**
 * Finds a stable object in the current injection context to be
 * used as a key in the destructor cache
 *
 * @returns An object
 */
function findStableKeyObject() {
    return firstDefinedValue(function* () {
        yield inject(ElementRef, { optional: true })?.nativeElement;
        yield inject(ViewContainerRef, { optional: true });
        yield inject(NgModuleRef);
    });
}
/**
 * Finds the nearest destructor scope object in the current injection context
 *
 * @returns The scope on which cleanup can be attached
 */
function findDestructorScope() {
    return firstDefinedValue(function* () {
        const vcr = inject(ViewContainerRef, { optional: true });
        yield vcr && DestroyHostComponent.create(vcr);
        yield inject(NgModuleRef);
    });
}
/**
 * Inject an observable that emits and completes at the same time as the component, directive, pipe, or service
 * it is injected into. It can be used to control the lifetime of other observables using
 * the `takeUntil` pipe, and to build other complex injection functions.
 *
 * Caveats:
 * - There are NO guarantees about whether the returned observable will emit and complete
 *   before or after the regular ngOnDestroy lifecycle hook
 * - For root and module level services the observable may never complete unless
 *   the containing module is explicitly destroyed, so don't rely on it for important operations
 * - Components, directives, pipe, and services that manipulate the `ViewContainerRef` MUST
 *   take care to maintain the view controlling the lifecycle of the observable. Failure
 *   to do so may result in early emit and completion of the returned observable
 *
 * Based on comment on https://github.com/angular/angular/issues/10185
 * Mostly https://github.com/angular/angular/issues/10185#issuecomment-1165545544 and
 * https://github.com/angular/angular/issues/10185#issuecomment-1199063426
 *
 * @returns An observable that emits and completes when the component/directive/etc. is destroyed
 */
function injectDestroy$() {
    const key = findStableKeyObject();
    let destructor = DESTRUCTOR_CACHE.get(key);
    if (!destructor) {
        const scope = findDestructorScope();
        destructor = new ScopedDestructorSubject(scope).asObservable();
        DESTRUCTOR_CACHE.set(key, destructor);
    }
    return destructor;
}

/**
 * Marks a view for change detection whenever a new value is emitted
 * @param options Options to explicitly disable marking
 * @returns A rxjs operator
 */
function markForCheck(options) {
    const notifyOnChange = options?.notifyOnChange ?? true;
    const cdr = inject(ChangeDetectorRef, { optional: true });
    if (notifyOnChange && cdr) {
        const markFn = () => cdr.markForCheck();
        return tap({ next: markFn, error: markFn, complete: markFn });
    }
    return (source) => source;
}
/**
 * Creates an observable emitting parts of the state. The observable's lifetime
 * is automatically tied to the injection context where this is called.
 * @param selector State selection function or token
 * @param options Additional select options
 * @returns An observable of the selected state
 */
function select$(selector, options) {
    return inject(Store)
        .select(selector)
        .pipe(takeUntil(injectDestroy$()), markForCheck(options));
}

/** Object indicating that no error has been emitted */
const NO_ERROR_SENTINEL_OBJ = {};
/** Observer storing the latest value from a snapshot stream */
class SnapshotObserver {
    constructor() {
        /** The latest value */
        this.value = undefined;
        /** An error value if not equal to `NO_ERROR_SENTINEL` */
        this.errorValue = NO_ERROR_SENTINEL_OBJ;
    }
    /**
     * Gets the latest value or throw on errors
     * @returns The latest value
     * @throws If an error has been emitted
     */
    get() {
        if (this.errorValue !== NO_ERROR_SENTINEL_OBJ) {
            throw this.errorValue;
        }
        return this.value;
    }
    /**
     * Handles value emits
     * @param value The new value
     */
    next(value) {
        this.value = value;
    }
    /**
     * Handles error emits
     * @param err The error value
     */
    error(err) {
        this.value = undefined;
        this.errorValue = err;
    }
}

/**
 * Injects a function that returns the latest snapshot value each time it is called
 * Automatically marks components, directives, or pipes for change detection whenever
 * a new value is available
 * @param selector Store data selector
 * @returns A snapshot function
 */
function selectSnapshot(selector) {
    const obs$ = select$(selector, { notifyOnChange: true });
    const observer = new SnapshotObserver();
    obs$.subscribe(observer);
    return observer.get.bind(observer);
}
/**
 * Injects a function that can be called with the same arguments as the query selector
 * and returns the latest value each time. Automatically marks components, directives, or pipes
 * for change detection whenever a new value is available. Note that since typescript has yet to
 * implement support for higher order generics there is sometimes a need to specialize the
 * returned query function with the correct arguments and return type. This can be done as shown
 * in the examples.
 *
 * @example <caption>Basic usage</caption>
 * class Component {
 *   ...
 *   // Return type: () => string
 *   readonly markdown = querySelectSnapshot(ResourceRegistrySelectors.markdown, id);
 *   // Return type: (id: ResourceId) => string
 *   readonly markdownById = querySelectSnapshot(ResourceRegistrySelectors.markdown);
 *   ...
 * }
 *
 * @example <caption>Specialize query arguments and/or return type</caption>
 * class Component {
 *   ...
 *   // Return type: () => number[]
 *   readonly points = querySelectSnapshot(ResourceRegistrySelectors.field, id, type, 'points', [])<number[]>;
 *   // Return type: (field: string, defaultValue: string) => string
 *   readonly getStringField = querySelectSnapshot(ResourceRegistrySelectors.field, id, type)<string, [string, string]>;
 * }
 *
 * @param selector Store query selector
 * @param boundArgs Optional bound query arguments
 * @returns A snapshot function taking the same arguments as the query selector (excluding bound arguments)
 */
function selectQuerySnapshot(selector, ...boundArgs) {
    const get = selectSnapshot(selector);
    return (...args) => get()(...boundArgs, ...args);
}

/**
 * Generated bundle index. Do not edit.
 */

export { dispatch, dispatch$, dispatchAction, dispatchAction$, injectDestroy$, select$, selectQuerySnapshot, selectSnapshot };
//# sourceMappingURL=hra-ui-cdk-injectors.mjs.map
