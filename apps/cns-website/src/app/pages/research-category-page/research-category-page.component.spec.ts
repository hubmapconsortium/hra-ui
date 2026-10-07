import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideMarkdown } from 'ngx-markdown';
import { ResearchTypeId } from '../../schemas/research-type.schema';
import {
  ResearchCategoryId,
  ResearchData,
  ResearchId,
  ResearchItem,
  ResearchProjectId,
} from '../../schemas/research.schema';
import { ResearchCategoryPageComponent, ResearchCategoryView } from './research-category-page.component';

const mockResearchItem = (overrides?: Partial<ResearchItem>): ResearchItem => ({
  slug: 'test-research-1' as ResearchId,
  category: 'publication' as ResearchCategoryId,
  type: 'journal-article' as ResearchTypeId,
  title: 'Test Research Item',
  description: 'A test research description',
  dateStart: new Date('2024-01-15'),
  dateEnd: new Date('2024-01-20'),
  link: 'https://example.com/research',
  organizedByCns: false,
  people: [],
  featured: false,
  projects: ['organ-brain' as ResearchProjectId],
  ...overrides,
});

const mockItems: ResearchData = [
  mockResearchItem({
    slug: 'pub-1' as ResearchId,
    title: 'Research on Network Science',
    description: 'Network science publication details.',
    dateStart: new Date('2024-01-10'),
  }),
  mockResearchItem({
    slug: 'pub-2' as ResearchId,
    title: 'Another Publication',
    description: 'Details about another publication.',
    dateStart: new Date('2023-12-15'),
    thumbnail: 'https://example.com/thumbnail.png',
  }),
];

describe('ResearchCategoryPageComponent', () => {
  const renderComponent = async (overrides?: { items?: ResearchData; title?: string; view?: ResearchCategoryView }) => {
    return render(ResearchCategoryPageComponent, {
      providers: [provideMarkdown(), provideHttpClient(), provideHttpClientTesting()],
      imports: [MatIconTestingModule],
      componentInputs: {
        items: overrides?.items ?? mockItems,
        title: overrides?.title ?? 'Publications',
        view: overrides?.view ?? 'list',
      },
    });
  };

  it('should render the page title', async () => {
    await renderComponent();
    expect(screen.getByRole('heading', { name: 'Publications' })).toBeInTheDocument();
  });

  it('should group items by year in list view', async () => {
    await renderComponent();
    expect(await screen.findByText('2024')).toBeInTheDocument();
    expect(await screen.findByText('2023')).toBeInTheDocument();
    expect(await screen.findByText('Details about another publication.')).toBeInTheDocument();
  });

  it('should render gallery cards in gallery view', async () => {
    await renderComponent({ view: 'gallery' });
    expect(await screen.findByText('2024')).toBeInTheDocument();
    expect(screen.queryByText('Details about another publication.')).not.toBeInTheDocument();
  });

  describe('events view', () => {
    const mockEvent = (overrides?: Partial<ResearchItem>): ResearchItem =>
      mockResearchItem({
        category: 'event' as ResearchCategoryId,
        type: 'presentation' as ResearchTypeId,
        title: 'Network Workshop',
        link: 'https://example.com/workshop',
        dateStart: new Date(2024, 0, 15),
        dateEnd: new Date(2024, 0, 20),
        description:
          '2024-01-15 to 2024-01-20. Presentation: “[Network Workshop](https://example.com/workshop).” Bloomington, IN. Presented by Katy Börner.',
        location: 'Bloomington, IN',
        ...overrides,
      });

    const renderEvents = (items: ResearchData) => renderComponent({ title: 'Events', view: 'events', items });

    it('should render the linked title and the date range with location', async () => {
      await renderEvents([mockEvent()]);

      expect(await screen.findByRole('link', { name: 'Network Workshop' })).toHaveAttribute(
        'href',
        'https://example.com/workshop',
      );
      expect(await screen.findByText('Jan 15, 2024 - Jan 20, 2024 | Bloomington, IN')).toBeInTheDocument();
    });

    it('should render the title and subtitle as separate paragraphs', async () => {
      await renderEvents([mockEvent()]);

      const link = await screen.findByRole('link', { name: 'Network Workshop' });
      const titleParagraph = link.closest('p');
      expect(titleParagraph).not.toBeNull();
      expect(titleParagraph).not.toHaveTextContent('Jan 15, 2024');
    });

    it('should not render the description', async () => {
      await renderEvents([mockEvent()]);

      await screen.findByRole('link', { name: 'Network Workshop' });
      expect(screen.queryByText(/Presentation:/)).not.toBeInTheDocument();
    });

    it('should show a single date for single day events', async () => {
      await renderEvents([mockEvent({ dateEnd: new Date(2024, 0, 15) })]);

      expect(await screen.findByText('Jan 15, 2024 | Bloomington, IN')).toBeInTheDocument();
    });

    it('should show only the dates when there is no location', async () => {
      await renderEvents([mockEvent({ location: undefined })]);

      expect(await screen.findByText('Jan 15, 2024 - Jan 20, 2024')).toBeInTheDocument();
    });

    it('should render a plain title when the event has no link', async () => {
      await renderEvents([mockEvent({ link: undefined })]);

      expect(await screen.findByText('Network Workshop')).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Network Workshop' })).not.toBeInTheDocument();
    });

    it.each([
      ['spaces in the link', 'Network Workshop', 'https://example.com/docs/Katy Borner Scimap.pdf'],
      ['parentheses in the link', 'Network Workshop', 'https://example.com/docs/slides (1).pdf'],
      ['brackets in the title', 'Toward a human [reference] map', 'https://example.com/workshop'],
    ])('should render a link when there are %s', async (_, title, link) => {
      await renderEvents([mockEvent({ title, link })]);

      const anchor = await screen.findByRole('link', { name: title });
      expect(anchor.getAttribute('href')).toBe(encodeURI(link));
      expect(screen.queryByText(/\]\(/)).not.toBeInTheDocument();
    });

    it('should apply the events list styling', async () => {
      const { container } = await renderEvents([mockEvent()]);
      expect(container.querySelector('hra-list-view')).toHaveClass('events-list');
    });
  });

  it('should not apply the events list styling in list view', async () => {
    const { container } = await renderComponent();
    expect(container.querySelector('hra-list-view')).not.toHaveClass('events-list');
  });

  it('should filter items by search text', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = await screen.findByRole('searchbox', { name: /search/i });
    await user.type(searchInput, 'network');

    expect(await screen.findByText('Network science publication details.')).toBeInTheDocument();
    expect(screen.queryByText('Details about another publication.')).not.toBeInTheDocument();
  });

  it('should handle empty data gracefully', async () => {
    await renderComponent({ items: [] });
    expect(screen.getByText((content) => content.includes('0') && content.includes('/'))).toBeInTheDocument();
  });
});
