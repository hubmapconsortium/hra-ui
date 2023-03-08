import { inject } from '@angular/core';
import type { AnyConstructor } from '@hra-ui/utils/types';
import { Store } from '@ngxs/store';

/**
 * Function type returned by `dispatch(actionType)`.
 * Accepts the same arguments as the passed action constructor and
 * returns an instance of the action.
 */
export type Dispatcher<A extends AnyConstructor> = (...args: ConstructorParameters<A>) => InstanceType<A>;

/**
 * Wraps an action constructor with automatic dispatching on each call to the function.
 *
 * @param actionType Action constructor to create new instances
 * @returns A function that dispatches an action on the store each time it is called
 */
export function dispatch<A extends AnyConstructor>(actionType: A): Dispatcher<A> {
  const store = inject(Store);
  return (...args) => {
    const instance = new actionType(...args);
    store.dispatch(instance);
    return instance;
  };
}
