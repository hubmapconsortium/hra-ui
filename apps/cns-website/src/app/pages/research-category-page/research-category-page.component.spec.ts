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
