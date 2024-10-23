import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import { LandingPageComponent } from './landing-page.component';
import { HUBMAP_CARDS_DATA } from '../create-visualization-page/create-visualization-page.component';

describe('LandingPageComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  it('should create', async () => {
    await render(LandingPageComponent, {
      providers,
      componentInputs: {
        cards: [
          {
            image: '',
            label: 'Explore 2D Intestine Data',
            route: '',
            alt: '',
          },
          {
            image: '',
            label: 'Explore 3D Skin Data',
            route: '',
            alt: '',
          },
          {
            image: '',
            label: 'Create a Visualization',
            route: '',
            alt: '',
          },
        ],
        sideNavData: HUBMAP_CARDS_DATA,
      },
    });
    expect(screen.getByText('Explore 2D Intestine Data')).toBeInTheDocument();
    expect(screen.getByText('Explore 3D Skin Data')).toBeInTheDocument();
    expect(screen.getByText('Create a Visualization')).toBeInTheDocument();
  });
});
