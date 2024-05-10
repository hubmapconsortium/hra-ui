import { VisualCardComponent, VisualCard } from './visual-card.component';
import { render, screen } from '@testing-library/angular';

describe('VisualCardComponent', () => {
  it('card data is present on the page', async () => {
    const testCardData: VisualCard[] = [{ image: 'img.svg', label: 'label', route: 'test route', alt: 'alt text' }];
    await render(VisualCardComponent, {
      componentInputs: {
        cardData: testCardData,
      },
    });
    expect(screen.getByText(/img.svg/i)).toBeInTheDocument();
    expect(screen.getByText(/label/i)).toBeInTheDocument();
    expect(screen.getByText(/test route/i)).toBeInTheDocument();
    expect(screen.getByText(/alt text/i)).toBeInTheDocument();
  });
});
