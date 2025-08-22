import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders } from '@angular/core';

/** Application configuration */
export interface AppConfiguration {
  /** Application name */
  name?: string;
  /** Application version */
  version?: string;
  /** Application url */
  url?: string;
}

/** Application configuration token */
const APP_CONFIGURATION = new InjectionToken<AppConfiguration>('AppConfiguration', {
  providedIn: 'root',
  factory: () => ({}),
});

/**
 * Inject the global application configuration
 *
 * @returns The application configuration
 */
export function injectAppConfiguration(): AppConfiguration {
  return inject(APP_CONFIGURATION);
}

/**
 * Set the application configuration
 *
 * @param config New configuration
 * @returns An environment provider
 */
export function provideAppConfiguration(config: AppConfiguration): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_CONFIGURATION,
      useValue: config,
    },
  ]);
}
