import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { IconConfig, IconConfigRegistryService } from '@hra-ui/design-system/icons';

const ORGAN_ICON_CONFIG: IconConfig = {
  color: '#ffffff',
  backgroundColor: '#ff0043',
};

const organIconConfigResolver = (_name: string, namespace: string) => {
  return namespace === 'organ' ? ORGAN_ICON_CONFIG : undefined;
};

export function provideOrganLogos(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const registry = inject(IconConfigRegistryService);
    registry.addIconConfigResolver(organIconConfigResolver);
  });
}
