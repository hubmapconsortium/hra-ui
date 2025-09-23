import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('FooterComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting()];
  const imports = [MatIconTestingModule];

  beforeEach(async () => {
    await render(FooterComponent, { providers: globalProviders, imports });
  });

  it('should render the Human Reference Atlas logo', async () => {
    const logo = screen.getByLabelText(/Human Reference Atlas/);
    expect(logo).toBeInTheDocument();
  });

  it('should display copyright information correctly', async () => {
    expect(screen.getByText(/© 2025/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cyberinfrastructure for Network Science Center/i })).toBeInTheDocument();

    const iuLinks = screen.getAllByRole('link', { name: /Indiana University/i });
    expect(iuLinks[0]).toHaveAttribute('href', 'https://www.iu.edu/');
  });

  it('should display medical disclaimer', async () => {
    const disclaimer = screen.getByText(/This resource is intended for research purposes only/);
    expect(disclaimer).toBeInTheDocument();
    expect(
      screen.getByText(/It should not be used for emergencies or medical or professional advice./),
    ).toBeInTheDocument();
  });

  it('should display a data notice', async () => {
    expect(screen.getByRole('link', { name: /HuBMAP/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Data Portal/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /FAIR principles/i })).toBeInTheDocument();
  });
});
