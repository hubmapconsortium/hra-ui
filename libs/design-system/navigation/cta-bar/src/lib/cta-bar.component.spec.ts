import { render, screen } from '@testing-library/angular';
import { CtaBarComponent } from './cta-bar.component';
import userEvent from '@testing-library/user-event';

describe('CtaBarComponent', () => {
  it('displays provided action and description', async () => {
    const action = 'register';
    const description = 'register for the thing';
    const url = 'https://example.com';
    const onCloseClick = jest.fn();

    await render(CtaBarComponent, {
      inputs: { action, description, url },
      on: { closeClick: onCloseClick },
    });

    expect(screen.queryByText(description)).toBeInTheDocument();

    const link = screen.queryByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(action);
    expect(link).toHaveAttribute('href', url);

    const button = screen.queryByRole('button');
    expect(button).toBeInTheDocument();

    await userEvent.click(button as HTMLElement);
    expect(onCloseClick).toHaveBeenCalledTimes(1);
  });
});
