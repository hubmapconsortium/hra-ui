import { ChangeDetectionStrategy, Component, computed, inject, input, model, signal, viewChild } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { CardsModule } from '@hra-ui/design-system/cards';
import { FilterMenuComponent, FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { ActivatedRoute } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';

const PICTURE_URL = 'assets/ui-images/placeholder.png';

const GALLERY_CARDS: GalleryItem[] = [
  {
    name: 'A',
    imageSrc: PICTURE_URL,
    date: 'March 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA'],
  },
  {
    name: 'AB',
    imageSrc: PICTURE_URL,
    date: 'March 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA', 'Test'],
  },
  {
    name: 'ABC',
    imageSrc: PICTURE_URL,
    date: 'June 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA', 'Label'],
  },
  {
    name: 'ABCD',
    imageSrc: PICTURE_URL,
    date: 'May 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['HRA'],
  },
  {
    name: 'ABCDE',
    imageSrc: PICTURE_URL,
    date: 'April 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA'],
  },
];

const FILTER_OPTIONS = [
  { id: 'a', label: 'A', count: 9999 },
  { id: 'ab', label: 'AB', count: 4299 },
  { id: 'abc', label: 'ABC', count: 1799 },
  { id: 'abcd', label: 'ABCD', count: 899 },
  { id: 'abcde', label: 'ABCDE', count: 499 },
  { id: 'abcdef', label: 'ABCDEF', count: 299 },
  { id: 'abcdefg', label: 'ABCDEFG', count: 199 },
  { id: 'abcdefgh', label: 'BACDEFGH', count: 99 },
] as SearchListOption[];

const FILTER_CATEGORIES = [
  { id: 'category1', label: 'Category 1', options: FILTER_OPTIONS },
  { id: 'category2', label: 'Category 2', options: FILTER_OPTIONS },
  { id: 'category3', label: 'Category 3', options: FILTER_OPTIONS },
  { id: 'category4', label: 'Category 4', options: FILTER_OPTIONS },
  { id: 'category5', label: 'Category 5', options: FILTER_OPTIONS },
  { id: 'category6', label: 'Category 6', options: FILTER_OPTIONS },
  { id: 'category7', label: 'Category 7', options: FILTER_OPTIONS },
  { id: 'category8', label: 'Category 8', options: FILTER_OPTIONS },
  { id: 'category9', label: 'Category 9', options: FILTER_OPTIONS },
  { id: 'category10', label: 'Category 10', options: FILTER_OPTIONS },
] as FilterOptionCategory<SearchListOption>[];

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

@Component({
  selector: 'cns-gallery-view-page',
  imports: [
    HraCommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    ScrollingModule,
    CardsModule,
    ButtonsModule,
    IconsModule,
    GridContainerComponent,
    SearchFilterComponent,
    FilterMenuComponent,
  ],
  templateUrl: './gallery-view-page.component.html',
  styleUrl: './gallery-view-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryViewPageComponent {
  /** Reference to sidenav element */
  readonly sidenav = viewChild<MatSidenav>('sidenav');

  /** List of gallery cards */
  readonly galleryCards = signal<GalleryItem[]>(GALLERY_CARDS);

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

  readonly filters = signal(FILTER_CATEGORIES);
  readonly toggleOptions = signal([
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]);
  readonly viewAsOptions = signal([
    { id: 'table', label: 'Table' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'list', label: 'List' },
  ]);
  readonly sortByOptions = signal([
    { id: 'nameAsc', label: 'Name ascending' },
    { id: 'nameDesc', label: 'Name descending' },
    { id: 'oldest', label: 'Oldest' },
    { id: 'newest', label: 'Newest' },
    { id: 'hierachical', label: 'Hierarchical' },
  ]);

  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams;
    queryParams$.subscribe((queryParams) => console.log(queryParams));
  }

  /** Filters items according to the search bar value */
  private doGallerySearch() {
    const searchTerm = this.search().toLowerCase();
    return this.galleryCards().filter((option) => option.name.toLowerCase().includes(searchTerm));
  }
}
