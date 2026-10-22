import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen, within } from '@testing-library/angular';
import { LandingCard } from '../../components/landing-card/landing-card.component';
import { LandingPageComponent } from './landing-page.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));

describe('LandingPageComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons(), provideRouter([])];

  const MOCK_EXAMPLES: LandingCard[] = [
    {
      title: 'Example A',
      image: '',
      action: { label: 'Open example', url: '/example/0' },
    },
    {
      title: 'Example B',
      image: '',
      action: { label: 'Open example', url: '/example/1' },
    },
  ];

  const MOCK_DEVELOPER_TOOLS: LandingCard[] = [
    {
      title: 'Embed the web component',
      icon: { fontIcon: 'code' },
      action: { label: 'Read the embedding guide', url: 'https://example.com/embedding', external: true },
    },
    {
      title: 'Use Jupyter notebooks',
      icon: { fontIcon: 'menu_book' },
      action: { label: 'Open example notebook', url: 'https://example.com/notebook', external: true },
    },
    {
      title: 'View the source code',
      icon: { fontIcon: 'code' },
      action: { label: 'Go to GitHub', url: 'https://example.com/repo', external: true },
    },
  ];

  async function setup() {
    return render(LandingPageComponent, {
      providers,
      inputs: { examples: MOCK_EXAMPLES, developerTools: MOCK_DEVELOPER_TOOLS },
    });
  }

  // Assert structure and destinations rather than marketing copy, so copy edits don't break tests

  it('should render the hero heading and calls to action', async () => {
    await setup();

    const hero = screen.getByRole('heading', { level: 1 }).closest('section') as HTMLElement;
    const hrefs = within(hero)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/create', '/gallery']);
  });

  it('should render the example cards and a link to the gallery', async () => {
    await setup();

    const section = screen.getByRole('region', { name: /example/i });
    expect(within(section).getAllByRole('listitem')).toHaveLength(2);
    expect(within(section).getByRole('link', { name: 'Example A' })).toHaveAttribute('href', '/example/0');
    expect(within(section).getByRole('link', { name: 'Example B' })).toHaveAttribute('href', '/example/1');
    expect(within(section).getByRole('link', { name: /gallery/i })).toHaveAttribute('href', '/gallery');
  });

  it('should render the developer tools cards as external links', async () => {
    await setup();

    const section = screen.getByRole('region', { name: /developer/i });
    expect(within(section).getAllByRole('listitem')).toHaveLength(3);
    for (const link of within(section).getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
    }
  });
});
