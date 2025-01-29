import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { ButtonGlobalStylesComponent } from './global-styles.component';

/**
 * Applies global styles to buttons
 *
 * @returns Button providers
 */
export function provideButton(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(ButtonGlobalStylesComponent)]);
}
