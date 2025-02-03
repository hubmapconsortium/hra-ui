import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BrandLogoComponent } from './logo.component';

describe('BrandLogoComponent', () => {
  it('renders the logo as a link', async () => {
    await render(BrandLogoComponent, {
      imports: [InlineSVGModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const link = screen.queryByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://humanatlas.io/');
  });
});
