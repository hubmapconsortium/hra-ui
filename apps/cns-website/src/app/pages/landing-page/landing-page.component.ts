import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { isAbsolute } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { FooterComponent } from '../../components/footer/footer.component';
import { FeaturedData, FeaturedDataKey } from '../../schemas/featured.schema';
import { ResearchItem } from '../../schemas/research.schema';
import { TagsStore } from '../../state/tags/tags.store';
import { getDefaultThumbnail } from '../../utils/default-thumbnail';

/** Content type item */
interface ContentTypeItem {
  /** Display label for the content type */
  label: string;
  /** Slug for the content type, used for matching with data keys */
  slug: FeaturedDataKey;
}

/** Content card data structure for displaying research items on the landing page */
interface ContentCard {
  /** Unique slug for the content card */
  slug: string;
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
    ButtonsModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Featured content data */
  readonly featuredContent = input.required<FeaturedData>();

  /** Currently selected content type */
  protected readonly contentType = signal<FeaturedDataKey>('featured');

  /** Content type items for the toggle buttons */
  protected readonly contentTypeItems = CONTENT_TYPE_ITEMS;

  /** Content mapped to cards */
  protected readonly cards = computed(() => {
    return Object.entries(this.featuredContent()).reduce(
      (acc, [key, items]) => {
        acc[key as FeaturedDataKey] = this.toContentCards(items);
        return acc;
      },
      {} as Record<FeaturedDataKey, ContentCard[]>,
    );
  });

  /** Tags store for resolving tag labels */
  private readonly tagsStore = inject(TagsStore);

  /**
   * Converts a list of ResearchItems to ContentCards, sorted by date descending and filtered to exclude items without valid links.
   * @param items List of ResearchItems to convert
   * @returns List of ContentCards mapped from the input items, sorted and filtered
   */
  private toContentCards(items: ResearchItem[]): ContentCard[] {
    return [...items]
      .sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime())
      .map((item) => this.toContentCard(item))
      .filter((card) => card.link !== '#');
  }

  /**
   * Converts a ResearchItem to a ContentCard
   *
   * @param item Content data
   * @returns Mapped content card data
   */
  private toContentCard(item: ResearchItem): ContentCard {
    const { slug, category, type, title: tagline, dateStart: date, link, thumbnail, projects } = item;
    const tagLabels = this.tagsStore.getLabelsByIds([category, ...projects]);

    return {
      slug,
      tagline,
      tags: tagLabels.slice(0, 2),
      date,
      image: thumbnail ?? getDefaultThumbnail(category, type),
      link: link ?? '#',
      external: !!link && isAbsolute(link),
    };
  }
}
