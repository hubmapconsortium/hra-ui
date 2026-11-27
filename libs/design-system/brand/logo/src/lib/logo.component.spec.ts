import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatTooltip } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import { BrandLogoComponent } from './logo.component';

describe('BrandLogoComponent', () => {
  it('renders the logo as a link', async () => {
    await render(BrandLogoComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const link = screen.queryByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://humanatlas.io/');
  });

  it('keeps its own size unless the height is set, and scales its width with the height', async () => {
    await render(BrandLogoComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
      inputs: { size: 'small' },
    });

    const link = screen.getByRole('link');
    expect(link.style.height).toBe('var(--hra-brand-logo-height, 48px)');
    expect(link.style.width).toBe('calc(var(--hra-brand-logo-height, 48px) * 116 / 48)');
  });

  it('shows a tooltip only when one is set', async () => {
    const { fixture } = await render(BrandLogoComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
      inputs: { tooltip: 'Homepage' },
    });

    const link = fixture.debugElement.query(By.css('a'));
    expect(link.injector.get(MatTooltip).message).toBe('Homepage');
  });
});
