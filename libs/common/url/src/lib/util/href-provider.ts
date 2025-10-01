import { isSignal, linkedSignal, signal } from '@angular/core';
import { ProvideHrefFn, RawProvideHrefFn } from './types';

/**
 * Wraps a href provider function with more permissive input types
 *
 * @param provide Raw provider function
 * @returns A provider function
 */
export function createHrefProvider(provide: RawProvideHrefFn): ProvideHrefFn {
  return (valueOrFactory) =>
    provide(() => {
      const value =
        typeof valueOrFactory === 'function' && !isSignal(valueOrFactory) ? valueOrFactory() : valueOrFactory;
      return isSignal(value) ? linkedSignal(value) : signal(value);
    }, false);
}
