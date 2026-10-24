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

  it('shows the error icon by default', async () => {
    const { container } = await render(ErrorIndicatorComponent, { componentInputs: { errors: ['Error 1'] } });

    expect(container.querySelector('mat-icon')).toHaveTextContent('error');
  });

  it('shows the given icon', async () => {
    const { container } = await render(ErrorIndicatorComponent, {
      componentInputs: { errors: ['Error 1'], icon: 'warning' },
    });

    expect(container.querySelector('mat-icon')).toHaveTextContent('warning');
  });
});
