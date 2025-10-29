import { render, screen } from '@testing-library/angular';
import { GalleryCardComponent } from './gallery-card.component';

describe('GalleryCardComponent', () => {
  it('should create with required inputs', async () => {
    const promise = render(GalleryCardComponent, {
      inputs: {
        tagline: 'Gallery Card Title',
        imageSrc: 'path/to/image.jpg',
        date: 'January 15, 2025',
        link: 'https://example.com',
      },
    });

    await expect(promise).resolves.toBeTruthy();
  });

  it('should render gallery card with all inputs', async () => {
    await render(GalleryCardComponent, {
      inputs: {
        tagline: 'Gallery Card Title',
        imageSrc: 'path/to/image.jpg',
        date: 'January 15, 2025',
        link: 'https://example.com',
        external: true,
        tags: ['Research', 'HRA'],
      },
    });

    expect(screen.getByText('January 15, 2025')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Gallery Card Title' })).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('HRA')).toBeInTheDocument();
  });

  it('should render external link with correct attributes', async () => {
    await render(GalleryCardComponent, {
      inputs: {
        tagline: 'External Link',
        imageSrc: 'path/to/image.jpg',
        date: 'January 15, 2025',
        link: 'https://example.com',
        external: true,
      },
    });

    const link = screen.getByRole('link', { name: 'External Link' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
