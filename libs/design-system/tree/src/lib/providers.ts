import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { TreeStylesComponent } from './tree-styles/tree-styles.component';

/**
 * Returns providers for tree
 */
export function provideTrees(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(TreeStylesComponent)]);
}
