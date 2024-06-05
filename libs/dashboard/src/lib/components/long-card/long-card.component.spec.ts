import { z } from 'zod';
import { LONG_CARD_DEF, LongCardComponent } from './long-card.component';
import { render, screen } from '@testing-library/angular';
describe('LongCardComponent', () => {
  const testCards: z.infer<typeof LONG_CARD_DEF>[] = [
    { background: 'path/to/image1.jpg', title: 'Card 1', route: '/route1' },
    { background: 'path/to/image2.jpg', title: 'Card 2', route: '/route2' },
  ];
  it('should display the cards', async () => {
    await render(LongCardComponent, {
      componentInputs: { spec: testCards },
    });

    const cards = screen.getAllByRole('img');
    console.log(cards);
    expect(cards.length).toEqual(2);
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(cards[0]).toHaveAttribute('src', 'path/to/image1.jpg');
    expect(cards[0]).toHaveAttribute('alt', 'Image of Image 1');
    expect(cards[1]).toHaveAttribute('src', 'path/to/image2.jpg');
    expect(cards[1]).toHaveAttribute('alt', 'Image of Image 2');
  });
});
