import { createCustomElement } from '@hra-ui/webcomponents';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

createCustomElement('hra-dashboard', AppComponent, appConfig);
