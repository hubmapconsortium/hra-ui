import { ResultsIndicatorComponent } from './results-indicator.component';
import { render } from '@testing-library/angular';

describe('ResultsIndicatorComponent', () => {
  it('should create', async () => {
    const result = await render(ResultsIndicatorComponent, {
      componentInputs: {
        value: 100000,
        total: 100000,
        description: 'Viewing',
      },
    });

    expect(result).toBeTruthy();
  });
  it('should display the value and total correctly', async () => {
    const { container } = await render(ResultsIndicatorComponent, {
      componentInputs: {
        value: 50000,
        total: 100000,
        description: 'Viewing',
      },
    });

    expect(container.textContent).toContain('50');
    expect(container.textContent).toContain('000');
    expect(container.textContent).toContain('100');
    expect(container.textContent).toContain('of');
  });
});
