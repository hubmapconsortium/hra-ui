import { WebComponentCardComponent } from './web-component-card.component';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/angular';

describe('WebComponentCardComponent', () => {
  beforeEach(async () => {
    await render(WebComponentCardComponent, {
      componentInputs: {
        productTitle: 'Product Title',
        webComponentName: 'Web Component Name',
        description: 'This is a placeholder description (>125 characters.)',
      },
    });
  });
  it('should render title, web component name and description', () => {
    expect(screen.getByText('Product Title')).toBeInTheDocument();
    expect(screen.getByText('Web Component Name')).toBeInTheDocument();
    expect(screen.getByText('This is a placeholder description (>125 characters.)')).toBeInTheDocument();
  });
});
