import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
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
