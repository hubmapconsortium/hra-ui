import { createInjectionToken } from 'ngxtension/create-injection-token';

/** Application configuration */
export interface AppConfiguration {
  /** Application name */
  name?: string;
  /** Application version */
  version?: string;
  /** Application url */
  url?: string;
}

/** Application configuration */
const APP_CONFIGURATION = createInjectionToken((): AppConfiguration => ({}));

/** Inject the global application configuration */
export const injectAppConfiguration = APP_CONFIGURATION[0];
/** Set the application configuration */
export const provideAppConfiguration = APP_CONFIGURATION[1];
