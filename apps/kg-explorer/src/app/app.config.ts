import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDesignSystem } from '@hra-ui/design-system';
import { appRoutes } from './app.routes';
import { provideMarkdown } from 'ngx-markdown';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideDesignSystem(),
    provideMarkdown(),
  ],
};
