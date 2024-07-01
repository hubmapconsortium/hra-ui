import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideIcons } from '@hra-ui/cdk/icons';
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
import { BaseHrefService } from './services/base-href.service';

export function initializeApp(baseHrefService: BaseHrefService) {
  return () => {
    return new Promise<void>((resolve) => {
      baseHrefService.setBaseHref('');
      resolve();
    });
  };
}

/** Application config */
export const appConfig: ApplicationConfig = {
  providers: [
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
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [BaseHrefService],
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useFactory: (baseHrefService: BaseHrefService) => baseHrefService.getBaseHref(),
      deps: [BaseHrefService],
    },
  ],
};
