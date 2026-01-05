import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';

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
    await setup();
    const slide1 = screen.getByText('Slide 1');
    expect(slide1).toBeInTheDocument();
  });

  it('should render swiper container and slides for all items', async () => {
    await render(CarouselComponent, {
      providers,
      inputs: { items: mockItems },
    });

    const slide1 = screen.getByText('Slide 1');
    const slide2 = screen.getByText('Slide 2');

    expect(slide1).toBeInTheDocument();
    expect(slide2).toBeInTheDocument();
  });

  it('should render carousel controls', async () => {
    await render(CarouselComponent, {
      providers,
      inputs: { items: mockItems },
    });

    const controls = document.querySelector('hra-carousel-controls');
    expect(controls).toBeInTheDocument();
  });
});
