import { render } from '@testing-library/angular';
import { RedirectPageComponent } from './redirect-page.component';

describe('RedirectPageComponent', () => {
  it('should render', async () => {
    const promise = render(RedirectPageComponent, {
      inputs: {
        redirectUrl: 'https://example.com',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
