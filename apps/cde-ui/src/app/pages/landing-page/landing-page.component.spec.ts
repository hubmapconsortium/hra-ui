import { render, screen } from '@testing-library/angular';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  it('should create', async () => {
    await render(LandingPageComponent, {
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
      },
    });
    expect(screen.getByText('Explore 2D Intestine Data')).toBeInTheDocument();
    expect(screen.getByText('Explore 3D Skin Data')).toBeInTheDocument();
    expect(screen.getByText('Create a Visualization')).toBeInTheDocument();
  });
});
