import { computed, isSignal, signal } from '@angular/core';
import { InjectHrefFn, ProvideChainedHrefFn, ProvideHrefFn, RawProvideHrefFn, ValueOrFactory } from './types';

/**
 * Wraps a href provider function with more permissive input types
 *
 * @param provide Provider function returned by ngxtension's `createInjectionToken`
 * @returns A more permissive provider function
 */
export function createHrefProvider(provide: RawProvideHrefFn): ProvideHrefFn {
  return (valueOrFactory) =>
    provide(() => {
      const value = getValue(valueOrFactory);
      return isSignal(value) ? value : signal(value).asReadonly();
    }, false);
}

/**
 * Create a provider function that falls back to the parent injector's href
 * value when the provided href's value is undefined
 *
 * @param injectHref Injection function used to get the parent href
 * @param provide Raw provider function
 * @returns A new provider function
 */
export function createChainedHrefProvider(injectHref: InjectHrefFn, provide: RawProvideHrefFn): ProvideChainedHrefFn {
  return (valueOrFactory) =>
    provide(() => {
      const baseHref = injectHref({ skipSelf: true });
      const href = getValue(valueOrFactory);
      return computed(() => href() ?? baseHref());
    }, false);
}

/**
 * Get the value from a raw value or factory function
 *
 * @param valueOrFactory A value or a factory function
 * @returns A value
 */
function getValue<T>(valueOrFactory: ValueOrFactory<T>): T {
  if (typeof valueOrFactory === 'function' && !isSignal(valueOrFactory)) {
    return (valueOrFactory as () => T)();
  }
  return valueOrFactory;
}
