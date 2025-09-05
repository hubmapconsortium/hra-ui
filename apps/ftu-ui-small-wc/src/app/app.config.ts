import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CdkStateModule } from '@hra-ui/cdk/state';
import { FTU_DATA_IMPL_ENDPOINTS, HraServiceModule } from '@hra-ui/services';
import { HraStateModule, MouseTrackerModule } from '@hra-ui/state';
import { ReplaySubject } from 'rxjs';
import { initFactory } from './app.init';
import { NavigationLessRouter } from './routing/simple-router.service';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideStore } from '@ngxs/store';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';
import { provideMarkdown } from 'ngx-markdown';
import { provideTabs } from '@hra-ui/design-system/tabs';
/**
 * Application config
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const initializerFn = initFactory();
      return initializerFn();
    }),

    provideAnimations(),
    provideTabs(),
    provideHttpClient(withInterceptorsFromDi()),
    provideNothrowPlatformLocation(),
    provideDesignSystem(),
    provideZonelessChangeDetection(),
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
