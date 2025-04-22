import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';

/**
 * Applies global styles to buttons
 *
 * @returns Button providers
 */
export function provideButton(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents()]);
}
