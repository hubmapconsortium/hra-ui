import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideIcons } from '@hra-ui/cdk/icons';
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
import { appRoutes } from './app.routes';

/** Application config */
export const appConfig: ApplicationConfig = {
  providers: [
    provideNothrowPlatformLocation(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideHttpClient(),
    provideAnimations(),
    provideIcons(),
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
