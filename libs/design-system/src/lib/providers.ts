import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpFeature, HttpFeatureKind, provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from '@hra-ui/cdk/icons';
import { provideButtonToggle } from '@hra-ui/design-system/button-toggle';
import { provideButtons } from '@hra-ui/design-system/buttons';
import { provideCheckboxes } from '@hra-ui/design-system/checkbox';
import { provideIconButtons } from '@hra-ui/design-system/icon-button';
import { provideInput } from '@hra-ui/design-system/input';
import { provideMenu } from '@hra-ui/design-system/menu';
import { provideScrolling, ScrollingOptions } from '@hra-ui/design-system/scrolling';
import { provideSelect } from '@hra-ui/design-system/select';
import { provideTable } from '@hra-ui/design-system/table';
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
      const initializerFn = (() => {
        const overlayContainer = inject(OverlayContainer);
        return () => {
          overlayContainer.getContainerElement().classList.add('hra-app');
        };
      })();
      return initializerFn();
    }),
    provideIcons({
      fontIcons: {
        defaultClasses: ['material-symbols-rounded'],
      },
    }),
    provideButtons(),
    provideIconButtons(),
    provideTrees(),
    provideScrolling(options?.scrolling),
    provideMenu(),
    provideTable(),
    provideSelect(),
    provideInput(),
    provideButtonToggle(),
    provideCheckboxes(),
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
