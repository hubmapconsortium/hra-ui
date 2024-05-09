import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@hra-ui/webcomponents';
import { MedicalIllustrationComponent } from './app/medical-illustration.component';

createCustomElement('hra-illustration-wc', MedicalIllustrationComponent, {
  providers: [provideHttpClient()],
});
