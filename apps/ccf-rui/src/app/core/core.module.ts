import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, inject } from '@angular/core';
import { MousePositionTrackerModule } from 'ccf-shared';
import { AnalyticsModule } from 'ccf-shared/analytics';

import { environment } from '../../environments/environment';
import { ConfigModule } from './services/config/config.module';
import { ThemingModule } from './services/theming/theming.module';
import { StoreModule } from './store/store.module';

@NgModule({
  exports: [],
  imports: [
    AnalyticsModule.forRoot({
      gaToken: environment.googleAnalyticsToken,
      appName: 'rui',
    }),
    MousePositionTrackerModule,
    ConfigModule,
    StoreModule,
    ThemingModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class CoreModule {
  constructor() {
    const core = inject(CoreModule, { optional: true, skipSelf: true });

    if (core) {
      throw new Error('The core module should only be imported once in the root module');
    }
  }
}
