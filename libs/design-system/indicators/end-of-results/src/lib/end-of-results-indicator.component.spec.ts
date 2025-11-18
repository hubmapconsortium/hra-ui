import { render } from '@testing-library/angular';
import { EndOfResultsIndicatorComponent } from './end-of-results-indicator.component';

describe('EndOfResultsIndicatorComponent', () => {
  it('should create', async () => {
    const result = await render(EndOfResultsIndicatorComponent, {
      componentInputs: {
        resultCount: 2,
      },
    });

    expect(result).toBeTruthy();
  });

  it('should display the result count and end message', async () => {
    const { container } = await render(EndOfResultsIndicatorComponent, {
      componentInputs: {
        resultCount: 5,
      },
    });

    expect(container.textContent).toContain('Results:');
    expect(container.textContent).toContain('5');
    expect(container.textContent).toContain('End of results');
  });
});
