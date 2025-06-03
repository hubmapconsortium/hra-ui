import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideCategoryLogos } from '@hra-ui/design-system/brand/category-logo';

export function provideBrand(): EnvironmentProviders {
  return makeEnvironmentProviders([provideCategoryLogos()]);
}
