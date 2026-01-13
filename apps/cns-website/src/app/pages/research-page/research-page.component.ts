import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
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
import { EndOfResultsIndicatorComponent } from '@hra-ui/design-system/indicators/end-of-results';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderEventsService } from '../../components/header/header.component';
import { ResearchItem, ResearchPageData } from '../../schemas/research/research.schema';

/** Current filter interface (each category contains array of filter options) */
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
    { id: 'publication', label: 'Publications' },
  ],
  fundingType: [
    { id: 'research-funding', label: 'Research funding' },
    { id: 'teaching-funding', label: 'Teaching funding' },
    { id: 'workshop-funding', label: 'Workshop funding' },
  ],
  eventType: [
    { id: '24-hour', label: '24-hour' },
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
    FooterComponent,
    EndOfResultsIndicatorComponent,
    MatDivider,
  ],
  templateUrl: './research-page.component.html',
  styleUrl: './research-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchPageComponent {
  private readonly router = inject(Router);

  private readonly headerEvents = inject(HeaderEventsService);

  /** Reference to sidenav element */
  readonly sidenav = viewChild<MatSidenav>('sidenav');

  readonly data = input.required<ResearchPageData>();

  readonly people = input<SearchListOption[]>([]);

  readonly publicationTypes = input<SearchListOption[]>([]);

  readonly tags = input<{ slug: string; name: string; description: string }[]>([]);

  /** Current search bar value */
  readonly search = signal<string>('');

  readonly viewType = signal<ViewType>('gallery');

  readonly filterIds = signal<Record<string, string[]>>({
    category: [],
    eventType: [],
    fundingType: [],
    publicationType: [],
    people: [],
    project: [],
    year: [],
  });

  readonly currentFilters = signal<CurrentFilters>({});

  readonly yearOptions = signal<SearchListOption[]>([]);

  readonly viewAsOptions = signal([
    { id: 'gallery', label: 'Gallery' },
    { id: 'list', label: 'List' },
  ]);
  readonly sortByOptions = signal([
    { id: 'nameAsc', label: 'Ascending (A-Z) by title' },
    { id: 'nameDesc', label: 'Descending (Z-A) by title' },
    { id: 'newest', label: 'Newest' },
    { id: 'oldest', label: 'Oldest' },
  ]);

  readonly menuOpen = computed(() => this.headerEvents.menuState());

  /** Filtered items */
  readonly filteredItems = computed<ResearchItem[]>(() => this.filterResults());

  /** Total number of cards */
  readonly totalCount = computed(() => this.data()?.length);

  /** Number of cards after filtering */
  readonly viewingCount = computed(() => this.filteredItems()?.length);

  readonly filters = computed<FilterOptionCategory<SearchListOption>[]>(() => this.currentFiltersToFilters());

  /** Whether the user is on a wide screen */
  protected readonly isWideScreen = watchBreakpoint('(min-width: 1100px)');

  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams;
    queryParams$.subscribe((queryParams) => this.setFilterIdsFromParams(queryParams));

    effect(() => {
      const years = Array.from(
        new Set(
          this.data()
            ?.map((item) => item.dateStart?.split('-')[0])
            .filter((year): year is string => year !== undefined),
        ),
      ).sort((a, b) => parseInt(b) - parseInt(a));
      this.yearOptions.set(years.map((year) => ({ id: year, label: year })));
    });

    effect(() => {
      const peopleFilters = this.filters().find((filter) => filter.id === 'people');
      const yearFilters = this.filters().find((filter) => filter.id === 'year');
      if (yearFilters) {
        yearFilters.options = this.yearOptions();
      }
      if (peopleFilters) {
        peopleFilters.options = this.people();
      }
    });

    effect(() => {
      this.headerEvents.menuState.set(this.isWideScreen());
    });

    effect(() => {
      this.setCurrentFiltersFromFilterIds();
    });
  }

  private setFilterIdsFromParams(queryParams: Params) {
    this.search.set(queryParams['search']);
    this.filterIds.set({
      category: queryParams['category'] || [],
      people: queryParams['people'] || [],
      year: queryParams['year'] || [],
      eventType: queryParams['event-type'] || [],
      fundingType: queryParams['funding-type'] || [],
      publicationType: queryParams['publication-type'] || [],
      project: queryParams['project'] || [],
    });
  }

  private setCurrentFiltersFromFilterIds() {
    this.currentFilters.set({
      category: FILTER_OPTIONS['category'].filter((cat) => this.filterIds()['category'].includes(cat.id)),
      people: this.people().filter((person) => this.filterIds()['people'].includes(person.id)),
      year: this.yearOptions().filter((yr) => this.filterIds()['year'].includes(yr.id)),
      publicationType: this.publicationTypes().filter((type) => this.filterIds()['publicationType'].includes(type.id)),
      eventType: FILTER_OPTIONS['eventType'].filter((type) => this.filterIds()['eventType'].includes(type.id)),
      fundingType: FILTER_OPTIONS['fundingType'].filter((type) => this.filterIds()['fundingType'].includes(type.id)),
      project: FILTER_OPTIONS['project'].filter((type) => this.filterIds()['project'].includes(type.id)),
    });
  }

  private filterResults(): ResearchItem[] {
    let filteredData = this.data() || [];

    if (this.search() && this.search() !== '') {
      filteredData = filteredData.filter((dataItem) =>
        dataItem.title?.toLowerCase().includes(this.search().toLowerCase()),
      );
    }

    if (this.currentFilters().category && this.filterIds()['category'].length > 0) {
      filteredData = filteredData.filter((item) =>
        this.currentFilters().category?.some((option) => option.id === item.category),
      );
    }

    if (this.currentFilters().publicationType && this.filterIds()['publicationType'].length > 0) {
      filteredData = filteredData.filter((item) =>
        this.currentFilters().publicationType?.some((option) => option.id === item.type),
      );
    }

    if (this.currentFilters().year && this.filterIds()['year'].length > 0) {
      filteredData = filteredData.filter((item) => {
        const itemYear = item.dateStart?.split('-')[0];
        return this.currentFilters().year?.some((option) => option.id === itemYear);
      });
    }

    if (this.currentFilters().people && this.filterIds()['people'].length > 0) {
      filteredData = filteredData.filter((item) =>
        this.currentFilters().people?.some((option) => item.people.includes(option.id)),
      );
    }

    if (this.currentFilters().fundingType && this.filterIds()['fundingType'].length > 0) {
      filteredData = filteredData.filter((item) =>
        this.currentFilters().fundingType?.some((option) => option.id === item.fundingType),
      );
    }

    if (this.currentFilters().eventType && this.filterIds()['eventType'].length > 0) {
      filteredData = filteredData.filter((item) =>
        this.currentFilters().eventType?.some((option) => option.id === item.eventType),
      );
    }

    if (this.currentFilters().project && this.filterIds()['project'].length > 0) {
      filteredData = filteredData.filter((item) =>
        this.currentFilters().project?.some((option) => option.id === item.project),
      );
    }

    this.updateQueryParamsFromFilters();
    return filteredData;
  }

  convertToListItems(data: ResearchPageData): ListViewGroup[] {
    const groupedData: Record<string, string[]> = {};
    data.forEach((item) => {
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

  private currentFiltersToFilters(): FilterOptionCategory<SearchListOption>[] {
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
        options: this.publicationTypes(),
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
        options: this.yearOptions(),
        selected: year,
      },
    ];
  }

  updateFilters(updatedFilters: FilterOptionCategory<SearchListOption>[]) {
    const newCurrentFilters: CurrentFilters = {};
    updatedFilters.forEach((filter) => {
      if (filter.selected && filter.selected.length > 0) {
        newCurrentFilters[filter.id as keyof CurrentFilters] = filter.selected;
      }
    });
    this.currentFilters.set(newCurrentFilters);
    this.updateQueryParamsFromFilters();
  }

  private updateQueryParamsFromFilters() {
    this.router.navigate(['/research'], {
      queryParams: {
        category: this.currentFilters().category?.map((cat) => cat.id),
        'event-type': this.currentFilters().eventType?.map((event) => event.id),
        'funding-type': this.currentFilters().fundingType?.map((funding) => funding.id),
        'publication-type': this.currentFilters().publicationType?.map((pubType) => pubType.id),
        people: this.currentFilters().people?.map((person) => person.id),
        project: this.currentFilters().project?.map((proj) => proj.id),
        year: this.currentFilters().year?.map((year) => year.id),
        search: this.search() === '' ? null : this.search(),
      },
    });
  }

  clearFilters() {
    this.search.set('');
    this.currentFilters.set({});
  }

  fetchTagLabels(tags: string[]): string[] {
    return tags.map((tag) => {
      return this.tags().find((tagg) => tagg.slug === tag)?.name || '';
    });
  }
}
