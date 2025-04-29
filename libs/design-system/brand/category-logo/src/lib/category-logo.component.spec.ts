import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render } from '@testing-library/angular';
import { getCategoryLogoIds, CategoryLogoComponent } from './category-logo.component';

describe('CategoryLogoComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  it('should render', async () => {
    const promise = render(CategoryLogoComponent, {
      inputs: { id: getCategoryLogoIds()[0] },
      providers,
    });

    await expect(promise).resolves.toBeDefined();
  });
});
