import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { map } from 'rxjs';
import { FeaturedContentData, FeaturedContentItem } from '../../schemas/featured-content/featured-content.schema';
import { FooterComponent } from '../../components/footer/footer.component';

/** Content Types Array */
const ContentTypes = ['Featured', 'Publications', 'News'] as const;

/** Content Type */
type ContentType = (typeof ContentTypes)[number];

/** Interface for content card display */
interface LandingPageContentCard {
  imageSrc: string;

  date: string;

  tagline: string;

  tags: string[];

  link: string;

  external: boolean;
}

/**
 * Maps a FeaturedContentItem to a LandingPageContentCard
 *
 * @param item The featured content item from the API
 * @returns A content card for display
 */
function mapToContentCard(item: FeaturedContentItem): LandingPageContentCard {
  const isExternal = item.link.startsWith('http://') || item.link.startsWith('https://');

  const displayTags = item.tags.map((tag) => capitalizeFirstLetter(tag));

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

  /** Content cards filtered by selected content type */
  private readonly contentCardsSignal = computed<LandingPageContentCard[]>(() => {
    const data = this.featuredContentData();
    const selectedType = this.selectedContentType();

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

    return items.map(mapToContentCard);
  });

  /** Content cards as array for the gallery grid */
  protected get contentCards(): LandingPageContentCard[] {
    return this.contentCardsSignal();
  }
}
