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
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
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
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
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

const queryParamToOptionsKey: Record<string, string> = {
  category: 'category',
  'event-type': 'eventType',
  'funding-type': 'fundingType',
  'publication-type': 'type',
  people: 'people',
  // project: 'project',
  year: 'year',
};

const VIEW_AS_OPTIONS = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'list', label: 'List' },
];

const SORT_BY_OPTIONS = [
  { id: 'nameAsc', label: 'Ascending (A-Z) by title' },
  { id: 'nameDesc', label: 'Descending (Z-A) by title' },
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
];

const DEFAULT_GROUP_OPTIONS = [
  { id: 'none', label: 'None' },
  // { id: 'project', label: 'Project' },
  { id: 'type', label: 'Publication type' },
  { id: 'year', label: 'Year' },
];

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
    SectionLinkComponent,
  ],
  templateUrl: './research-page.component.html',
  styleUrl: './research-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly headerEvents = inject(HeaderEventsService);

  /** Reference to sidenav element */
  readonly sidenav = viewChild<MatSidenav>('sidenav');

  readonly data = input.required<ResearchPageData>();
  readonly options = model.required<Record<string, SearchListOption[]>>();

  readonly tags = input<{ slug: string; name: string; description: string }[]>([]);

  /** Current search bar value */
  readonly search = signal<string>('');

  readonly currentFilters = signal<Record<string, SearchListOption[]>>({});

  readonly viewAsOptions = signal<SearchListOption[]>(VIEW_AS_OPTIONS);
  readonly sortByOptions = signal<SearchListOption[]>(SORT_BY_OPTIONS);
  readonly groupByOptions = computed<SearchListOption[]>(() => {
    const qp = this.queryParams() as Params;
    if (qp['category']) {
      const category = Array.isArray(qp['category']) ? qp['category'][0] : qp['category'];
      if (category.length > 0 && !category.includes('publications')) {
        return DEFAULT_GROUP_OPTIONS.filter((option) => option.id !== 'type');
      }
    }
    return DEFAULT_GROUP_OPTIONS;
  });

  readonly viewType = signal<ViewType>('gallery');
  readonly sortBy = signal<string>('newest');
  readonly groupBy = signal<string | undefined>(undefined);

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

  readonly queryParams = toSignal(this.route.queryParams, { initialValue: {} });

  readonly pageLoaded = signal<boolean>(false);

  constructor() {
    toObservable(this.data).subscribe(() => {
      this.setYearOptions();
      this.updateFilterCounts();
    });

    effect(() => {
      this.setControls();
      this.setCurrentFiltersFromParams();
      this.headerEvents.menuState.set(this.isWideScreen());
    });

    toObservable(this.groupByOptions).subscribe((options) => {
      if (!options.find((x) => x.id === 'type') && this.groupBy() === 'type') {
        this.groupBy.set(undefined);
      }
      if (!options.find((x) => x.id === 'project') && this.groupBy() === 'project') {
        this.groupBy.set(undefined);
      }
    });
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

  convertToListItems(data: ResearchPageData): ListViewGroup[] {
    const { groupBy, options } = this;
    const groupedData: Record<string, string[]> = {};
    data.forEach((item) => {
      let type = '';
      if (!groupBy() || groupBy() === 'none') {
        groupedData['All'] = data.map((itm) => itm.description || '');
      } else {
        if (groupBy() === 'year') {
          type = item.dateStart?.split('-')[0];
        }
        if (groupBy() === 'type') {
          type = options()['type'].find((pubType) => pubType.id === item.type)?.label || 'Other';
        }
        if (groupBy() === 'project') {
          type = item.project || 'Other';
        }
        if (!groupedData[type]) {
          groupedData[type] = [item.description || ''];
        } else {
          groupedData[type].push(item.description || '');
        }
      }
    });
    const listItems = Object.entries(groupedData);
    if (groupBy() === 'year') {
      listItems.sort((a, b) => b[0].localeCompare(a[0])); //sort by year in descending order
    } else {
      listItems.sort((a, b) => a[0].localeCompare(b[0])); //sort by type in alphabetical order
    }

    return listItems.map(([type, descriptions]) => ({
      group: type,
      items: descriptions.map((description) => ({ content: description })),
    }));
  }

  setGroupedItems(data: ResearchPageData): [string, ResearchItem[]][] {
    const { groupBy, options } = this;
    const groupedItems: Map<string, ResearchItem[]> = new Map();
    if (!groupBy() || groupBy() === 'none') {
      return [];
    }
    data.forEach((item) => {
      let key = '';
      if (groupBy() === 'year') {
        key = item.dateStart.split('-')[0];
      } else if (groupBy() === 'type') {
        const title = options()['type'].find((pubType) => pubType.id === item.type)?.label;
        key = title || 'Other';
      } else if (groupBy() === 'project') {
        key = item.project || 'Other';
      }

      if (!groupedItems.has(key)) {
        groupedItems.set(key, [item]);
      } else {
        groupedItems.get(key)?.push(item);
      }
    });
    const groups = Array.from(groupedItems.entries());

    if (groupBy() === 'year') {
      groups.sort((a, b) => parseInt(b[0]) - parseInt(a[0])); //sort by year in descending order
      return groups;
    }
    const sortedGroups = groups.sort((a, b) => a[0].localeCompare(b[0])); //sort by type in alphabetical order
    return sortedGroups;
  }

  private setControls() {
    if (this.pageLoaded()) {
      return;
    }
    const params = this.queryParams() as Params;
    this.sortBy.set('newest');
    this.viewType.set('gallery');
    if (params['category']) {
      const category = Array.isArray(params['category']) ? params['category'][0] : params['category'];
      if (category === 'visualizations') {
        this.groupBy.set('year');
      }
      if (['publications', 'events', 'funding', 'presentations'].includes(category)) {
        this.viewType.set('list');
        this.groupBy.set('year');
      }
    }
    this.pageLoaded.set(true);
  }

  private setSortedItems(data: ResearchPageData): ResearchItem[] {
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

    return sortedItems;
  }

  private updateFilterCounts() {
    const updatedOptions = this.options();
    Object.values(queryParamToOptionsKey).forEach((key) => {
      updatedOptions[key] = this.options()[key].map((option) => ({
        ...option,
        count: this.data().filter((item) => {
          if (key === 'people') {
            return item.people.includes(option.id);
          }
          if (key === 'year') {
            return item.dateStart.split('-')[0] === option.id;
          }
          return item[key as keyof ResearchItem] === option.id;
        }).length,
      }));
    });
    this.options.set(updatedOptions);
  }

  private setCurrentFiltersFromParams() {
    const queryParams = this.queryParams() as Params;
    const queryParamsArray: Record<string, string[]> = {};

    this.search.set(queryParams['search']);

    if (Object.values(queryParams).length === 0) {
      this.clearFilters();
    }
    Object.keys(queryParamToOptionsKey).forEach((type) => {
      if (queryParams[type]) {
        queryParamsArray[type] = Array.isArray(queryParams[type]) ? queryParams[type] : [queryParams[type]];
      }
    });
    Object.entries(queryParamToOptionsKey).forEach(([queryParam, optionKey]) => {
      this.currentFilters.update((filters) => {
        {
          if (queryParamsArray[queryParam]) {
            return {
              ...filters,
              [optionKey]: this.options()[optionKey].filter((option) =>
                queryParamsArray[queryParam].includes(option.id),
              ),
            };
          }
          return filters;
        }
      });
    });
  }

  private setYearOptions() {
    const years = Array.from(new Set(this.data().map((item) => item.dateStart.split('-')[0]))).sort(
      (a, b) => parseInt(b) - parseInt(a),
    );
    this.options.update((opts) => ({
      ...opts,
      year: years.map((year) => ({ id: year, label: year })),
    }));
  }

  private filterResults(): ResearchItem[] {
    let filteredData = this.data() || [];
    const currentFilters = this.currentFilters();
    if (this.search() && this.search() !== '') {
      filteredData = filteredData.filter((dataItem) =>
        dataItem.title?.toLowerCase().includes(this.search().toLowerCase()),
      );
    }

    Object.keys(queryParamToOptionsKey).forEach((type) => {
      const itemKey = queryParamToOptionsKey[type] as keyof ResearchItem;
      const currentFilterValue = type === 'year' ? currentFilters['year'] : currentFilters[itemKey];
      if (currentFilterValue && currentFilterValue.length > 0) {
        filteredData = filteredData.filter((item) => {
          if (type === 'year') {
            return currentFilterValue.some((option) => item.dateStart.split('-')[0] === option.id);
          }
          if (Array.isArray(item[itemKey])) {
            return currentFilterValue.some((option) => item[itemKey]?.includes(option.id));
          }
          return currentFilterValue.some((option) => option.id === item[itemKey]);
        });
      }
    });
    this.updateQueryParamsFromFilters();

    return this.setSortedItems(filteredData);
  }

  private currentFiltersToFilters(): FilterOptionCategory<SearchListOption>[] {
    return Object.entries(queryParamToOptionsKey).map(([queryParam, optionsKey]) => {
      return {
        id: optionsKey,
        label: queryParam.replace('-', ' ').replace(queryParam[0], queryParam[0].toUpperCase()),
        options: this.options()[optionsKey],
        selected: this.currentFilters()[optionsKey],
      };
    });
  }

  private updateQueryParamsFromFilters() {
    const queryParams = {} as Params;
    Object.entries(queryParamToOptionsKey).forEach(([queryParam, optionsKey]) => {
      queryParams[queryParam] = this.currentFilters()[optionsKey]?.map((option) => option.id);
    });
    queryParams['search'] = this.search() === '' ? null : this.search();
    this.router.navigate(['/research'], {
      queryParams,
    });
  }
}
