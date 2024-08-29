import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { ButtonToggleStylesComponent } from './button-toggle-styles/button-toggle-styles.component';

/**
 * Returns providers for button toggle
 */
export function provideButtonToggle(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(ButtonToggleStylesComponent)]);
}
