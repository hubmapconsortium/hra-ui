import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { CheckboxStylesComponent } from './checkbox-styles/checkbox-styles.component';

/**
 * Returns providers for checkboxes
 */
export function provideCheckboxes(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(CheckboxStylesComponent)]);
}
