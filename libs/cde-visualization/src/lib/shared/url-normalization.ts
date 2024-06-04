import { Location } from '@angular/common';
import { Injector, inject, runInInjectionContext } from '@angular/core';

export function createAbsoluteUrl(url: string, options: { injector?: Injector } = {}): string {
  const injector = options.injector ?? inject(Injector, { optional: true });
  if (!injector) {
    throw new Error('createAbsoluteUrl must be run in an injection context');
  }

  return runInInjectionContext(injector, () => {
    if (url.startsWith('http')) {
      return url;
    }

    const location = inject(Location);
    const urlObject = new URL(location.prepareExternalUrl(url), window.location.origin);
    return urlObject.toString();
  });
}
