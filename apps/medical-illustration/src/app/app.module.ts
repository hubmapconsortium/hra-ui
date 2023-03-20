import { inject, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {
  constructor() {
    const MedicalIllustration = createCustomElement(AppComponent, {
      injector: inject(Injector),
    });

    customElements.define('hra-medical-illustration', MedicalIllustration);
  }
}
