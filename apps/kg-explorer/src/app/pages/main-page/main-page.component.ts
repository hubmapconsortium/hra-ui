import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
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
  DigitalObjectMetadata,
  DigitalObjectsJsonLd,
  TermsIndex,
} from '../../digital-objects-metadata.schema';
import { DownloadService } from '../../services/download.service';
import { SearchService } from '../../services/search.service';
import { FiltersStore } from '../../state/filters.store';
import { FILTER_CATEGORY_INFO, FilterOptionCategory, FilterType, handleValue } from '../../utils/utils';

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
  /** Router service */
  readonly router = inject(Router);
  /** File download service */
  readonly download = inject(DownloadService);
  /** Search service */
  readonly search = inject(SearchService);
  /** Filters store */
  readonly store = inject(FiltersStore);

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
  readonly filterCategories = signal<FilterOptionCategory[]>([]);
  /** Scroll viewport height for the digital object table */
  readonly scrollHeight = signal(0);
  /** Id of digital object to download */
  readonly downloadId = signal<string | undefined>(undefined);

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
    queryParams$.subscribe((queryParams) => this.setFiltersFromQueryParams(queryParams));
    this.store.setData(this.data);
    this.store.setAsctbTerms(this.asctbTerms);
    this.store.setTermsIndex(this.termsIndex);

    this.searchControl.valueChanges.subscribe((result?: string) => {
      this.store.updateFilters({ ...this.store.filters(), searchTerm: result === '' ? undefined : result });
      this.updateQueryParamsFromFilters();
    });

    effect(() => {
      this.filteredRows.set(this.store.allRows());
      this.populateFilterOptions();
      this.attachDownloadOptions();
    });

    effect(() => {
      this.digitalObjectSearch().subscribe((results) => {
        const newFilteredRows = this.store.allRows().filter((row) => results.includes(row['purl'] as string));
        this.filteredRows.set(newFilteredRows);
      });
    });

    this.setScrollViewportHeight();
    fromEvent(window, 'resize').subscribe(() => this.setScrollViewportHeight());
  }

  /**
   * Sets filters from query params in the url
   * @param queryParams Query params from the route
   */
  private setFiltersFromQueryParams(queryParams: Params) {
    const dObjects = queryParams['do'];
    const versions = queryParams['versions'];
    const organs = queryParams['organs'];
    const as = queryParams['as'];
    const ct = queryParams['ct'];
    const b = queryParams['b'];
    const search = queryParams['search'];

    this.store.updateFilters({
      digitalObjects: dObjects,
      releaseVersion: handleValue(versions) || [],
      organs: handleValue(organs) || [],
      anatomicalStructures: handleValue(as) || [],
      cellTypes: handleValue(ct) || [],
      biomarkers: handleValue(b) || [],
      searchTerm: search ?? '',
    });
    this.searchControl.patchValue(this.store.filters().searchTerm);
  }

  /**
   * Updates query params based on current filters
   */
  private updateQueryParamsFromFilters() {
    this.router.navigate([''], {
      queryParams: {
        do: this.store.filters().digitalObjects,
        versions: this.store.filters().releaseVersion,
        organs: this.store.filters().organs,
        as: this.store.filters().anatomicalStructures,
        ct: this.store.filters().cellTypes,
        b: this.store.filters().biomarkers,
        search: this.store.filters().searchTerm,
      },
    });
  }

  /**
   * Updates current filter selections when changed
   * @param formControls
   */
  handleFilterSelectionChanges(formValues: FilterFormValues) {
    this.store.updateFiltersFromForm(formValues);
    this.updateQueryParamsFromFilters();
  }

  /**
   * Populates filter categories with options
   */
  private populateFilterOptions() {
    const keys = Object.keys(FILTER_CATEGORY_INFO);
    const values = Object.values(FILTER_CATEGORY_INFO);
    const categories = values.map((categoryInfo, index) => ({
      ...categoryInfo,
      options: this.store.allFilters()[keys[index] as FilterType],
    }));

    this.filterCategories.update(() => categories);
  }

  /**
   * Makes metadata request for the object matching downloadId and attaches download options to the row
   */
  private attachDownloadOptions() {
    if (this.downloadId()) {
      this.http.get(this.downloadId() || '', { responseType: 'json' }).subscribe((data) => {
        const match = this.store.allRows().find((row) => row['id'] === this.downloadId());
        if (match) {
          match['downloadOptions'] = this.download.getDownloadOptions(data as DigitalObjectMetadata);
        }
      });
    }
  }

  /**
   * Performs KG DO search for selected ontology, cell type, biomarker, and HRA release version filters
   * @returns object search
   */
  private digitalObjectSearch(): Observable<string[]> {
    return this.search.doSearch(this.store.allRows(), this.store.termsIndex(), {
      digitalObjects: this.store.filters().digitalObjects ?? [],
      versions: this.store.filters().releaseVersion ?? [],
      organs: this.store.filters().organs ?? [],
      ontologyTerms: this.store.filters().anatomicalStructures ?? [],
      cellTypeTerms: this.store.filters().cellTypes ?? [],
      biomarkerTerms: this.store.filters().biomarkers ?? [],
      searchTerm: this.store.filters().searchTerm,
    });
  }

  /**
   * Returns table scrollbar viewport height
   * @returns viewport height
   */
  private setScrollViewportHeight(): void {
    this.scrollHeight.set(window.innerHeight - (this.isSmallScreen() ? 259 : 299));
  }
}
