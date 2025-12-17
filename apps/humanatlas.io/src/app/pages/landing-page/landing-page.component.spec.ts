import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageData } from '../../schemas/landing-page/landing-page.schema';

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
        icon: 'database',
      },
    ],
    sectionCardInfo: [
      {
        tagline: 'Explore',
        icon: 'explore',
        action: 'View',
      },
    ],
  };

  it('should render', async () => {
    await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const intro = screen.getAllByText(/Human Reference Atlas/i);
    expect(intro.length).toBeGreaterThan(0);
  });

  it('should render count cards', async () => {
    await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const countLabel = screen.getByText('Datasets');
    expect(countLabel).toBeInTheDocument();
  });

  it('should render carousel component', async () => {
    await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const carouselText = screen.getByText('Test Carousel');
    expect(carouselText).toBeInTheDocument();
  });
});
