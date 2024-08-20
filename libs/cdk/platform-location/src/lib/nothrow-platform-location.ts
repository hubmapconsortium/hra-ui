import { PlatformLocation } from '@angular/common';
import { APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';

/** Patchable platform location history methods */
export type PatchablePlatformLocationHistoryMethod = 'replaceState' | 'pushState' | 'forward' | 'back' | 'historyGo';

/** Array of all patchable platform location history methods */
export const PATCHABLE_PLATFORM_LOCATION_HISTORY_METHODS: PatchablePlatformLocationHistoryMethod[] = [
  'replaceState',
  'pushState',
  'forward',
  'back',
  'historyGo',
];

/**
 * Patches a platform location method to catch and ignore `SecurityError` DOMExceptions
 * in environments where the history api may not be fully available.
 *
 * @param impl PlatformLocation instance
 * @param method Name of method to patch
 */
export function patchPlatformLocationHistoryMethod(
  impl: PlatformLocation,
  method: PatchablePlatformLocationHistoryMethod,
): void {
  type AnyFunction = (...args: unknown[]) => unknown;
  const originalFn = impl[method];
  if (originalFn) {
    impl[method] = function (...args: unknown[]) {
      try {
        return (originalFn as AnyFunction).apply(this, args);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'SecurityError') {
          return undefined;
        }

        throw error;
      }
    };
  }
}

/**
 * Patches multiple platform location methods to catch and ignore `SecurityError` DOMExceptions
 * in environments where the history api may not be fully available.
 *
 * @param impl PlatformLocation instance
 * @param methods Array of methods to patch
 */
export function patchPlatformLocationHistoryMethods(
  impl: PlatformLocation,
  methods: PatchablePlatformLocationHistoryMethod[] = PATCHABLE_PLATFORM_LOCATION_HISTORY_METHODS,
): void {
  for (const key of methods) {
    patchPlatformLocationHistoryMethod(impl, key);
  }
}

/**
 * Ensures that the PlatformLocation does not throw errors when using the history in
 * an environment where it is not fully supported. The patch still allows errors due
 * to invalid input, etc. to propagate through.
 *
 * @returns Providers
 */
export function provideNothrowPlatformLocation(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        patchPlatformLocationHistoryMethods(inject(PlatformLocation));
        return () => undefined;
      },
    },
  ]);
}
