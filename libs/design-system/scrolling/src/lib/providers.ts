import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { NgScrollbarOptions, provideScrollbarOptions } from 'ngx-scrollbar';
import { ScrollbarStylesComponent } from './scrollbar-styles/scrollbar-styles.component';

export function provideScrolling(options?: NgScrollbarOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideStyleComponents(ScrollbarStylesComponent),

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
