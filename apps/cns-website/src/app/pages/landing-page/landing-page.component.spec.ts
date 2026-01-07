import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  it('should render the landing page', async () => {
    await render(LandingPageComponent, {
      providers: [provideHttpClient()],
    });

    expect(screen.getByText('Science you can see')).toBeInTheDocument();
  });
});
