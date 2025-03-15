import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { ChipsGlobalStylesComponent } from './global-styles.component';

/**
 * Applies global styles to chips
 *
 * @returns Chips providers
 */
export function provideChips(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(ChipsGlobalStylesComponent)]);
}
