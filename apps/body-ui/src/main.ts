import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@hra-ui/webcomponents';
import { BodyUiComponent } from 'ccf-body-ui';

createCustomElement('hra-body-ui', BodyUiComponent, {
  providers: [provideHttpClient()],
});
