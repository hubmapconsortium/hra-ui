import { ProductHeaderComponent } from './product-header.component';
import { render } from '@testing-library/angular';

describe('ProductHeaderComponent', () => {
  it('should create', async () => {
    const result = render(ProductHeaderComponent);
    expect(result).resolves.toBeTruthy();
  });
});
