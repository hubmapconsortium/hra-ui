import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';

import { SectionCardsComponent } from './section-cards.component';

describe('SectionCardsComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting()];

  it('should display cards', async () => {
    await render(SectionCardsComponent, {
      providers,
      componentInputs: {
        cardInfo: [
          {
            tagline: '',
            description: 'Test',
            imageSrc: '',
            route: '',
          },
        ],
      },
    });
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
