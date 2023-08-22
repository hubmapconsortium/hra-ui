import { Injector, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    const ftuWebComponent = createCustomElement(AppComponent, {
      injector: inject(Injector),
    });

    customElements.define('hra-ftu-web-component', ftuWebComponent);
  }
}
