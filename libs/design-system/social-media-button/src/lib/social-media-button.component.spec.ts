import { render, screen } from '@testing-library/angular';
import { provideIcons } from '@hra-ui/cdk/icons';
import { provideHttpClient } from '@angular/common/http';
import { SocialMediaButtonComponent } from './social-media-button.component';

describe('SocialMediaButtonComponent', () => {
  it('it should render the small logo', async () => {
    await render(SocialMediaButtonComponent, {
      inputs: {
        name: 'facebook',
        size: 'small',
      },
      providers: [provideIcons(), provideHttpClient()],
    });
    const link = screen.getByRole('link');
    const icon = link.querySelector('a');
    if (icon) {
      expect(icon.clientHeight).toBe(24);
    }
  });

  it('it should render the large logo', async () => {
    await render(SocialMediaButtonComponent, {
      inputs: {
        name: 'facebook',
        size: 'large',
      },
      providers: [provideIcons(), provideHttpClient()],
    });
    const link = screen.getByRole('link');
    const icon = link.querySelector('a');
    if (icon) {
      expect(icon.clientHeight).toBe(40);
    }
  });
});
