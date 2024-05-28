import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { MetricsContainerComponent, provideDashboardComponents } from '@hra-ui/dashboard';
import { DashboardLayoutComponent } from '@hra-ui/dashboard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideDashboardComponents([DashboardLayoutComponent, MetricsContainerComponent]),
  ],
};
