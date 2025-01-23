import { WebComponentCardComponent } from './web-component-card.component';
import { render, screen } from '@testing-library/angular';

describe('WebComponentCardComponent', () => {
  beforeEach(async () => {
    await render(WebComponentCardComponent, {
      componentInputs: {
        imageUrl: 'assets/ui-images/placeholder.png',
        productTitle: 'Product Title',
        webComponentName: 'Web Component Name',
        description: 'This is a placeholder description (>125 characters.)',
      },
    });
  });

  it('should render title, web component name, description, and image', () => {
    expect(screen.getByText('Product Title')).toBeInTheDocument();
    expect(screen.getByText('Web Component Name')).toBeInTheDocument();
    expect(screen.getByText('This is a placeholder description (>125 characters.)')).toBeInTheDocument();
    const image = screen.getByAltText('') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('assets/ui-images/placeholder.png');
  });
});
