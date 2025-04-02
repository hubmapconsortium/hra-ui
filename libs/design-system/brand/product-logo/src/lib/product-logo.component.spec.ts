import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import { getProductLogoIds, ProductLogoComponent } from './product-logo.component';

describe('ProductLogoComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  it('should render', async () => {
    await render(ProductLogoComponent, {
      inputs: { id: getProductLogoIds()[0] },
      providers,
    });
    const icon = screen.getByTestId('product-logo');
    expect(icon.classList.contains('small')).toBeFalsy();
  });
});
