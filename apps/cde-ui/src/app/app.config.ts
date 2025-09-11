import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideIcons } from '@hra-ui/design-system/icons';
import { ROUTES } from './app.routes';

/**
 * Set of config options available during the application bootstrap operation.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'cde-ui',
      version: '1.0.0',
      url: 'https://apps.humanatlas.io/cde/',
    }),
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideNothrowPlatformLocation(),
    provideRouter(
      ROUTES,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withViewTransitions(),
    ),
    provideAnimations(),
    provideHttpClient(),
    provideIcons(),
    provideDesignSystem(),
  ],
};
