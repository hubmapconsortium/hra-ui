import { createCustomElement } from '@hra-ui/webcomponents';
import { AppWebComponent } from './app/app-web-component.component';
import { appConfig } from './app/app.config';

createCustomElement('ccf-organ-info', AppWebComponent, appConfig);
