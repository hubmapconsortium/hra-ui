import { render, screen } from '@testing-library/angular';
import { UiSectionComponent } from './ui-section.component';

describe('UiSectionComponent', () => {
  beforeEach(async () => {
    await render(UiSectionComponent, {
      componentInputs: {
        tagline: 'Product Name',
        description: 'Placeholder short description for text less than 125 characters.',
        logo: 'apps',
        appStatus: 'Preview',
        imagePath: 'assets/ui-images/placeholder.png',
      },
    });
  });

  it('should render tagline, description, image, and should show appStatus', () => {
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Placeholder short description for text less than 125 characters.')).toBeInTheDocument();
    const image = screen.getByAltText('app-image') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('assets/ui-images/placeholder.png');
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });
});
