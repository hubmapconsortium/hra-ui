import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HraApiConfiguration, HraApiModule } from '@hra-api/ng-client';
import { provideAnalytics, withErrorHandler } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideDesignSystem } from '@hra-ui/design-system';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { ApiEndpointDataSourceService, DataSourceService, GlobalConfigState } from 'ccf-shared';
import { AnalyticsModule } from 'ccf-shared/analytics';
import { environment } from '../environments/environment';

/**
 * States shared across the entire app.
 */
export const ROOT_STATES = [GlobalConfigState];

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'ccf-organ-info',
      version: '5.0.0',
    }),
    provideAnalytics(withErrorHandler()),
    { provide: DataSourceService, useExisting: ApiEndpointDataSourceService },
    provideDesignSystem(),
    importProvidersFrom(
      NgxsDataPluginModule.forRoot(),
      NgxsModule.forRoot(ROOT_STATES, {
        developmentMode: !environment.production,
        // Consider setting compatibility and executionStrategy
        // https://www.ngxs.io/advanced/options
      }),
      // Logger plugin must be last!
      NgxsLoggerPluginModule.forRoot({
        disabled: environment.production,
      }),
      HraApiModule.forRoot(
        () =>
          new HraApiConfiguration({
            basePath: environment.dbOptions.remoteApiEndpoint,
          }),
      ),
      AnalyticsModule.forRoot({
        gaToken: environment.googleAnalyticsToken,
        appName: 'organ-info',
        projectName: 'ccf',
        developmentMode: !environment.production,
      }),
    ),
  ],
};
