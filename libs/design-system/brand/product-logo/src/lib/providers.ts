import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { IconConfig, IconConfigRegistryService, IconConfigResolver } from '@hra-ui/design-system/icons';

/** Icon configuration for product logos */
const PRODUCT_ICON_CONFIG: IconConfig = {
  color: '#ffffff',
  backgroundColor: '#201e3d',
};

/**
 * Creates a new configuration resolver
 *
 * @returns A configuration resolver
 */
function createProductLogoConfigResolver(): IconConfigResolver {
  return (_name, namespace) => (namespace === 'product' ? PRODUCT_ICON_CONFIG : undefined);
}

/**
 * Initializes product logo icons
 */
export function provideProductLogos(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const registry = inject(IconConfigRegistryService);
    registry.addIconConfigResolver(createProductLogoConfigResolver());
  });
}
