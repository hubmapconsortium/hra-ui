import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';

import { DigitalObjectData, DigitalObjectMetadata, KnowledgeGraphObjectsData } from '../../digital-objects.schema';
import { FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';

/** Maps doType to the correct icon in the design system */
const PRODUCT_ICON_MAP: Record<string, string> = {
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
const ORGAN_ICON_MAP: Record<string, string> = {
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
  // skeleton: '',
  'urinary bladder': 'bladder',
  // 'lymph vasculature': '',
  'spinal cord': 'spinal-cord',
  ureter: 'ureter-left',
};

/** Interface for file type info */
interface FileTypeData {
  /** File name */
  name: string;
  /** Suffix to append to end of download url */
  typeSuffix: string;
  /** Optional file type description */
  description?: string;
}

/** Maps mediaType to file type data */
const FILE_TYPE_MAP: Record<string, FileTypeData> = {
  'image/svg+xml': {
    name: 'SVG',
    typeSuffix: '.svg',
  },
  'image/png': {
    name: 'PNG',
    typeSuffix: '.png',
  },
  'application/postscript': {
    name: 'Adobe Illustrator',
    typeSuffix: '.ai',
  },
  'text/yaml': {
    name: 'YAML',
    typeSuffix: '.yaml',
  },
  'model/gltf-binary': {
    name: 'GLB',
    typeSuffix: '.glb',
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    name: 'XLSX',
    typeSuffix: '.xlsx',
  },
  'text/vnd.mermaid': {
    name: 'MMD',
    typeSuffix: '.mmd',
  },
  'application/vnd.chipnuts.karaoke-mmd': {
    //TODO: Remove when data is fixed
    name: 'MMD',
    typeSuffix: '.mmd',
  },
  'text/csv': {
    name: 'CSV - Crosswalk',
    description: 'A CSV file connecting digital objects to ontology terms in ASCT+B Tables.',
    typeSuffix: '.csv',
  },

  'application/json': {
    name: 'JSON',
    typeSuffix: '.json',
  },
  'text/turtle': {
    name: 'Turtle',
    description:
      'Terse RDF Triple Language (Turtle) format helps developers write SPARQL queries to HRA data by making its triple structure explicit and showing possible subjects, predicates, and objects.',
    typeSuffix: '.ttl',
  },
  'application/ld+json': {
    name: 'JSON-LD',
    description:
      'A lightweight Linked Data format, ideal for programming environments, such as REST Web services, and unstructured databases such as Apache CouchDB and MongoDB.',
    typeSuffix: '.jsonld',
  },
  'application/rdf+xml': {
    name: 'RDF/XML',
    typeSuffix: '.xml',
  },
  'application/n-triples': {
    name: 'N-Triple',
    typeSuffix: '.nq',
  },
  'application/n-quads': {
    name: 'N-Quads',
    typeSuffix: '.nt',
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
  /** Digital objects data observable */
  readonly $data = toObservable(this.data);

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

  readonly filterClosed = signal<boolean>(false);

  /**
   * Sets filtered rows to all rows on init
   * Fetches file download metadata for each object
   */
  constructor() {
    effect(() => {
      this.filteredRows.set(this.allRows());
    });

    this.$data
      .pipe(
        switchMap((items) => {
          const objectData = this.resolveData(items['@graph']);
          this.allRows.set(objectData);
          const innerCalls = items['@graph'].map((item) => this.getMetadata(item));
          return forkJoin(innerCalls);
        }),
        tap((metadata) => {
          this.allRows().map((row) => {
            const md = metadata.find((entry) => entry['id'] === row['objectUrl']);
            if (md) {
              row['downloadOptions'] = this.getDownloadOptions(md);
            }
          });
        }),
      )
      .subscribe();

    this.searchControl.valueChanges.subscribe((result) => {
      this.onSearchChange(result);
    });
  }

  /**
   * Resolves raw digital object data into array of TableRow
   * @param data Raw digital object data
   * @returns Data as TableRow[]
   */
  private resolveData(data: DigitalObjectData[]): TableRow[] {
    return data.map((item) => {
      return {
        title: item.title,
        objectUrl: item.lod,
        type: 'product:' + PRODUCT_ICON_MAP[item.doType],
        organ: this.getOrganIcon(item.organs && item.organs.length === 1 ? item.organs[0] : 'all-organs'), //If more than one organ use all-organs icon
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
    return this.http.get(entry.lod, { responseType: 'json' });
  }

  /**
   * Gets distributions data from metadata JSON and returns resolved download data
   * @param metadata Metadata JSON
   * @returns Array of distributions download info for the metadata
   */
  private getDownloadOptions(metadata: DigitalObjectMetadata): Record<string, string | undefined>[] {
    const id = metadata['name'];
    const files = metadata['distributions'] as Record<string, string>[];
    const derivedFiles = metadata['was_derived_from']['distributions'] as Record<string, string>[];
    return this.resolveDownloadOptions(id, derivedFiles.concat(files));
  }

  /**
   * Resolves download options
   * @param id Object id
   * @param files Array of distributions from metadata
   * @returns Resolved download data
   */
  private resolveDownloadOptions(id: string, files: Record<string, string>[]) {
    return files.map((file) => {
      const fileType = FILE_TYPE_MAP[file['mediaType']];
      return {
        id: id + fileType.typeSuffix,
        name: fileType.name,
        description: fileType.description,
        icon: 'download',
        url: file['downloadUrl'],
      };
    });
  }

  /**
   * Updates filteredRows on searchTerm input
   * @param searchTerm Search input
   */
  private onSearchChange(searchTerm: string): void {
    this.filteredRows.set(
      this.allRows().filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    );
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
   * Downloads file
   * @param url Download url
   * @param id File name to save as
   */
  saveFile(url: string, id: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = id;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  closeDrawer(closed: boolean) {
    this.filterClosed.set(closed);
  }

  /**
   * Returns scroll viewport height
   * @returns scroll viewport height
   */
  scrollViewportHeight(): number {
    return window.innerHeight - 299;
  }
}
