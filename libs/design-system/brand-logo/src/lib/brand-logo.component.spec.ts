import { render, screen } from '@testing-library/angular';
import { BrandLogoComponent } from './brand-logo.component';
import { provideHttpClient } from '@angular/common/http';

describe('BrandLogoComponent', () => {
  beforeEach(async () => {
    await render(BrandLogoComponent, {
      providers: [provideHttpClient()],
    });
  });

  it('should create', () => {
    const brandLink = screen.getByRole('link');
    expect(brandLink).toBeInTheDocument();
  });
});
