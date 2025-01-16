import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { BackBarComponent } from './back-bar.component';

describe('BackBarComponent', () => {
  it('has a back button', async () => {
    const click = jest.fn();
    await render(BackBarComponent, {
      on: {
        backClick: click,
      },
    });

    const button = screen.getByRole('button', { name: /back/i });
    await userEvent.click(button);
    expect(click).toHaveBeenCalledTimes(1);
  });
});
