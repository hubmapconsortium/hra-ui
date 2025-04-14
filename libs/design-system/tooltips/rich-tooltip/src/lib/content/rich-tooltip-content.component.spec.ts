import { RichTooltipContainerComponent } from './rich-tooltip-content.component';
import { render } from '@testing-library/angular';

describe('RichTooltipContainerComponent', () => {
  it('should render', async () => {
    const promise = render(RichTooltipContainerComponent, {
      inputs: {},
    });

    await expect(promise).resolves.toBeDefined();
  });
});
