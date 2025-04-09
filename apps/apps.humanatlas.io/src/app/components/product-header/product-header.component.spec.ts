import { render } from '@testing-library/angular';
import { ProductHeaderComponent } from './product-header.component';

describe('ProductHeaderComponent', () => {
  it('should create', async () => {
    const promise = render(ProductHeaderComponent, {
      inputs: {
        logo: 'web-components',
        tagline: 'Web Components',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
