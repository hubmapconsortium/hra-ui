import { Any, AnyFunction } from '@hra-ui/utils/types';
import { Observable } from 'rxjs';
import { StateToken } from '@ngxs/store';

/**
 * Wraps an action constructor with automatic dispatching on each call to the function.
 *
 * @param type Action constructor to create new instances
 * @param boundArgs Bound arguments to the action constructor
 * @returns A function that dispatches an action on the store each time it is called
 */
declare function dispatch<A, BoundArgs extends Any[], DispatchArgs extends Any[]>(type: new (...args: [...BoundArgs, ...DispatchArgs]) => A, ...boundArgs: BoundArgs): (...args: DispatchArgs) => A;
/**
 * Wraps an action constructor with automatic dispatching on each call to the function.
 * Each call to the wrapper returns an observable that emits the action instance once the
 * dispatch action has completed.
 *
 * @param type Action constructor to create new instances
 * @param boundArgs Bound arguments to the action constructor
 * @returns A function that dispatches an action on the store each time it is called
 */
declare function dispatch$<A, BoundArgs extends Any[], DispatchArgs extends Any[]>(type: new (...args: [...BoundArgs, ...DispatchArgs]) => A, ...boundArgs: BoundArgs): (...args: DispatchArgs) => Observable<A>;
/**
 * Creates a callback that can dispatch any action or array of actions.
 * Each call returns passed actions unchanged
 *
 * @returns A function that dispatches actions on the store each time it is called
 */
declare function dispatchAction(): <A>(action: A) => A;
/**
 * Creates a callback that can dispatch any action or array of actions.
 * Each call returns an observable that emits the passed actions when the dispatch has finished
 *
 * @returns A function that dispatches actions on the store each time it is called
 */
declare function dispatchAction$(): <A>(action: A) => Observable<A>;

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
declare function injectDestroy$(): Observable<void>;

/** Selector type for select style functions */
type StateSelector<T> = ((...args: Any[]) => T) | StateToken<T>;
/** `select$` configuration options */
interface SelectOptions {
    /** Whether to mark the containing view for change detection on emits. Defaults to true. */
    notifyOnChange?: boolean;
}
/**
 * Creates an observable emitting parts of the state. The observable's lifetime
 * is automatically tied to the injection context where this is called.
 * @param selector State selection function or token
 * @param options Additional select options
 * @returns An observable of the selected state
 */
declare function select$<T>(selector: StateSelector<T>, options?: SelectOptions): Observable<T>;

/** Get remaining arguments after applying bound arguments */
type RestArgs<F extends AnyFunction, BoundArgs extends Any[]> = F extends (...args: [...BoundArgs, ...infer Rest]) => Any ? Rest : never;
/** Function type returned by {@link selectQuerySnapshot} */
type SelectQuery<F extends AnyFunction, BoundArgs extends Any[]> = <Res = ReturnType<F>, Args extends Any[] = RestArgs<F, BoundArgs>>(...args: Args) => Res;
/**
 * Injects a function that returns the latest snapshot value each time it is called
 * Automatically marks components, directives, or pipes for change detection whenever
 * a new value is available
 * @param selector Store data selector
 * @returns A snapshot function
 */
declare function selectSnapshot<T>(selector: StateSelector<T>): () => T;
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
declare function selectQuerySnapshot<F extends (...args: [...BoundArgs, ...Any[]]) => Any, BoundArgs extends Any[]>(selector: StateSelector<F>, ...boundArgs: BoundArgs): SelectQuery<F, BoundArgs>;

export { dispatch, dispatch$, dispatchAction, dispatchAction$, injectDestroy$, select$, selectQuerySnapshot, selectSnapshot };
export type { SelectOptions, StateSelector };
