import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HraKgService, V1Service } from '@hra-api/ng-client';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';

import { FilterFormControls, FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';
import { DigitalObjectData, DigitalObjectMetadata, KnowledgeGraphObjectsData } from '../../digital-objects.schema';
import { DownloadService } from '../../services/download.service';

export interface FilterOption {
  id: string;
  label: string;
  secondaryLabel?: string;
  count: number;
  tooltip?: string;
}

export interface CurrentFilters {
  digitalObjects?: FilterOption[];
  releaseVersion?: FilterOption[];
  organs?: FilterOption[];
  anatomicalStructures?: FilterOption[];
  cellTypes?: FilterOption[];
  biomarkers?: FilterOption[];
  searchTerm?: string;
}

export interface FilterOptionCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

export const DIGITAL_OBJECT_NAME_MAP: Record<string, string> = {
  'ref-organ': '3D Organs',
  '2d-ftu': 'FTU Illustrations',
  'asct-b': 'ASCT+B Tables',
  collection: 'Collections',
  ctann: 'Cell Type Annotations',
  'ds-graph': 'Dataset Graphs',
  graph: 'Graphs',
  landmark: 'Landmarks',
  millitome: 'Millitome',
  omap: 'Organ Mapping Antibody Panels',
  schema: 'Schema',
  'vascular-geometry': 'Vascular Geometry',
  vocab: 'Vocabulary',
};

/** Maps doType to the correct icon in the design system */
export const PRODUCT_ICON_MAP: Record<string, string> = {
  '2d-ftu': 'ftu',
  'asct-b': 'asctb-reporter',
  collection: 'collections',
  ctann: 'cell-type-annotations',
  'ds-graph': 'dataset-graphs',
  graph: 'graphs',
  landmark: 'landmark',
  millitome: 'millitome',
  omap: 'omaps',
  'ref-organ': '3d-organ',
  schema: 'schema',
  'vascular-geometry': 'vascular-geometry',
  vocab: 'vocabulary',
};

/** Maps organ name to the correct icon in the design system */
export const ORGAN_ICON_MAP: Record<string, string> = {
  kidney: 'kidneys',
  'large intestine': 'large-intestine',
  lung: 'lungs',
  'prostate gland': 'prostate',
  'small intestine': 'small-intestine',
  'blood vasculature': 'vasculature-thin',
  'fallopian tube': 'fallopian-tube-left',
  'lymph node': 'lymph-nodes',
  'extrapulmonary bronchus': 'extrapulmonary-bronchus',
  ovary: 'ovaries',
  skeleton: 'spinal-cord',
  'urinary bladder': 'bladder',
  // 'lymph vasculature': '',
  'spinal cord': 'spinal-cord',
  ureter: 'ureter-left',
};

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
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.filterClosed]': 'filterClosed()',
    '[style.--view-height]': 'scrollViewportHeight()',
    '[style.--scrollbar-top-offset]': SCROLLBAR_TOP_OFFSET,
  },
})
export class MainPageComponent {
  /** Raw digital objects data */
  readonly data = input.required<KnowledgeGraphObjectsData>();

  /** Column info */
  readonly columns = input.required<TableColumn[]>();

  /** All rows in the data */
  readonly allRows = signal<TableRow[]>([]);
  /** Filtered rows to display */
  readonly filteredRows = signal<TableRow[]>([]);

  /** Form control for search input */
  readonly searchControl = new UntypedFormControl();

  /** Http service */
  private readonly http = inject(HttpClient);
  private readonly kg = inject(HraKgService);
  private readonly v1 = inject(V1Service);
  readonly download = inject(DownloadService);

  /** Whether or not the filter menu is closed */
  readonly filterClosed = signal<boolean>(false);

  readonly filterOptions = signal<FilterOptionCategory[]>([]);

  readonly filters = signal<CurrentFilters>({});

  /**
   * Sets filtered rows to all rows on init
   * Fetches file download metadata for each object
   */
  constructor() {
    effect(() => {
      this.applyFilters();
      this.populateFilterOptions();
    });
    this.searchControl.valueChanges.subscribe((result) => {
      this.onSearchChange(result);
    });
    this.attachDownloadOptions().subscribe();
  }

