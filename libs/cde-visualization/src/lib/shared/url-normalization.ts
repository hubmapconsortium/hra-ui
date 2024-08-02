import { Location } from '@angular/common';
import { Injector, inject, runInInjectionContext } from '@angular/core';

/**
 * Creates an absolute URL from a given relative URL.
 *
 * @param url - The relative or absolute URL.
 * @param options - Optional configuration for the injector.
 * @returns The absolute URL as a string.
 */
export function createAbsoluteUrl(url: string, options: { injector?: Injector } = {}): string {
  const injector = options.injector ?? inject(Injector);
  return runInInjectionContext(injector, () => {
    if (url.startsWith('http')) {
      return url;
    }

    const location = inject(Location);
    const urlObject = new URL(location.prepareExternalUrl(url), window.location.origin);
    return urlObject.toString();
  });
}
