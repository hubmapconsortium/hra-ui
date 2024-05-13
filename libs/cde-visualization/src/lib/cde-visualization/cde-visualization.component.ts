import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, computed, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { parse } from 'papaparse';
import { Observable, map, of, switchAll } from 'rxjs';
import { CellTypeOption, CellTypesComponent } from '../components/cell-types/cell-types.component';
import { Metadata, MetadataComponent } from '../components/metadata/metadata.component';
import { VisualizationHeaderComponent } from '../components/visualization-header/visualization-header.component';
import { HttpClient } from '@angular/common/http';
import { VisualizationComponent } from '../components/visualization/visualization.component';

export interface Node {
  x: number;
  y: number;
  z?: number;
  cell_type: string;
  cell_ontology_id?: string;
}

export interface RawColorMapItem {
  cell_type: string;
  cell_color: string | [number, number, number];
}

export interface ColorMapItem {
  cell_type: string;
  cell_color: [number, number, number];
}

const DEFAULT_CELL_TYPE_ANCHOR = 'Endothelial';
const DEFAULT_CELL_TYPE_COLOR = '#5D667F';

const EMPTY_METADATA: Metadata = {
  title: '',
  sourceData: '',
  colorMap: '',
  organ: '',
  technology: '',
  sex: '',
  age: Number.NaN,
  thickness: Number.NaN,
  pixelSize: Number.NaN,
  creationDate: '',
  creationTime: '',
};

