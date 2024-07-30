import { render, screen } from '@testing-library/angular';

import { BrandmarkComponent } from './brandmark.component';

describe('BrandmarkComponent', () => {
  it('should render a large logo', async () => {
    await render(BrandmarkComponent, {
      componentInputs: {
        small: false,
      },
    });
    const logo = screen.getByAltText('Human Reference Atlas brandmark');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo/brandmark_default.svg');
  });

  it('should render a small logo', async () => {
    await render(BrandmarkComponent, {
      componentInputs: {
        small: true,
      },
    });
    const logo = screen.getByAltText('Human Reference Atlas brandmark');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo/brandmark_small.svg');
  });
});
