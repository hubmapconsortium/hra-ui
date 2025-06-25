import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideAppInitializer, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FTU_DATA_IMPL_ENDPOINTS } from '@hra-ui/services';
import { ReplaySubject } from 'rxjs';
import { initFactory } from './app.init';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';
import { provideMarkdown } from 'ngx-markdown';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ROUTES } from './app.routes';
import { provideStore } from '@ngxs/store';

/**
 * Application config
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const initializerFn = initFactory();
      return initializerFn();
    }),
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: FTU_DATA_IMPL_ENDPOINTS,
      useValue: new ReplaySubject(1),
    },
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
  ],
};
