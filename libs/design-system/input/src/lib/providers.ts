import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { InputStylesComponent } from './input-styles/input-styles.component';

/**
 * Returns providers for Input
 */
export function provideInput(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(InputStylesComponent)]);
}
