import { render } from '@testing-library/angular';
import { SiteNavigationComponent } from './site-navigation.component';

describe('SiteNavigationComponent', () => {
  it('should render', async () => {
    const promise = render(SiteNavigationComponent);
    await expect(promise).resolves.toBeTruthy();
  });
});
