import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app-web-component.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
