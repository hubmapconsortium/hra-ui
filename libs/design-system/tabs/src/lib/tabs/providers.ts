import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';

/**
 * Applies global configuration for material UI tabs.
 * @returns Providers with global configuration.
 */
export function provideTabs(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: MAT_TABS_CONFIG,
      useValue: {
        stretchTabs: false,
      },
    },
  ]);
}
