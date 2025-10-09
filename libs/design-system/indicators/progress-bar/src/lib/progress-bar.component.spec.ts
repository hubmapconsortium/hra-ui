import { render } from '@testing-library/angular';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressSpinnerComponent', () => {
  it('should render', async () => {
    const promise = render(ProgressBarComponent, {
      inputs: {
        color: 'color',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
