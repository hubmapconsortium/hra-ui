import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting(), provideDesignSystemCommon()];

  beforeEach(async () => {
    await render(FooterComponent, { providers: globalProviders });
  });

  it('should render the Human Reference Atlas logo', async () => {
    const logo = screen.getByLabelText(/Human Reference Atlas/);
    expect(logo).toBeInTheDocument();
  });

  it('should display copyright information correctly', async () => {
    const copyrightText = screen.getByText(/2024 CNS at Indiana University/);
    expect(screen.getByText(/copyright/)).toBeInTheDocument();
    expect(copyrightText).toBeInTheDocument();
  });

  it('should display medical disclaimer', async () => {
    const disclaimer = screen.getByText(/This resource is intended for research purposes only/);
    expect(disclaimer).toBeInTheDocument();
    expect(
      screen.getByText(/It should not be used for emergencies or medical or professional advice./),
    ).toBeInTheDocument();
  });

  it('should display a data notice', async () => {
    const notice = screen.getByText(/HuBMAP data is managed/);
    expect(notice).toBeInTheDocument();
  });
});
