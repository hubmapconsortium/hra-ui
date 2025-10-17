import { render, screen } from '@testing-library/angular';
import { GalleryCardComponent } from './gallery-card.component';

describe('GalleryCardComponent', () => {
  it('should create', async () => {
    const promise = render(GalleryCardComponent, {
      inputs: {
        tagline: 'Gallery Card Title',
      },
    });

    await expect(promise).resolves.toBeTruthy();
  });

  it('should render gallery card with all inputs', async () => {
    await render(GalleryCardComponent, {
      inputs: {
        tagline: 'Gallery Card Title',
        date: 'January 15, 2025',
        taglineUrl: 'https://example.com',
        taglineExternal: true,
        categoryTag: 'Research',
        projectTag: 'HRA',
        image: 'path/to/image.jpg',
        imageAlt: 'Gallery image description',
      },
    });

    expect(screen.getByText('January 15, 2025')).toBeInTheDocument();
    expect(screen.getByText('Gallery Card Title')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('HRA')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Gallery image description');
  });

  it('should render tagline as link with correct target when taglineUrl is provided', async () => {
    await render(GalleryCardComponent, {
      inputs: {
        tagline: 'External Link',
        taglineUrl: 'https://example.com',
        taglineExternal: true,
      },
    });

    const link = screen.getByRole('link', { name: 'External Link' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
