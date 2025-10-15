import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'cns-website',
      version: '1.0.0',
      url: 'https://cns.iu.edu/',
    }),
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideZonelessChangeDetection(),
    provideDesignSystem(),
    provideMarkdown(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
