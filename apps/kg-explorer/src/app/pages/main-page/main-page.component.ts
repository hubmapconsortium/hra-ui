import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DigitalObjectInfo, DigitalObjectsJsonLd, HraKgService, OntologyTree } from '@hra-api/ng-client';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { FilterMenuComponent, FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';

import { NavigationModule } from '@hra-ui/design-system/navigation';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { fromEvent, Observable } from 'rxjs';

import { SearchListOption } from '@hra-ui/design-system/search-list';
import { DigitalObjectMetadata } from '../../digital-objects-metadata.schema';
import { DownloadService } from '../../services/download.service';
import {
  FILTER_CATEGORY_INFO,
  getOrganIcon,
  getOrganId,
  getProductIcon,
  getProductLabel,
  getProductTooltip,
  HRA_VERSION_DATA,
  sentenceCase,
} from '../../utils/utils';

/** Digital object info interface with hraVersions */
interface DigitalObjectInfoWithHraVersions extends DigitalObjectInfo {
  /** List of HRA versions for the object */
  hraVersions: string[];
}

/** Current active filter ids (each category contains string of filter option IDs) */
export interface FilterIds {
  /** Digital object filters */
  digitalObjects?: string[];
  /** Release version filters */
  releaseVersion?: string[];
  /** Organ filters */
  organs?: string[];
  /** Anatomical structures filters */
  anatomicalStructures?: string[];
  /** Cell type filters */
  cellTypes?: string[];
  /** Biomarker filters */
  biomarkers?: string[];
  /** Search term filters */
  searchTerm?: string;
}

/** Amount in pixels to move scrollbar downwards so it doesn't start at the header */
const SCROLLBAR_TOP_OFFSET = '86';

/**
 * This component is used for rendering the main page of the application. Contains digital object table and filters.
 */
@Component({
  selector: 'hra-kg-main-page',
  imports: [
    HraCommonModule,
    TableComponent,
    BrandModule,
    ResultsIndicatorComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    IconsModule,
    FilterMenuComponent,
    MatSidenavModule,
    ButtonsModule,
    NavigationModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.filter-closed]': 'filterClosed()',
    '[style.--view-height]': 'scrollHeight()',
    '[style.--scrollbar-top-offset]': SCROLLBAR_TOP_OFFSET,
  },
})
export class MainPageComponent {
  /** Http service */
  private readonly http = inject(HttpClient);
  /** HRA KG API service */
  private readonly kg = inject(HraKgService);
  /** File download service */
  readonly download = inject(DownloadService);
  /** Router service */
  readonly router = inject(Router);

  /** Form control for search input */
  readonly searchControl = new UntypedFormControl();

  /** Whether the user is on a wide screen */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');
  /** Whether the user is on a small screen */
  protected isSmallScreen = watchBreakpoint('(max-width: 639px)');

  /** Raw digital objects data */
  readonly data = input.required<DigitalObjectsJsonLd>();
  /** Column info */
  readonly columns = input.required<TableColumn[]>();
  /** ASCT+B term occurence data */
  readonly asctbTermOccurrences = input.required<[string, number][]>();
  /** Ontology tree data */
  readonly ontologyTree = input.required<OntologyTree>();
  /** Cell type tree data */
  readonly cellTypeTree = input.required<OntologyTree>();
  /** Biomarker tree data */
  readonly biomarkerTree = input.required<OntologyTree>();

  /** All rows in the data */
  readonly allRows = signal<TableRow[]>([]);
  /** Filtered rows to display */
  readonly filteredRows = signal<TableRow[]>([]);
  /** Whether or not the filter menu is closed */
  readonly filterClosed = signal<boolean>(false);
  /** Filter categories */
  readonly filterCategories = signal<FilterOptionCategory<SearchListOption>[]>(FILTER_CATEGORY_INFO);
  /** Currently selected filter ids (and search value) */
  readonly currentFilterIds = signal<FilterIds>({});
  /** Scroll viewport height for the digital object table */
  readonly scrollHeight = signal(0);
  /** Records HRA version counts for the version filter */
  readonly versionCounts = signal<Record<string, number>>({});
  /** Id of digital object to download */
  readonly downloadId = signal<string | undefined>(undefined);

  /**
   * Initializes query-param and data subscriptions.
   * Syncs search input changes back to filters and URL query params.
   * Runs object search/filter effects and attaches download options on demand.
   * Calculates and updates table viewport height on initial render and resize.
   */
  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams;
    queryParams$.subscribe((queryParams) => this.setFiltersFomParams(queryParams));

