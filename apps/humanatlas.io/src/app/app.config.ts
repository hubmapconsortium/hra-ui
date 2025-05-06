import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideDesignSystem } from '@hra-ui/design-system';

import { appRoutes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
    provideRouter(appRoutes, withComponentInputBinding(), withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideMarkdown({ loader: HttpClient }),
  ],
};
