import { render, screen } from '@testing-library/angular';
import { BrandComponent } from './brand.component';

describe('BrandComponent', () => {
  beforeEach(async () => {
    await render(BrandComponent);
  });

  it('should create', () => {
    expect(screen.getByText('Human Reference Atlas')).toBeInTheDocument();
  });
});
