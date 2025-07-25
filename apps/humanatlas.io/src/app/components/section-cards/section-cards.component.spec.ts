import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { provideDesignSystem } from '@hra-ui/design-system';

import { SectionCardsComponent } from './section-cards.component';

describe('SectionCardsComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideDesignSystem()];

  it('should display cards', async () => {
    await render(SectionCardsComponent, {
      providers,
      inputs: {
        cardInfo: [
          {
            tagline: 'Tagline',
            icon: 'test-image-src',
            route: 'test-route',
            action: 'Test',
          },
        ],
      },
    });
    expect(screen.getByText('Tagline')).toBeInTheDocument();
  });
});
