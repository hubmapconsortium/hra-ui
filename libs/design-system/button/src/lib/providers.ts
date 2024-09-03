import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { ButtonStylesComponent } from './button-styles/button-styles.component';

/**
 * Returns providers for button
 */
export function provideButtons(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(ButtonStylesComponent)]);
}
