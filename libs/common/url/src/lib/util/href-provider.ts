import { isSignal, Provider, signal, Signal } from '@angular/core';

/**
 * Wraps a href provider function with more permissive input types
 *
 * @param provide Provider function returned by ngxtension's `createInjectionToken`
 * @returns A more permissive provider function
 */
export function createHrefProvider(
  provide: (value: Signal<string> | (() => Signal<string>), isFunctionValue: boolean) => Provider,
): (value: string | Signal<string> | (() => string | Signal<string>)) => Provider {
  return (value) =>
    provide(() => {
      const result = typeof value === 'function' && !isSignal(value) ? value() : value;
      return isSignal(result) ? result : signal(result).asReadonly();
    }, false);
}
