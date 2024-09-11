import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { screen } from '@testing-library/angular';
import { SnackbarService } from './snackbar.service';

describe('SnackbarComponent', () => {
  let service: SnackbarService;
  const MESSAGE = 'Test message';
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()],
    });

    service = TestBed.inject(SnackbarService);
  });

  it('should open snackbar and show details', async () => {
    service.open(MESSAGE, 'Action', true, 'end');
    const label = screen.findAllByText(MESSAGE);
    const action = screen.findAllByText('Action');
    expect(label).resolves.toBeInTheDocument();
    expect(action).resolves.toBeInTheDocument();
  });

  it('should open snackbar with close button hidden', async () => {
    service.open(MESSAGE, 'Action');
    await screen.findByText(MESSAGE);
    const closeButton = screen.queryByTestId('close-btn');
    expect(closeButton).not.toBeInTheDocument();

    const actionButton = screen.getByText('Action');
    expect(actionButton).toBeInTheDocument();

    const actionsContainer = actionButton.closest('.actions');
    expect(actionsContainer).not.toHaveStyle('align-self: flex-end');
  });
});
