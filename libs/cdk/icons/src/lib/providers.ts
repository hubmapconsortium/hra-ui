import { EnvironmentProviders, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { registerFontClasses } from './font-icons/classes';
import { registerSvgIconResolver } from './svg-icons/resolver';
import { ICONS_CONFIG, IconsConfig } from './tokens';

/**
 * Provides icon configuration and initialization
 *
 * @param config Icons configuration
 * @returns Providers
 */
export function provideIcons(config: IconsConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ICONS_CONFIG,
      useValue: config,
    },
    provideAppInitializer(registerFontClasses),
    provideAppInitializer(registerSvgIconResolver),
  ]);
}
