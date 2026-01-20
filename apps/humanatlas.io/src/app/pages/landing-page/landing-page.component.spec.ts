import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { LandingPageData } from '../../schemas/landing-page/landing-page.schema';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  const mockLandingPageData: LandingPageData = {
    $schema: '',
    carouselItems: [
      {
        tagline: 'Test Carousel',
        description: 'Test description',
        imageSrc: '/test.png',
        action: 'Learn More',
        link: { url: 'https://example.com' },
      },
    ],
    countInfo: [
      {
        count: 100,
        label: 'Datasets',
        suffix: '+',
        icon: 'misc:data',
      },
    ],
    sectionCardInfo: [
      {
        tagline: 'Explore',
        icon: 'misc:explore',
        action: 'View',
      },
    ],
  };

  const providers = [provideIcons(), provideHttpClient(), provideHttpClientTesting()];

  it('should render', async () => {
    await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers,
    });

    const intro = screen.getAllByText(/Human Reference Atlas/i);
    expect(intro.length).toBeGreaterThan(0);
  });

  it('should render count cards', async () => {
    await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers,
    });

    const countLabel = screen.getByText('Datasets');
    expect(countLabel).toBeInTheDocument();
  });

  it('should render carousel component', async () => {
    await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers,
    });

    const carouselText = screen.getByText('Test Carousel');
    expect(carouselText).toBeInTheDocument();
  });
});