  populateFilterOptions() {
    const kgOptions = this.kgFilterOptions();
    forkJoin([
      this.v1.ontologyTreeModel({}),
      this.v1.cellTypeTreeModel({}),
      this.v1.biomarkerTreeModel({}),
      this.kg.asctbTermOccurences({}),
    ]).subscribe(([as, ct, b, asctbTerms]) => {
      const terms = Object.entries(asctbTerms);

      this.filterOptions.set([
        {
          id: 'digitalObjects',
          label: 'Digital objects',
          options: Array.from(kgOptions.doOptions).map((filterOption) => {
            return {
              id: filterOption,
              label: DIGITAL_OBJECT_NAME_MAP[filterOption],
              count: this.calculateCount(filterOption, 'doType'),
            };
          }),
        },
        {
          id: 'releaseVersion',
          label: 'HRA release version',
          options: Array.from(kgOptions.versionOptions).map((filterOption) => {
            return {
              id: filterOption,
              label: filterOption,
              count: this.calculateCount(filterOption, 'doVersion'),
              secondaryLabel: '',
              tooltip: '',
            };
          }),
        },
        {
          id: 'organs',
          label: 'Organs',
          options: Array.from(kgOptions.organOptions).map((organOption) => {
            return {
              id: organOption,
              label: organOption,
              count: this.calculateCount(organOption, 'organs'),
            };
          }),
        },
        {
          id: 'anatomicalStructures',
          label: 'Anatomical structures',
          options: terms
            .filter((term) => as.nodes[term[0]])
            .map((term) => {
              return {
                id: term[0],
                label: as.nodes[term[0]] ? as.nodes[term[0]].label || '' : term[0],
                count: term[1],
              };
            }),
        },
        {
          id: 'cellTypes',
          label: 'Cell types',
          options: terms
            .filter((term) => ct.nodes[term[0]])
            .map((term) => {
              return {
                id: term[0],
                label: ct.nodes[term[0]] ? ct.nodes[term[0]].label || '' : term[0],
                count: term[1],
              };
            }),
        },
        {
          id: 'biomarkers',
          label: 'Biomarkers',
          options: terms
            .filter((term) => b.nodes[term[0]])
            .map((term) => {
              return {
                id: term[0],
                label: b.nodes[term[0]] ? b.nodes[term[0]].label || '' : term[0],
                count: term[1],
              };
            }),
        },
      ]);
    });
  }

  applyFilters() {
    this.digitalObjectSearch().subscribe((searchResults) => {
      let newFilteredRows = this.allRows();
      newFilteredRows = newFilteredRows.filter((row) => searchResults.includes(row['id'] as string));

      if (this.filters().searchTerm) {
        newFilteredRows = this.filterSearchFormResults(newFilteredRows);
      }
      if (this.filters().digitalObjects) {
        newFilteredRows = this.filterDigitalObjectResults(newFilteredRows);
      }
      if (this.filters().releaseVersion) {
        newFilteredRows = this.filterVersionResults(newFilteredRows);
      }
      if (this.filters().organs) {
        newFilteredRows = this.filterOrganResults(newFilteredRows);
      }
      this.filteredRows.set(newFilteredRows);
    });
  }

  filterSearchFormResults(currentResults: TableRow[]): TableRow[] {
    return currentResults.filter((row) =>
      Object.values(row).some((value) =>
        String(value)
          .toLowerCase()
          .includes((this.filters().searchTerm ?? '').toLowerCase()),
      ),
    );
  }

