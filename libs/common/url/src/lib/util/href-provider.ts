import { isSignal, Provider, signal, Signal } from '@angular/core';

export function createHrefProvider(
  provide: (value: Signal<string> | (() => Signal<string>), isFunctionValue: boolean) => Provider,
): (value: string | Signal<string> | (() => string | Signal<string>)) => Provider {
  return (value) =>
    provide(() => {
      const result = typeof value === 'function' && !isSignal(value) ? value() : value;
      return isSignal(result) ? result : signal(result).asReadonly();
    }, false);
}
