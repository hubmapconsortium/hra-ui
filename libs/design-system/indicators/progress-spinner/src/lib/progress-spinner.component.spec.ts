import { render } from '@testing-library/angular';
import { ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
  it('should render', async () => {
    const promise = render(ProgressSpinnerComponent, {
      inputs: {
        size: 'small',
        color: 'color',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
