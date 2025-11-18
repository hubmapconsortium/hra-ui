import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { userEvent } from '@testing-library/user-event';

describe('FooterComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting()];
  const imports = [MatIconTestingModule];
  it('should display copyright information correctly', async () => {
    await render(FooterComponent, { providers: globalProviders, imports });
    const currentYear = new Date().getFullYear();
    const regex = new RegExp(`©\\s${currentYear}`, 'i');
    expect(screen.getByText(regex)).toBeInTheDocument();
  });

  it('should render Privacy Preferences link and handle click', async () => {
    const { fixture } = await render(FooterComponent, { providers: globalProviders, imports });
    const componentInstance = fixture.componentInstance;
    const link = screen.getByText(/Privacy Preferences/i);
    expect(link).toBeInTheDocument();
    const spy = jest.spyOn(componentInstance, 'openPrivacyPreferences');
    await userEvent.click(link);
    expect(spy).toHaveBeenCalled();
  });
});
