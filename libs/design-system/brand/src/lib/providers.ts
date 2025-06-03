import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideCategoryLogos } from '@hra-ui/design-system/brand/category-logo';
import { provideOrganLogos } from '@hra-ui/design-system/brand/organ-logo';

export function provideBrand(): EnvironmentProviders {
  return makeEnvironmentProviders([provideCategoryLogos(), provideOrganLogos()]);
}
