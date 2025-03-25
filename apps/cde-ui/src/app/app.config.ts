import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideIcons } from '@hra-ui/cdk/icons';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';
import { ROUTES } from './app.routes';
import { provideDesignSystem } from '@hra-ui/design-system';

/**
 * Set of config options available during the application bootstrap operation.
 */
export const appConfig: ApplicationConfig = {
  providers: [
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
