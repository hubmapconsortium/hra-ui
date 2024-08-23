import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';

import { TableStylesComponent } from './table-styles/table-styles.component';

/**
 * Returns providers for table
 */
export function provideTable(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(TableStylesComponent)]);
}
