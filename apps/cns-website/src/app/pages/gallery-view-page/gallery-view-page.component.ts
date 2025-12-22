import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { FilterMenuComponent, FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { ListViewComponent, ListViewGroup } from '@hra-ui/design-system/content-templates/list-view';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { ResearchPageData } from '../../schemas/research/research.schema';
import { HeaderEventsService } from '../../components/header/header.component';

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
    ListViewComponent,
  ],
  templateUrl: './gallery-view-page.component.html',
  styleUrl: './gallery-view-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryViewPageComponent {
  /** Reference to sidenav element */
  readonly sidenav = viewChild<MatSidenav>('sidenav');

  readonly headerEvents = inject(HeaderEventsService);

  private readonly router = inject(Router);

  readonly route = inject(ActivatedRoute);

  readonly menuOpen = computed(() => this.headerEvents.menuState());

  /** List of gallery cards */
  readonly data = input.required<ResearchPageData>();

  /** Current search bar value */
  readonly search = signal<string>('');

  /** Filtered items (after typing in search bar) */
  readonly filteredGalleryItems = computed(() => this.doGallerySearch());

  /** Total number of cards */
  readonly totalCount = computed(() => this.data()?.data.length);

  /** Number of cards after filtering */
  readonly viewingCount = computed(() => this.filteredGalleryItems()?.length);

  readonly viewType = signal<string>('news');

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
    this.router.events.subscribe(() => {
      const type = this.route.snapshot.queryParams['type'];
      this.viewType.set(type);
    });

    effect(() => {
      console.log(this.data());
    });
    effect(() => {
      this.headerEvents.menuState.set(this.isWideScreen());
    });
  }

  /** Filters items according to the search bar value */
  private doGallerySearch() {
    const searchTerm = this.search().toLowerCase();
    return this.data()?.data.filter((option) => option.title?.toLowerCase().includes(searchTerm));
  }

  convertToListItems(data: ResearchPageData): ListViewGroup[] {
    const groupedData: Record<string, string[]> = {};
    data.data.forEach((item) => {
      const year = item.startDate?.split('-')[0];
      if (!groupedData[year]) {
        groupedData[year] = [item.description || ''];
      } else {
        groupedData[year].push(item.description || '');
      }
    });
    const listItems = Object.entries(groupedData);

    listItems.sort((a, b) => parseInt(b[0]) - parseInt(a[0])); //sort by year in descending order

    return listItems.map(([year, descriptions]) => ({
      group: year,
      items: descriptions.map((description) => ({ content: description })),
    }));
  }
}
