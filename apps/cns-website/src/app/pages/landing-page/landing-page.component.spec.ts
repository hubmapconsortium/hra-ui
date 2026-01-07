import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { LandingPageComponent } from './landing-page.component';

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
      providers: [
        provideHttpClient(),
        provideIcons(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              featuredContent: mockFeaturedContent,
              tags: mockTags,
            }),
          },
        },
      ],
    });

    expect(screen.getByText('Science you can see')).toBeInTheDocument();
  });

  it('should handle undefined data', async () => {
    await render(LandingPageComponent, {
      providers: [
        provideHttpClient(),
        provideIcons(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({}),
          },
        },
      ],
    });

    expect(screen.getByText('Science you can see')).toBeInTheDocument();
  });

  it('should display publications when Publications is selected', async () => {
    const { fixture } = await render(LandingPageComponent, {
      providers: [
        provideHttpClient(),
        provideIcons(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              featuredContent: mockFeaturedContent,
              tags: mockTags,
            }),
          },
        },
      ],
    });

    const component = fixture.componentInstance;
    component['selectedContentType'].set('Publications');
    fixture.detectChanges();

    expect(component['contentCards'].length).toBe(1);
    expect(component['contentCards'][0].tagline).toBe('Publication Item');
  });
});
