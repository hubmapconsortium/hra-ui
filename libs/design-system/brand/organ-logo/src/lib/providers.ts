import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { IconConfig, IconConfigRegistryService, IconConfigResolver } from '@hra-ui/design-system/icons';

/** Icon configuration for organ logos */
const ORGAN_ICON_CONFIG: IconConfig = {
  color: '#ffffff',
  backgroundColor: '#ff0043',
};

/**
 * Creates a new configuration resolver
 *
 * @returns A configuration resolver
 */
function createOrganLogoConfigResolver(): IconConfigResolver {
  return (_name, namespace) => (namespace === 'organ' ? ORGAN_ICON_CONFIG : undefined);
}

/**
 * Initializes organ logo icons
 */
export function provideOrganLogos(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const registry = inject(IconConfigRegistryService);
    registry.addIconConfigResolver(createOrganLogoConfigResolver());
  });
}