@Component({
  selector: 'cde-visualization-page',
  standalone: true,
  imports: [CommonModule, VisualizationHeaderComponent, MetadataComponent, CellTypesComponent, VisualizationComponent],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdeVisualizationComponent {
  readonly nodes = input<string | Node[]>('assets/TEMP/nodes.csv');

  readonly cellTypeAnchor = input<string>();

  readonly colorMap = input<string | RawColorMapItem[]>('assets/TEMP/colormap.csv');

  readonly metadata = input<string | Partial<Metadata>>();

  readonly title = input<string>();

  readonly technology = input<string>();

  readonly organ = input<string>();

  readonly sex = input<string>();

  readonly creationDate = input<string>();

  readonly creationTime = input<string>();

  readonly age = input<number, number | string | undefined>(NaN, { transform: numberAttribute });

  readonly thickness = input<number, number | string | undefined>(NaN, { transform: numberAttribute });

  readonly pixelSize = input<number, number | string | undefined>(NaN, { transform: numberAttribute });

  readonly resolvedNodes = this.resolveData(this.nodes, [], (url) => this.loadCsvFile(url));

  readonly resolvedColorMap = this.resolveData(
    this.colorMap,
    [],
    (url) => this.loadCsvFile(url),
    this.normalizeColorMap,
  );

  readonly resolvedMetadataWithoutOverrides = this.resolveData(this.metadata, {}, (url) => this.loadJsonFile(url));

  readonly resolvedMetadata = computed(() => {
    const metadata = {
      ...EMPTY_METADATA,
      ...this.resolvedMetadataWithoutOverrides(),
    };

    this.applyOverride(metadata, 'title', this.title());
    this.applyOverride(metadata, 'technology', this.technology());
    this.applyOverride(metadata, 'organ', this.organ());
    this.applyOverride(metadata, 'sex', this.sex());
    this.applyOverride(metadata, 'age', this.age());
    this.applyOverride(metadata, 'thickness', this.thickness());
    this.applyOverride(metadata, 'pixelSize', this.pixelSize());
    this.applyOverride(metadata, 'creationDate', this.creationDate());
    this.applyOverride(metadata, 'creationDate', this.creationTime());

    return metadata;
  });

  readonly resolvedCellTypeAnchor = computed(() => {
    const anchor = this.cellTypeAnchor();
    if (anchor !== undefined) {
      return anchor;
    }

    const nodes = this.resolvedNodes();
    if (nodes.length === 0 || this.hasDefaultCellType(nodes)) {
      return DEFAULT_CELL_TYPE_ANCHOR;
    }

    return nodes[0].cell_type;
  });

  /** Data for the Cell Type component */
  readonly cellTypeOptions = computed(() => {
    const options: Record<string, CellTypeOption> = {};
    for (const { cell_type } of this.resolvedNodes()) {
      options[cell_type] ??= { name: cell_type, count: 0, color: DEFAULT_CELL_TYPE_COLOR };
      options[cell_type].count += 1;
    }

    return Object.values(options);
  });

  private readonly location = inject(Location);
  private readonly http = inject(HttpClient);

  private resolveData<T>(
    source: Signal<string | T | undefined>,
    defaultValue: T,
    loadFile: (url: string) => Observable<T>,
  ): Signal<T>;
  private resolveData<T, R>(
    source: Signal<string | T | undefined>,
    defaultValue: T,
    loadFile: (url: string) => Observable<T>,
    processData: (data: T) => R,
  ): Signal<R>;
  private resolveData(
    source: Signal<unknown>,
    defaultValue: unknown,
    loadFile: (url: string) => Observable<unknown>,
    processData = (data: unknown) => data,
  ): Signal<unknown> {
    const sourceInput$ = toObservable(source);
    const loadData = (value: unknown) => {
      if (typeof value === 'string') {
        return loadFile(value);
      }

      return of(value ?? defaultValue);
    };

    const data$ = sourceInput$.pipe(map(loadData), switchAll(), map(processData));
    return toSignal(data$, { initialValue: defaultValue, rejectErrors: true });
  }

  private loadCsvFile<T>(url: string): Observable<T[]> {
    if (!url.startsWith('http')) {
      url = this.location.prepareExternalUrl(url);
    }

    return new Observable((subscriber) => {
      const chunks: T[][] = [];

      parse<T>(url, {
        worker: true,
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: 'greedy',
        chunk: (results, parser) => {
          if (subscriber.closed) {
            parser.abort();
          } else if (results.errors.length > 0) {
            subscriber.error(results.errors);
          } else {
            chunks.push(this.normalizeProperties(results.data));
          }
        },
        complete: () => {
          if (!subscriber.closed) {
            subscriber.next(chunks.flat(1));
            subscriber.complete();
          }
        },
        error: (error) => {
          if (!subscriber.closed) {
            subscriber.error(error);
          }
        },
      });
    });
  }

  private loadJsonFile<T>(url: string): Observable<T> {
    if (!url.startsWith('http')) {
      url = this.location.prepareExternalUrl(url);
    }

    return this.http.get<T>(url, { responseType: 'json' });
  }

  private normalizeProperties<T>(data: T[]): T[] {
    const normalizedProps: [string, string][] = [];
    for (const key in data[0]) {
      const newKey = key.replace(' ', '_').toLowerCase();
      if (key !== newKey) {
        normalizedProps.push([key, newKey]);
      }
    }

    for (const item of data) {
      for (const [key, newKey] of normalizedProps) {
        (item as Record<string, unknown>)[newKey] = (item as Record<string, unknown>)[key];
      }
    }

    return data;
  }

  private applyOverride<T, K extends keyof T>(object: T, key: K, override: T[K] | undefined): void {
    if (override !== undefined && !Number.isNaN(override)) {
      object[key] = override;
    }
  }

  private hasDefaultCellType(nodes: Node[]): boolean {
    return nodes.some(({ cell_type }) => cell_type === DEFAULT_CELL_TYPE_ANCHOR);
  }

  private normalizeColorMap(data: RawColorMapItem[]): ColorMapItem[] {
    const normalizeColor = (value: RawColorMapItem['cell_color']): ColorMapItem['cell_color'] => {
      return typeof value === 'string' ? JSON.parse(value) : value;
    };

    return data.map((item) => ({ ...item, cell_color: normalizeColor(item.cell_color) }));
  }
}
