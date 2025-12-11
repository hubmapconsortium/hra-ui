import { ChangeDetectionStrategy, Component, computed, input, signal, viewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { CardsModule } from '@hra-ui/design-system/cards';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { FilterMenuComponent } from '@hra-ui/design-system/filter-menu';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';

/** Gallery item interface */
export interface GalleryItem {
  /** Name of item */
  name: string;
  /** Path to image */
  imageSrc: string;
  /** Link */
  link: string;
  /** Date to show on card (for gallery cards) */
  date?: string;
  /** If the link is external (for gallery cards) */
  external?: boolean;
  /** Tags (for gallery cards) */
  tags?: string[];
  /** Job description (for profile cards) */
  description?: string;
  /** Action button text (for profile cards) */
  actionText?: string;
}

/** Gallery view variant type */
type GalleryVariant = 'gallery' | 'profile';

/**
 * Gallery view component for displaying gallery and profile cards
 */
@Component({
  selector: 'hra-gallery-view',
  imports: [
    HraCommonModule,
    GridContainerComponent,
    CardsModule,
    SearchFilterComponent,
    FilterMenuComponent,
    MatSidenavModule,
    IconsModule,
    TextHyperlinkDirective,
    ScrollingModule,
    ButtonsModule,
  ],
  templateUrl: './gallery-view.component.html',
  styleUrl: './gallery-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryViewComponent {
  /** Reference to sidenav element */
  readonly sidenav = viewChild<MatSidenav>('sidenav');

  /** List of gallery cards */
  readonly galleryCards = input<GalleryItem[]>([]);

  /** Gallery view variant */
  readonly variant = input<GalleryVariant>('gallery');

  /** Current search bar value */
  readonly search = signal<string>('');

  /** Filtered items (after typing in search bar) */
  readonly filteredGalleryItems = computed(() => this.doGallerySearch());

  /** Total number of cards */
  readonly totalCount = computed(() => this.galleryCards().length);

  /** Number of cards after filtering */
  readonly viewingCount = computed(() => this.filteredGalleryItems().length);

  /** Whether the user is on a wide screen */
  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  /** Filters items according to the search bar value */
  private doGallerySearch() {
    const searchTerm = this.search().toLowerCase();
    return this.galleryCards().filter((option) => option.name.toLowerCase().includes(searchTerm));
  }
}
