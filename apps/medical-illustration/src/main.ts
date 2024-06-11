import { provideHttpClient } from '@angular/common/http';
import { FTU_DATA_IMPL_ENDPOINTS } from '@hra-ui/services';
import { createCustomElement } from '@hra-ui/webcomponents';
import { ReplaySubject } from 'rxjs';
import { MedicalIllustrationComponent } from './app/medical-illustration.component';

createCustomElement('hra-medical-illustration', MedicalIllustrationComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: FTU_DATA_IMPL_ENDPOINTS,
      useValue: new ReplaySubject(1),
    },
  ],
});
