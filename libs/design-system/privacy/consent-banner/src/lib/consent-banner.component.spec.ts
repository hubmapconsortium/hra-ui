import { provideHttpClient } from '@angular/common/http';
import { render } from '@testing-library/angular';
import { ConsentBannerComponent } from './consent-banner.component';

describe('ConsentBannerComponent', () => {
  it('should create the component', async () => {
    const result = render(ConsentBannerComponent, { providers: [provideHttpClient()] });
    await expect(result).resolves.toBeTruthy();
  });
});
