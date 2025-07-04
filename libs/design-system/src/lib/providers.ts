import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpFeature, HttpFeatureKind, provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideBrand } from '@hra-ui/design-system/brand';
import { provideButtons } from '@hra-ui/design-system/buttons';
import { provideChips } from '@hra-ui/design-system/buttons/chips';
import { provideCodeBlock } from '@hra-ui/design-system/code-block';
import { provideIcons } from '@hra-ui/design-system/icons';
import { provideScrolling, ScrollingOptions } from '@hra-ui/design-system/scrolling';
import { provideTrees } from '@hra-ui/design-system/tree';

/** Design system provider options */
export interface DesignSystemOptions {
  /** Http features */
  http?: HttpFeature<HttpFeatureKind>[];
  /** Scrolling options */
  scrolling?: ScrollingOptions;
}

/** Get the providers shared between prod and testing */
export function provideDesignSystemCommon(options?: DesignSystemOptions) {
  return [
    provideAppInitializer(() => {
      const overlayContainer = inject(OverlayContainer);
      overlayContainer.getContainerElement().classList.add('hra-app');
    }),
    provideBrand(),
    provideButtons(),
    provideChips(),
    provideCodeBlock(),
    provideIcons(),
    provideScrolling(options?.scrolling),
    provideTrees(),
  ];
}

/**
 * Returns design system providers
 */
export function provideDesignSystem(options?: DesignSystemOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(...(options?.http ?? [])),
    provideAnimations(),
    ...provideDesignSystemCommon(options),
  ]);
}
