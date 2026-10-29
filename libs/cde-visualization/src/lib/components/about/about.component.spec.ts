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

  it('emits closeClick when the close button is clicked', async () => {
    const closeClick = jest.fn();
    await render(AboutComponent, { on: { closeClick } });

    fireEvent.click(screen.getByRole('button', { name: ABOUT_CONTENT.closeLabel }));
    expect(closeClick).toHaveBeenCalled();
  });
});
