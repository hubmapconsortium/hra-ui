import { render } from '@testing-library/angular';
import { FlatCardComponent } from './flat-card.component';

describe('FlatCardComponent', () => {
  it('should create', async () => {
    const result = render(FlatCardComponent, {
      inputs: {
        tagline: '',
      },
    });
    await expect(result).resolves.toBeDefined();
  });
});
