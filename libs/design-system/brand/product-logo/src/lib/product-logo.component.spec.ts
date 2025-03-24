import { render, screen } from '@testing-library/angular';
import { ProductLogoComponent } from './product-logo.component';
import { provideIcons } from '@hra-ui/cdk/icons';
import { provideHttpClient } from '@angular/common/http';

describe('ProductLogoComponent', () => {
  it('it should render the large logo', async () => {
    await render(ProductLogoComponent, {
      inputs: {
        name: 'code',
        size: 'large',
      },
      providers: [provideIcons(), provideHttpClient()],
    });
    const icon = screen.getByTestId('product-logo');
    expect(icon.classList.contains('small')).toBeFalsy();
  });

  it('it should render the small logo', async () => {
    await render(ProductLogoComponent, {
      inputs: {
        name: 'code',
        size: 'small',
      },
      providers: [provideIcons(), provideHttpClient()],
    });
    const icon = screen.getByTestId('product-logo');
    expect(icon.classList.contains('small')).toBeTruthy();
  });
});
