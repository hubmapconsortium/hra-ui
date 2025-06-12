import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';

/**
 * Applies global styles to radio button
 *
 * @returns Radio Button providers
 */
export function provideRadioButton(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents()]);
}
