import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { isAbsolute } from '@hra-ui/common/url';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { FooterComponent } from '../../components/footer/footer.component';
import { FeaturedData, FeaturedDataKey } from '../../schemas/featured.schema';
import { ResearchTypeId, ResearchTypesData } from '../../schemas/research-type.schema';
import { ResearchItem } from '../../schemas/research.schema';
import { TagId, TagsData } from '../../schemas/tags.schema';
import { getImageUrl } from '../../utils/research-item-images';

/** Content type item */
interface ContentTypeItem {
  /** Display label for the content type */
  label: string;
  /** Slug for the content type, used for matching with data keys */
  slug: FeaturedDataKey;
}

/** Content card data structure for displaying research items on the landing page */
interface ContentCard {
  /** Tagline of the card */
  tagline: string;
  /** Tags of the card */
  tags: string[];
  /** Date of the content */
  date: Date;
  /** Image URL for the card */
  image: string;
  /** Link to the content */
  link: string;
  /** Whether the link is external */
  external: boolean;
}

/** Predefined content type items for the landing page */
const CONTENT_TYPE_ITEMS: ContentTypeItem[] = [
  { label: 'Featured', slug: 'featured' },
  { label: 'Publications', slug: 'publications' },
  { label: 'News', slug: 'news' },
];

/**
 * Landing page of CNS website
 */
@Component({
  selector: 'cns-landing-page',
  imports: [
    HraCommonModule,
    FooterComponent,
    MatButtonToggleModule,
    GalleryGridComponent,
    ContentButtonComponent,
    GalleryGridItemDirective,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Featured content data */
  readonly featuredContent = input.required<FeaturedData>();

  /** Event types data */
  readonly eventTypes = input.required<ResearchTypesData>();

  /** Publication types data */
  readonly publicationTypes = input.required<ResearchTypesData>();

  /** Funding types data */
  readonly fundingTypes = input.required<ResearchTypesData>();

  /** Tags data */
  readonly tags = input.required<TagsData>();

  /** All types data in a single array */
  private readonly allTypes = computed(() => [
    {
      label: 'News',
      value: 'news' as ResearchTypeId,
    },
    ...this.eventTypes(),
    ...this.publicationTypes(),
    ...this.fundingTypes(),
  ]);

  /** Currently selected content type */
  protected readonly contentType = signal<FeaturedDataKey>('featured');

  /** Content type items for the toggle buttons */
  protected readonly contentTypeItems = CONTENT_TYPE_ITEMS;

  /** Content mapped to cards */
  protected readonly cards = computed(() => {
    const data = this.featuredContent();
    return Object.entries(data).reduce(
      (acc, [key, items]) => {
        acc[key as FeaturedDataKey] = items.map((item) => this.toContentCard(item));
        return acc;
      },
      {} as Record<FeaturedDataKey, ContentCard[]>,
    );
  });

  /**
   * Converts a ResearchItem to a ContentCard
   *
   * @param item Content data
   * @returns Mapped content card data
   */
  private toContentCard(item: ResearchItem): ContentCard {
    const { title: tagline, type, tags, dateStart: date, link } = item;
    const typeLabel = this.getTypeLabel(type);
    const tagLabels = this.getTagLabels(tags);

    return {
      tagline,
      tags: [typeLabel, ...tagLabels],
      date,
      image: getImageUrl(item),
      link: link ?? '#',
      external: link !== undefined && isAbsolute(link),
    };
  }

  /**
   * Gets the label for a given research type slug
   *
   * @param slug ResearchItem type slug
   * @returns The label for the research type, or 'Other' if not found
   */
  private getTypeLabel(slug: ResearchTypeId): string {
    const types = this.allTypes();
    const type = types.find((t) => t.value === slug);
    return type?.label ?? 'Other';
  }

  /**
   * Gets the labels for a list of tag slugs.
   * Slugs without a matching tag are skipped.
   *
   * @param slugs Slugs to find labels for
   * @returns The labels for the given tag slugs
   */
  private getTagLabels(slugs: TagId[]): string[] {
    const tags = this.tags();
    const labels: string[] = [];
    for (const slug of slugs) {
      const tag = tags.find((t) => t.slug === slug);
      if (tag) {
        labels.push(tag.name);
      }
    }

    return labels;
  }
}
