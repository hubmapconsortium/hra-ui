import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import { SocialMediaButtonComponent } from './social-media-button.component';
import { SOCIAL_IDS } from './static-data/parsed';

describe('SocialMediaButtonComponent', () => {
  it('it should render the small logo', async () => {
    await render(SocialMediaButtonComponent, {
      inputs: {
        id: SOCIAL_IDS[0],
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
        id: SOCIAL_IDS[0],
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
