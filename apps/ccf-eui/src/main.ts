import { importProvidersFrom } from '@angular/core';
import { createCustomElement } from '@hra-ui/webcomponents';
import { AppWebComponent, STANDALONE_TOKEN } from './app/app-web-component.component';
import { AppModule } from './app/app.module';
import { enableMapSet } from 'immer';

enableMapSet();

createCustomElement('ccf-eui', AppWebComponent, {
  providers: [importProvidersFrom(AppModule), { provide: STANDALONE_TOKEN, useValue: true }],
});
