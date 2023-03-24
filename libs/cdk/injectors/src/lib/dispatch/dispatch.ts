import { inject } from '@angular/core';
import type { Any } from '@hra-ui/utils/types';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';

/**
 * Wraps an action constructor with automatic dispatching on each call to the function.
 *
 * @param type Action constructor to create new instances
 * @returns A function that dispatches an action on the store each time it is called
 */
export function dispatch<A, BoundArgs extends Any[], DispatchArgs extends Any[]>(
  type: new (...args: [...BoundArgs, ...DispatchArgs]) => A,
  ...boundArgs: BoundArgs
): (...args: DispatchArgs) => A {
  const store = inject(Store);
  return (...args) => {
    const instance = new type(...boundArgs, ...args);
    store.dispatch(instance);
    return instance;
  };
}

/**
 * Wraps an action constructor with automatic dispatching on each call to the function.
 * Each call to the wrapper returns an observable that emits the action once the
 * action dispatch has completed.
 *
 * @param type Action constructor to create new instances
 * @returns A function that dispatches an action on the store each time it is called
 */
export function dispatch$<A, BoundArgs extends Any[], DispatchArgs extends Any[]>(
  type: new (...args: [...BoundArgs, ...DispatchArgs]) => A,
  ...boundArgs: BoundArgs
): (...args: DispatchArgs) => Observable<A> {
  const store = inject(Store);
  return (...args) => {
    const instance = new type(...boundArgs, ...args);
    return store.dispatch(instance).pipe(map(() => instance));
  };
}
