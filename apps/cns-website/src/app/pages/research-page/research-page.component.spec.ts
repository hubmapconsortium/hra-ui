import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { PeopleData, PeopleId } from '../../schemas/people.schema';
import { PublicationTypesData } from '../../schemas/publication-types.schema';
import {
  ResearchCategoryId,
  ResearchData,
  ResearchId,
  ResearchItem,
  ResearchTypeId,
} from '../../schemas/research.schema';
import { TagId, TagsData } from '../../schemas/tags.schema';
import { SidebarStore } from '../../state/sidebar/sidebar.store';
import { ResearchPageComponent } from './research-page.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideMarkdown } from 'ngx-markdown';

const mockResearchItem = (overrides?: Partial<ResearchItem>): ResearchItem => ({
  slug: 'test-research-1' as ResearchId,
  category: 'publications' as ResearchCategoryId,
  type: 'journal-article' as ResearchTypeId,
  title: 'Test Research Item',
  description: 'A test research description',
  dateStart: new Date('2024-01-15'),
  dateEnd: new Date('2024-01-20'),
  link: 'https://example.com/research',
  people: ['person-1' as PeopleId],
  tags: ['method-computational' as TagId, 'organ-brain' as TagId],
  ...overrides,
});

const mockPeople: PeopleData = [
  {
    slug: 'person-1' as PeopleId,
    name: 'Dr. Jane',
    lastName: 'Smith',
    roles: [],
    image: 'https://example.com/jane.jpg',
  },
];

const mockPublicationTypes: PublicationTypesData = [
  { label: 'Journal Article', value: 'journal-article' as ResearchTypeId },
  { label: 'Conference Paper', value: 'conference-paper' as ResearchTypeId },
];

const mockTags: TagsData = [
  { slug: 'method-computational' as TagId, name: 'Computational Method', description: 'Methods involving computation' },
  { slug: 'organ-brain' as TagId, name: 'Brain', description: 'Research related to the brain' },
];

describe('ResearchPageComponent', () => {
  const renderComponent = async (overrides?: {
    news?: ResearchData;
    publications?: ResearchData;
    people?: PeopleData;
    publicationTypes?: PublicationTypesData;
    tags?: TagsData;
  }) => {
    const news = overrides?.news ?? [
      mockResearchItem({
        slug: 'news-1' as ResearchId,
        category: 'news' as ResearchCategoryId,
        dateStart: new Date('2024-02-01'),
        dateEnd: new Date('2024-02-05'),
        title: 'Breaking News Update',
      }),
    ];

    const publications = overrides?.publications ?? [
      mockResearchItem({
        slug: 'pub-1' as ResearchId,
        title: 'Research on Network Science',
        dateStart: new Date('2024-01-10'),
      }),
      mockResearchItem({
        slug: 'pub-2' as ResearchId,
        category: 'publications' as ResearchCategoryId,
        type: 'conference-paper' as ResearchTypeId,
        title: 'Another Publication',
        dateStart: new Date('2023-12-15'),
        description: 'Details about the publication.',
      }),
    ];

    return render(ResearchPageComponent, {
      providers: [provideMarkdown(), provideHttpClient(), provideHttpClientTesting(), SidebarStore],
      imports: [MatIconTestingModule],
      componentInputs: {
        news,
        publications,
        people: overrides?.people ?? mockPeople,
        publicationTypes: overrides?.publicationTypes ?? mockPublicationTypes,
        tags: overrides?.tags ?? mockTags,
      },
    });
  };

  describe('Component Rendering', () => {
    it('should render the component with main content area', async () => {
      await renderComponent();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('should render sidenav container with filter sidebar', async () => {
      await renderComponent();
      expect(await screen.findByText('Filters')).toBeInTheDocument();
    });
  });

  describe('View Mode Management', () => {
    it('should set view as list', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const viewAsSelect = await screen.findByText('View as');
      await user.click(viewAsSelect);

      const listOption = await screen.findByRole('option', { name: 'List' });
      await user.click(listOption);

      expect(await screen.findByText('Details about the publication.')).toBeInTheDocument();
    });

    it('should set view as gallery', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const viewAsSelect = await screen.findByText('View as');
      await user.click(viewAsSelect);

      const galleryOption = await screen.findByRole('option', { name: 'Gallery' });
      await user.click(galleryOption);

      expect(screen.queryByText('Details about the publication.')).not.toBeInTheDocument();
    });
  });

  describe('Sorting and Grouping', () => {
    it('should group by publication type', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const groupBySelect = await screen.findByText('Group by');
      await user.click(groupBySelect);

      const typeOption = await screen.findByRole('option', { name: /^publication type$/i });
      await user.click(typeOption);

      expect(await screen.findByText('Conference Paper')).toBeInTheDocument();
    });

    it('should group by year', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const groupBySelect = await screen.findByText('Group by');
      await user.click(groupBySelect);

      const yearOption = await screen.findByRole('option', { name: /year/i });
      await user.click(yearOption);

      expect(await screen.findByText('2024')).toBeInTheDocument();
    });
  });

  describe('Filtering and Search', () => {
    it('should search for an item', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const searchInput = await screen.findByRole('textbox', { name: /search/i });
      await user.type(searchInput, 'Network Science');

      const results = await screen.findAllByText(/Research on Network Science/i);
      expect(results.length).toBeGreaterThan(0);
    });
  });

  it('should handle empty data gracefully', async () => {
    await renderComponent({ news: [], publications: [] });
    expect(screen.getByText((content) => content.includes('0') && content.includes('/'))).toBeInTheDocument();
  });
});
