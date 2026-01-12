import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { LandingPageComponent } from './landing-page.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonToggleGroupHarness } from '@angular/material/button-toggle/testing';

describe('LandingPageComponent', () => {
  const mockFeaturedContent = {
    featured: [
      {
        title: 'Featured Item',
        dateStart: '2024-01-01',
        link: '/featured',
        tags: ['tag1'],
        type: 'research',
      },
    ],
    publications: [
      {
        title: 'Publication Item',
        dateStart: '2024-01-02',
        link: 'https://external.com',
        tags: ['tag2'],
      },
    ],
    news: [
      {
        title: 'News Item',
        dateStart: '2024-01-03',
        link: 'http://news.com',
        tags: ['tag3'],
      },
    ],
  };

  const mockTags = [
    { slug: 'tag1', name: 'Tag One' },
    { slug: 'tag2', name: 'Tag Two' },
    { slug: 'tag3', name: 'Tag Three' },
  ];

  it('should render the landing page', async () => {
    await render(LandingPageComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting(), provideIcons()],
      componentInputs: {
        featuredContent: mockFeaturedContent,
        tags: mockTags,
      },
    });

    expect(screen.getByText('Science you can see')).toBeInTheDocument();
  });

  it('should display publications when Publications is selected', async () => {
    const { fixture } = await render(LandingPageComponent, {
      providers: [provideHttpClient(), provideIcons(), provideHttpClientTesting()],
      componentInputs: {
        featuredContent: mockFeaturedContent,
        tags: mockTags,
      },
    });

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const buttonToggleGroup = await loader.getHarness(MatButtonToggleGroupHarness);
    const toggles = await buttonToggleGroup.getToggles();

    await toggles[1].toggle();

    const component = fixture.componentInstance;
    expect(component['contentCards']().length).toBe(1);
    expect(component['contentCards']()[0].tagline).toBe('Publication Item');
  });
});
