import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { IconBackgroundGlobalStylesComponent } from './global-styles.component';

/**
 * Applies backgrounds to icons
 *
 * @returns Icon background providers
 */
export function provideIcons(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(IconBackgroundGlobalStylesComponent)]);
}
