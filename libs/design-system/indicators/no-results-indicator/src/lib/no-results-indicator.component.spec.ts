import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { NoResultsIndicatorComponent } from './no-results-indicator.component';

describe('NoResultsIndicatorComponent', () => {
  it('should render the component', async () => {
    await render(NoResultsIndicatorComponent);
  });

  it('should emit clearFilters event when button is clicked', async () => {
    const user = userEvent.setup();
    const clearFilters = jest.fn();

    await render(NoResultsIndicatorComponent, {
      on: { clearFilters },
    });

    const button = screen.getByRole('button', { name: 'Clear filters' });
    await user.click(button);

    expect(clearFilters).toHaveBeenCalledTimes(1);
  });
});
