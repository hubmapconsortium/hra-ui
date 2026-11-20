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

  it('should render the section title as a level 2 heading', async () => {
    await render(SectionCardsComponent, { providers, inputs: { cardInfo: [] } });
    expect(screen.getByRole('heading', { level: 2, name: 'Explore the Human Reference Atlas' })).toBeInTheDocument();
  });

  it('should name each link with its card tagline', async () => {
    await render(SectionCardsComponent, {
      providers,
      inputs: {
        cardInfo: [
          { tagline: 'Route card', icon: '', route: '/test-route', action: 'Learn more' },
          { tagline: 'Url card', icon: '', url: 'https://example.com/', action: 'Register' },
        ],
      },
    });

    const routeLink = screen.getByRole('link', { name: 'Learn more (Route card)' });
    expect(routeLink).toHaveAttribute('href', '/test-route');
    expect(routeLink).not.toHaveAttribute('target');

    const urlLink = screen.getByRole('link', { name: 'Register (Url card, opens in a new tab)' });
    expect(urlLink).toHaveAttribute('href', 'https://example.com/');
    expect(urlLink).toHaveAttribute('target', '_blank');
  });
});
