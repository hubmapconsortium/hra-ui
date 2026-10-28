import { fireEvent, render, screen } from '@testing-library/angular';
import { AboutComponent } from './about.component';
import { ABOUT_CONTENT } from './about.content';

describe('AboutComponent', () => {
  it('describes each panel', async () => {
    const { fixture } = await render(AboutComponent);

    const title = screen.getByRole('heading', { level: 2, name: ABOUT_CONTENT.title });
    expect(title).toHaveAttribute('id', fixture.componentInstance.titleId);
    for (const section of ABOUT_CONTENT.sections) {
      expect(screen.getByRole('heading', { level: 3, name: section.heading })).toBeInTheDocument();
    }
    expect(screen.getByText('Trackpad pinch')).toBeInTheDocument();
  });

  it('emits the close origin', async () => {
    const closeClick = jest.fn();
    await render(AboutComponent, { on: { closeClick } });
    const close = screen.getByRole('button', { name: ABOUT_CONTENT.closeLabel });

    fireEvent.click(close, { screenX: 0, screenY: 0 });
    fireEvent.click(close, { screenX: 10, screenY: 10 });
    expect(closeClick).toHaveBeenNthCalledWith(1, 'keyboard');
    expect(closeClick).toHaveBeenNthCalledWith(2, 'mouse');
  });
});
