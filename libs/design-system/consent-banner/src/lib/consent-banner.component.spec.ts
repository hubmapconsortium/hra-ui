import { provideHttpClient } from '@angular/common/http';
import { ConsentBannerComponent } from './consent-banner.component';
import { render } from '@testing-library/angular';

describe('ConsentBannerComponent', () => {
  it('should create the component', async () => {
    const component = await render(ConsentBannerComponent, {
      imports: [],
      providers: [provideHttpClient()],
    });
    expect(component).toBeTruthy();
  });
});
