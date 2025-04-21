import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { RadioButtonGlobalStylesComponent } from './global-styles.component';

/**
 * Applies global styles to radio button
 *
 * @returns Radio button providers
 */
export function provideRadioButton(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(RadioButtonGlobalStylesComponent)]);
}
