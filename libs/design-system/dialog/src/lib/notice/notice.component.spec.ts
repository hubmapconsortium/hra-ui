import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { render, screen } from '@testing-library/angular';
import { DialogService } from '../../dialog.service';
import { NoticeComponent } from './notice.component';
import userEvent from '@testing-library/user-event';

describe('DialogComponent', () => {
  let service: DialogService;
  beforeEach(async () => {
    await render(NoticeComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    });

    service = TestBed.inject(DialogService);
  });

  it('Title and Message should be present when dialog is opened', async () => {
    service.openNotice('Test Title', 'Test Message');

    const title = await screen.findByText('Test Title');
    expect(title).toBeInTheDocument();

    const message = await screen.findByText('Test Message');
    expect(message).toBeInTheDocument();

    const dismiss = await screen.findByRole('button', { name: 'Dismiss' });
    expect(dismiss).toBeInTheDocument();
  });

  it('Action button should be visible', async () => {
    service.openNotice('Test Title', 'Test Message', {
      label: 'Action Button',
      callback: () => {
        ('');
      },
    });

    const dismiss = await screen.findByRole('button', { name: 'Action Button' });
    expect(dismiss).toBeInTheDocument();
  });

  it('Dialog should close when clicked on dismiss button', async () => {
    const user = userEvent.setup();
    service.openNotice('Test Title', 'Test Message');

    const dialogTitle = await screen.findByText('Test Title');

    const dismiss = await screen.findByRole('button', { name: 'Dismiss' });
    await user.click(dismiss);

    expect(dialogTitle).not.toBeInTheDocument();
  });

  it('Dialog should close when clicked on close button', async () => {
    const user = userEvent.setup();
    service.openNotice('Test Title', 'Test Message');

    const dialogTitle = await screen.findByText('Test Title');

    const dismiss = await screen.findAllByTestId('close-icon');
    await user.click(dismiss[1]);

    expect(dialogTitle).not.toBeInTheDocument();
  });
});
