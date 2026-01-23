import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { ThumbnailListComponent } from './thumbnail-list.component';

describe('ThumbnailListComponent', () => {
  const techLink = 'https://example.com/one';
  const thumbLink = 'thumb-one.png';

  const items = [
    {
      technology: 'Tech One',
      link: techLink,
      thumbnail: thumbLink,
    },
    {
      technology: 'Tech Two',
      link: 'https://example.com/two',
    },
  ] as unknown[];

  it('renders items with thumbnails and empty state', async () => {
    await render(ThumbnailListComponent, {
      inputs: { data: items as never },
    });

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', techLink);
    expect(links[0].classList.contains('empty')).toBe(false);
    expect(links[0].style.backgroundImage).toContain(thumbLink);

    expect(links[1].classList.contains('empty')).toBe(true);
  });

  it('emits clicked dataset', async () => {
    const linkClicked = jest.fn();

    await render(ThumbnailListComponent, {
      inputs: { data: items as never },
      on: { linkClicked },
    });

    await userEvent.click(screen.getAllByRole('link')[0]);
    expect(linkClicked).toHaveBeenCalledWith(items[0]);
  });
});
