import { render } from '@testing-library/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  it('should create', async () => {
    const component = await render(BreadcrumbsComponent, {
      inputs: {
        crumbs: [{ name: 'Home', route: '/' }],
      },
    });
    expect(component).toBeTruthy();
  });

  it('should render the provided crumbs', async () => {
    const crumbs = [
      { name: 'Home', route: '/' },
      { name: 'About', route: '/about' },
    ];
    const { getByText } = await render(BreadcrumbsComponent, {
      inputs: { crumbs },
    });

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
  });
});
