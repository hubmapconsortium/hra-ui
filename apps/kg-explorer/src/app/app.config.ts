import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideMarkdown } from 'ngx-markdown';

import { appRoutes } from './app.routes';
import { CustomRouteReuseStrategy } from './utils/route-strategy';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
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
