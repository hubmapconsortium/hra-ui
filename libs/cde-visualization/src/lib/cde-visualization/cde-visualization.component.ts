import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CellTypesComponent } from '../components/cell-types/cell-types.component';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { MetadataComponent } from '../components/metadata/metadata.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { VisualizationHeaderComponent } from '../components/visualization-header/visualization-header.component';
import { CellTypeEntry } from '../models/cell-type';
import { rgbToHex } from '../models/color';
import {
  ColorMapColorKey,
  ColorMapEntry,
  ColorMapTypeKey,
  DEFAULT_COLOR_MAP_KEY,
  DEFAULT_COLOR_MAP_VALUE_KEY,
  colorMapToLookup,
} from '../models/color-map';
import { DEFAULT_MAX_EDGE_DISTANCE, EdgeEntry } from '../models/edge';
import { Metadata } from '../models/metadata';
import { DEFAULT_NODE_TARGET_KEY, NodeEntry, NodeTargetKey, selectNodeTargetValue } from '../models/node';
import { ColorMapFileLoaderService } from '../services/data/color-map-loader.service';
import { DataLoaderService } from '../services/data/data-loader.service';
import { CsvFileLoaderService } from '../services/file-loader/csv-file-loader.service';
import { JsonFileLoaderService } from '../services/file-loader/json-file-loader.service';
import { FileSaverService } from '../services/file-saver/file-saver.service';
import { brandAttribute, numberAttribute } from '../shared/attribute-transform';
import { createColorGenerator } from '../shared/color-generator';
import { emptyArrayEquals } from '../shared/empty-array-equals';
import { mergeObjects } from '../shared/merge';

/**
 * CDE Visualization Root Component
 */
