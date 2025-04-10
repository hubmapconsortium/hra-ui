import { render, screen } from '@testing-library/angular';
import { UiSectionComponent } from './ui-section.component';

describe('UiSectionComponent', () => {
  it('should render tagline, description, image, and should show appStatus', async () => {
    await render(UiSectionComponent, {
      componentInputs: {
        tagline: 'Product Name',
        description: 'Placeholder short description for text less than 125 characters.',
        logo: 'apps',
        appStatus: 'Preview',
        imagePath: 'assets/ui-images/placeholder.png',
      },
    });

    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Placeholder short description for text less than 125 characters.')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });
});
