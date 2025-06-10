import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { IconConfig, IconConfigRegistryService, IconConfigResolver } from '@hra-ui/design-system/icons';

/** Icon configuration for miscellaneous logos */
const MISCELLANEOUS_ICON_CONFIG: IconConfig = {
  color: '#ffffff',
  backgroundColor: '#4b4b5e',
};

/**
 * Creates a new configuration resolver
 *
 * @returns A configuration resolver
 */
function createMiscellaneousLogoConfigResolver(): IconConfigResolver {
  return (_name, namespace) => (namespace === 'misc' ? MISCELLANEOUS_ICON_CONFIG : undefined);
}

/**
 * Initializes miscellaneous logo icons
 */
export function provideMiscellaneousLogos(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const registry = inject(IconConfigRegistryService);
    registry.addIconConfigResolver(createMiscellaneousLogoConfigResolver());
  });
}
