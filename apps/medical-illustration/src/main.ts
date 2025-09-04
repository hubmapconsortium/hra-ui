import { provideHttpClient } from '@angular/common/http';
import { provideAnalytics, withErrorHandler } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { FTU_DATA_IMPL_ENDPOINTS } from '@hra-ui/services';
import { createCustomElement } from '@hra-ui/webcomponents';
import { ReplaySubject } from 'rxjs';
import { MedicalIllustrationComponent } from './app/medical-illustration.component';

createCustomElement('hra-medical-illustration', MedicalIllustrationComponent, {
  providers: [
    provideAppConfiguration({
      name: 'medical-illustration',
      version: '0.5.0',
    }),
    provideAnalytics(withErrorHandler()),
    provideHttpClient(),
    {
      provide: FTU_DATA_IMPL_ENDPOINTS,
      useValue: new ReplaySubject(1),
    },
  ],
});
