import { render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import '@testing-library/jest-dom';

describe('HeaderComponent', () => {
  it('should render the logo', async () => {
    await render(HeaderComponent);

    const logo = screen.getByAltText('Human Reference Atlas Home');
    expect(logo).toBeInTheDocument();
  });

  it('should have navigable links', async () => {
    await render(HeaderComponent, {
      imports: [RouterModule.forRoot([])],
    });

    const homeLink = screen.getByAltText('Cell Distance Explorer Home');
    expect(homeLink).toBeInTheDocument();
  });
});
