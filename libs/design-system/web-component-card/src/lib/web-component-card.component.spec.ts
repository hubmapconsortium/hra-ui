import { WebComponentCardComponent } from './web-component-card.component';
import { render, screen } from '@testing-library/angular';

describe('WebComponentCardComponent', () => {
  it('Error should be visible in the indicator', async () => {
    const productTitle = 'Product Title';
    const webComponentName = 'Web Component Name';
    const description = 'This is a placeholder description (>125 characters.)';

    await render(WebComponentCardComponent, {
      componentInputs: {
        productTitle,
        webComponentName,
        description,
      },
    });

    expect(screen.getByText('Product Title')).toBeInTheDocument();
    expect(screen.getByText('Web Component Name')).toBeInTheDocument();
    expect(screen.getByText('This is a placeholder description (>125 characters.)')).toBeInTheDocument();
  });
});
