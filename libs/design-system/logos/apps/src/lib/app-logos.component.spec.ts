import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import { AppLogosComponent } from './app-logos.component';

describe('AppLogosComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  beforeEach(async () => {
    await render(AppLogosComponent, {
      providers: globalProviders,
      componentInputs: {
        appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
        appIcon: 'logo/ftu_logo.svg',
        appTitle: 'FTU Explorer',
      },
    });
  });

  it('should render the Human Reference Atlas logo', async () => {
    const logo = screen.getByAltText('HRA logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'assets/logo/hra_small.svg');
  });
});
