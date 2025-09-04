import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';
import { CdkStateModule } from '@hra-ui/cdk/state';
import { provideAnalytics, withErrorHandler } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideTabs } from '@hra-ui/design-system/tabs';
import { FTU_DATA_IMPL_ENDPOINTS, HraServiceModule } from '@hra-ui/services';
import { HraStateModule, MouseTrackerModule } from '@hra-ui/state';
import { provideStore } from '@ngxs/store';
import { provideMarkdown } from 'ngx-markdown';
import { ReplaySubject } from 'rxjs';
import { initFactory } from './app.init';
import { NavigationLessRouter } from './routing/simple-router.service';

/**
 * Application config
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'ftu-ui-small-wc',
      version: '4.1.0',
    }),
    provideAnalytics(withErrorHandler()),
    provideAppInitializer(() => {
      const initializerFn = initFactory();
      return initializerFn();
    }),

    provideAnimations(),
    provideTabs(),
    provideHttpClient(withInterceptorsFromDi()),
    provideNothrowPlatformLocation(),
    provideDesignSystem(),
    provideExperimentalZonelessChangeDetection(),
    provideMarkdown({ loader: HttpClient }),
    provideStore([]),
    importProvidersFrom(CdkStateModule, HraServiceModule, HraStateModule, MouseTrackerModule),
    {
      // Replace full routing with a partial implementation
      provide: Router,
      useExisting: NavigationLessRouter,
    },
    {
      provide: FTU_DATA_IMPL_ENDPOINTS,
      useValue: new ReplaySubject(1),
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
};
