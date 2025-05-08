import { DangerMessageIndicatorComponent } from './danger-message-indicator.component';
import { render } from '@testing-library/angular';

describe('InfoMessageIndicatorComponent', () => {
  it('should render', async () => {
    const promise = render(DangerMessageIndicatorComponent);
    await expect(promise).resolves.toBeDefined();
  });
});
