import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { IconConfig, IconConfigRegistryService, IconConfigResolver } from '@hra-ui/design-system/icons';

const CATEGORY_ICON_CONFIG: IconConfig = {
  color: '#ffffff',
  backgroundColor: '#4b4b5e',
};

const categoryIconConfigResolver: IconConfigResolver = (_name, namespace) => {
  return namespace === 'category' ? CATEGORY_ICON_CONFIG : undefined;
};

export function provideCategoryLogos(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const registry = inject(IconConfigRegistryService);
    registry.addIconConfigResolver(categoryIconConfigResolver);
  });
}
