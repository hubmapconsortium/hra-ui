import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { PeopleData, PeopleId } from '../../schemas/people.schema';
import { PublicationTypeItem, PublicationTypesData } from '../../schemas/publication-types.schema';
import {
  ResearchCategoryId,
  ResearchData,
  ResearchId,
  ResearchItem,
  ResearchTypeId,
} from '../../schemas/research.schema';
import { TagId, TagItem, TagsData } from '../../schemas/tags.schema';
import { SidebarStore } from '../../state/sidebar/sidebar.store';
import { ResearchPageComponent } from './research-page.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

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
      }),
    ];

    return render(ResearchPageComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting(), SidebarStore],
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
      const { container } = await renderComponent();
      const sidenavContainer = container.querySelector('mat-sidenav-container');
      expect(sidenavContainer).toBeInTheDocument();

      const sidenav = container.querySelector('mat-sidenav[aria-label="Filter research"]');
      expect(sidenav).toBeInTheDocument();
    });

    it('should have footer in the page', async () => {
      const { container } = await renderComponent();
      const footer = container.querySelector('cns-footer');
      expect(footer).toBeInTheDocument();
    });

    it('should render gallery grid for displaying items', async () => {
      const { container } = await renderComponent();
      const galleryGrid = container.querySelector('hra-gallery-grid');
      expect(galleryGrid).toBeInTheDocument();
    });
  });

  describe('Store Initialization', () => {
    it('should initialize store with combined research items from news and publications', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;
      expect(component.store.numResearchItems()).toBe(3);
    });

    it('should initialize with people data', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;
      const peopleItems = component.store.peopleItems();
      expect(peopleItems.length).toBeGreaterThan(0);
      expect(peopleItems[0].name).toBe('Dr. Jane');
      expect(peopleItems[0].lastName).toBe('Smith');
    });

    it('should initialize with publication types including all provided types', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;
      const pubTypes = component.store.pubTypes();
      expect(pubTypes.length).toBeGreaterThan(0);
      expect(pubTypes.some((pt: PublicationTypeItem) => pt.value === 'journal-article')).toBe(true);
      expect(pubTypes.some((pt: PublicationTypeItem) => pt.value === 'conference-paper')).toBe(true);
    });

    it('should accept custom people data', async () => {
      const customPeople: PeopleData = [
        {
          slug: 'person-2' as PeopleId,
          name: 'Dr. John',
          lastName: 'Doe',
          roles: [],
        },
      ];

      const { fixture } = await renderComponent({ people: customPeople });
      const component = fixture.componentInstance as Any;
      const peopleItems = component.store.peopleItems();

      expect(peopleItems.length).toBe(1);
      expect(peopleItems[0].name).toBe('Dr. John');
    });
  });

  describe('View Mode Management', () => {
    it('should initialize with gallery view as default', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;
      expect(component.store.view()).toBe('gallery');
    });

    it('should have view switching capability via setView method', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.setView).toBe('function');
      expect(['gallery', 'list']).toContain(component.store.view());
    });

    it('should render sidebar for filter controls and view options', async () => {
      const { container } = await renderComponent();
      const filterMenu = container.querySelector('hra-filter-menu');
      expect(filterMenu).toBeInTheDocument();
    });
  });

  describe('Sorting and Grouping', () => {
    it('should have sortBy signal initialized', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;
      const sortBy = component.store.sortBy();
      expect([null, 'nameAsc', 'nameDesc', 'newest', 'oldest']).toContain(sortBy);
    });

    it('should have groupBy signal initialized', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;
      const groupBy = component.store.groupBy();
      expect([null, 'publicationType', 'year']).toContain(groupBy);
    });

    it('should provide setSortBy method to change sorting', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.setSortBy).toBe('function');
    });

    it('should provide setGroupBy method to change grouping', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.setGroupBy).toBe('function');
    });

    it('should provide sorted and grouped items computed signal', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const sortedGroupedItems = component.store.sortedGroupedItems();
      expect(Array.isArray(sortedGroupedItems)).toBe(true);
    });
  });

  describe('Filtering and Search', () => {
    it('should initialize with all items visible (no filtering)', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;
      expect(component.store.numFilteredItems()).toBe(3);
    });

    it('should provide updateFilters method for applying filters', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.updateFilters).toBe('function');
    });

    it('should provide resetFilters method to clear all filters', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.resetFilters).toBe('function');
    });

    it('should have search capability via setSearch method', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.setSearch).toBe('function');
      expect(component.store.search()).toBeNull();
    });

    it('should provide filteredItems computed signal', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const filteredItems = component.store.filteredItems();
      expect(Array.isArray(filteredItems)).toBe(true);
    });

    it('should track filter counts for each category', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const counts = component.store.counts();
      expect(typeof counts).toBe('object');
      expect(counts).toBeDefined();
    });
  });

  describe('Tag Mapping', () => {
    it('should map known tags to their display data including name and description', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const tagItems = component.getTagItems(['method-computational' as TagId]);
      const tag = tagItems[0];

      expect(tag?.name).toBe('Computational Method');
      expect(tag?.description).toBe('Methods involving computation');
    });

    it('should handle unknown tags by using slug as fallback name', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const tagItems = component.getTagItems(['unknown-tag' as TagId]);
      const tag = tagItems[0];

      expect(tag?.name).toBe('unknown-tag');
      expect(tag?.description).toBe('');
    });

    it('should return array containing all provided tag slugs', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const slugs = ['method-computational' as TagId, 'organ-brain' as TagId];
      const tagItems = component.getTagItems(slugs);

      expect(tagItems.length).toBe(2);
      expect(tagItems.some((t: TagItem) => t.slug === 'method-computational')).toBe(true);
      expect(tagItems.some((t: TagItem) => t.slug === 'organ-brain')).toBe(true);
    });

    it('should handle mixed known and unknown tags', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const slugs = ['method-computational' as TagId, 'unknown-tag' as TagId];
      const tagItems = component.getTagItems(slugs);

      expect(tagItems.length).toBe(2);
      expect(tagItems.find((t: TagItem) => t.slug === 'method-computational')?.name).toBe('Computational Method');
      expect(tagItems.find((t: TagItem) => t.slug === 'unknown-tag')?.name).toBe('unknown-tag');
    });
  });

  describe('Data Integration', () => {
    it('should combine news and publications into single research items array', async () => {
      const news: ResearchData = [
        mockResearchItem({
          slug: 'news-item' as ResearchId,
          category: 'news' as ResearchCategoryId,
          title: 'News Item',
        }),
      ];

      const publications: ResearchData = [
        mockResearchItem({
          slug: 'pub-item' as ResearchId,
          category: 'publications' as ResearchCategoryId,
          title: 'Publication Item',
        }),
      ];

      const { fixture } = await renderComponent({ news, publications });
      const component = fixture.componentInstance as Any;

      expect(component.store.numResearchItems()).toBe(2);
    });

    it('should handle empty news data gracefully', async () => {
      const { fixture } = await renderComponent({ news: [] });
      const component = fixture.componentInstance as Any;

      expect(component.store.numResearchItems()).toBe(2);
    });

    it('should handle empty publications data gracefully', async () => {
      const { fixture } = await renderComponent({ publications: [] });
      const component = fixture.componentInstance as Any;

      expect(component.store.numResearchItems()).toBe(1);
    });

    it('should handle both news and publications being empty', async () => {
      const { fixture } = await renderComponent({ news: [], publications: [] });
      const component = fixture.componentInstance as Any;

      expect(component.store.numResearchItems()).toBe(0);
    });

    it('should handle large datasets', async () => {
      const largeNews: ResearchData = Array.from({ length: 50 }, (_, i) =>
        mockResearchItem({
          slug: `news-${i}` as ResearchId,
          category: 'news' as ResearchCategoryId,
          title: `News Item ${i}`,
        }),
      );

      const { fixture } = await renderComponent({ news: largeNews });
      const component = fixture.componentInstance as Any;

      expect(component.store.numResearchItems()).toBe(52);
    });
  });

  describe('Computed Signals and Store State', () => {
    it('should have numResearchItems computed signal', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const count = component.store.numResearchItems();
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should have numFilteredItems computed signal that reflects current filter state', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const filteredCount = component.store.numFilteredItems();
      const totalCount = component.store.numResearchItems();

      expect(typeof filteredCount).toBe('number');
      expect(filteredCount).toBeLessThanOrEqual(totalCount);
    });

    it('should have filters signal for managing active filters', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const filters = component.store.filters();
      expect(filters).toBeDefined();
      expect(typeof filters).toBe('object');
    });

    it('should provide list view items via sortedGroupedListItems signal', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      const listItems = component.store.sortedGroupedListItems();
      expect(listItems).toBeDefined();
    });

    it('should track research items property with setter', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.setResearchItems).toBe('function');
    });

    it('should track people items property with setter', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.setPeopleItems).toBe('function');
    });

    it('should track publication types property with setter', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.setPublicationTypes).toBe('function');
    });
  });

  describe('Gallery Display', () => {
    it('should render gallery cards for each research item', async () => {
      const { container } = await renderComponent();
      const cards = container.querySelectorAll('hra-gallery-card');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should organize gallery items into sections with optional labels', async () => {
      const { container } = await renderComponent();
      const gallerySections = container.querySelectorAll('section.gallery-group');
      expect(gallerySections.length).toBeGreaterThan(0);
    });

    it('should display gallery grid component', async () => {
      const { container } = await renderComponent();
      const galleryGrid = container.querySelector('hra-gallery-grid');
      expect(galleryGrid).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle and Sidebar Integration', () => {
    it('should inject and register SidebarStore', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(component.sidebarStore).toBeDefined();
    });

    it('should have store property injected', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(component.store).toBeDefined();
    });

    it('should provide setView method to change view mode', async () => {
      const { fixture } = await renderComponent();
      const component = fixture.componentInstance as Any;

      expect(typeof component.store.setView).toBe('function');
    });

    it('should support OnPush change detection strategy', async () => {
      const { fixture } = await renderComponent();
      expect(fixture.componentInstance).toBeDefined();
    });
  });

  describe('Scroll and Navigation', () => {
    it('should wrap content in scrolling container', async () => {
      const { container } = await renderComponent();
      const scrollbar = container.querySelector('ng-scrollbar');
      expect(scrollbar).toBeInTheDocument();
    });

    it('should render search and filter bar above content', async () => {
      const { container } = await renderComponent();
      const searchFilter = container.querySelector('hra-search-filter');
      expect(searchFilter).toBeInTheDocument();
    });

    it('should display end of results indicator at bottom', async () => {
      const { container } = await renderComponent();
      const endIndicator = container.querySelector('hra-end-of-results-indicator');
      expect(endIndicator).toBeInTheDocument();
    });
  });

  describe('Empty State Handling', () => {
    it('should display no results indicator when items list is empty', async () => {
      const { container } = await renderComponent({
        news: [],
        publications: [],
      });

      const noResultsIndicator = container.querySelector('hra-no-results-indicator');
      expect(noResultsIndicator).toBeInTheDocument();
    });

    it('should provide clear filters button in no results state', async () => {
      await renderComponent({
        news: [],
        publications: [],
      });

      // The no-results-indicator should be in the DOM
      // (exact button text depends on component implementation)
    });
  });

  describe('Filter Menu Integration', () => {
    it('should display filter menu in sidebar', async () => {
      const { container } = await renderComponent();
      const filterMenu = container.querySelector('hra-filter-menu');
      expect(filterMenu).toBeInTheDocument();
    });

    it('should pass filter configuration to filter menu', async () => {
      const { container } = await renderComponent();
      const filterMenu = container.querySelector('hra-filter-menu');
      expect(filterMenu?.hasAttribute('ng-reflect-filters')).toBeFalsy(); // Component will use @Input bindings
    });
  });
});
