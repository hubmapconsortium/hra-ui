import { HeaderComponent } from './header.component';
import { render, screen } from '@testing-library/angular';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await render(HeaderComponent);
  });

  it('should display hra and dashboards logo', () => {
    const hraLogo = screen.getByAltText('Human Reference Atlas logo');
    const dashboardLogo = screen.getByAltText('HRA Dashboards logo');
    expect(hraLogo).toBeInTheDocument();
    expect(dashboardLogo).toBeInTheDocument();
  });

  it('should display hra logo', () => {
    const hraLogo = screen.getByAltText('Human Reference Atlas logo');
    expect(hraLogo).toBeInTheDocument();
  });

  it('should display hra logo', () => {
    const dataButton = screen.getByRole('button', { name: 'Data' });
    const usageButton = screen.getByRole('button', { name: 'Usage' });
    const diversityButton = screen.getByRole('button', { name: 'Diversity & Inclusion' });
    const publicationsButton = screen.getByRole('button', { name: 'Publications' });
    const experimentalDataButton = screen.getByRole('button', { name: 'Experimental Data' });

    expect(dataButton).toBeInTheDocument();
    expect(usageButton).toBeInTheDocument();
    expect(diversityButton).toBeInTheDocument();
    expect(publicationsButton).toBeInTheDocument();
    expect(experimentalDataButton).toBeInTheDocument();
  });
});
