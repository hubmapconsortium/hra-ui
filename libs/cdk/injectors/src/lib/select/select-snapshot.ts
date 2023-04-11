import type { Any } from '@hra-ui/utils/types';
import { select$, StateSelector } from './select';
import { SnapshotObserver } from './snapshot-observer';

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
 * and returns the latest value each time
 * Automatically marks components, directives, or pipes for change detection whenever
 * a new value is available
 * @param selector Store query selector
 * @param boundArgs Optional bound query arguments
 * @returns A snapshot function taking the same arguments as the query selector (excluding bound arguments)
 */
export function selectQuerySnapshot<Res, BoundArgs extends Any[], QueryArgs extends Any[]>(
  selector: StateSelector<(...args: [...BoundArgs, ...QueryArgs]) => Res>,
  ...boundArgs: BoundArgs
): (...args: QueryArgs) => Res {
  const get = selectSnapshot(selector);
  return (...args) => get()(...boundArgs, ...args);
}
