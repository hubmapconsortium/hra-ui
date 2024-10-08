import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { createCustomElement } from '@hra-ui/webcomponents';
import { BodyUiComponent } from 'ccf-body-ui';

createCustomElement('hra-body-ui', BodyUiComponent, {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient()],
});
