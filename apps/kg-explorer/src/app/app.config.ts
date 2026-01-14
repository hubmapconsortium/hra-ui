import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideApi } from '@hra-api/ng-client';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideRouterExt } from '@hra-ui/common/router-ext';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideMarkdown } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { CustomRouteReuseStrategy } from './utils/route-strategy';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'kg-explorer',
      version: '1.0.0',
      url: 'https://apps.humanatlas.io/kg-explorer/',
    }),
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideApi(environment.remoteApiEndpoint),
    provideDesignSystem(),
    provideMarkdown(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideRouterExt(),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    provideZonelessChangeDetection(),
  ],
};
