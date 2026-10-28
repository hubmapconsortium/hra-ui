import { provideHttpClient } from '@angular/common/http';
import { Provider, signal } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import { ExampleItem } from '../../components/example-list/example-list.component';
import { LandingCard } from '../../components/landing-card/landing-card.component';
import { Theme, ThemeService } from '../../services/theme-service/theme.service';
import { LandingPageComponent } from './landing-page.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));

describe('LandingPageComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons(), provideRouter([])];

  const MOCK_EXAMPLES: ExampleItem[] = [
    { title: 'Example A', description: '', image: '', url: '/example/0' },
    { title: 'Example B', description: '', image: '', url: '/example/1' },
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

  async function setup(extraProviders: Provider[] = []) {
    return render(LandingPageComponent, {
      providers: [...providers, ...extraProviders],
      inputs: { examples: MOCK_EXAMPLES, developerTools: MOCK_DEVELOPER_TOOLS },
    });
  }

  // Assert structure and destinations rather than marketing copy, so copy edits don't break tests

  it('should render the hero heading, calls to action and app preview', async () => {
    await setup();

    const hero = screen.getByRole('heading', { level: 1 }).closest('section') as HTMLElement;
    const hrefs = within(hero)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/create', '/gallery']);
    expect(within(hero).getByRole('img', { name: /Cell Distance Explorer/ })).toBeInTheDocument();
  });

  it('should start the hero screenshot entrance once the image has loaded', async () => {
    await setup();

    const image = screen.getByRole('img', { name: /Cell Distance Explorer/ });
    expect(image).not.toHaveClass('loaded');

    fireEvent.load(image);
    expect(image).toHaveClass('loaded');
  });

  it('should offer every hero screenshot size in the srcset', async () => {
    await setup();

    const image = screen.getByRole('img', { name: /Cell Distance Explorer/ });
    expect(image.getAttribute('srcset')?.split(', ')).toEqual([
      expect.stringMatching(/-540x316\.webp 540w$/),
      expect.stringMatching(/-720x422\.webp 720w$/),
      expect.stringMatching(/-1080x633\.webp 1080w$/),
      expect.stringMatching(/-1440x844\.webp 1440w$/),
    ]);
  });

  it('should collapse and trim whitespace in the copied citation', async () => {
    const { fixture } = await setup();

    expect(fixture.componentInstance.collapseSpaces('\n  Jain, Y.,\n    Jepson, J.  \n')).toBe('Jain, Y., Jepson, J.');
  });

  it('should keep a space between the citation link and its source', async () => {
    await setup();

    const citation = screen.getByRole('region', { name: /cite/i }).querySelector('.description');
    expect(citation?.textContent?.replace(/\s+/g, ' ')).toContain('omics data. bioRxiv.');
  });

  it('should render the examples section', async () => {
    await setup();

    const section = screen.getByRole('region', { name: /example/i });
    const hrefs = within(section)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/example/0', '/example/1']);
  });

  it('should render the developer tools cards as external links', async () => {
    await setup();

    const section = screen.getByRole('region', { name: /developer/i });
    expect(within(section).getAllByRole('listitem')).toHaveLength(3);
    for (const link of within(section).getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
    }
  });

  describe('hero background', () => {
    function getHeroBackgroundUrls(container: Element): string[] {
      const picture = container.querySelector('.hero-background') as HTMLElement;
      const sources = [...picture.querySelectorAll('source')].map((source) => source.getAttribute('srcset') ?? '');
      return [...sources, picture.querySelector('img')?.getAttribute('src') ?? ''];
    }

    it('uses the light images in the light theme', async () => {
      const { container } = await setup([{ provide: ThemeService, useValue: { theme: signal<Theme>('light') } }]);
      const urls = getHeroBackgroundUrls(container);

      expect(urls).toHaveLength(5);
      for (const url of urls) {
        expect(url).toContain('hero-bg-light-');
      }
    });

    it('uses the dark images in the dark theme', async () => {
      const { container } = await setup([{ provide: ThemeService, useValue: { theme: signal<Theme>('dark') } }]);
      const urls = getHeroBackgroundUrls(container);

      expect(urls).toHaveLength(5);
      for (const url of urls) {
        expect(url).toContain('hero-bg-dark-');
      }
    });
  });

  describe('citation background', () => {
    function getCiteBackground(): string {
      const section = screen.getByRole('region', { name: /cite/i });
      return section.style.backgroundImage;
    }

    it('uses the light image in the light theme', async () => {
      await setup([{ provide: ThemeService, useValue: { theme: signal<Theme>('light') } }]);

      expect(getCiteBackground()).toContain('create-visualization-page-background.png');
    });

    it('uses the dark image in the dark theme', async () => {
      await setup([{ provide: ThemeService, useValue: { theme: signal<Theme>('dark') } }]);

      expect(getCiteBackground()).toContain('create-visualization-page-background-dark.png');
    });
  });
});
