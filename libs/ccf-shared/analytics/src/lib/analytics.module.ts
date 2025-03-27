import { ModuleWithProviders, NgModule, provideAppInitializer } from '@angular/core';
import { IGoogleAnalyticsCommand, NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { ConsentService } from './consent.service';
import { GoogleAnalyticsSyncService } from './google-analytics-sync.service';
import { LocalStorageSyncService } from './local-storage-sync.service';

/** Analytics options */
export interface AnalyticsOptions {
  /** Google analytics token */
  gaToken: string;
  /** Application name */
  appName?: string;
  /** Project name */
  projectName?: string;
  /** Whether the app is running in development mode */
  developmentMode?: boolean;
}

/** Services that are loaded on application startup */
const EAGERLY_LOADED_SERVICES = [ConsentService, GoogleAnalyticsSyncService, LocalStorageSyncService];

/**
 * Stringifies each value and removes keys with null or undefined values
 *
 * @param obj Attributes to stringify
 * @returns An object of stringified key/values
 */
function toAttributes(obj: Record<string, unknown>): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((attrs, [key, value]) => {
    if (value != null) {
      attrs[key] = `${value}`;
    }

    return attrs;
  }, {});
}

/**
 * Turns options into analytics commands
 *
 * @param options Analytics options
 * @returns Array of commands
 */
function initCommands(options: AnalyticsOptions): IGoogleAnalyticsCommand[] {
  const { appName, projectName, developmentMode } = options;

  return [
    {
      command: 'set',
      values: [
        toAttributes({
          appName,
          projectName,
          developmentMode,
        }),
      ],
    },
  ];
}

/** Analytics module */
@NgModule({
  imports: [NgxGoogleAnalyticsModule],
  providers: [
    ...EAGERLY_LOADED_SERVICES,

    provideAppInitializer(() => {
      const initializerFn = (
        () => () =>
          undefined
      )();
      return initializerFn();
    }),
  ],
})
export class AnalyticsModule {
  /** Add root providers */
  static forRoot(options: AnalyticsOptions): ModuleWithProviders<AnalyticsModule> {
    const { providers = [] } = NgxGoogleAnalyticsModule.forRoot(options.gaToken, initCommands(options));

    return { ngModule: AnalyticsModule, providers };
  }
}
