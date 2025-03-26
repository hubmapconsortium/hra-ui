import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';

import { SectionCardsComponent } from './section-cards.component';

describe('SectionCardsComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  it('should display cards', async () => {
    await render(SectionCardsComponent, {
      providers,
      inputs: {
        cardInfo: [
          {
            tagline: 'Tagline',
            description: 'Test',
            imageSrc: 'test-image-src',
            route: 'test-route',
          },
        ],
      },
    });
    expect(screen.getByText('Tagline')).toBeInTheDocument();
  });
});
