import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { isAbsolute } from '@hra-ui/common/url';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { FooterComponent } from '../../components/footer/footer.component';
import { FeaturedData } from '../../schemas/featured.schema';
import { ResearchItem } from '../../schemas/research.schema';
import { TagsData } from '../../schemas/tags.schema';

/** Content Types Array */
const ContentTypes = ['Featured', 'Publications', 'News'] as const;

/** Content Type */
type ContentType = (typeof ContentTypes)[number];

/** Lowercase Content Type */
type LowercaseContentType = Lowercase<ContentType>;

/** Interface for content card display */
interface LandingPageContentCard {
  /** Image source URL */
  imageSrc: string;
  /** Date string */
  date: Date;
  /** Tagline or title */
  tagline: string;
  /** Tags associated with the content */
  tags: string[];
  /** Link URL */
  link: string;
  /** Whether the link is external */
  external: boolean;
}

/**
 * Maps a ResearchItem to a LandingPageContentCard
 *
 * @param item The featured content item from the API
 * @param tagsMap Map of tag slugs to their display names
 * @returns A content card for display
 */
function mapToContentCard(item: ResearchItem, tagsMap: Map<string, string>): LandingPageContentCard {
  /** Determine if the link is external */
  const isExternal = item.link !== undefined && isAbsolute(item.link);

  /** Map tag slugs to their proper display names */
  const displayTags = item.tags.map((tagSlug) => tagsMap.get(tagSlug) ?? capitalizeFirstLetter(tagSlug));

  if (item.type && !displayTags.includes(item.type)) {
    displayTags.unshift(capitalizeFirstLetter(item.type.replace(/-/g, ' ')));
  }

  return {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: item.dateStart,
    tagline: item.title,
    tags: displayTags,
    link: item.link ?? '#',
    external: isExternal,
  };
}

/**
 * Capitalizes the first letter of each word in a string
 *
 * @param str The string to capitalize
 * @returns The capitalized string
 */
function capitalizeFirstLetter(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

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
  /** Featured content data from resolver */
  readonly featuredContent = input.required<FeaturedData>();

  /** Tags data from resolver */
  readonly tags = input.required<TagsData>();

  /** Content Types */
  protected readonly contentTypes = ContentTypes;

  /** Selected content type */
  protected readonly selectedContentType = signal<LowercaseContentType>('featured');

  /** Tags map for quick lookup of tag names by slug */
  private readonly tagsMap = computed<Map<string, string>>(() => {
    const tags = this.tags();
    return new Map(tags.map((tag) => [tag.slug, tag.name]));
  });

  /** Content cards filtered by selected content type */
  protected readonly contentCards = computed<LandingPageContentCard[]>(() => {
    const data = this.featuredContent();
    const selectedType = this.selectedContentType();
    const tagsMap = this.tagsMap();

    const items = data[selectedType] ?? [];

    return items.map((item) => mapToContentCard(item, tagsMap));
  });
}
