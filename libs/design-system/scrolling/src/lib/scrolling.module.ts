import { CdkScrollable } from '@angular/cdk/scrolling';
import { EnvironmentProviders, makeEnvironmentProviders, NgModule } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { getDefaultAssetsHref } from '@hra-ui/common';
import {
  NgScrollbarModule,
  NgScrollbarOptions,
  provideScrollbarOptions,
  provideScrollbarPolyfill,
} from 'ngx-scrollbar';

import { ScrollOverflowFadeDirective } from './scroll-overflow-fade/scroll-overflow-fade.directive';
import { ScrollbarStylesComponent } from './scrollbar-styles/scrollbar-styles.component';

/** Scrolling configuration */
export interface ScrollingOptions extends NgScrollbarOptions {
  /** Url to the scroll timeline polyfill script */
  polyfillUrl?: string;
}

/** Default scroll timeline polyfill url */
const DEFAULT_POLYFILL_URL = 'assets/polyfills/scroll-timeline-polyfill.js';

/**
 * Provide scrolling functionality to an application.
 *
 * @param options Scrollbar options
 * @returns An environment provider
 */
export function provideScrolling(options?: ScrollingOptions): EnvironmentProviders {
  const polyfillUrl = getDefaultAssetsHref() + (options?.polyfillUrl ?? DEFAULT_POLYFILL_URL);

  return makeEnvironmentProviders([
    provideStyleComponents(ScrollbarStylesComponent),
    provideScrollbarPolyfill(polyfillUrl),
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
  imports: [ScrollOverflowFadeDirective, CdkScrollable],
  exports: [NgScrollbarModule, ScrollOverflowFadeDirective, CdkScrollable],
})
export class ScrollingModule {}
