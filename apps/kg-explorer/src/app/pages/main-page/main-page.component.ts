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

import { DigitalObjectData, DigitalObjectMetadata, DigitalObjectsData } from '../../digital-objects.schema';

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

interface FileData {
  name: string;
  typeSuffix: string;
  description?: string;
}

const FILE_TYPE_MAP: Record<string, FileData> = {
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

/** This component is used for rendering the main page of the application. */
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
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  readonly data = input.required<DigitalObjectsData>();
  readonly $data = toObservable(this.data);

  readonly columns = input.required<TableColumn[]>();

  readonly allRows = signal<TableRow[]>([]);
  readonly filteredRows = signal<TableRow[]>([]);

  readonly searchControl = new UntypedFormControl();

  private readonly http = inject(HttpClient);

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
              row['downloadOptions'] = this.setDownloadOptions(md);
            }
          });
        }),
      )
      .subscribe();

    this.searchControl.valueChanges.subscribe((result) => {
      this.onSearchChange(result);
    });
  }

  private setDownloadOptions(md: DigitalObjectMetadata): Record<string, string | undefined>[] {
    const id = md['name'];
    const files = md['distributions'] as Record<string, string>[];
    const derivedFiles = md['was_derived_from']['distributions'] as Record<string, string>[];
    const downloads1 = this.resolveDownloadOptions(id, derivedFiles);
    const downloads2 = this.resolveDownloadOptions(id, files);
    return downloads1.concat(downloads2);
  }

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

  private getMetadata(entry: DigitalObjectData): Observable<DigitalObjectMetadata> {
    return this.http.get(entry.lod, { responseType: 'json' });
  }

  private resolveData(data: DigitalObjectData[]): TableRow[] {
    return data.map((item) => {
      return {
        title: item.title,
        objectUrl: item.lod,
        type: 'product:' + PRODUCT_ICON_MAP[item.doType],
        organ: this.getOrganIcon(item.organs && item.organs.length === 1 ? item.organs[0] : 'all-organs'),
        cellCount: item.cell_count,
        biomarkerCount: item.biomarker_count,
        lastModified: this.formatDateToYYYYMM(item.lastUpdated),
      } as TableRow;
    });
  }

  private onSearchChange(searchTerm: string): void {
    this.filteredRows.set(
      this.allRows().filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    );
  }

  private getOrganIcon(organ: string): string {
    return `organ:${ORGAN_ICON_MAP[organ] ?? organ}`;
  }

  private formatDateToYYYYMM(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

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
}
