import { LongCard, LongCardComponent } from './long-card.component';
import { render, screen } from '@testing-library/angular';
describe('LongCardComponent', () => {
  const testCards: LongCard[] = [
    { image: 'path/to/image1.jpg', label: 'Card 1', route: '/route1', alt: 'Image 1' },
    { image: 'path/to/image2.jpg', label: 'Card 2', route: '/route2', alt: 'Image 2' },
  ];
  it('should display the cards', async () => {
    await render(LongCardComponent, {
      componentInputs: { cardData: testCards },
    });

    const cards = screen.getAllByRole('img');
    expect(cards.length).toEqual(2);
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(cards[0]).toHaveAttribute('src', 'path/to/image1.jpg');
    expect(cards[0]).toHaveAttribute('alt', 'Image 1');
    expect(cards[1]).toHaveAttribute('src', 'path/to/image2.jpg');
    expect(cards[1]).toHaveAttribute('alt', 'Image 2');
  });
});
