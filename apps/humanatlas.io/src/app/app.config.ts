import { HttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideMarkdown } from 'ngx-markdown';

import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [provideDesignSystem(), provideRouter(appRoutes), provideMarkdown({ loader: HttpClient })],
};
