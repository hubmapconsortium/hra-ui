import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render } from '@testing-library/angular';
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
    const { container } = await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const intro = container.querySelector('.intro');
    expect(intro).toBeTruthy();
    expect(intro?.textContent).toContain('Human Reference Atlas');
  });

  it('should render count cards', async () => {
    const { fixture } = await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const countCards = fixture.nativeElement.querySelectorAll('hra-count-card');
    expect(countCards.length).toBe(1);
  });

  it('should render carousel component', async () => {
    const { fixture } = await render(LandingPageComponent, {
      inputs: { data: mockLandingPageData },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const carousel = fixture.nativeElement.querySelector('hra-carousel');
    expect(carousel).toBeTruthy();
  });
});
