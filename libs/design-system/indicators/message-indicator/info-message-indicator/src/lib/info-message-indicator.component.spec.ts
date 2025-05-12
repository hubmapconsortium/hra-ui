import { InfoMessageIndicatorComponent } from './info-message-indicator.component';
import { render } from '@testing-library/angular';

describe('InfoMessageIndicatorComponent', () => {
  it('should render', async () => {
    const promise = render(InfoMessageIndicatorComponent);
    await expect(promise).resolves.toBeDefined();
  });
});
