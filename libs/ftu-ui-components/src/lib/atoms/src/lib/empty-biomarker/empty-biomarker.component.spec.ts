import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { EmptyBiomarkerComponent } from './empty-biomarker.component';

describe('EmptyBiomarkerComponent', () => {
  it('should create', async () => {
    const promise = render(EmptyBiomarkerComponent, { inputs: { emptyBehaviorText: 'Test text' } });
    await expect(promise).resolves.toBeTruthy();
  });

  it('should show copied message when copy button is clicked', async () => {
    const snackbarService = { open: jest.fn() };
    const user = userEvent.setup();

    await render(EmptyBiomarkerComponent, {
      inputs: { emptyBehaviorText: 'Test text' },
      providers: [{ provide: SnackbarService, useValue: snackbarService }],
    });

    const copyButton = screen.getByRole('button', { name: /copy email/i });
    await user.click(copyButton);

    expect(snackbarService.open).toHaveBeenCalledWith('Email copied', '', undefined, undefined, {
      duration: 3000,
    });
  });
});
