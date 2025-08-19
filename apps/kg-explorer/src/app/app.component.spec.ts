import { provideHttpClient } from '@angular/common/http';
import { render } from '@testing-library/angular';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should render', async () => {
    const promise = render(AppComponent, { providers: [provideHttpClient()] });
    await expect(promise).resolves.toBeTruthy();
  });
});
