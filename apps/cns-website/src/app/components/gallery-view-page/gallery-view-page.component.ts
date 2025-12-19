import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { FilterMenuComponent, FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { ResearchPageData } from '../../schemas/research/research.schema';
import { HeaderEventsService } from '../header/header.component';

@Component({
  selector: 'cns-gallery-view-page',
  imports: [
    HraCommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
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

  readonly headerEvents = inject(HeaderEventsService);

  readonly menuOpen = computed(() => this.headerEvents.menuState());

  /** List of gallery cards */
  readonly data = input<ResearchPageData>();

  /** Current search bar value */
  readonly search = signal<string>('');

  /** Filtered items (after typing in search bar) */
  readonly filteredGalleryItems = computed(() => this.doGallerySearch());

  /** Total number of cards */
  readonly totalCount = computed(() => this.data()?.news.length);

  /** Number of cards after filtering */
  readonly viewingCount = computed(() => this.filteredGalleryItems()?.length);

  /** Whether the user is on a wide screen */
  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  readonly filters = input<FilterOptionCategory<SearchListOption>[]>([]);

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
    effect(() => {
      this.headerEvents.menuState.set(this.isWideScreen());
    });
  }

  /** Filters items according to the search bar value */
  private doGallerySearch() {
    const searchTerm = this.search().toLowerCase();
    return this.data()?.news.filter((option) => option.name.toLowerCase().includes(searchTerm));
  }
}
