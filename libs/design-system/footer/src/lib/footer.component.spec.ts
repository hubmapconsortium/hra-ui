import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting(), provideIcons()];

  beforeEach(async () => {
    await render(FooterComponent, {
      providers: globalProviders,
      componentInputs: { logo: 'assets/logo.svg' },
    });
  });

  it('should render the Human Reference Atlas logo', async () => {
    const logo = screen.getByAltText('Human Reference Atlas Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'assets/logo.svg');
  });

  it('should display copyright information correctly', async () => {
    const copyrightText = screen.getByText(/2024 CNS at Indiana University/);
    expect(screen.getByText(/copyright/)).toBeInTheDocument();
    expect(copyrightText).toBeInTheDocument();
  });

  it('should contain links and alt text for funded by logos', async () => {
    expect(screen.getByAltText('Indiana University Logo')).toBeInTheDocument();
    expect(screen.getByAltText('National Institutes of Health (NIH) Logo')).toBeInTheDocument();
    expect(screen.getByAltText('CIFAR Logo')).toBeInTheDocument();
  });

  it('should display medical disclaimer', async () => {
    const disclaimer = screen.getByText(/This resource is intended for research purposes only/);
    expect(disclaimer).toBeInTheDocument();
    expect(
      screen.getByText(/It should not be used for emergencies or medical or professional advice./),
    ).toBeInTheDocument();
  });
});
