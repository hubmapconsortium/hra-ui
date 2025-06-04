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

  it('should check for the size large', async () => {
    const { fixture } = await render(ProgressSpinnerComponent, {
      inputs: {
        size: 'large',
        color: 'color',
      },
    });
    await expect(fixture.componentInstance.size()).toBe('large');
  });
});
