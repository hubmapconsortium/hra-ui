import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { IconButtonStylesComponent } from './icon-button-styles/icon-button-styles.component';

/**
 * Returns providers for icon buttons
 */
export function provideIconButtons(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(IconButtonStylesComponent)]);
}
