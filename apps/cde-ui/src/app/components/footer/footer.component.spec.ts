import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';
import { ICON_DEFINITIONS } from '../../shared/icon-definitions';
import '@testing-library/jest-dom';
import { provideIcons } from '../../services/icon-registry/icon-registry.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FooterComponent', () => {
  const globalProviders = [provideIcons(ICON_DEFINITIONS), provideHttpClient(), provideHttpClientTesting()];

  beforeEach(async () => {
    await render(FooterComponent, {
      providers: globalProviders,
    });
  });

  it('should render the Human Reference Atlas logo', async () => {
    const logo = screen.getByAltText('Human Reference Atlas Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'assets/logo/hra_logo.svg');
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
