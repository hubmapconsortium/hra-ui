import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { DialogService } from '../../dialog.service';

describe('DialogComponent', () => {
  let service: DialogService;
  const TITLE = 'Test Title';
  const MESSAGE = 'Test Message';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()],
    });
    service = TestBed.inject(DialogService);
  });

  it('Title and Message should be present when dialog is opened', async () => {
    service.openNotice(TITLE, MESSAGE);

    const title = await screen.findByText(TITLE);
    expect(title).toBeInTheDocument();

    const message = await screen.findByText(MESSAGE);
    expect(message).toBeInTheDocument();

    const dismiss = await screen.findByRole('button', { name: 'Dismiss' });
    expect(dismiss).toBeInTheDocument();
  });

  it('Action button should be visible', async () => {
    const callback = jest.fn();
    service.openNotice(TITLE, MESSAGE, {
      label: 'Action Button',
      callback: callback,
    });

    const actionButton = await screen.findByRole('button', { name: 'Action Button' });
    expect(actionButton).toBeInTheDocument();

    await userEvent.click(actionButton);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Dialog should close when clicked on dismiss button', async () => {
    service.openNotice(TITLE, MESSAGE);

    const dismiss = await screen.findByRole('button', { name: 'Dismiss' });
    await userEvent.click(dismiss);

    const dialogTitle = screen.queryByText(TITLE);
    expect(dialogTitle).not.toBeInTheDocument();
  });

  it('Dialog should close when clicked on close button', async () => {
    service.openNotice(TITLE, MESSAGE);

    const dismiss = await screen.findByTestId('close-icon');
    await userEvent.click(dismiss);

    const dialogTitle = screen.queryByText(TITLE);
    expect(dialogTitle).not.toBeInTheDocument();
  });
});
