import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { LandingPageComponent } from './landing-page.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));

describe('LandingPageComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  it('should create', async () => {
    await render(LandingPageComponent, {
      providers,
      componentInputs: {
        cards: [
          {
            tagline: 'Explore 2D Data',
            image: '',
            additionalInfo: {},
          },
          {
            tagline: 'Explore 3D Data',
            image: '',
            additionalInfo: {},
          },
          {
            tagline: 'Create a Visualization',
            image: '',
            additionalInfo: {},
          },
        ],
      },
    });
    expect(screen.getByText('Explore 2D Data')).toBeInTheDocument();
    expect(screen.getByText('Explore 3D Data')).toBeInTheDocument();
    expect(screen.getByText('Create a Visualization')).toBeInTheDocument();
  });
});
