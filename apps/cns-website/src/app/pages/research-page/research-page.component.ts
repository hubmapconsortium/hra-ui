import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { ListViewComponent, ListViewGroup } from '@hra-ui/design-system/content-templates/list-view';
import { FilterMenuComponent, FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { HeaderEventsService } from '../../components/header/header.component';
import { ResearchItem, ResearchPageData } from '../../schemas/research/research.schema';

const FILTER_OPTIONS: Record<string, SearchListOption[]> = {
  category: [
    { id: 'dataTools', label: 'Data & tools' },
    { id: 'events', label: 'Events' },
    { id: 'funding', label: 'Funding' },
    { id: 'displays', label: 'Interactive displays' },
    { id: 'miscellaneous', label: 'Miscellaneous' },
    { id: 'news', label: 'News' },
    { id: 'presentations', label: 'Presentations' },
    { id: 'publications', label: 'Publications' },
  ],
  publicationType: [
    { id: 'book', label: 'Book' },
    { id: 'bookChapter', label: 'Book chapter' },
    { id: 'conference', label: 'Conference proceedings' },
    { id: 'editedBooks', label: 'Edited books' },
    { id: 'journalArticles', label: 'Journal articles' },
    { id: 'other', label: 'Other' },
    { id: 'patents', label: 'Patents' },
    { id: 'technicalReports', label: 'Technical reports' },
    { id: 'unreferred', label: 'Unreferred' },
  ],
  fundingType: [
    { id: 'researchFunding', label: 'Research funding' },
    { id: 'teachingFunding', label: 'Teaching funding' },
    { id: 'workshopFunding', label: 'Workshop funding' },
  ],
  eventType: [
    { id: '24Hour', label: '24-hour' },
    { id: 'amatria', label: 'Amatria' },
    { id: 'workshops', label: 'Workshops' },
  ],
};

const FILTER_CATEGORIES = [
  { id: 'category', label: 'Category', options: FILTER_OPTIONS['category'] },
  { id: 'eventType', label: 'Event type', options: FILTER_OPTIONS['eventType'] },
  { id: 'fundingType', label: 'Funding type', options: FILTER_OPTIONS['fundingType'] },
  { id: 'publicationType', label: 'Publication type', options: FILTER_OPTIONS['publicationType'] },
  { id: 'people', label: 'People', options: [] },
  { id: 'project', label: 'Project', options: [] },
  { id: 'year', label: 'Year', options: [] },
] as FilterOptionCategory<SearchListOption>[];

@Component({
  selector: 'cns-research-page',
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
  templateUrl: './research-page.component.html',
  styleUrl: './research-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchPageComponent {
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
  readonly filteredItems = computed<ResearchItem[]>(() => this.doGallerySearch());

  /** Total number of cards */
  readonly totalCount = computed(() => this.data()?.data.length);

  /** Number of cards after filtering */
  readonly viewingCount = computed(() => this.filteredItems()?.length);

  readonly viewType = signal<string>('news');

  /** Whether the user is on a wide screen */
  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  readonly filters = signal<FilterOptionCategory<SearchListOption>[]>(FILTER_CATEGORIES);

  readonly people = input<SearchListOption[]>([]);

  readonly peopleIds = computed(() => {
    const params: Params = this.route.snapshot.queryParams;
    const people = params['people'];
    if (people) {
      return Array.isArray(people) ? people : [people];
    }
    return [];
  });

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
      const category = this.route.snapshot.queryParams['category'];
      this.viewType.set(category);
    });

    effect(() => {
      const peopleFilters = this.filters().find((filter) => filter.id === 'people');
      const yearFilters = this.filters().find((filter) => filter.id === 'year');
      if (yearFilters) {
        const years = Array.from(
          new Set(
            this.data()
              ?.data.map((item) => item.dateStart?.split('-')[0])
              .filter((year): year is string => year !== undefined),
          ),
        ).sort((a, b) => parseInt(b) - parseInt(a));
        yearFilters.options = years.map((year) => ({ id: year, label: year }));
      }
      if (peopleFilters) {
        peopleFilters.options = this.people();
      }
    });

    effect(() => {
      this.headerEvents.menuState.set(this.isWideScreen());
    });
  }

  /** Filters items according to the search bar value */
  private doGallerySearch(): ResearchItem[] {
    const peopleFilters = this.filters().find((filter) => filter.id === 'people');
    const filtered = this.doPeopleSearch(peopleFilters?.selected?.map((option) => option.id) || []);

    const searchTerm = this.search().toLowerCase();
    return filtered.filter((option) => option.title?.toLowerCase().includes(searchTerm));
  }

  private doPeopleSearch(ids: string[]): ResearchItem[] {
    const allData = this.data()?.data || [];
    if (ids.length === 0) {
      return allData;
    }
    return allData.filter((item) => item.people.some((person) => ids.includes(person)));
  }

  convertToListItems(data: ResearchPageData): ListViewGroup[] {
    const groupedData: Record<string, string[]> = {};
    data.data.forEach((item) => {
      const year = item.dateStart?.split('-')[0];
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

  // handleFilterSelectionChanges() {
  // this.router.navigate(['/research'], {
  //   queryParamsHandling: 'merge',
  //   queryParams: {
  //     category: this.viewType(),
  //     people: this.peopleIds(),
  //   },
  // });
  // }
}
