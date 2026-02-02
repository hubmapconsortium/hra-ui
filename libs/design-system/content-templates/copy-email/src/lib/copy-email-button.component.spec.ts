import { Clipboard } from '@angular/cdk/clipboard';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { CopyEmailButtonComponent } from './copy-email-button.component';

describe('CopyEmailButtonComponent', () => {
  async function setup() {
    const snackbarService = {
      open: jest.fn(),
    };
    const clipboard = {
      copy: jest.fn().mockReturnValue(true),
    };

    const user = userEvent.setup();
    const renderResult = await render(CopyEmailButtonComponent, {
      inputs: {
        emailId: 'test@example.com',
      },
      providers: [
        { provide: SnackbarService, useValue: snackbarService },
        { provide: Clipboard, useValue: clipboard },
      ],
    });

    return { renderResult, user, snackbarService, clipboard };
  }

  it('should create', async () => {
    const { renderResult } = await setup();
    expect(renderResult.fixture.componentInstance).toBeTruthy();
  });

  it('should copy email to clipboard and show snackbar when clicked', async () => {
    const { user, clipboard, snackbarService } = await setup();
    const button = screen.getByRole('button', { name: /copy email/i });

    await user.click(button);

    expect(clipboard.copy).toHaveBeenCalledWith('test@example.com');
    expect(snackbarService.open).toHaveBeenCalledWith('Copied to clipboard', '', false, 'start', { duration: 5000 });
  });
});
