import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, inject } from '@angular/core';
import { ConfigModule } from './services/config/config.module';
import { StoreModule } from './store/store.module';

@NgModule({
  exports: [],
  imports: [ConfigModule, StoreModule],
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
