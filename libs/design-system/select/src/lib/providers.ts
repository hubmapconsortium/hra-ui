import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { SelectStylesComponent } from './select-styles/select-styles.component';

/**
 * Returns providers for select
 */
export function provideSelect(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(SelectStylesComponent)]);
}
