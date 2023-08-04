import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppWebComponentModule } from './app/app-web-component.module';

platformBrowserDynamic()
  .bootstrapModule(AppWebComponentModule)
  .catch((err) => console.error(err));
