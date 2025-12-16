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

  it('should create', async () => {
    const { fixture } = await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithUrl },
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should return correct link from getLink method for both url and route types', async () => {
    const { fixture } = await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithUrl },
    });
    const component = fixture.componentInstance;
    expect(component.getLink(mockItemWithUrl)).toBe('https://example.com');
    expect(component.getLink(mockItemWithRoute)).toBe('/test-route');
  });

  it('should return correct link type from getLinkType method', async () => {
    const { fixture } = await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithUrl },
    });
    const component = fixture.componentInstance;
    expect(component.getLinkType(mockItemWithUrl)).toBe('url');
    expect(component.getLinkType(mockItemWithRoute)).toBe('route');
  });

  it('should render content with tagline, description, and action text', async () => {
    await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithUrl },
    });
    expect(screen.getByText('Test Tagline')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should render image and icon correctly', async () => {
    const { container } = await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithUrl },
    });
    const image = container.querySelector('img.image') as HTMLImageElement;
    expect(image).toBeTruthy();

    const icon = container.querySelector('mat-icon');
    expect(icon).toBeTruthy();
    expect(icon?.textContent?.trim()).toBe('arrow_right_alt');
  });

  it('should render external link with target="_blank" for url type', async () => {
    const { container } = await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithUrl },
    });
    const link = container.querySelector('a[target="_blank"][href="https://example.com"]');
    expect(link).toBeTruthy();
  });

  it('should render internal link for route type', async () => {
    const { container } = await render(ContentComponent, {
      providers,
      inputs: { item: mockItemWithRoute },
    });
    const link = container.querySelector('a.action[target="_blank"]');
    expect(link).toBeTruthy();
  });
});
