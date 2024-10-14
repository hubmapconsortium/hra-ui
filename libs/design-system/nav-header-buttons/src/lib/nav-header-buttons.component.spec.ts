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
        app: 'ftu',
        appTitle: 'FTU Explorer',
        appStatus: 'Beta',
        variant: 'basic',
      },
    });
  });

  it('should display the app title and status', async () => {
    expect(screen.getByText('FTU Explorer')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });
});
