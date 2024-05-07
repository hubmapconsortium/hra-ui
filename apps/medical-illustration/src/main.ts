import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MedicalIllustrationModule } from './app/medical-illustration.module';

platformBrowserDynamic()
  .bootstrapModule(MedicalIllustrationModule)
  .catch((err) => console.error(err));
