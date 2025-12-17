import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';

import { CarouselComponent } from './carousel.component';
import { CarouselItem } from './carousel.schema';

describe('CarouselComponent', () => {
  const mockItems: CarouselItem[] = [
    {
      tagline: 'Slide 1',
      description: 'Description 1',
      imageSrc: '/assets/image1.png',
      action: 'Action 1',
      link: { url: 'https://example.com/1' },
    },
    {
      tagline: 'Slide 2',
      description: 'Description 2',
      imageSrc: '/assets/image2.png',
      action: 'Action 2',
      link: { route: '/route2' },
    },
  ];

  const providers = [provideHttpClient(), provideRouter([])];

  async function setup(inputs = { items: mockItems }) {
    const result = await render(CarouselComponent, { providers, inputs });
    return result;
  }

  it('should create', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should render swiper container and slides for all items', async () => {
    const { container } = await render(CarouselComponent, {
      providers,
      inputs: { items: mockItems },
    });

    const swiperContainer = container.querySelector('swiper-container');
    expect(swiperContainer).toBeTruthy();

    const slides = container.querySelectorAll('swiper-slide');
    expect(slides.length).toBe(2);

    const contentComponents = container.querySelectorAll('hra-carousel-content');
    expect(contentComponents.length).toBe(2);
  });

  it('should render carousel controls', async () => {
    const { container } = await render(CarouselComponent, {
      providers,
      inputs: { items: mockItems },
    });

    const controls = container.querySelector('hra-carousel-controls');
    expect(controls).toBeTruthy();
  });
});
