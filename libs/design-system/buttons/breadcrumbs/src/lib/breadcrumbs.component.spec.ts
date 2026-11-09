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

  it('should render an icon crumb as an icon button named by the crumb', async () => {
    const { getByRole, queryByText } = await render(BreadcrumbsComponent, {
      inputs: {
        crumbs: [{ name: 'Home', route: 'https://humanatlas.io', icon: 'home' }, { name: 'About' }],
      },
    });

    const home = getByRole('link', { name: 'Home' });
    expect(home).toHaveClass('mat-mdc-icon-button');
    expect(home).toHaveTextContent('home');
    expect(queryByText('Home')).toBeNull();
  });
});
