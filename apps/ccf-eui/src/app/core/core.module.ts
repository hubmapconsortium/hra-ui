import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiEndpointDataSourceService, DataSourceService, MousePositionTrackerModule } from 'ccf-shared';
import { AnalyticsModule } from 'ccf-shared/analytics';

import { environment } from '../../environments/environment';
import { StoreModule } from './store/store.module';

@NgModule({
  imports: [
    AnalyticsModule.forRoot({
      gaToken: environment.googleAnalyticsToken,
      appName: 'eui',
    }),
    MousePositionTrackerModule,
    StoreModule,
  ],
  providers: [
    { provide: DataSourceService, useExisting: ApiEndpointDataSourceService },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('The core module should only be imported once in the root module');
    }
  }
}
