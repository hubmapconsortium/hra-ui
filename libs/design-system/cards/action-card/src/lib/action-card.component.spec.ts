import { render } from '@testing-library/angular';
import { ActionCardComponent } from './action-card.component';

describe('ActionCardComponent', () => {
  it('should create', async () => {
    const promise = render(ActionCardComponent, {
      inputs: {
        variant: 'elevated',
        tagline: 'Title',
      },
    });

    await expect(promise).resolves.toBeTruthy();
  });
});
