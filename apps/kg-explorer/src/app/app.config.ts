import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideMarkdown } from 'ngx-markdown';
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
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    provideExperimentalZonelessChangeDetection(),
    provideDesignSystem(),
    provideMarkdown(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
