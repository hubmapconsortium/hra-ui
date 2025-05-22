import { render, screen } from '@testing-library/angular';

import { ActionCardFlatComponent } from './action-card-flat.component';

describe('ActionCardFlatComponent', () => {
  beforeEach(async () => {
    await render(ActionCardFlatComponent, {
      componentInputs: {
        imageUrl: 'assets/ui-images/placeholder.png',
        componentName: 'Web Component Name',
        description: 'This is a placeholder description (>125 characters.)',
        leftActionName: '',
        leftActionUrl: '',
        rightActionName: '',
        rightActionUrl: '',
      },
    });
  });

  it('should render web component name, description, and image', () => {
    expect(screen.getByText('Web Component Name')).toBeInTheDocument();
    expect(screen.getByText('This is a placeholder description (>125 characters.)')).toBeInTheDocument();
    const image = screen.getByAltText('') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('assets/ui-images/placeholder.png');
  });
});
