import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';

import { NavHeaderButtonsComponent } from './nav-header-buttons.component';

describe('NavHeaderButtonsComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  beforeEach(async () => {
    await render(NavHeaderButtonsComponent, {
      providers: globalProviders,
      componentInputs: {
        appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
        appIcon: 'assets/logo/ftu_logo.svg',
        appTitle: 'FTU Explorer',
        appDescription: 'HRA Preview Application',
      },
    });
  });

  it('should render the Human Reference Atlas logo', async () => {
    const logo = screen.getByAltText('HRA logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'assets/logo/hra_small.svg');
  });

  it('should render the app logo', async () => {
    const appLogo = screen.getByAltText('FTU Explorer logo');
    expect(appLogo).toBeInTheDocument();
    expect(appLogo).toHaveAttribute('src', 'assets/logo/ftu_logo.svg');
  });

  it('should display the app title and description', async () => {
    expect(screen.getByText('FTU Explorer')).toBeInTheDocument();
    expect(screen.getByText('HRA Preview Application')).toBeInTheDocument();
  });
});
