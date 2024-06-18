import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { createCustomElement } from '@hra-ui/webcomponents';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app/app.component';

createCustomElement('cde-visualization-wc', AppComponent, {
  providers: [provideHttpClient(), provideAnimations(), importProvidersFrom(ColorPickerModule)],
});
