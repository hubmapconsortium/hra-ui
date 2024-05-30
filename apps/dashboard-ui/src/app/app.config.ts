import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  DashboardIndexComponent,
  DashboardLayoutComponent,
  GridContainerComponent,
  ImageContainerComponent,
  MetricsContainerComponent,
  provideDashboardComponents,
} from '@hra-ui/dashboard';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    provideDashboardComponents([
      DashboardIndexComponent,
      DashboardLayoutComponent,
      GridContainerComponent,
      ImageContainerComponent,
      MetricsContainerComponent,
    ]),
  ],
};
