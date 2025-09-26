import { provideHttpClient } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiEndpointDataSourceService, DataSourceService } from 'ccf-shared';
import { StoreModule } from './store/store.module';

@NgModule({
  imports: [StoreModule],
  providers: [{ provide: DataSourceService, useExisting: ApiEndpointDataSourceService }, provideHttpClient()],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('The core module should only be imported once in the root module');
    }
  }
}
