import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import { SocialMediaButtonComponent } from './social-media-button.component';
import { SOCIAL_IDS } from './static-data/parsed';
import { SocialMediaId } from './types/social-media.schema';

describe('SocialMediaButtonComponent', () => {
  const providers = [provideIcons(), provideHttpClient()];

  it('it should render the small logo', async () => {
    await render(SocialMediaButtonComponent, {
      providers,
      inputs: {
        id: SOCIAL_IDS[0],
        size: 'small',
      },
    });
    const link = screen.getByRole('link');
    const icon = link.querySelector('a');
    if (icon) {
      expect(icon.clientHeight).toBe(24);
    }
  });

  it('it should render the large logo', async () => {
    await render(SocialMediaButtonComponent, {
      providers,
      inputs: {
        id: SOCIAL_IDS[0],
        size: 'large',
      },
    });
    const link = screen.getByRole('link');
    const icon = link.querySelector('a');
    if (icon) {
      expect(icon.clientHeight).toBe(40);
    }
  });

  it('should error when passed an invalid id', async () => {
    const result = render(SocialMediaButtonComponent, {
      providers,
      inputs: {
        id: 'invalid' as SocialMediaId,
      },
    });

    await expect(result).rejects.toThrow();
  });
});
