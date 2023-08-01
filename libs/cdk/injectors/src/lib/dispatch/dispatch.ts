import { inject } from '@angular/core';
import type { Any } from '@hra-ui/utils/types';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';

/** Identity function returning the first argument passed */
function identity<T>(value: T): T {
  return value;
}

/** Maps all emits to an action value */
function pipeActionInstance<A>(action: A, obs$: Observable<void>): Observable<A> {
  return obs$.pipe(map(() => action));
}

/**
 * Creates an action factory function
 * @param type Action constructor
 * @param boundArgs Initial bound arguments
 * @returns A factory function creating a new action on each call
 */
function createActionFactory<A, BoundArgs extends Any[], RestArgs extends Any[]>(
  type: new (...args: [...BoundArgs, ...RestArgs]) => A,
  boundArgs: BoundArgs
): (...args: RestArgs) => A {
  return (...args) => new type(...boundArgs, ...args);
}

/**
 * Common dispatch functionality used to implement all dispatch functions
 * @param actionFactory Creates an action or array of actions from the user provided arguments
 * @param resultHandler Selects the output value from the action and the dispatch observable
 * @returns A new dispatch function taking user arguments, dispatches actions, and returns a value
 */
function dispatchImpl<A, R, Args extends Any[]>(
  actionFactory: (...args: Args) => A,
  resultHandler: (action: A, obs$: Observable<void>) => R
): (...args: Args) => R {
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
export function dispatch<A, BoundArgs extends Any[], DispatchArgs extends Any[]>(
  type: new (...args: [...BoundArgs, ...DispatchArgs]) => A,
  ...boundArgs: BoundArgs
): (...args: DispatchArgs) => A {
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
export function dispatch$<A, BoundArgs extends Any[], DispatchArgs extends Any[]>(
  type: new (...args: [...BoundArgs, ...DispatchArgs]) => A,
  ...boundArgs: BoundArgs
): (...args: DispatchArgs) => Observable<A> {
  return dispatchImpl(createActionFactory(type, boundArgs), pipeActionInstance);
}

/**
 * Creates a callback that can dispatch any action or array of actions.
 * Each call returns passed actions unchanged
 *
 * @returns A function that dispatches actions on the store each time it is called
 */
export function dispatchAction(): <A>(action: A) => A {
  return dispatchImpl(identity, identity);
}

/**
 * Creates a callback that can dispatch any action or array of actions.
 * Each call returns an observable that emits the passed actions when the dispatch has finished
 *
 * @returns A function that dispatches actions on the store each time it is called
 */
export function dispatchAction$(): <A>(action: A) => Observable<A> {
  return dispatchImpl(identity, pipeActionInstance);
}
