import { LongCardComponent } from './long-card.component';
import { render, screen } from '@testing-library/angular';
describe('LongCardComponent', () => {
  it('should render card title and background image', async () => {
    const spec = {
      title: 'Card Title',
      route: '/card-route',
      background: 'https://example.com/image.jpg',
    };

    await render(LongCardComponent, {
      componentInputs: { spec: spec },
    });

    const cardTitle = screen.getByText('Card Title');
    const cardImage = screen.getByAltText('Image of Card Title');

    expect(cardTitle).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', 'https://example.com/image.jpg');
  });
});
