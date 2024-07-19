import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NgScrollbarOptions, provideScrollbarOptions } from 'ngx-scrollbar';

export function provideScrollingOptions(options?: NgScrollbarOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...provideScrollbarOptions({
      visibility: 'hover',
      appearance: 'compact',
      trackClass: 'hra-scrollbar-track',
      thumbClass: 'hra-scrollbar-thumb',
      ...options,
    }),
  ]);
}
