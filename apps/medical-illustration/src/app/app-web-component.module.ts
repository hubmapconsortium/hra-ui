import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';
import { NgxsModule } from '@ngxs/store';

import { AppWebComponent } from './app-web-component.component';

@NgModule({
  imports: [BrowserModule, InteractiveSvgComponent, HttpClientModule, NgxsModule.forRoot()],
  declarations: [AppWebComponent],
})
export class AppWebComponentModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const appElement = createCustomElement(AppWebComponent, {
      injector: this.injector,
    });

    customElements.define('hra-illustration-wc', appElement);
  }
}
