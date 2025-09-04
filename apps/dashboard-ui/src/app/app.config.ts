import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';
import {
  DashboardIndexComponent,
  DashboardLayoutComponent,
  GridContainerComponent,
  IframeContainerComponent,
  ImageContainerComponent,
  MetricsContainerComponent,
  VegaContainerComponent,
  provideDashboardComponents,
} from '@hra-ui/dashboard';
import { provideDesignSystem } from '@hra-ui/design-system';
import { appRoutes } from './app.routes';
import { provideAnalytics, withRouterEvents, withErrorHandler } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';

/** Application config */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'dashboard-ui',
      version: '1.0.0',
      url: 'https://apps.humanatlas.io/dashboard/',
    }),
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideNothrowPlatformLocation(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideHttpClient(),
    provideAnimations(),
    provideDesignSystem(),
    provideDashboardComponents([
      DashboardIndexComponent,
      DashboardLayoutComponent,
      GridContainerComponent,
      ImageContainerComponent,
      MetricsContainerComponent,
      VegaContainerComponent,
      IframeContainerComponent,
    ]),
  ],
};
