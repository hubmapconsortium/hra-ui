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

/** Current filter interface (each category contains string of filter option IDs) */
export interface CurrentFilters {
  category?: SearchListOption[];
  eventType?: SearchListOption[];
  fundingType?: SearchListOption[];
  publicationType?: SearchListOption[];
  people?: SearchListOption[];
  project?: SearchListOption[];
  year?: SearchListOption[];
}

type ViewType = 'gallery' | 'list' | 'table';

const FILTER_OPTIONS: Record<string, SearchListOption[]> = {
  category: [
    { id: 'data-tools', label: 'Data & tools' },
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
    { id: 'book-chapter', label: 'Book chapter' },
    { id: 'conference', label: 'Conference proceedings' },
    { id: 'edited-books', label: 'Edited books' },
    { id: 'journal-articles', label: 'Journal articles' },
    { id: 'other', label: 'Other' },
    { id: 'patents', label: 'Patents' },
    { id: 'technical-reports', label: 'Technical reports' },
    { id: 'unreferred', label: 'Unreferred' },
  ],
  fundingType: [
    { id: 'research-funding', label: 'Research funding' },
    { id: 'teaching-funding', label: 'Teaching funding' },
    { id: 'workshop-funding', label: 'Workshop funding' },
  ],
  eventType: [
    { id: '24Hour', label: '24-hour' },
    { id: 'amatria', label: 'Amatria' },
    { id: 'workshops', label: 'Workshops' },
  ],
  project: [
    {
      id: 'project-name',
      label: 'Project Name',
    },
  ],
};

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

  readonly viewType = signal<ViewType>('gallery');

  /** Whether the user is on a wide screen */
  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  readonly filters = computed<FilterOptionCategory<SearchListOption>[]>(() => this.currentFiltersToFilters());

  readonly currentFilters = signal<CurrentFilters>({});

  readonly people = input<SearchListOption[]>([]);

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
    queryParams$.subscribe((queryParams) => this.setFiltersFomParams(queryParams));

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

  private setFiltersFomParams(queryParams: Params) {
    const category = queryParams['category'];
    const people = queryParams['people'];
    const search = queryParams['search'];

    if (search) {
      this.search.set(search);
    }

    this.currentFilters.set({
      category: FILTER_OPTIONS['category'].filter((cat) => category?.includes(cat.id)),
      people: this.people().filter((person) => people?.includes(person.id)),
    });

    this.updateQueryParamsFromFilters();
  }

  /** Filters items according to the search bar value */
  private doGallerySearch(): ResearchItem[] {
    const peopleFilters = this.currentFilters().people;
    const filtered = this.doPeopleSearch(peopleFilters?.map((person) => person.id) || []);

    const searchTerm = this.search()?.toLowerCase();
    console.log(searchTerm);
    console.log(!!searchTerm);
    this.updateQueryParamsFromFilters();
    if (searchTerm) {
      return filtered.filter((option) => option.title?.toLowerCase().includes(searchTerm));
    }
    return filtered;
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

  currentFiltersToFilters(): FilterOptionCategory<SearchListOption>[] {
    const { category, eventType, fundingType, publicationType, people, project, year } = this.currentFilters();
    return [
      {
        id: 'category',
        label: 'Category',
        options: FILTER_OPTIONS['category'],
        selected: category,
      },
      {
        id: 'eventType',
        label: 'Event type',
        options: FILTER_OPTIONS['eventType'],
        selected: eventType,
      },
      {
        id: 'fundingType',
        label: 'Funding type',
        options: FILTER_OPTIONS['fundingType'],
        selected: fundingType,
      },
      {
        id: 'publicationType',
        label: 'Publication type',
        options: FILTER_OPTIONS['publicationType'],
        selected: publicationType,
      },
      {
        id: 'people',
        label: 'People',
        options: this.people(),
        selected: people,
      },
      {
        id: 'project',
        label: 'Project',
        options: FILTER_OPTIONS['project'],
        selected: project,
      },
      {
        id: 'year',
        label: 'Year',
        options: FILTER_OPTIONS['year'],
        selected: year,
      },
    ];
  }

  updateFilters(updatedFilters: FilterOptionCategory<SearchListOption>[]) {
    const newCurrentFilters: CurrentFilters = {};
    console.log(updatedFilters);
    updatedFilters.forEach((filter) => {
      if (filter.selected && filter.selected.length > 0) {
        newCurrentFilters[filter.id as keyof CurrentFilters] = filter.selected;
      }
    });
    this.currentFilters.set(newCurrentFilters);
    this.updateQueryParamsFromFilters();
  }

  private updateQueryParamsFromFilters() {
    console.log(this.currentFilters());
    this.router.navigate(['/research'], {
      queryParamsHandling: 'merge',
      queryParams: {
        category: this.currentFilters().category?.map((cat) => cat.id),
        eventType: this.currentFilters().eventType?.map((event) => event.id),
        fundingType: this.currentFilters().fundingType?.map((funding) => funding.id),
        publicationType: this.currentFilters().publicationType?.map((pubType) => pubType.id),
        people: this.currentFilters().people?.map((person) => person.id),
        project: this.currentFilters().project?.map((proj) => proj.id),
        year: this.currentFilters().year?.map((year) => year.id),
        search: this.search() === '' ? null : this.search(),
      },
    });
  }
}
