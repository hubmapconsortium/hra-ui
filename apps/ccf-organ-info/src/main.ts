import { importProvidersFrom } from '@angular/core';
import { createCustomElement } from '@hra-ui/webcomponents';
import { AppWebComponent } from './app/app-web-component.component';
import { AppModule } from './app/app.module';

createCustomElement('ccf-organ-info', AppWebComponent, {
  providers: [importProvidersFrom(AppModule)],
});
