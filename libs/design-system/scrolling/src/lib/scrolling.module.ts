import { EnvironmentProviders, NgModule, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { NgScrollbarModule, NgScrollbarOptions, provideScrollbarOptions } from 'ngx-scrollbar';
import { ScrollOverflowFadeDirective } from './scroll-overflow-fade/scroll-overflow-fade.directive';
import { ScrollbarStylesComponent } from './scrollbar-styles/scrollbar-styles.component';

/**
 * Provide scrolling functionality to an application.
 *
 * @param options Scrollbar options
 * @returns An environment provider
 */
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

/** Module exporting ng-scrollbar and related scrolling utilities */
@NgModule({
  imports: [ScrollOverflowFadeDirective],
  exports: [NgScrollbarModule, ScrollOverflowFadeDirective],
})
export class ScrollingModule {}
