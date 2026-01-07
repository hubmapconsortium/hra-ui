import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { map } from 'rxjs';
import { FeaturedContentData, FeaturedContentItem } from '../../schemas/featured-content/featured-content.schema';
import { TagsData } from '../../schemas/tags/tags.schema';
import { FooterComponent } from '../../components/footer/footer.component';

/** Content Types Array */
const ContentTypes = ['Featured', 'Publications', 'News'] as const;

/** Content Type */
type ContentType = (typeof ContentTypes)[number];

/** Interface for content card display */
interface LandingPageContentCard {
  /** Image source URL */
  imageSrc: string;
  /** Date string */
  date: string;
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
 * Maps a FeaturedContentItem to a LandingPageContentCard
 *
 * @param item The featured content item from the API
 * @param tagsMap Map of tag slugs to their display names
 * @returns A content card for display
 */
function mapToContentCard(item: FeaturedContentItem, tagsMap: Map<string, string>): LandingPageContentCard {
  /** Determine if the link is external */
  const isExternal = item.link.startsWith('http://') || item.link.startsWith('https://');

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
    link: item.link,
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
  /** Activated route */
  private readonly route = inject(ActivatedRoute);

  /** Content Types */
  protected readonly contentTypes = ContentTypes;

  /** Selected content type */
  protected readonly selectedContentType = signal<ContentType>('Featured');

  /** Featured content data from resolver */
  private readonly featuredContentData = toSignal(
    this.route.data.pipe(map((data) => data['featuredContent'] as FeaturedContentData | undefined)),
  );

  /** Tags data from resolver */
  private readonly tagsData = toSignal(this.route.data.pipe(map((data) => data['tags'] as TagsData | undefined)));

  /** Tags map for quick lookup of tag names by slug */
  private readonly tagsMap = computed<Map<string, string>>(() => {
    const tags = this.tagsData();
    if (!tags) {
      return new Map();
    }
    return new Map(tags.map((tag) => [tag.slug, tag.name]));
  });

  /** Content cards filtered by selected content type */
  private readonly contentCardsSignal = computed<LandingPageContentCard[]>(() => {
    const data = this.featuredContentData();
    const selectedType = this.selectedContentType();
    const tagsMap = this.tagsMap();

    if (!data) {
      return [];
    }

    let items: FeaturedContentItem[] = [];

    switch (selectedType) {
      case 'Featured':
        items = data.featured;
        break;
      case 'Publications':
        items = data.publications;
        break;
      case 'News':
        items = data.news;
        break;
    }

    return items.map((item) => mapToContentCard(item, tagsMap));
  });

  /** Content cards as array for the gallery grid */
  protected get contentCards(): LandingPageContentCard[] {
    return this.contentCardsSignal();
  }
}
