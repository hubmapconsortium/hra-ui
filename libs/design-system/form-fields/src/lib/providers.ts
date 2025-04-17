import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { FormFieldsGlobalStylesComponent } from './global-styles.component';

/**
 * Applies global styles to form fields
 *
 * @returns Form Field providers
 */
export function provideFromFields(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(FormFieldsGlobalStylesComponent)]);
}
