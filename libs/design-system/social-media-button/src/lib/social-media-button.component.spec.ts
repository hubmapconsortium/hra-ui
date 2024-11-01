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
    const icon = link.querySelector('mat-icon');
    if (icon) {
      expect(icon.classList.contains('small')).toBeTruthy();
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
    const icon = link.querySelector('mat-icon');
    if (icon) {
      expect(icon.classList.contains('small')).not.toBeTruthy();
    }
  });
});
