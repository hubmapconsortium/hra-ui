import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { screen } from '@testing-library/angular';
import { SnackbarService } from './snackbar.service';

describe('SnackbarComponent', () => {
  let service: SnackbarService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()],
    });

    service = TestBed.inject(SnackbarService);
  });

  it('should open snackbar and show details', async () => {
    service.open('Test message', 'Action', true, 'end');
    const label = screen.findAllByText('Test message');
    const action = screen.findAllByText('Action');
    expect(label).resolves.toBeInTheDocument();
    expect(action).resolves.toBeInTheDocument();
  });
});
