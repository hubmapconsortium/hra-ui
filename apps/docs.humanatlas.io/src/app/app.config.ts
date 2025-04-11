import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDesignSystem } from '@hra-ui/design-system';
import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(appRoutes), provideDesignSystem()],
};
