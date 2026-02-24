import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture } from '@angular/core/testing';
import { MatButtonToggleGroupHarness } from '@angular/material/button-toggle/testing';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FeaturedData } from '../../schemas/featured.schema';
import { ResearchTypeId, ResearchTypesData } from '../../schemas/research-type.schema';
import { ResearchCategoryId, ResearchId } from '../../schemas/research.schema';
import { TagId, TagsData } from '../../schemas/tags.schema';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  const mockResearchItem = {
    slug: 'item-1' as ResearchId,
    category: 'category-1' as ResearchCategoryId,
    type: 'event' as ResearchTypeId,
    title: 'Featured Item Title',
    description: 'Featured item description',
    dateStart: new Date(2024, 0, 1),
    dateEnd: new Date(2024, 0, 15),
    link: '/featured',
    people: [],
    tags: ['tag1'] as TagId[],
    image: 'featured-image.jpg',
  };

  const mockPublicationItem = {
    slug: 'pub-1' as ResearchId,
    category: 'category-2' as ResearchCategoryId,
    type: 'publication' as ResearchTypeId,
    title: 'Publication Title',
    description: 'Publication description',
    dateStart: new Date(2024, 0, 2),
    dateEnd: new Date(2024, 0, 2),
    link: 'https://external-domain.com/publication',
    people: [],
    tags: ['tag2'] as TagId[],
  };

  const mockNewsItem = {
    slug: 'news-1' as ResearchId,
    category: 'category-3' as ResearchCategoryId,
    type: 'news' as ResearchTypeId,
    title: 'News Title',
    description: 'News description',
    dateStart: new Date(2024, 0, 3),
    dateEnd: new Date(2024, 0, 3),
    link: 'http://news.example.com/story',
    people: [],
    tags: ['tag3'] as TagId[],
  };

  const mockFeaturedContent: FeaturedData = {
    featured: [mockResearchItem],
    publications: [mockPublicationItem],
    news: [mockNewsItem],
  };

  const mockEventTypes: ResearchTypesData = [
    { value: 'event' as ResearchTypeId, label: 'Event' },
    { value: 'conference' as ResearchTypeId, label: 'Conference' },
  ];

  const mockPublicationTypes: ResearchTypesData = [
    { value: 'publication' as ResearchTypeId, label: 'Publication' },
    { value: 'journal' as ResearchTypeId, label: 'Journal Article' },
  ];

  const mockFundingTypes: ResearchTypesData = [{ value: 'grant' as ResearchTypeId, label: 'Grant' }];

  const mockTags: TagsData = [
    { slug: 'tag1' as TagId, name: 'Research', description: 'Research related items' },
    { slug: 'tag2' as TagId, name: 'Publications', description: 'Publication items' },
    { slug: 'tag3' as TagId, name: 'Other', description: 'Other items' },
  ];

  // Helper function to set up component with common providers and inputs
  async function setupComponent(
    featuredContent = mockFeaturedContent,
    eventTypes = mockEventTypes,
    publicationTypes = mockPublicationTypes,
    fundingTypes = mockFundingTypes,
    tags = mockTags,
  ) {
    const renderResult = await render(LandingPageComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting(), provideIcons()],
      inputs: {
        featuredContent,
        eventTypes,
        publicationTypes,
        fundingTypes,
        tags,
      },
    });

    return {
      ...renderResult,
      user: userEvent.setup(),
    };
  }

  describe('Title', () => {
    it('should render the landing page with title', async () => {
      await setupComponent();
      expect(screen.getByText('Science you can see')).toBeInTheDocument();
    });

    it('should render the tagline', async () => {
      await setupComponent();
      expect(
        screen.getByText(
          "Celebrating 20+ years of research at Indiana University's Cyberinfrastructure for Network Science Center.",
        ),
      ).toBeInTheDocument();
    });
  });

  describe('Content Type Toggles', () => {
    async function getToggles(fixture: ComponentFixture<LandingPageComponent>) {
      const loader = TestbedHarnessEnvironment.loader(fixture);
      const buttonToggleGroup = await loader.getHarness(MatButtonToggleGroupHarness);
      return await buttonToggleGroup.getToggles();
    }

    it('should render all content type toggle buttons', async () => {
      await setupComponent();
      expect(screen.getByRole('radio', { name: 'Featured' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Publications' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'News' })).toBeInTheDocument();
    });

    it('should have Featured selected by default', async () => {
      const { fixture } = await setupComponent();
      const toggles = await getToggles(fixture);

      expect(await toggles[0].isChecked()).toBe(true);
      expect(await toggles[1].isChecked()).toBe(false);
      expect(await toggles[2].isChecked()).toBe(false);
    });

    it('should switch to Publications when Publications button is clicked', async () => {
      const { fixture, user } = await setupComponent();
      const publicationsButton = screen.getByRole('radio', { name: 'Publications' });
      const toggles = await getToggles(fixture);

      await user.click(publicationsButton);
      expect(await toggles[0].isChecked()).toBe(false);
      expect(await toggles[1].isChecked()).toBe(true);
      expect(await toggles[2].isChecked()).toBe(false);
    });

    it('should switch to News when News button is clicked', async () => {
      const { fixture, user } = await setupComponent();
      const newsButton = screen.getByRole('radio', { name: 'News' });
      const toggles = await getToggles(fixture);

      await user.click(newsButton);
      expect(await toggles[0].isChecked()).toBe(false);
      expect(await toggles[1].isChecked()).toBe(false);
      expect(await toggles[2].isChecked()).toBe(true);
    });
  });

  describe('Content Display', () => {
    it('should display featured items by default', async () => {
      await setupComponent();
      expect(screen.getByText('Featured Item Title')).toBeInTheDocument();
    });

    it('should display publication items when Publications is selected', async () => {
      const { user } = await setupComponent();
      const publicationsButton = screen.getByRole('radio', { name: 'Publications' });
      await user.click(publicationsButton);

      expect(screen.getByText('Publication Title')).toBeInTheDocument();
    });

    it('should display news items when News is selected', async () => {
      const { user } = await setupComponent();
      const newsButton = screen.getByRole('radio', { name: 'News' });
      await user.click(newsButton);

      expect(screen.getByText('News Title')).toBeInTheDocument();
    });

    it('should only display items for the selected content type', async () => {
      const { user } = await setupComponent();

      // Featured is shown initially
      expect(screen.getByText('Featured Item Title')).toBeInTheDocument();
      expect(screen.queryByText('Publication Title')).not.toBeInTheDocument();
      expect(screen.queryByText('News Title')).not.toBeInTheDocument();

      // Switch to Publications
      await user.click(screen.getByRole('radio', { name: 'Publications' }));
      expect(screen.queryByText('Featured Item Title')).not.toBeInTheDocument();
      expect(screen.getByText('Publication Title')).toBeInTheDocument();
      expect(screen.queryByText('News Title')).not.toBeInTheDocument();
    });
  });

  describe('Card Data Mapping and Links', () => {
    function getCardByTagline(tagline: string): HTMLElement {
      const card = screen.getByText(tagline).closest('a');
      expect(card).toBeTruthy();
      return card as HTMLElement;
    }

    it('should map research item title and tags to the card', async () => {
      await setupComponent();
      const card = getCardByTagline('Featured Item Title');
      const cardScope = within(card);

      expect(cardScope.getByText('Event')).toBeInTheDocument();
      expect(cardScope.getByText('Research')).toBeInTheDocument();
    });

    it('should map dateStart to the card date', async () => {
      await setupComponent();
      const card = getCardByTagline('Featured Item Title');
      expect(within(card).getByText('Jan 1, 2024')).toBeInTheDocument();
    });

    it('should use default value "Other" for unknown research type', async () => {
      const customContent: FeaturedData = {
        featured: [
          {
            ...mockResearchItem,
            type: 'unknown-type' as ResearchTypeId,
          },
        ],
        publications: [],
        news: [],
      };

      await setupComponent(customContent);
      const card = getCardByTagline('Featured Item Title');
      expect(within(card).getByText('Other')).toBeInTheDocument();
    });

    it('should skip tags that do not have a matching label', async () => {
      const customContent: FeaturedData = {
        featured: [
          {
            ...mockResearchItem,
            tags: ['tag1', 'unknown-tag'] as TagId[],
          },
        ],
        publications: [],
        news: [],
      };

      await setupComponent(customContent);
      const card = getCardByTagline('Featured Item Title');
      const cardScope = within(card);

      expect(cardScope.getByText('Research')).toBeInTheDocument();
      expect(cardScope.queryByText('unknown-tag')).not.toBeInTheDocument();
    });

    it('should include all available tag labels for an item with multiple tags', async () => {
      const customContent: FeaturedData = {
        featured: [
          {
            ...mockResearchItem,
            tags: ['tag1', 'tag2'] as TagId[],
          },
        ],
        publications: [],
        news: [],
      };

      await setupComponent(customContent);
      const card = getCardByTagline('Featured Item Title');
      const cardScope = within(card);

      expect(cardScope.getByText('Research')).toBeInTheDocument();
      expect(cardScope.getByText('Publications')).toBeInTheDocument();
    });

    it('should detect internal links correctly', async () => {
      await setupComponent();
      const card = getCardByTagline('Featured Item Title');

      expect(card).toHaveAttribute('href', '/featured');
      expect(card).not.toHaveAttribute('target');
      expect(card).not.toHaveAttribute('rel');
    });

    it('should detect external HTTPS links correctly', async () => {
      const { user } = await setupComponent();
      await user.click(screen.getByRole('radio', { name: 'Publications' }));

      const card = getCardByTagline('Publication Title');
      expect(card).toHaveAttribute('href', 'https://external-domain.com/publication');
      expect(card).toHaveAttribute('target', '_blank');
      expect(card).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should use "#" as default link when link is undefined', async () => {
      const customContent: FeaturedData = {
        featured: [
          {
            ...mockResearchItem,
            link: undefined,
          },
        ],
        publications: [],
        news: [],
      };

      await setupComponent(customContent);
      const card = getCardByTagline('Featured Item Title');

      expect(card).toHaveAttribute('href', '#');
      expect(card).not.toHaveAttribute('target');
      expect(card).not.toHaveAttribute('rel');
    });
  });
});
