import { render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  it('should render the logo', async () => {
    await render(HeaderComponent);

    const logo = screen.getAllByAltText('Human Reference Atlas home')[0];
    expect(logo).toBeInTheDocument();
  });

  it('should have navigable links', async () => {
    await render(HeaderComponent, {
      imports: [RouterModule.forRoot([])],
    });

    const homeLink = screen.getByAltText('Cell Distance Explorer home');
    expect(homeLink).toBeInTheDocument();
  });
});