@Component({
  selector: 'cde-visualization-root',
  standalone: true,
  imports: [
    CommonModule,
    VisualizationHeaderComponent,
    MetadataComponent,
    CellTypesComponent,
    NodeDistVisualizationComponent,
    HistogramComponent,
  ],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdeVisualizationComponent {
  /** Link to the home page */
  readonly homeLink = input<string>('https://apps.humanatlas.io/cde/');

  /** Input nodes data, can be a url or array of node entry */
  readonly nodes = input<string | NodeEntry[]>();

  /** Key for node target attribute */
  readonly nodeTargetKey = input(undefined, { transform: brandAttribute<string, NodeTargetKey>() });

  /** Value for node target attribute */
  readonly nodeTargetValue = input<string>();

  /** Input edges data */
  readonly edges = model<string | EdgeEntry[]>();

  /** Maximum edge distance */
  readonly maxEdgeDistance = input(DEFAULT_MAX_EDGE_DISTANCE, {
    transform: numberAttribute(DEFAULT_MAX_EDGE_DISTANCE),
  });

  /** Input color map data */
  readonly colorMap = model<string | ColorMapEntry[]>();

  /** Key for color map type attribute */
  readonly colorMapKey = input(undefined, { transform: brandAttribute<string, ColorMapTypeKey>() });

  /** Key for color map value attribute */
  readonly colorMapValueKey = input(DEFAULT_COLOR_MAP_VALUE_KEY, {
    transform: brandAttribute<string, ColorMapColorKey>(),
  });

  /** Input metadata */
  readonly metadata = input<string | Metadata>();

  /** Title of the visualization */
  readonly title = input<string>();

  /** Technology used in the visualization */
  readonly technology = input<string>();

  /** Organ being visualized */
  readonly organ = input<string>();

  /** Sex of the subject */
  readonly sex = input<string>();

  /** Age of the subject */
  readonly age = input(undefined, { transform: numberAttribute() });

  /** Creation date of the visualization */
  readonly creationDate = input<string>();

  /** Creation time of the visualization */
  readonly creationTime = input<string>();

  /** Thickness of the sample */
  readonly thickness = input(undefined, { transform: numberAttribute() });

  /** Pixel size in the visualization */
  readonly pixelSize = input(undefined, { transform: numberAttribute() });

  /** Event emitted when a node is clicked */
  readonly nodeClick = output<NodeEntry>();

  /** Event emitted when a node is hovered */
  readonly nodeHover = output<NodeEntry | undefined>();

  /** Injected data loader service */
  private readonly dataLoader = inject(DataLoaderService);

  /** Loaded nodes data */
  readonly loadedNodes = this.dataLoader.load(this.nodes, [], CsvFileLoaderService, {
    papaparse: { header: true, dynamicTyping: { x: true, y: true, z: true } },
  });

  /** Key for node type attribute */
  readonly nodeTypeKey = computed(() => this.nodeTargetKey() ?? DEFAULT_NODE_TARGET_KEY);

  /** Selected node target value */
  readonly selectedNodeTargetValue = computed(
    () => this.nodeTargetValue() ?? selectNodeTargetValue(this.loadedNodes(), this.nodeTypeKey()),
  );

  /** Loaded edges data */
  readonly loadedEdges = this.dataLoader.load(this.edges, [], CsvFileLoaderService, {
    papaparse: { dynamicTyping: true },
  });

  /** Loaded color map data */
  readonly loadedColorMap = this.dataLoader.load(this.colorMap, [], ColorMapFileLoaderService, {
    papaparse: { header: true },
  });

  /** Key for color map type attribute */
  readonly colorMapTypeKey = computed(
    () => this.colorMapKey() ?? (this.nodeTargetKey() as string as ColorMapTypeKey) ?? DEFAULT_COLOR_MAP_KEY,
  );

  /** Lookup table for color map */
  private readonly colorMapLookup = computed(() =>
    colorMapToLookup(this.loadedColorMap(), this.colorMapTypeKey(), this.colorMapValueKey()),
  );

  /** Loaded metadata */
  readonly loadedMetadata = this.dataLoader.load(this.metadata, {}, JsonFileLoaderService, {});

  /** Merged metadata with input properties */
  readonly mergedMetadata = computed(() =>
    mergeObjects(this.loadedMetadata(), {
      title: this.title(),
      technology: this.technology(),
      organ: this.organ(),
      sex: this.sex(),
      age: this.age(),
      creationDate: this.creationDate(),
      creationTime: this.creationTime(),
      thickness: this.thickness(),
      pixelSize: this.pixelSize(),
    }),
  );

  /** List of cell types */
  readonly cellTypes = signal<CellTypeEntry[]>([]);

  /** List of selected cell types */
  readonly cellTypesSelection = signal<string[]>([], { equal: emptyArrayEquals });

  /** Counter for resetting cell types */
  readonly cellTypesResetCounter = signal(0);

  /** Computed cell types as color map entries */
  readonly cellTypesAsColorMap = computed(
    () => {
      const cellTypes = this.cellTypes();
      const typeKey = this.colorMapTypeKey();
      const colorKey = this.colorMapValueKey();

      return cellTypes.map(
        (entry) =>
          ({
            [typeKey]: entry.name,
            [colorKey]: entry.color,
          }) as ColorMapEntry,
      );
    },
    { equal: emptyArrayEquals },
  );

  /** Computed cell types from loaded nodes */
  readonly cellTypesFromNodes = computed(() => {
    const nodes = this.loadedNodes();
    const targetKey = this.nodeTypeKey();
    const defaultColorGenerator = createColorGenerator();
    const cellTypeByName: Record<string, CellTypeEntry> = {};

    for (const node of nodes) {
      const name = node[targetKey];
      cellTypeByName[name] ??= {
        name,
        count: 0,
        color: this.colorMapLookup().get(name) ?? defaultColorGenerator(),
      };
      cellTypeByName[name].count += 1;
    }

    return Object.values(cellTypeByName);
  });

  /** Computed selection of cell types from nodes */
  readonly cellTypesSelectionFromNodes = computed(() => this.cellTypesFromNodes().map((entry) => entry.name));

  /** Effect to create cell types */
  readonly cellTypesCreateRef = effect(
    () => {
      // Grab dependency on the reset counter
      this.cellTypesResetCounter();

      this.cellTypes.set(this.cellTypesFromNodes());
      this.cellTypesSelection.set(this.cellTypesSelectionFromNodes());
    },
    { allowSignalWrites: true },
  );

  /** Reset cell types */
  resetCellTypes(): void {
    this.cellTypesResetCounter.set(this.cellTypesResetCounter() + 1);
  }

  /** Injected file saver service */
  private readonly fileSaver = inject(FileSaverService);

  /** Download nodes data as CSV */
  downloadNodes(): void {
    const nodes = this.loadedNodes();
    if (nodes.length > 0) {
      this.fileSaver.saveCsv(nodes, 'nodes.csv');
    }
  }

  /** Download edges data as CSV */
  downloadEdges(): void {
    const edges = this.loadedEdges();
    if (edges.length > 0) {
      this.fileSaver.saveCsv(edges, 'edges.csv');
    }
  }

  /** Download color map as CSV */
  downloadColorMap(): void {
    const colorKey = this.colorMapValueKey();
    const colorMap = this.cellTypesAsColorMap();
    const data = colorMap.map((entry) => ({ ...entry, [colorKey]: rgbToHex(entry[colorKey]) }));
    if (data.length > 0) {
      this.fileSaver.saveCsv(data, 'color-map.csv');
    }
  }
}
