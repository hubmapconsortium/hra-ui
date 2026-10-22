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
      title: 'Cell distances to blood vessels in the large intestine',
      image: '',
      action: { label: 'Open example', url: '/example/0' },
    },
    {
      title: 'Cell distances to blood vessels in 3D skin',
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

  it('should render the hero heading and calls to action', async () => {
    await setup();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Visualize and quantify cell distances' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Create a visualization/ })).toHaveAttribute('href', '/create');
    expect(screen.getByRole('link', { name: /Browse the gallery/ })).toHaveAttribute('href', '/gallery');
  });

  it('should render the example cards and a link to the gallery', async () => {
    await setup();

    const section = screen.getByRole('region', { name: 'Example visualizations' });
    expect(within(section).getAllByRole('listitem')).toHaveLength(2);
    expect(
      within(section).getByRole('link', { name: 'Cell distances to blood vessels in the large intestine' }),
    ).toHaveAttribute('href', '/example/0');
    expect(within(section).getByRole('link', { name: 'Cell distances to blood vessels in 3D skin' })).toHaveAttribute(
      'href',
      '/example/1',
    );
    expect(within(section).getByRole('link', { name: /Browse all 399 datasets/ })).toHaveAttribute('href', '/gallery');
  });

  it('should render the developer tools cards as external links', async () => {
    await setup();

    const section = screen.getByRole('region', { name: 'Developer tools' });
    expect(within(section).getAllByRole('listitem')).toHaveLength(3);
    for (const link of within(section).getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
    }
  });
});
