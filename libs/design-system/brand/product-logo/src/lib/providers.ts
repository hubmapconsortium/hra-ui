import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { IconConfig, IconConfigRegistryService } from '@hra-ui/design-system/icons';

const PRODUCT_ICON_CONFIG: IconConfig = {
  color: '#ffffff',
  backgroundColor: '#201e3d',
};

const productIconConfigResolver = (_name: string, namespace: string) => {
  return namespace === 'product' ? PRODUCT_ICON_CONFIG : undefined;
};

export function provideProductLogos(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const registry = inject(IconConfigRegistryService);
    registry.addIconConfigResolver(productIconConfigResolver);
  });
}
