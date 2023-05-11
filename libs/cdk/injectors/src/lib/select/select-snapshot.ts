import type { Any, AnyFunction } from '@hra-ui/utils/types';
import { select$, StateSelector } from './select';
import { SnapshotObserver } from './snapshot-observer';

/** Get remaining arguments after applying bound arguments */
type RestArgs<F extends AnyFunction, BoundArgs extends Any[]> = F extends (
  ...args: [...BoundArgs, ...infer Rest]
) => Any
  ? Rest
  : never;

/** Function type returned by {@link selectQuerySnapshot} */
type SelectQuery<F extends AnyFunction, BoundArgs extends Any[]> = <
  Res = ReturnType<F>,
  Args extends Any[] = RestArgs<F, BoundArgs>
>(
  ...args: Args
) => Res;

/**
 * Injects a function that returns the latest snapshot value each time it is called
 * Automatically marks components, directives, or pipes for change detection whenever
 * a new value is available
 * @param selector Store data selector
 * @returns A snapshot function
 */
export function selectSnapshot<T>(selector: StateSelector<T>): () => T {
  const obs$ = select$(selector, { notifyOnChange: true });
  const observer = new SnapshotObserver<T>();
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
export function selectQuerySnapshot<F extends (...args: [...BoundArgs, ...Any[]]) => Any, BoundArgs extends Any[]>(
  selector: StateSelector<F>,
  ...boundArgs: BoundArgs
): SelectQuery<F, BoundArgs> {
  const get = selectSnapshot(selector);
  return (...args) => get()(...boundArgs, ...args);
}
