import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import { LogosAppsComponent } from './logos-apps.component';

describe('LogosAppsComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  beforeEach(async () => {
    await render(LogosAppsComponent, {
      providers: globalProviders,
      componentInputs: {
        appLink: 'https://apps.humanatlas.io/ftu-explorer/#/',
        appIcon: 'logo/ftu_logo.svg',
        appTitle: 'FTU Explorer',
      },
    });
  });

  it('should render the Human Reference Atlas logo', async () => {
    const logo = screen.getByAltText('Human Reference Atlas home');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo/hra_small.svg');
  });
});
