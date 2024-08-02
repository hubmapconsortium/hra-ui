import { provideHttpClient } from '@angular/common/http';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { BrandLogoComponent } from './brand-logo.component';

describe('BrandLogoComponent', () => {
  async function setup(options?: RenderComponentOptions<BrandLogoComponent>) {
    return render(BrandLogoComponent, {
      providers: [provideHttpClient(), ...(options?.providers ?? [])],
      ...options,
    });
  }

  it('should create', async () => {
    await setup();
    const brandLink = screen.getByRole('link');
    expect(brandLink).toBeInTheDocument();
  });

  it('should select small image if input small is true', async () => {
    const { fixture } = await setup({
      componentInputs: {
        small: true,
      },
    });

    expect(fixture.componentInstance.logoPath()).toEqual('assets/logo/hra-logo-small.svg');
  });
});
