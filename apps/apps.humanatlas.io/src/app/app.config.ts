import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideDesignSystem } from '@hra-ui/design-system';
import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'apps.humanatlas.io',
      version: '1.0.0',
      url: 'https://apps.humanatlas.io/',
    }),
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideDesignSystem(),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
