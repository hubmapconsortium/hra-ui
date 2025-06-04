import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { IconConfig, IconConfigRegistryService, IconConfigResolver } from '@hra-ui/design-system/icons';

/** Icon configuration for category logos */
const CATEGORY_ICON_CONFIG: IconConfig = {
  color: '#ffffff',
  backgroundColor: '#4b4b5e',
};

/**
 * Creates a new configuration resolver
 *
 * @returns A configuration resolver
 */
function createCategoryLogoConfigResolver(): IconConfigResolver {
  return (_name, namespace) => (namespace === 'category' ? CATEGORY_ICON_CONFIG : undefined);
}

/**
 * Initializes category logo icons
 */
export function provideCategoryLogos(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const registry = inject(IconConfigRegistryService);
    registry.addIconConfigResolver(createCategoryLogoConfigResolver());
  });
}
