import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Signal, computed, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParseRemoteConfig, parse } from 'papaparse';
import { Observable, map, of, switchAll } from 'rxjs';
import { CellTypeOption, CellTypesComponent } from '../components/cell-types/cell-types.component';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { Metadata, MetadataComponent } from '../components/metadata/metadata.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { VisualizationHeaderComponent } from '../components/visualization-header/visualization-header.component';
import { EdgeEntry, NodeEntry } from '../models/data';

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
  title: 'N/A',
  sourceData: 'N/A',
  colorMap: 'N/A',
  organ: 'N/A',
  technology: 'N/A',
  sex: 'N/A',
  age: 'N/A',
  thickness: 'N/A',
  pixelSize: 'N/A',
  creationDate: 'N/A',
  creationTime: 'N/A',
};

@Component({
  selector: 'cde-visualization-root',
  standalone: true,
  imports: [
    CommonModule,
    VisualizationHeaderComponent,
    MetadataComponent,
    CellTypesComponent,
    NodeDistVisualizationComponent,
    MatButtonModule,
    MatIconModule,
    OverlayModule,
    HistogramComponent,
  ],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdeVisualizationComponent {
  readonly nodes = input<string | Node[]>();
  readonly edges = input<string | EdgeEntry[]>();
  readonly nodeTargetKey = input<string>('Cell Type');
  readonly colorMapKey = input<string>('cell_type');
  readonly colorMapValueKey = input<string>('cell_color');
  readonly maxEdgeDistance = input<number, number | string | undefined>(1000, { transform: numberAttribute });
  visInfoOpen = false;

  readonly nodeTargetValue = input<string>();

  readonly colorMap = input<string | RawColorMapItem[]>();

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

  readonly resolvedEdges = this.resolveData(this.edges, [], (url) => this.loadCsvFile(url, { header: false }));

  readonly resolvedEdges2 = computed(() => {
    const data = this.resolvedEdges() as unknown as number[][];
    return data.map(
      (item): EdgeEntry => ({
        sourceNodeIndex: item[0],
        x0: item[1],
        x1: item[4],
        y0: item[2],
        y1: item[5],
        z0: item[3],
        z1: item[6],
      }),
    );
  });

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
    this.applyOverride(metadata, 'creationTime', this.creationTime());

    return metadata;
  });

  readonly resolvedCellTypeAnchor = computed(() => {
    const anchor = this.nodeTargetValue();
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

  overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'end',
      overlayX: 'start',
      originY: 'top',
      overlayY: 'top',
    },
  ];

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

  private loadCsvFile<T>(url: string, config?: Partial<ParseRemoteConfig>): Observable<T[]> {
    if (!url.startsWith('http')) {
      url = this.location.prepareExternalUrl(url);
    }

    return new Observable((subscriber) => {
      const chunks: T[][] = [];

      parse<T>(url, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: 'greedy',
        ...config,
        worker: true,
        download: true,
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

  private hasDefaultCellType(nodes: NodeEntry[]): boolean {
    return nodes.some(({ cell_type }) => cell_type === DEFAULT_CELL_TYPE_ANCHOR);
  }

  private normalizeColorMap(data: RawColorMapItem[]): ColorMapItem[] {
    const normalizeColor = (value: RawColorMapItem['cell_color']): ColorMapItem['cell_color'] => {
      return typeof value === 'string' ? JSON.parse(value) : value;
    };

    return data.map((item) => ({ ...item, cell_color: normalizeColor(item.cell_color) }));
  }
}
