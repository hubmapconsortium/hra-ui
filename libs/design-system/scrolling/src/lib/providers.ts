import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NgScrollbarOptions, provideScrollbarOptions } from 'ngx-scrollbar';

export function provideScrolling(options?: NgScrollbarOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    // TODO point polyfill url to 'cdn.humanatlas.io/path/to/polyfill.js'?

    provideScrollbarOptions({
      visibility: 'hover',
      appearance: 'compact',
      trackClass: 'hra-scrollbar-track',
      thumbClass: 'hra-scrollbar-thumb',
      ...options,
    }),
  ]);
}
