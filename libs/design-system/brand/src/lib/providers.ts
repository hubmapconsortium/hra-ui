import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideMiscellaneousLogos } from '@hra-ui/design-system/brand/miscellaneous-logo';
import { provideOrganLogos } from '@hra-ui/design-system/brand/organ-logo';
import { provideProductLogos } from '@hra-ui/design-system/brand/product-logo';

/**
 * Provide brand components
 */
export function provideBrand(): EnvironmentProviders {
  return makeEnvironmentProviders([provideMiscellaneousLogos(), provideOrganLogos(), provideProductLogos()]);
}
