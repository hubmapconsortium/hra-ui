import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render } from '@testing-library/angular';
import { getOrganLogoIds, OrganLogoComponent } from './organ-logo.component';

describe('OrganLogoComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  it('should render', async () => {
    const promise = render(OrganLogoComponent, {
      inputs: { id: getOrganLogoIds()[0] },
      providers,
    });

    await expect(promise).resolves.toBeDefined();
  });
});
