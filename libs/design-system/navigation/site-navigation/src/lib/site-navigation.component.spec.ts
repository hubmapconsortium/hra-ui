import { render } from '@testing-library/angular';
import { SiteNavigationComponent } from './site-navigation.component';

describe('SiteNavigationComponent', () => {
  it('should render', async () => {
    const promise = render(SiteNavigationComponent, {
      inputs: {
        baseUrl: 'https://docs.humanatlas.io',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });

  it('should set expanded category when changeExpandedCategory is called with true', async () => {
    const { fixture } = await render(SiteNavigationComponent, {
      inputs: {
        baseUrl: 'https://docs.humanatlas.io',
      },
    });

    const component = fixture.componentInstance;
    const categoryName = 'Test Category';

    component.changeExpandedCategory(true, categoryName);

    expect(component.expandedCategory()).toBe(categoryName);
  });

  it('should update expanded category in constructor', async () => {
    const { fixture } = await render(SiteNavigationComponent, {
      inputs: {
        baseUrl: 'https://docs.humanatlas.io',
      },
    });

    const component = fixture.componentInstance;

    expect(component.expandedCategory()).toBeDefined();
  });
});
