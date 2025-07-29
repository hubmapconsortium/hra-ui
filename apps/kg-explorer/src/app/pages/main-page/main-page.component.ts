import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HraKgService, V1Service } from '@hra-api/ng-client';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { forkJoin, fromEvent, Observable, switchMap, tap } from 'rxjs';

import { FilterFormControls, FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';
import { VERSION_DATA } from '../../components/version-selector/version-selector.component';
import { DigitalObjectData, DigitalObjectMetadata, KnowledgeGraphObjectsData } from '../../digital-objects.schema';
import { DownloadService } from '../../services/download.service';

export interface FilterOption {
  id: string;
  label: string;
  secondaryLabel?: string;
  count: number;
  tooltip?: TooltipData;
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

export interface TooltipData {
  description: string;
  actionText?: string;
  actionUrl?: string;
}

export interface FilterOptionCategory {
  id: string;
  label: string;
  options: FilterOption[];
  tooltip: TooltipData;
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

const DO_TOOLTIP_INFO: Record<string, TooltipData> = {
  'ref-organ': {
    description:
      '3D models of human organ structures, complete with accurate size and position data, to support the creation of a comprehensive 3D model of the human body, with each 3D model object carefully annotated with a proper label and an identifier from the Uberon and FMA ontologies.',
    actionText: 'Learn more',
    actionUrl: 'https://humanatlas.io/3d-reference-library',
  },
  'asct-b': {
    description:
      'Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Tables are authored by multiple experts across many consortia. Tables capture the partonomy of anatomical structures, cell types, and major biomarkers (e.g., gene, protein, lipid, or metabolic markers). Cellular identity is supported by scientific evidence and linked to ontologies.',
    actionText: 'Learn more',
    actionUrl: 'https://humanatlas.io/asctb-tables',
  },
  ctann: {
    description:
      'Azimuth and other cell type annotation tools are used to assign cell types to cells from sc/snRNA-seq studies. Manually compiled crosswalks are used to assign ontology IDs to cell types.',
    actionText: 'Learn more',
    actionUrl: 'https://humanatlas.io/cell-type-annotations',
  },
  collection: {
    description: 'Multiple digital objects that create a collection of data.',
  },
  'ds-graph': {
    description:
      "Sample registration information submitted by consortium members in HuBMAP or other efforts, including accurate sample sizes and positions. When combined with 3D Organ data, this information helps create 3D visual tissue sample placements. Additionally, the sample information is linked to datasets from researchers' assay analyses that offer deeper insights into the tissue samples.",
  },
  '2d-ftu': {
    description:
      'A functional tissue unit is the smallest tissue organization, i.e. a set of cells, that performs a unique physiologic function and is replicated multiple times in a whole organ. Functional Tissue Unit (FTU) Illustrations are linked to ASCT+B Tables.',
    actionText: 'Learn more',
    actionUrl: 'https://humanatlas.io/2d-ftu-illustrations',
  },
  graph: {
    description: 'Externally created RDF graph data.',
  },
  landmark: {
    description:
      '3D model shapes representing features near organs of interest (e.g., an artery or pelvis bone near a kidney) to help experts accurately orient themselves when registering tissue blocks into a 3D Organ.',
  },

  millitome: {
    description:
      'Data for cutting tissue samples using a millitome device. A digital data package that includes an STL file and a spreadsheet for assigning spatial locations to HuBMAP IDs and gathering metadata with information about the size, dimensions, donor sex, and laterality of the reference organ for which the millitome is fitted.',
    actionText: 'Learn more',
    actionUrl: 'https://humanatlas.io/millitome',
  },
  omap: {
    description: 'Collections of antibodies spatially mapping anatomical structures and cell types.',
    actionText: 'Learn more',
    actionUrl: 'https://humanatlas.io/omap',
  },
  schema: {
    description:
      'Describes the structure, i.e., the schema, of the normalized form of a single data type, its metadata, or shared concepts between data types.',
  },
  'vascular-geometry': {
    description:
      'Geometry information on the human blood vascular system capturing key attributes of different vessels, such as diameter and length, population, sample size, and reference to the source of data.',
    actionText: 'Learn more',
    actionUrl: 'https://humanatlas.io/vccf',
  },
  vocab: {
    description:
      'Various reference ontologies and vocabularies that hold standard concepts and relationships used to construct data components. Vocabularies are typically external biomedical ontologies, like CL and Uberon, and they provide a convenient mechanism for querying reference ontologies alongside HRA-curated data.',
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
            const label = DIGITAL_OBJECT_NAME_MAP[filterOption];
            return {
              id: filterOption,
              label: label,
              count: this.calculateCount(filterOption, 'doType'),
              tooltip: DO_TOOLTIP_INFO[filterOption],
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
          options: Array.from(kgOptions.versionOptions).map((filterOption) => {
            const versionData = VERSION_DATA[filterOption];
            return {
              id: filterOption,
              label: versionData ? versionData.label : filterOption,
              count: this.calculateCount(filterOption, 'doVersion'),
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
        objectUrl: `metadata/${item.doType}/${item.doName}/${item.doVersion}`,
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
  setScrollViewportHeight() {
    this.scrollHeight.set(window.innerHeight - 299);
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
