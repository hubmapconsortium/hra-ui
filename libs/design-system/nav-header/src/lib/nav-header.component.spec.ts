import { render, screen } from '@testing-library/angular';
import { NavHeaderComponent } from './nav-header.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';

describe('NavHeaderComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  const link = 'example.com';
  const app = 'hra';
  const title = 'test title';

  beforeEach(async () => {
    await render(NavHeaderComponent, {
      providers: globalProviders,
      componentInputs: {
        link: link,
        app: app,
        title: title,
        status: 'Beta',
      },
    });
  });

  it('should render header', () => {
    expect(screen.getByText('test title')).toBeInTheDocument();
  });

  it('should render app status', () => {
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });
});