  filterDigitalObjectResults(currentResults: TableRow[]): TableRow[] {
    const currentDigitalObjectsFilters = this.filters().digitalObjects?.map((obj) => obj.id);
    if (currentDigitalObjectsFilters && currentDigitalObjectsFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) => currentDigitalObjectsFilters?.includes(row['doType'] as string));
  }

  filterVersionResults(currentResults: TableRow[]): TableRow[] {
    const currentReleaseVersionFilters = this.filters().releaseVersion?.map((obj) => obj.id);
    if (currentReleaseVersionFilters && currentReleaseVersionFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) => currentReleaseVersionFilters?.includes(row['doVersion'] as string));
  }

  filterOrganResults(currentResults: TableRow[]): TableRow[] {
    const currentOrganFilters = this.filters().organs?.map((obj) => obj.id) || [];
    if (currentOrganFilters && currentOrganFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) =>
      ((row['organs'] as string[]) ?? []).some((value) => currentOrganFilters.includes(value)),
    );
  }

  digitalObjectSearch(): Observable<string[]> {
    const currentAnatomicalStructuresFilters = this.filters().anatomicalStructures?.map((obj) => obj.id) || [];
    const currentCellTypesFilters = this.filters().cellTypes?.map((obj) => obj.id) || [];
    const currentBiomarkerFilters = this.filters().biomarkers?.map((obj) => obj.id) || [];

    return this.kg.doSearch({
      ontologyTerms: currentAnatomicalStructuresFilters,
      cellTypeTerms: currentCellTypesFilters,
      biomarkerTerms: currentBiomarkerFilters,
    });
  }

  kgFilterOptions() {
    const objectFilterOptions = new Set<string>();
    const versionFilterOptions = new Set<string>();
    const organFilterOptions = new Set<string>();
    this.allRows().forEach((row) => {
      const type = row['doType'];
      objectFilterOptions.add(type as string);
      const version = row['doVersion'];
      versionFilterOptions.add(version as string);
      const organs = row['organs'] as string[];
      if (organs) {
        for (const organ of organs) {
          organFilterOptions.add(organ);
        }
      }
    });
    return {
      doOptions: objectFilterOptions,
      versionOptions: versionFilterOptions,
      organOptions: organFilterOptions,
    };
  }

  private calculateCount(filterOption: string, category: string) {
    return this.allRows().filter((row) => {
      if (Array.isArray(row[category])) {
        return row[category].some((value) => String(value).toLowerCase().includes(filterOption));
      }
      return row[category] === filterOption;
    }).length;
  }

  /**
   * Resolves raw digital object data into array of TableRow
   * @param data Raw digital object data
   * @returns Data as TableRow[]
   */
  private resolveData(data: DigitalObjectData[]): TableRow[] {
    return data.map((item) => {
      return {
        id: item.purl,
        doType: item.doType,
        doVersion: item.doVersion,
        organs: item.organs,
        title: item.title,
        lod: item.lod,
        objectUrl: `/metadata/${item.doType}/${item.doName}/${item.doVersion}`,
        typeIcon: 'product:' + PRODUCT_ICON_MAP[item.doType],
        // If more than one organ use all-organs icon
        organIcon: this.getOrganIcon(item.organs && item.organs.length === 1 ? item.organs[0] : 'all-organs'),
        cellCount: item.cell_count,
        biomarkerCount: item.biomarker_count,
        lastModified: this.formatDateToYYYYMM(item.lastUpdated),
      } as TableRow;
    });
  }

  /**
   * Fetches metadata from a digital object entry
   * @param entry Digital object entry data
   * @returns Observable for digital object metadata JSON
   */
  private getMetadata(entry: DigitalObjectData): Observable<DigitalObjectMetadata> {
    return this.http.get(entry.lod, { responseType: 'json' }) as Observable<DigitalObjectMetadata>;
  }

  attachDownloadOptions(): Observable<DigitalObjectMetadata[]> {
    return toObservable(this.data).pipe(
      switchMap((items) => {
        const objectData = this.resolveData(items['@graph']);
        this.allRows.set(objectData);
        const innerCalls = items['@graph'].map((item) => this.getMetadata(item));
        return forkJoin(innerCalls);
      }),
      tap((metadata) => {
        this.allRows().map((row) => {
          const md = metadata.find((entry) => entry.id === row['lod']);
          if (md) {
            row['downloadOptions'] = this.download.getDownloadOptions(md);
          }
        });
      }),
    );
  }

  /**
   * Updates filteredRows on searchTerm input
   * @param searchTerm Search input
   */
  private onSearchChange(searchTerm: string): void {
    this.filters.update((value) => {
      return {
        ...value,
        searchTerm,
      };
    });
  }

  /**
   * Returns formatted organ name using organ icon map, if not in the map return the original organ name
   * @param organ Organ name
   * @returns Organ name in design system format
   */
  private getOrganIcon(organ: string): string {
    return `organ:${ORGAN_ICON_MAP[organ] ?? organ}`;
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
   * Returns scroll viewport height
   * @returns scroll viewport height
   */
  scrollViewportHeight(): number {
    return window.innerHeight - 299;
  }

  handleFilterChanges(formControls: FilterFormControls) {
    const updatedFilters = {
      digitalObjects: formControls.digitalObjects.value || undefined,
      releaseVersion: formControls.releaseVersion.value || undefined,
      organs: formControls.organs.value || undefined,
      anatomicalStructures: formControls.anatomicalStructures.value || undefined,
      cellTypes: formControls.cellTypes.value || undefined,
      biomarkers: formControls.biomarkers.value || undefined,
      searchTerm: this.filters().searchTerm,
    };
    this.filters.set(updatedFilters);
  }
}