    toObservable(this.data).subscribe((items) => {
      const objectData = this.resolveData(items['@graph']);
      this.allRows.set(objectData);
      this.filteredRows.set(this.allRows());
      this.setVersionCounts(items['@graph'] as DigitalObjectInfoWithHraVersions[]);
      this.populateFilterOptions();
    });

    this.searchControl.valueChanges.subscribe((result?: string) => {
      this.onSearchChange(result === '' ? undefined : result);
    });

    effect(() => {
      this.digitalObjectSearch().subscribe((results) => {
        this.applyMoreFilters(results);
      });
    });

    effect(() => {
      this.attachDownloadOptions();
    });

    this.setScrollViewportHeight();
    fromEvent(window, 'resize').subscribe(() => this.setScrollViewportHeight());
  }

  /** Normalizes query param values to string array */
  private toStringArray(value: unknown): string[] | undefined {
    if (typeof value === 'string') {
      return [value];
    }
    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === 'string');
    }
    return undefined;
  }

  /**
   * Sets filters from query params in the url
   * @param queryParams Query params from the route
   */
  private setFiltersFomParams(queryParams: Params) {
    const dObjects = this.toStringArray(queryParams['do']);
    const versions = this.toStringArray(queryParams['versions']);
    const organs = this.toStringArray(queryParams['organs']);
    const as = this.toStringArray(queryParams['as']);
    const ct = this.toStringArray(queryParams['ct']);
    const b = this.toStringArray(queryParams['b']);
    const search = queryParams['search'];

    this.currentFilterIds.set({
      digitalObjects: dObjects,
      releaseVersion: versions,
      organs: organs,
      anatomicalStructures: as,
      cellTypes: ct,
      biomarkers: b,
      searchTerm: search ?? '',
    });

    this.searchControl.patchValue(this.currentFilterIds().searchTerm);
  }

  /**
   * Sets the version filter counts from the data
   * @param data Digital object data
   */
  private setVersionCounts(data: DigitalObjectInfoWithHraVersions[]) {
    const result: Record<string, number> = {};
    const allVersions = data.map((object) => object.hraVersions);
    const flatVersions = allVersions.flat();
    for (const version of flatVersions) {
      if (result[version]) {
        result[version] += 1;
      } else {
        result[version] = 1;
      }
    }
    this.versionCounts.set(result);
  }

  /**
   * Updates current filter selections when changed
   * @param filters Updated filters with options
   */
  handleFilterSelectionChanges(filters: FilterOptionCategory<SearchListOption>[]) {
    this.filterCategories.set(filters);
    this.currentFilterIds.set({
      digitalObjects: filters.find((f) => f.id === 'digitalObjects')?.selected?.map((obj) => obj.id),
      releaseVersion: filters.find((f) => f.id === 'releaseVersion')?.selected?.map((obj) => obj.id),
      organs: filters.find((f) => f.id === 'organs')?.selected?.map((obj) => obj.id),
      anatomicalStructures: filters.find((f) => f.id === 'anatomicalStructures')?.selected?.map((obj) => obj.id),
      cellTypes: filters.find((f) => f.id === 'cellTypes')?.selected?.map((obj) => obj.id),
      biomarkers: filters.find((f) => f.id === 'biomarkers')?.selected?.map((obj) => obj.id),
      searchTerm: this.currentFilterIds().searchTerm,
    });
    this.updateQueryParamsFromFilters();
  }

  /**
   * Updates query params based on current filters
   */
  private updateQueryParamsFromFilters() {
    this.router.navigate([''], {
      queryParams: {
        do: this.currentFilterIds().digitalObjects,
        versions: this.currentFilterIds().releaseVersion,
        organs: this.currentFilterIds().organs,
        as: this.currentFilterIds().anatomicalStructures,
        ct: this.currentFilterIds().cellTypes,
        b: this.currentFilterIds().biomarkers,
        search: this.currentFilterIds().searchTerm,
      },
    });
  }

  /**
   * Calculates number of results for a filter option
   * @param filterOption Name of filter option
   * @param category Category to which the filter option belongs (e.g. 'doType' for digital object types, 'organIds' for organs, etc.)
   * @returns Number of results
   */
  private calculateCount(filterOption: string, category: string): number {
    return this.allRows().filter((row) => {
      if (Array.isArray(row[category])) {
        return row[category].some((value) => String(value).toLowerCase().includes(filterOption.toLowerCase()));
      }
      return row[category] === filterOption;
    }).length;
  }

  /**
   * Returns list of digital objects in the data as filter options
   * @returns Filter options
   */
  private digitalObjectsOptions(): SearchListOption[] {
    return Array.from(this.kgFilterOptions().doOptions)
      .map((filterOption) => {
        return {
          id: filterOption,
          label: getProductLabel(filterOption),
          count: this.calculateCount(filterOption, 'doType'),
          tooltip: getProductTooltip(filterOption),
        };
      })
      .sort((o1, o2) => o1.label.localeCompare(o2.label));
  }

  /**
   * Returns HRA version data as filter options
   * @returns Filter options
   */
  private hraVersionsOptions(): SearchListOption[] {
    return Object.keys(HRA_VERSION_DATA)
      .map((filterOption) => {
        const versionData = HRA_VERSION_DATA[filterOption];
        return {
          id: filterOption,
          label: versionData.label,
          count: this.versionCounts()[filterOption],
          secondaryLabel: versionData.date,
        };
      })
      .sort((o1, o2) => o2.id.localeCompare(o1.id)); //Reverse order
  }

  /**
   * Returns list of organs in the data as filter options
   * @returns Filter options
   */
  private organsOptions(): SearchListOption[] {
    return Array.from(this.kgFilterOptions().organOptions)
      .map((organOption) => {
        return {
          id: organOption,
          label: sentenceCase(this.ontologyTree()?.nodes[organOption]?.label || ''),
          count: this.calculateCount(organOption, 'organIds'),
        };
      })
      .sort((o1, o2) => o1.label.localeCompare(o2.label));
  }

  /**
   * Returns ontology option data as filter options
   * @param data Tree data
   * @returns Filter options
   */
  private ontologyOptions(data: OntologyTree): SearchListOption[] {
    return this.asctbTermOccurrences()
      .filter((occurrence) => data.nodes[occurrence[0]])
      .map((occurrence) => {
        return {
          id: occurrence[0],
          label: data.nodes[occurrence[0]].label || '',
          count: occurrence[1],
        };
      })
      .sort((o1, o2) => o1.label.localeCompare(o2.label));
  }

  /**
   * Populates filter categories with options
   */
  private populateFilterOptions() {
    this.filterCategories.update((categories) => {
      return [
        this.withSelectedFromFilters('digitalObjects', categories[0], this.digitalObjectsOptions()),
        this.withSelectedFromFilters('releaseVersion', categories[1], this.hraVersionsOptions()),
        this.withSelectedFromFilters('organs', categories[2], this.organsOptions()),
        this.withSelectedFromFilters('anatomicalStructures', categories[3], this.ontologyOptions(this.ontologyTree())),
        this.withSelectedFromFilters('cellTypes', categories[4], this.ontologyOptions(this.cellTypeTree())),
        this.withSelectedFromFilters('biomarkers', categories[5], this.ontologyOptions(this.biomarkerTree())),
      ];
    });
  }

  /**
   * Returns updated filter category with selected options based on current filters
   * @param key Key of filter category to update
   * @param category Filter category to update
   * @param options Options for the filter category
   * @returns Updated filter category with selected options
   */
  private withSelectedFromFilters(
    key: keyof FilterIds,
    category: FilterOptionCategory<SearchListOption>,
    options: SearchListOption[],
  ): FilterOptionCategory<SearchListOption> {
    const selectedIds = new Set(this.currentFilterIds()[key] ?? []);
    return {
      ...category,
      options,
      selected: options.filter((option) => selectedIds.has(option.id)),
    };
  }

  /**
   * Applies additional filters to digital objects obtained from KG search and sets new filtered rows
   * @param searchResults List of digital object IDs obtained from KG search with selected filters
   */
  private applyMoreFilters(searchResults: string[]) {
    let newFilteredRows = this.allRows();
    newFilteredRows = newFilteredRows.filter((row) => searchResults.includes(row['purl'] as string));

    if (this.currentFilterIds().searchTerm && this.currentFilterIds().searchTerm !== '') {
      newFilteredRows = this.filterSearchFormResults(newFilteredRows);
    }

    if (this.currentFilterIds().digitalObjects) {
      newFilteredRows = this.filterDigitalObjectResults(newFilteredRows);
    }

    if (this.currentFilterIds().organs) {
      newFilteredRows = this.filterOrganResults(newFilteredRows);
    }
    this.filteredRows.set(newFilteredRows);
  }

  /**
   * Filters an array of results by the search form input
   * @param currentResults Results to filter
   * @returns Filtered results
   */
  private filterSearchFormResults(currentResults: TableRow[]): TableRow[] {
    return currentResults.filter((row) => {
      return (row['title'] as string).toLowerCase().includes((this.currentFilterIds().searchTerm ?? '').toLowerCase());
    });
  }

  /**
   * Filters an array of results by selected digital object filters
   * @param currentResults Results to filter
   * @returns Filtered results
   */
  private filterDigitalObjectResults(currentResults: TableRow[]): TableRow[] {
    const currentDigitalObjectsFilters = this.currentFilterIds().digitalObjects;
    if (currentDigitalObjectsFilters && currentDigitalObjectsFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) => currentDigitalObjectsFilters?.includes(row['doType'] as string));
  }

  /**
   * Filters an array of results by selected organ filters
   * @param currentResults Results to filter
   * @returns Filtered results
   */
  private filterOrganResults(currentResults: TableRow[]): TableRow[] {
    const currentOrganFilters = this.currentFilterIds().organs;
    if (currentOrganFilters && currentOrganFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) =>
      ((row['organIds'] as string[]) ?? []).some((value) => currentOrganFilters?.includes(value)),
    );
  }

  /**
   * Performs KG DO search for selected ontology, cell type, biomarker, and HRA release version filters
   * @returns object search
   */
  private digitalObjectSearch(): Observable<string[]> {
    const currentAnatomicalStructuresFilters = this.currentFilterIds().anatomicalStructures;
    const currentCellTypesFilters = this.currentFilterIds().cellTypes;
    const currentBiomarkerFilters = this.currentFilterIds().biomarkers;
    const currentHraVersionFilters = this.currentFilterIds().releaseVersion;

    return this.kg.doSearch({
      ontologyTerms: currentAnatomicalStructuresFilters,
      cellTypeTerms: currentCellTypesFilters,
      biomarkerTerms: currentBiomarkerFilters,
      hraVersions: currentHraVersionFilters,
    });
  }

  /**
   * Returns unique filter options for digital objects, versions, and organs from KG API data
   */
  private kgFilterOptions() {
    const objectFilterOptions = new Set<string>();
    const organFilterOptions = new Set<string>();
    this.allRows().forEach((row) => {
      const type = row['doType'];
      objectFilterOptions.add(type as string);
      const organs = row['organIds'] as string[];
      if (organs) {
        for (const organ of organs) {
          organFilterOptions.add(organ);
        }
      }
    });
    return {
      doOptions: objectFilterOptions,
      organOptions: organFilterOptions,
    };
  }

  /**
   * Resolves raw digital object data into array of TableRow
   * @param data Raw digital object data
   * @returns Data as TableRow[]
   */
  private resolveData(data?: DigitalObjectInfo[]): TableRow[] {
    if (!data) {
      return [];
    }
    return data.map((item) => {
      const organId = getOrganId(item);
      const organLabel = this.ontologyTree()?.nodes[organId]?.label;
      return {
        id: item.lod,
        purl: item.purl,
        doType: item.doType,
        doVersion: item.doVersion,
        organIds: item.organIds,
        title: item.title,
        objectUrl: `${item.doType}/${item.doName}/latest`,
        typeIcon: getProductIcon(item.doType),
        typeTooltip: getProductLabel(item.doType),
        organIcon: getOrganIcon(item),
        organTooltip: sentenceCase(organLabel || 'All Organs'),
        cellCount: item.cell_count,
        biomarkerCount: item.biomarker_count,
        lastPublished: this.formatDateToYYYYMM(item.lastUpdated),
      } as TableRow;
    });
  }

  /**
   * Makes metadata request for the object matching downloadId and attaches download options to the row
   */
  private attachDownloadOptions() {
    if (this.downloadId()) {
      this.http.get(this.downloadId() || '', { responseType: 'json' }).subscribe((data) => {
        const match = this.allRows().find((row) => row['id'] === this.downloadId());
        if (match) {
          match['downloadOptions'] = this.download.getDownloadOptions(data as DigitalObjectMetadata);
        }
      });
    }
  }

  /**
   * Updates filteredRows on searchTerm input
   * @param searchTerm Search input
   */
  private onSearchChange(searchTerm?: string): void {
    this.currentFilterIds.set({
      ...this.currentFilterIds(),
      searchTerm,
    });

    this.updateQueryParamsFromFilters();
  }

  /**
   * Formats Date to yyyy-mm
   * @param dateString Date string
   * @returns Date as yyyy-mm
   */
  private formatDateToYYYYMM(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  /**
   * Returns table scrollbar viewport height
   * @returns viewport height
   */
  private setScrollViewportHeight(): void {
    this.scrollHeight.set(window.innerHeight - (this.isSmallScreen() ? 259 : 299));
  }
}
