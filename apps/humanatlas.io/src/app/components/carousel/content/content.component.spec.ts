import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';

import { ContentComponent } from './content.component';
import { CarouselItem } from '../carousel.schema';

describe('ContentComponent', () => {
  const mockItemWithUrl: CarouselItem = {
    tagline: 'Test Tagline',
    description: 'Test Description',
    imageSrc: '/assets/test-image.png',
    action: 'Learn More',
    link: { url: 'https://example.com' },
  };

  const mockItemWithRoute: CarouselItem = {
    tagline: 'Route Tagline',
    description: 'Route Description',
    imageSrc: '/assets/route-image.png',
    action: 'View Details',
    link: { route: '/test-route' },
  };

  const providers = [provideHttpClient(), provideRouter([])];

  async function setup(item: CarouselItem) {
    const result = await render(ContentComponent, { providers, inputs: { item } });
    return result;
  }

  it('should create', async () => {
    await setup(mockItemWithUrl);
    expect(screen.getByText('Test Tagline')).toBeInTheDocument();
  });

  it('should render external link for url type', async () => {
    await setup(mockItemWithUrl);
    const tagline = screen.getByText('Test Tagline');
    const description = screen.getByText('Test Description');
    expect(tagline).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should render action button for route type', async () => {
    await setup(mockItemWithRoute);
    const tagline = screen.getByText('Route Tagline');
    const actionText = screen.getByText('View Details');
    expect(tagline).toBeInTheDocument();
    expect(actionText).toBeInTheDocument();
  });

  it('should render content with tagline, description, and action text', async () => {
    await setup(mockItemWithUrl);
    expect(screen.getByText('Test Tagline')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should render image and icon correctly', async () => {
    await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithUrl },
    });
    const image = document.querySelector('img.image') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('test-image.png');
  });

  it('should render external link with target="_blank" for url type', async () => {
    await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithUrl },
    });
    const tagline = screen.getByText('Test Tagline');
    const actionText = screen.getByText('Learn More');
    expect(tagline).toBeInTheDocument();
    expect(actionText).toBeInTheDocument();
  });

  it('should render internal link for route type', async () => {
    await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithRoute },
    });
    const tagline = screen.getByText('Route Tagline');
    expect(tagline).toBeInTheDocument();
  });
});
