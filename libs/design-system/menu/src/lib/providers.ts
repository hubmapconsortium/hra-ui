import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';

import { MenuStylesComponent } from './menu-styles/menu-styles.component';

/**
 * Returns providers for menu
 */
export function provideMenu(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(MenuStylesComponent)]);
}
