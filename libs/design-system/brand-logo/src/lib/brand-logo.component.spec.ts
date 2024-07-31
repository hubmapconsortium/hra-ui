import { render, screen } from '@testing-library/angular';
import { BrandLogoComponent } from './brand-logo.component';

describe('BrandLogoComponent', () => {
  beforeEach(async () => {
    await render(BrandLogoComponent);
  });

  it('should create', () => {
    const brandLink = screen.getByRole('link');
    expect(brandLink).toBeInTheDocument();
  });
});
