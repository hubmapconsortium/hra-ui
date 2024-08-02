import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';

import { BrandmarkComponent } from './brandmark.component';

describe('BrandmarkComponent', () => {
  it('should render a normal logo', async () => {
    await render(BrandmarkComponent, {
      providers: [provideHttpClient()],
    });
    const logo = screen.getByTestId('brandmark');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('ng-reflect-inline-s-v-g', 'assets/logo/hra_brandmark.svg');
  });

  it('should render a contrast logo', async () => {
    await render(BrandmarkComponent, {
      componentInputs: {
        contrast: true,
      },
      providers: [provideHttpClient()],
    });
    const logo = screen.getByTestId('brandmark');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('ng-reflect-inline-s-v-g', 'assets/logo/hra_brandmark_cont');
  });
});
