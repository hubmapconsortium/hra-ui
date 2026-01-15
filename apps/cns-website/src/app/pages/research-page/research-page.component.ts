import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ViewType } from '../../resolvers/research/research.resolver';
import { ResearchItem, ResearchPageData } from '../../schemas/research/research.schema';

const PARAMS = ['category', 'people', 'year', 'event-type', 'funding-type', 'publication-type', 'project'];

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

  private readonly route = inject(ActivatedRoute);

  /** Reference to sidenav element */
  readonly sidenav = viewChild<MatSidenav>('sidenav');

  readonly data = input.required<ResearchPageData>();

  readonly people = model<SearchListOption[]>([]);

  readonly publicationTypes = model<SearchListOption[]>([]);

  readonly tags = input<{ slug: string; name: string; description: string }[]>([]);

  /** Current search bar value */
  readonly search = signal<string>('');

  readonly currentFilters = signal<Record<string, SearchListOption[]>>({});

  readonly yearOptions = signal<SearchListOption[]>([]);

  readonly categoryOptions = signal<SearchListOption[]>([
    { id: 'data-tools', label: 'Data & tools' },
    { id: 'events', label: 'Events' },
    { id: 'funding', label: 'Funding' },
    { id: 'displays', label: 'Interactive displays' },
    { id: 'miscellaneous', label: 'Miscellaneous' },
    { id: 'news', label: 'News' },
    { id: 'presentations', label: 'Presentations' },
    { id: 'publications', label: 'Publications' },
    { id: 'software-products', label: 'Software Products' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'visualizations', label: 'Visualizations' },
  ]);

  readonly fundingOptions = signal<SearchListOption[]>([
    { id: 'research-funding', label: 'Research funding' },
    { id: 'teaching-funding', label: 'Teaching funding' },
    { id: 'workshop-funding', label: 'Workshop funding' },
  ]);

  readonly eventOptions = signal<SearchListOption[]>([
    { id: '24-hour', label: '24-hour' },
    { id: 'amatria', label: 'Amatria' },
    { id: 'workshops', label: 'Workshops' },
  ]);

  readonly projectOptions = signal<SearchListOption[]>([
    {
      id: 'project-name',
      label: 'Project Name',
    },
  ]);

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
  readonly groupByOptions = signal([
    { id: 'none', label: 'None' },
    { id: 'project', label: 'Project' },
    { id: 'publicationType', label: 'Publication type' },
    { id: 'year', label: 'Year' },
  ]);

  readonly viewType = signal<ViewType>('gallery');
  readonly sortBy = signal<string>('newest');
  readonly groupBy = signal<string>('none');

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
    queryParams$.subscribe(() => {
      this.setCurrentFiltersFromParams();
      this.setInitialControls();
    });

    toObservable(this.data).subscribe(() => {
      this.updateFilterCounts(this.categoryOptions, 'category');
      this.updateFilterCounts(this.publicationTypes, 'type');
      this.updateFilterCounts(this.people, 'people');
      this.updateFilterCounts(this.fundingOptions, 'fundingType');
      this.updateFilterCounts(this.eventOptions, 'eventType');
      this.updateFilterCounts(this.projectOptions, 'project');
      this.updateFilterCounts(this.yearOptions, 'year');
    });

    effect(() => {
      this.setControls(this.data());
      this.setYearOptions();
      this.setCurrentFiltersFromParams();
      this.headerEvents.menuState.set(this.isWideScreen());
    });
  }

  setInitialControls() {
    const params = this.route.snapshot.queryParams;
    this.sortBy.set('newest');
    this.viewType.set('gallery');
    this.groupBy.set('none');

    if (params['category']) {
      const category = params['category'];
      if (category === 'visualizations') {
        this.groupBy.set('year');
      }
      if (['publications', 'events', 'funding', 'presentations'].includes(category)) {
        this.viewType.set('list');
        this.groupBy.set('year');
      }
    }
  }

  private setControls(data: ResearchPageData) {
    // Set sort
    const sort = this.sortBy();
    let sortedItems = data;
    switch (sort) {
      case 'nameAsc':
        sortedItems = sortedItems.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'nameDesc':
        sortedItems = sortedItems.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
        break;
      case 'newest':
        sortedItems = sortedItems.sort((a, b) => (b.dateStart || '').localeCompare(a.dateStart || ''));
        break;
      case 'oldest':
        sortedItems = sortedItems.sort((a, b) => (a.dateStart || '').localeCompare(b.dateStart || ''));
        break;
    }

    const groupBy = this.groupBy();
    if (groupBy !== 'none') {
      const groupedItems: Record<string, ResearchItem[]> = {};
      sortedItems.forEach((item) => {
        let key = '';
        if (groupBy === 'year') {
          key = item.dateStart?.split('-')[0] || 'Unknown';
        } else if (groupBy === 'publicationType') {
          key = item.type || 'Unknown';
        } else if (groupBy === 'project') {
          key = item.project || 'Unknown';
        }
        if (!groupedItems[key]) {
          groupedItems[key] = [item];
        } else {
          groupedItems[key].push(item);
        }
      });
    }
    return sortedItems;
  }

  private updateFilterCounts(optionsSignal: WritableSignal<SearchListOption[]>, type: string) {
    let value: SearchListOption[] = [];
    value = optionsSignal().map((option) => ({
      ...option,
      count: this.data().filter((item) => {
        if (Array.isArray(item[type as keyof ResearchItem])) {
          return (item[type as keyof ResearchItem] as string[]).includes(option.id);
        }
        if (type === 'year') {
          return item.dateStart.split('-')[0] === option.id;
        }
        return item[type as keyof ResearchItem] === option.id;
      }).length,
    }));
    optionsSignal.set(value);
  }

  private setCurrentFiltersFromParams() {
    const queryParams = this.route.snapshot.queryParams;
    this.search.set(queryParams['search']);
    const filterIds: Record<string, string[]> = {};
    PARAMS.forEach((type) => {
      if (queryParams[type]) {
        filterIds[type] = Array.isArray(queryParams[type]) ? queryParams[type] : [queryParams[type]];
      }
    });

    this.currentFilters.set({
      category: this.categoryOptions().filter((cat) => filterIds['category']?.includes(cat.id)),
      people: this.people().filter((person) => filterIds['people']?.includes(person.id)),
      year: this.yearOptions().filter((yr) => filterIds['year']?.includes(yr.id)),
      type: this.publicationTypes().filter((type) => filterIds['publication-type']?.includes(type.id)),
      eventType: this.eventOptions().filter((type) => filterIds['event-type']?.includes(type.id)),
      fundingType: this.fundingOptions().filter((type) => filterIds['funding-type']?.includes(type.id)),
      project: this.projectOptions().filter((type) => filterIds['project']?.includes(type.id)),
    });
  }

  private setYearOptions() {
    const years = Array.from(new Set(this.data().map((item) => item.dateStart.split('-')[0]))).sort(
      (a, b) => parseInt(b) - parseInt(a),
    );
    this.yearOptions.set(years.map((year) => ({ id: year, label: year })));
  }

  private filterResults(): ResearchItem[] {
    let filteredData = this.data() || [];
    const currentFilters = this.currentFilters();

    if (this.search() && this.search() !== '') {
      filteredData = filteredData.filter((dataItem) =>
        dataItem.title?.toLowerCase().includes(this.search().toLowerCase()),
      );
    }

    PARAMS.forEach((type) => {
      const paramToResearchItemKey: Record<string, string> = {
        category: 'category',
        people: 'people',
        year: 'dateStart',
        'event-type': 'eventType',
        'funding-type': 'fundingType',
        'publication-type': 'type',
        project: 'project',
      };

      const itemKey = paramToResearchItemKey[type] as keyof ResearchItem;
      const currentFilterValue = type === 'year' ? currentFilters['year'] : currentFilters[itemKey];

      if (currentFilterValue && currentFilterValue.length > 0) {
        filteredData = filteredData.filter((item) => {
          if (type === 'year' || Array.isArray(item[itemKey])) {
            return currentFilterValue.some((option) => item[itemKey]?.includes(option.id));
          }
          return currentFilterValue.some((option) => option.id === item[itemKey]);
        });
      }
    });

    this.updateQueryParamsFromFilters();
    return this.setControls(filteredData);
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
    const { category, eventType, fundingType, type, people, project, year } = this.currentFilters();
    return [
      {
        id: 'category',
        label: 'Category',
        options: this.categoryOptions(),
        selected: category,
      },
      {
        id: 'eventType',
        label: 'Event type',
        options: this.eventOptions(),
        selected: eventType,
      },
      {
        id: 'fundingType',
        label: 'Funding type',
        options: this.fundingOptions(),
        selected: fundingType,
      },
      {
        id: 'type',
        label: 'Publication type',
        options: this.publicationTypes(),
        selected: type,
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
        options: this.projectOptions(),
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
    const newCurrentFilters: Record<string, SearchListOption[]> = {};
    updatedFilters.forEach((filter) => {
      if (filter.selected && filter.selected.length > 0) {
        newCurrentFilters[filter.id] = filter.selected;
      }
    });
    this.currentFilters.set(newCurrentFilters);
    this.updateQueryParamsFromFilters();
  }

  private updateQueryParamsFromFilters() {
    this.router.navigate(['/research'], {
      queryParams: {
        category: this.currentFilters()['category']?.map((cat) => cat.id),
        'event-type': this.currentFilters()['eventType']?.map((event) => event.id),
        'funding-type': this.currentFilters()['fundingType']?.map((funding) => funding.id),
        'publication-type': this.currentFilters()['type']?.map((pubType) => pubType.id),
        people: this.currentFilters()['people']?.map((person) => person.id),
        project: this.currentFilters()['project']?.map((proj) => proj.id),
        year: this.currentFilters()['year']?.map((year) => year.id),
        search: this.search() === '' ? null : this.search(),
      },
    });
  }

  clearFilters() {
    this.search.set('');
    this.currentFilters.set({});
    this.updateQueryParamsFromFilters();
  }

  fetchTagLabels(tags: string[]): string[] {
    return tags.map((tag) => {
      return this.tags().find((tagg) => tagg.slug === tag)?.name || '';
    });
  }
}
