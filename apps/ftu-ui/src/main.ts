import { importProvidersFrom } from '@angular/core';
import { createCustomElement } from '@hra-ui/webcomponents';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

createCustomElement('hra-ftu-ui', AppComponent, {
  providers: [importProvidersFrom(AppModule)],
});
