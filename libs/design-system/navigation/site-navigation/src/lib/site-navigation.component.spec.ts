import { render } from '@testing-library/angular';
import { SiteNavigationComponent } from './site-navigation.component';
import { DOCS_NAVIGATION_MENU } from './static-data/parsed';

describe('SiteNavigationComponent', () => {
  it('should render', async () => {
    const promise = render(SiteNavigationComponent, {
      inputs: {
        baseUrl: 'https://docs.humanatlas.io',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
