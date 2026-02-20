import { EnvironmentProviders } from '@angular/core';

/**
 * Ensures that the PlatformLocation does not throw errors when using the history in
 * an environment where it is not fully supported. The patch still allows errors due
 * to invalid input, etc. to propagate through.
 *
 * @returns Providers
 */
declare function provideNothrowPlatformLocation(): EnvironmentProviders;

export { provideNothrowPlatformLocation };
