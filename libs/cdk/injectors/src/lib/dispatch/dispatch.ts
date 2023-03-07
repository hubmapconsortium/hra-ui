import { inject } from '@angular/core';
import { AnyConstructor } from '@hra-ui/utils/types';
import { Store } from '@ngxs/store';

export type Dispatcher<A extends AnyConstructor> = (...args: ConstructorParameters<A>) => InstanceType<A>;

export function dispatch<A extends AnyConstructor>(action: A): Dispatcher<A> {
  const store = inject(Store);
  return (...args) => {
    const instance = new action(...args);
    store.dispatch(instance);
    return instance;
  };
}
