import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';
import { CdkStateModule } from '@hra-ui/cdk/state';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideDesignSystem } from '@hra-ui/design-system';
import { FTU_DATA_IMPL_ENDPOINTS, HraServiceModule } from '@hra-ui/services';
import { HraStateModule, MouseTrackerModule } from '@hra-ui/state';
import { provideStore } from '@ngxs/store';
import { provideMarkdown } from 'ngx-markdown';
import { ReplaySubject } from 'rxjs';
import { initFactory } from './app.init';
import { ROUTES } from './app.routes';

/**
 * Application config
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'ftu-ui',
      version: '1.0.0',
      url: 'https://apps.humanatlas.io/ftu-explorer/',
    }),
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideAppInitializer(() => {
      const initializerFn = initFactory();
      return initializerFn();
    }),
    provideHttpClient(withInterceptorsFromDi()),
    provideNothrowPlatformLocation(),
    provideDesignSystem(),
    provideExperimentalZonelessChangeDetection(),
    provideMarkdown({ loader: HttpClient }),
    provideRouter(
      ROUTES,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' }),
    ),
    provideStore([]),
    importProvidersFrom(CdkStateModule, HraStateModule, HraServiceModule, MouseTrackerModule),
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: FTU_DATA_IMPL_ENDPOINTS,
      useValue: new ReplaySubject(1),
    },
  ],
};
