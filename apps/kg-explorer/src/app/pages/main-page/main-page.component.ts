import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HraKgService, V1Service } from '@hra-api/ng-client';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { forkJoin, fromEvent, Observable, switchMap, tap } from 'rxjs';

import { FilterFormControls, FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';
import { DigitalObjectData, DigitalObjectMetadata, KnowledgeGraphObjectsData } from '../../digital-objects.schema';
import { DownloadService } from '../../services/download.service';

/** Tooltip data interface */
export interface TooltipData {
  /** Tooltip description */
  description: string;
  /** Text on action button */
  actionText?: string;
  /** Url on action button */
  actionUrl?: string;
}

/** Filter option category interface */
export interface FilterOptionCategory {
  /** Category id */
  id: string;
  /** Category label */
  label: string;
  /** Filter options for the category */
  options: FilterOption[];
  /** Tooltip data */
  tooltip: TooltipData;
}

/** Filter option interface */
export interface FilterOption {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
  /** Secondary label (for release version options) */
  secondaryLabel?: string;
  /** Number of results for the filter option in the data */
  count: number;
  /** Tooltip data for the filter option (for digital objects category) */
  tooltip?: TooltipData;
}

/** Current filter interface */
export interface CurrentFilters {
  /** Digital object filters */
  digitalObjects?: FilterOption[];
  /** Release version filters */
  releaseVersion?: FilterOption[];
  /** Organ filters */
  organs?: FilterOption[];
  /** Anatomical structures filters */
  anatomicalStructures?: FilterOption[];
  /** Cell type filters */
  cellTypes?: FilterOption[];
  /** Biomarker filters */
  biomarkers?: FilterOption[];
  /** Search term filters */
  searchTerm?: string;
}

/** Interface for digital object type data */
export interface ObjectTypeData {
  /** Object type label */
  label: string;
  /** Design system icon to use for the object type */
  icon: string;
  /** Tooltip data for the digital object type */
  tooltip: TooltipData;
}

/** HRA version data info */
const HRA_VERSION_DATA: Record<string, { label: string; date: string }> = {
  'v2.3': {
    label: '9th Release (v2.3)',
    date: 'June 2025',
  },
  'v2.2': {
    label: '8th Release (v2.2)',
    date: 'December 2024',
  },
  'v2.1': {
    label: '7th Release (v2.1)',
    date: 'June 2024',
  },
  'v2.0': {
    label: '6th Release (v2.0)',
    date: 'December 2023',
  },
  'v1.4': {
    label: '5th Release (v1.4)',
    date: 'June 2023',
  },
  'v1.3': {
    label: '4th Release (v1.3)',
    date: 'December 2022',
  },
  'v1.2': {
    label: '3rd Release (v1.2)',
    date: 'June 2022',
  },
  'v1.1': {
    label: '2rd Release (v1.1)',
    date: 'December 2021',
  },
  'v1.0': {
    label: '1st Release (v1.0)',
    date: 'June 2021',
  },
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

/** Stores data for a doType */
export const DO_INFO: Record<string, ObjectTypeData> = {
  'ref-organ': {
    label: '3D Organs',
    tooltip: {
      description:
        '3D models of human organ structures, complete with accurate size and position data, to support the creation of a comprehensive 3D model of the human body, with each 3D model object carefully annotated with a proper label and an identifier from the Uberon and FMA ontologies.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/3d-reference-library',
    },
    icon: '3d-organ',
  },
  'asct-b': {
    label: 'ASCT+B Tables',
    tooltip: {
      description:
        'Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Tables are authored by multiple experts across many consortia. Tables capture the partonomy of anatomical structures, cell types, and major biomarkers (e.g., gene, protein, lipid, or metabolic markers). Cellular identity is supported by scientific evidence and linked to ontologies.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/asctb-tables',
    },
    icon: 'asctb-reporter',
  },
  ctann: {
    label: 'Cell Type Annotations',
    tooltip: {
      description:
        'Azimuth and other cell type annotation tools are used to assign cell types to cells from sc/snRNA-seq studies. Manually compiled crosswalks are used to assign ontology IDs to cell types.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/cell-type-annotations',
    },
    icon: 'cell-type-annotations',
  },
  collection: {
    label: 'Collections',
    tooltip: {
      description: 'Multiple digital objects that create a collection of data.',
    },
    icon: 'collections',
  },
  'ds-graph': {
    label: 'Dataset Graphs',
    tooltip: {
      description:
        "Sample registration information submitted by consortium members in HuBMAP or other efforts, including accurate sample sizes and positions. When combined with 3D Organ data, this information helps create 3D visual tissue sample placements. Additionally, the sample information is linked to datasets from researchers' assay analyses that offer deeper insights into the tissue samples.",
    },
    icon: 'dataset-graphs',
  },
  '2d-ftu': {
    label: 'FTU Illustrations',
    tooltip: {
      description:
        'A functional tissue unit is the smallest tissue organization, i.e. a set of cells, that performs a unique physiologic function and is replicated multiple times in a whole organ. Functional Tissue Unit (FTU) Illustrations are linked to ASCT+B Tables.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/2d-ftu-illustrations',
    },
    icon: 'ftu',
  },
  graph: {
    label: 'Graphs',
    tooltip: {
      description: 'Externally created RDF graph data.',
    },
    icon: 'graphs',
  },
  landmark: {
    label: 'Landmarks',
    tooltip: {
      description:
        '3D model shapes representing features near organs of interest (e.g., an artery or pelvis bone near a kidney) to help experts accurately orient themselves when registering tissue blocks into a 3D Organ.',
    },
    icon: 'landmark',
  },
  millitome: {
    label: 'Millitome',
    tooltip: {
      description:
        'Data for cutting tissue samples using a millitome device. A digital data package that includes an STL file and a spreadsheet for assigning spatial locations to HuBMAP IDs and gathering metadata with information about the size, dimensions, donor sex, and laterality of the reference organ for which the millitome is fitted.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/millitome',
    },
    icon: 'millitome',
  },
  omap: {
    label: 'Organ Mapping Antibody Panels',
    tooltip: {
      description: 'Collections of antibodies spatially mapping anatomical structures and cell types.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/omap',
    },
    icon: 'omaps',
  },
  schema: {
    label: 'Schema',
    tooltip: {
      description:
        'Describes the structure, i.e., the schema, of the normalized form of a single data type, its metadata, or shared concepts between data types.',
    },
    icon: 'schema',
  },
  'vascular-geometry': {
    label: 'Vascular Geometry',
    tooltip: {
      description:
        'Geometry information on the human blood vascular system capturing key attributes of different vessels, such as diameter and length, population, sample size, and reference to the source of data.',
      actionText: 'Learn more',
      actionUrl: 'https://humanatlas.io/vccf',
    },
    icon: 'vascular-geometry',
  },
  vocab: {
    label: 'Vocabulary',
    tooltip: {
      description:
        'Various reference ontologies and vocabularies that hold standard concepts and relationships used to construct data components. Vocabularies are typically external biomedical ontologies, like CL and Uberon, and they provide a convenient mechanism for querying reference ontologies alongside HRA-curated data.',
    },
    icon: 'vocabulary',
  },
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
    MatSidenavModule,
    ButtonsModule,
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
  /** HRA V1 API service */
  private readonly v1 = inject(V1Service);
  /** File download service */
  readonly download = inject(DownloadService);

  /** Form control for search input */
  readonly searchControl = new UntypedFormControl();

  /** Whether the user is on a wide screen */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');
  /** Whether the user is on a small screen */
  protected isSmallScreen = watchBreakpoint('(max-width: 639px)');

  /** Raw digital objects data */
  readonly data = input.required<KnowledgeGraphObjectsData>();
  /** Column info */
  readonly columns = input.required<TableColumn[]>();

  /** All rows in the data */
  readonly allRows = signal<TableRow[]>([]);
  /** Filtered rows to display */
  readonly filteredRows = signal<TableRow[]>([]);
  /** Whether or not the filter menu is closed */
  readonly filterClosed = signal<boolean>(false);
  /** Filter categories */
  readonly filterCategories = signal<FilterOptionCategory[]>([]);
  /** Currently selected filters */
  readonly filters = signal<CurrentFilters>({});
  /** Scroll viewport height for the digital object table */
  readonly scrollHeight = signal(0);

  /**
   * Sets filtered rows to all rows on init
   * Fetches file download metadata for each object
   */
  constructor() {
    this.setScrollViewportHeight();

    effect(() => {
      this.applyFilters();
      this.populateFilterOptions();
    });
    this.searchControl.valueChanges.subscribe((result) => {
      this.onSearchChange(result);
    });
    this.attachDownloadOptions().subscribe();

    fromEvent(window, 'resize').subscribe(() => this.setScrollViewportHeight());
  }

  /**
   * Updates current filters when changed
   * @param formControls
   */
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

  /**
   * Calculates number of results for a filter option
   * @param filterOption Name of filter option
   * @param category
   * @returns Number of results
   */
  private calculateCount(filterOption: string, category: string): number {
    return this.allRows().filter((row) => {
      if (Array.isArray(row[category])) {
        return row[category].some((value) => String(value).toLowerCase().includes(filterOption));
      }
      return row[category] === filterOption;
    }).length;
  }

  /**
   * Populates filter categories with options using data from V1 and KG APIs
   */
  private populateFilterOptions() {
    const kgOptions = this.kgFilterOptions();
    forkJoin([
      this.v1.ontologyTreeModel({}),
      this.v1.cellTypeTreeModel({}),
      this.v1.biomarkerTreeModel({}),
      this.kg.asctbTermOccurences({}),
      this.kg.doSearch({ hraVersions: ['v1.0'] }),
      this.kg.doSearch({ hraVersions: ['v1.1'] }),
      this.kg.doSearch({ hraVersions: ['v1.2'] }),
      this.kg.doSearch({ hraVersions: ['v1.3'] }),
      this.kg.doSearch({ hraVersions: ['v1.4'] }),
      this.kg.doSearch({ hraVersions: ['v2.0'] }),
      this.kg.doSearch({ hraVersions: ['v2.1'] }),
      this.kg.doSearch({ hraVersions: ['v2.2'] }),
      this.kg.doSearch({ hraVersions: ['v2.3'] }),
    ]).subscribe(([as, ct, b, asctbTerms, r1, r2, r3, r4, r5, r6, r7, r8, r9]) => {
      const terms = Object.entries(asctbTerms);
      const hraVersionCounts: Record<string, number> = {
        'v1.0': r1.length,
        'v1.1': r2.length,
        'v1.2': r3.length,
        'v1.3': r4.length,
        'v1.4': r5.length,
        'v2.0': r6.length,
        'v2.1': r7.length,
        'v2.2': r8.length,
        'v2.3': r9.length,
      };

      this.filterCategories.set([
        {
          id: 'digitalObjects',
          label: 'Digital objects',
          options: Array.from(kgOptions.doOptions).map((filterOption) => {
            return {
              id: filterOption,
              label: DO_INFO[filterOption].label,
              count: this.calculateCount(filterOption, 'doType'),
              tooltip: DO_INFO[filterOption].tooltip,
            };
          }),
          tooltip: {
            description: 'Categories of unique data structures that construct the evolving Human Reference Atlas.',
            actionText: 'Learn more',
            actionUrl: 'https://humanatlas.io/overview-data',
          },
        },
        {
          id: 'releaseVersion',
          label: 'HRA release version',
          options: Object.keys(HRA_VERSION_DATA).map((filterOption) => {
            const versionData = HRA_VERSION_DATA[filterOption];
            return {
              id: filterOption,
              label: versionData ? versionData.label : filterOption,
              count: hraVersionCounts[filterOption],
              secondaryLabel: versionData ? versionData.date : undefined,
            };
          }),
          tooltip: {
            description: 'New and updated data is released twice a year on June 15 and December 15.',
          },
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
          tooltip: {
            description:
              'Organs are distinct body structures made of specialized cells and tissues that work together to perform specific biological functions.',
          },
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
          tooltip: {
            description:
              'A distinct biological entity with a 3D volume and shape, e.g., an organ, functional tissue unit, or cell.',
          },
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
          tooltip: {
            description:
              'Mammalian cells are biological units with a defined function that typically have a nucleus and cytoplasm surrounded by a membrane. Each cell type may have broad common functions across organs and specialized functions or morphological or molecular features within each organ or region. Tissue is composed of different (resident and transitory) cell types that are characterized or identified via biomarkers.',
          },
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
          tooltip: {
            description:
              'Molecular, histological, morphological, radiological, physiological or anatomical features that help to characterize the biological state of the body. Here we focus on the molecular markers that can be measured to characterize a cell type. They include genes (BG), proteins (BP), metabolites (BM), proteoforms (BF), and lipids (BL).',
          },
        },
      ]);
    });
  }

  /**
   * Applies filters to digital objects
   */
  private applyFilters() {
    this.digitalObjectSearch().subscribe((searchResults) => {
      let newFilteredRows = this.allRows();
      newFilteredRows = newFilteredRows.filter((row) => searchResults.includes(row['id'] as string));

      if (this.filters().searchTerm) {
        newFilteredRows = this.filterSearchFormResults(newFilteredRows);
      }
      if (this.filters().digitalObjects) {
        newFilteredRows = this.filterDigitalObjectResults(newFilteredRows);
      }
      if (this.filters().organs) {
        newFilteredRows = this.filterOrganResults(newFilteredRows);
      }
      this.filteredRows.set(newFilteredRows);
    });
  }

  /**
   * Filters an array of results by the search form input
   * @param currentResults Results to filter
   * @returns Filtered results
   */
  private filterSearchFormResults(currentResults: TableRow[]): TableRow[] {
    return currentResults.filter((row) =>
      Object.values(row).some((value) =>
        String(value)
          .toLowerCase()
          .includes((this.filters().searchTerm ?? '').toLowerCase()),
      ),
    );
  }

  /**
   * Filters an array of results by selected digital object filters
   * @param currentResults Results to filter
   * @returns Filtered results
   */
  private filterDigitalObjectResults(currentResults: TableRow[]): TableRow[] {
    const currentDigitalObjectsFilters = this.filters().digitalObjects?.map((obj) => obj.id);
    if (currentDigitalObjectsFilters && currentDigitalObjectsFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) => currentDigitalObjectsFilters?.includes(row['doType'] as string));
  }

  /**
   * Filters an array of results by selected release versions
   * @param currentResults Results to filter
   * @returns Filtered results
   */
  private filterVersionResults(currentResults: TableRow[]): TableRow[] {
    const currentReleaseVersionFilters = this.filters().releaseVersion?.map((obj) => obj.id);
    if (currentReleaseVersionFilters && currentReleaseVersionFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) => currentReleaseVersionFilters?.includes(row['doVersion'] as string));
  }

  /**
   * Filters an array of results by selected organ filters
   * @param currentResults Results to filter
   * @returns Filtered results
   */
  private filterOrganResults(currentResults: TableRow[]): TableRow[] {
    const currentOrganFilters = this.filters().organs?.map((obj) => obj.id) || [];
    if (currentOrganFilters && currentOrganFilters.length === 0) {
      return currentResults;
    }
    return currentResults.filter((row) =>
      ((row['organs'] as string[]) ?? []).some((value) => currentOrganFilters.includes(value)),
    );
  }

  /**
   * Performs KG DO search for selected ontology, cell type, and biomarker filters
   * @returns object search
   */
  private digitalObjectSearch(): Observable<string[]> {
    const currentAnatomicalStructuresFilters = this.filters().anatomicalStructures?.map((obj) => obj.id) || [];
    const currentCellTypesFilters = this.filters().cellTypes?.map((obj) => obj.id) || [];
    const currentBiomarkerFilters = this.filters().biomarkers?.map((obj) => obj.id) || [];
    const currentHraVersionFilters = this.filters().releaseVersion?.map((obj) => obj.id) || [];

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
      const organs = row['organs'] as string[];
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
  private resolveData(data: DigitalObjectData[]): TableRow[] {
    return data.map((item) => {
      return {
        id: item.purl,
        doType: item.doType,
        doVersion: item.doVersion,
        organs: item.organs,
        title: item.title,
        lod: item.lod,
        objectUrl: `${item.doType}/${item.doName}/${item.doVersion}`,
        typeIcon: 'product:' + DO_INFO[item.doType].icon,
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

  /**
   * Attaches download options to a row
   * @returns Observable
   */
  private attachDownloadOptions(): Observable<DigitalObjectMetadata[]> {
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
   * Returns table scrollbar viewport height
   * @returns viewport height
   */
  private setScrollViewportHeight(): void {
    this.scrollHeight.set(window.innerHeight - 299);
  }
}
