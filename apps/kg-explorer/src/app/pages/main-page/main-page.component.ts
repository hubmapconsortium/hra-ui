import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { fromEvent, Observable } from 'rxjs';

import { FilterFormValues, FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';
import {
  AsctbTerms,
  DigitalObjectInfo,
  DigitalObjectMetadata,
  DigitalObjectsJsonLd,
  TermsIndex,
} from '../../digital-objects-metadata.schema';
import { DownloadService } from '../../services/download.service';
import { DigitalObjectInfoWithHraVersions, FilterService } from '../../services/filter.service';
import {
  FILTER_CATEGORY_INFO,
  FilterOptionCategory,
  getOrganIcon,
  getProductIcon,
  getProductLabel,
  handleValue,
  sentenceCase,
} from '../../utils/utils';

/** Current filter interface (each category contains string of filter option IDs) */
export interface CurrentFilters {
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
  /** File download service */
  readonly download = inject(DownloadService);

  readonly filter = inject(FilterService);
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

  readonly asctbTerms = input.required<AsctbTerms>();
  readonly termsIndex = input.required<TermsIndex>();

  /** Filtered rows to display */
  readonly filteredRows = signal<TableRow[]>([]);
  /** Whether or not the filter menu is closed */
  readonly filterClosed = signal<boolean>(false);
  /** Filter categories */
  readonly filterCategories = signal<Record<string, FilterOptionCategory>>(FILTER_CATEGORY_INFO);
  /** Currently selected filters */
  readonly filters = signal<CurrentFilters>({});
  /** Scroll viewport height for the digital object table */
  readonly scrollHeight = signal(0);
  /** Id of digital object to download */
  readonly downloadId = signal<string | undefined>(undefined);

  /** Filter categories as an array */
  readonly filterCategoriesArray = computed<FilterOptionCategory[]>(() => Object.values(this.filterCategories()));

  /**
   * Sets the initial filters according to query params
   * Sets filtered rows to all rows on init
   * Fetches file download metadata for each object
   * Update filter when searchbar input changes
   * Populates all filter options
   * Get download options for an object whenever the download button is clicked
   * Set scroll viewport height when window is resized
   */
  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams;
    queryParams$.subscribe((queryParams) => this.setFiltersFomParams(queryParams));

    toObservable(this.data).subscribe((items) => {
      const objectData = this.resolveData(items['@graph']);
      this.filter.allRows.set(objectData);
      this.filteredRows.set(this.filter.allRows());
      this.filter.setVersionCounts(items['@graph'] as DigitalObjectInfoWithHraVersions[]);
    });

    toObservable(this.termsIndex).subscribe((index) => {
      this.filter.data.set(this.data());
      this.filter.asctbTerms.set(this.asctbTerms());
      this.filter.termsIndex.set(index);
    });

    this.searchControl.valueChanges.subscribe((result?: string) => {
      this.onSearchChange(result === '' ? undefined : result);
    });

    effect(() => {
      this.populateFilterOptions();
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

  /**
   * Sets filters from query params in the url
   * @param queryParams Query params from the route
   */
  private setFiltersFomParams(queryParams: Params) {
    const dObjects = queryParams['do'];
    const versions = queryParams['versions'];
    const organs = queryParams['organs'];
    const as = queryParams['as'];
    const ct = queryParams['ct'];
    const b = queryParams['b'];
    const search = queryParams['search'];

    this.filters.set({
      digitalObjects: dObjects,
      releaseVersion: handleValue(versions),
      organs: handleValue(organs),
      anatomicalStructures: handleValue(as),
      cellTypes: handleValue(ct),
      biomarkers: handleValue(b),
      searchTerm: search ?? '',
    });
    this.searchControl.patchValue(this.filters().searchTerm);
  }

  /**
   * Updates current filter selections when changed
   * @param formControls
   */
  handleFilterSelectionChanges(formValues: FilterFormValues) {
    const updatedFilters: CurrentFilters = {
      digitalObjects: formValues.digitalObjects?.map((obj) => obj.id) || undefined,
      releaseVersion: formValues.releaseVersion?.map((obj) => obj.id) || undefined,
      organs: formValues.organs?.map((obj) => obj.id) || undefined,
      anatomicalStructures: formValues.anatomicalStructures?.map((obj) => obj.id) || undefined,
      cellTypes: formValues.cellTypes?.map((obj) => obj.id) || undefined,
      biomarkers: formValues.biomarkers?.map((obj) => obj.id) || undefined,
      searchTerm: this.filters().searchTerm || undefined,
    };

    this.filters.set(updatedFilters);
    this.updateQueryParamsFromFilters();
  }

  /**
   * Updates query params based on current filters
   */
  private updateQueryParamsFromFilters() {
    this.router.navigate([''], {
      queryParams: {
        do: this.filters().digitalObjects,
        versions: this.filters().releaseVersion,
        organs: this.filters().organs,
        as: this.filters().anatomicalStructures,
        ct: this.filters().cellTypes,
        b: this.filters().biomarkers,
        search: this.filters().searchTerm,
      },
    });
  }

  /**
   * Populates filter categories with options
   */
  private populateFilterOptions() {
    this.filterCategories.update((categories) => {
      return {
        digitalObjects: {
          ...categories['digitalObjects'],
          options: this.filter.digitalObjectsOptions(),
        },
        releaseVersions: {
          ...categories['releaseVersions'],
          options: this.filter.hraVersionsOptions(),
        },
        organs: {
          ...categories['organs'],
          options: this.filter.generateOrganOptions(),
        },
        anatomicalStructures: {
          ...categories['anatomicalStructures'],
          options: this.filter.generateAsctbOptions('AS', this.asctbTerms()),
        },
        cellTypes: {
          ...categories['cellTypes'],
          options: this.filter.generateAsctbOptions('CT', this.asctbTerms()),
        },
        biomarkers: {
          ...categories['biomarkers'],
          options: this.filter.generateAsctbOptions('BM', this.asctbTerms()),
        },
      };
    });
  }

  /**
   * Applies additional filters to digital objects obtained from KG search and sets new filtered rows
   */
  private applyMoreFilters(searchResults: string[]) {
    let newFilteredRows = this.filter.allRows();
    newFilteredRows = newFilteredRows.filter((row) => searchResults.includes(row['purl'] as string));

    if (this.filters().searchTerm && this.filters().searchTerm !== '') {
      newFilteredRows = this.filterSearchFormResults(newFilteredRows);
    }

    if (this.filters().digitalObjects) {
      newFilteredRows = this.filterDigitalObjectResults(newFilteredRows);
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
      return (row['title'] as string).toLowerCase().includes((this.filters().searchTerm ?? '').toLowerCase());
    });
  }

  /**
   * Filters an array of results by selected digital object filters
   * @param currentResults Results to filter
   * @returns Filtered results
   */
  private filterDigitalObjectResults(currentResults: TableRow[]): TableRow[] {
    const currentDigitalObjectsFilters = this.filters().digitalObjects;
    if (currentDigitalObjectsFilters && currentDigitalObjectsFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) => currentDigitalObjectsFilters?.includes(row['doType'] as string));
  }

  /**
   * Performs KG DO search for selected ontology, cell type, biomarker, and HRA release version filters
   * @returns object search
   */
  private digitalObjectSearch(): Observable<string[]> {
    const currentOrganFilters = this.filters().organs;
    const currentAnatomicalStructuresFilters = this.filters().anatomicalStructures;
    const currentCellTypesFilters = this.filters().cellTypes;
    const currentBiomarkerFilters = this.filters().biomarkers;
    const currentHraVersionFilters = this.filters().releaseVersion;

    return this.filter.doSearch({
      organs: currentOrganFilters || [],
      versions: currentHraVersionFilters || [],
      ontologyTerms: currentAnatomicalStructuresFilters || [],
      cellTypeTerms: currentCellTypesFilters || [],
      biomarkerTerms: currentBiomarkerFilters || [],
    });
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
      const organLabel = item.organs ? handleValue(item.organs)?.[0] : undefined;
      return {
        id: item.lod,
        purl: item.purl,
        doType: item.doType,
        hraVersions: item.hraVersions,
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
        lastPublished: this.formatDateToYYYYMM(item.lastUpdated['@value']),
      } as TableRow;
    });
  }

  /**
   * Makes metadata request for the object matching downloadId and attaches download options to the row
   */
  private attachDownloadOptions() {
    if (this.downloadId()) {
      this.http.get(this.downloadId() || '', { responseType: 'json' }).subscribe((data) => {
        const match = this.filter.allRows().find((row) => row['id'] === this.downloadId());
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
    this.filters.set({
      ...this.filters(),
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
