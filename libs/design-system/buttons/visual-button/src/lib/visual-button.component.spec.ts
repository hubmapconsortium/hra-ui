import { VisualButtonComponent } from './visual-button.component';
import { render, screen } from '@testing-library/angular';

describe('VisualButtonComponent', () => {
  it('should create', async () => {
    const result = await render(VisualButtonComponent, {
      componentInputs: {
        label: 'Visual Button',
        imageUrl: 'assets/ui-images/placeholder.png',
        variant: 'bottom',
        disabled: false,
      },
    });

    expect(result).toBeTruthy();
  });

  it('should create and render the button with correct label', async () => {
    // First render the component for this test
    await render(VisualButtonComponent, {
      componentInputs: {
        label: 'Visual Button',
        imageUrl: 'assets/ui-images/placeholder.png',
        variant: 'bottom',
        disabled: false,
      },
    });

    // Now try to find the button
    const visualButton = screen.getByRole('button');
    expect(visualButton).toBeInTheDocument();
    expect(screen.getByText('Visual Button')).toBeInTheDocument();
  });
});
