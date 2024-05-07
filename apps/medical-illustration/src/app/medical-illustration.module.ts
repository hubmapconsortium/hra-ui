import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, inject, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';
import { MedicalIllustrationComponent } from './medical-illustration.component';

@NgModule({
  imports: [BrowserModule, InteractiveSvgComponent, HttpClientModule],
  declarations: [MedicalIllustrationComponent],
})
export class MedicalIllustrationModule implements DoBootstrap {
  readonly injector = inject(Injector);

  ngDoBootstrap(): void {
    const appElement = createCustomElement(MedicalIllustrationComponent, {
      injector: this.injector,
    });

    customElements.define('hra-illustration-wc', appElement);
  }
}
