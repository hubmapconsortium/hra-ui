import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render } from '@testing-library/angular';
import { getProductLogoIds, ProductLogoComponent } from './product-logo.component';

describe('ProductLogoComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  it('should render', async () => {
    const promise = render(ProductLogoComponent, {
      inputs: { id: getProductLogoIds()[0] },
      providers,
    });

    await expect(promise).resolves.toBeDefined();
  });
});
