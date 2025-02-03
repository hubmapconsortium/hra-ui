import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { BackButtonBarComponent } from './back-button-bar.component';

describe('BackButtonBarComponent', () => {
  it('has a back button', async () => {
    const click = jest.fn();
    await render(BackButtonBarComponent, {
      on: {
        backClick: click,
      },
    });

    const button = screen.getByRole('button', { name: /back/i });
    await userEvent.click(button);
    expect(click).toHaveBeenCalledTimes(1);
  });
});
