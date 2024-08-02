import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { BodyUiModule } from 'ccf-shared';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { StoreModule } from './core/store/store.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, StoreModule, BodyUiModule],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideHttpClient()],
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap(): void {
    const appElement = createCustomElement(AppWebComponent, {
      injector: this.injector,
    });

    customElements.define('ccf-body-ui-wc', appElement);
  }
}
