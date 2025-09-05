import { render } from '@testing-library/angular';
import { ErrorIndicatorComponent } from './error-indicator.component';
import { screen } from '@testing-library/dom';
describe('ErrorIndicatorComponent', () => {
  it('Error should be visible in the indicator', async () => {
    const errors: string[] = ['Error 1'];
    await render(ErrorIndicatorComponent, {
      componentInputs: {
        errors,
      },
    });

    expect(screen.getByText('Error 1')).toBeInTheDocument();
  });
});
