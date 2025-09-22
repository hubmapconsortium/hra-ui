import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';

import { SectionCardsComponent } from './section-cards.component';

describe('SectionCardsComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideRouter([])];

  it('should display cards', async () => {
    await render(SectionCardsComponent, {
      providers,
      inputs: {
        cardInfo: [
          {
            tagline: 'Tagline',
            icon: '',
            route: 'test-route',
            action: 'Test',
          },
        ],
      },
    });
    expect(screen.getByText('Tagline')).toBeInTheDocument();
  });
});
