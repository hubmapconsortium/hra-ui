import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  untracked,
  ViewContainerRef,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Rgb, rgbToHex } from '@hra-ui/design-system/color-picker';
import { NavHeaderButtonsComponent } from '@hra-ui/design-system/nav-header-buttons';
import { DEFAULT_MAX_EDGE_DISTANCE, DEFAULT_NODE_TARGET_SELECTOR, NodeEvent } from '@hra-ui/node-dist-vis';
import {
  AnyData,
  AnyDataEntry,
  AnyDataView,
  ColorMapInput,
  ColorMapKeysInput,
  ColorMapView,
  createColorMapGenerator,
  createEdgeGenerator,
  DataView,
  DataViewEntryTransform,
  DataViewSerializationOptions,
  EdgeKeysInput,
  EdgesInput,
  EMPTY_COLOR_MAP_VIEW,
  EMPTY_EDGES_VIEW,
  loadColorMap,
  loadEdges,
  loadNodes,
  NodeFilterView,
  NodeKeysInput,
  NodesInput,
  toCsv,
  withDataViewDefaultGenerator,
} from '@hra-ui/node-dist-vis/models';
import { CellTypesComponent } from '../components/cell-types/cell-types.component';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { MetadataComponent } from '../components/metadata/metadata.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { ViolinComponent } from '../components/violin/violin.component';
import { CellTypeEntry } from '../models/cell-type';
import { loadMetadata, MetadataInput } from '../models/metadata';
import { FileSaverService } from '../services/file-saver/file-saver.service';
import { numberAttribute } from '../shared/attribute-transform';
import { emptyArrayEquals } from '../shared/empty-array-equals';
import { LoadingManager } from '../shared/loading-manager';

/** Interface for representing the distance entry */
export interface DistanceEntry {
  /** Source edge */
  edge: AnyDataEntry;
  /** Type of the entry */
  type: string;
  /** Distance value of the entry */
  distance: number;
}

/**
 * CDE Visualization Root Component
 */
@Component({
  selector: 'cde-visualization-root',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,

    CellTypesComponent,
    HistogramComponent,
    MetadataComponent,
    NavHeaderButtonsComponent,
    NodeDistVisualizationComponent,
    ViolinComponent,
  ],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdeVisualizationComponent {
  /** Link to the home page */
  readonly homeLink = input<string>('/');

  /** Node data */
  readonly nodes = input<NodesInput>();
  /** Node key mapping data */
  readonly nodeKeys = input<NodeKeysInput>();
  /** Node target selector used when calculating edges */
  readonly nodeTargetSelector = input(DEFAULT_NODE_TARGET_SELECTOR);

  /** Edge data if already calculated */
  readonly edges = input<EdgesInput>();
  /** Edge key mapping data */
  readonly edgeKeys = input<EdgeKeysInput>();
  /** Max distance to consider when calculating edges */
  readonly maxEdgeDistance = input(DEFAULT_MAX_EDGE_DISTANCE, {
    transform: numberAttribute(DEFAULT_MAX_EDGE_DISTANCE),
  });

  /** Color map data */
  readonly colorMap = input<ColorMapInput>();
  /** Color map key mapping data */
  readonly colorMapKeys = input<ColorMapKeysInput>();

  /** Input metadata */
  readonly metadata = input<MetadataInput>();

  /** Title of the visualization */
  readonly title = input<string>();

  /** Organ being visualized */
  readonly organ = input<string>();

  /** Technology used in the visualization */
  readonly technology = input<string>();

  /** Sex of the subject */
  readonly sex = input<string>();

  /** Age of the subject */
  readonly age = input(undefined, { transform: numberAttribute() });

  /** Thickness of the sample */
  readonly thickness = input(undefined, { transform: numberAttribute() });

  /** Pixel size in the visualization */
  readonly pixelSize = input(undefined, { transform: numberAttribute() });

  /** Creation timestamp (ms since 1/1/1970 UTC) */
  readonly creationTimestamp = input(undefined, { transform: numberAttribute() });

  readonly sourceFileName = input<string>();

  readonly colorMapFileName = input<string>();

  /** Event emitted when a node is clicked */
  readonly nodeClick = output<NodeEvent>();

  /** Event emitted when a node is hovered */
  readonly nodeHover = output<NodeEvent | undefined>();

  readonly nodesChange = output<AnyData>({ alias: 'nodes' });
  readonly edgesChange = output<AnyData>({ alias: 'edges' });
  readonly colorMapChange = output<AnyData>({ alias: 'colorMap' });

  /** View container. Do NOT change the name. It is used by ngx-color-picker! */
  readonly vcRef = inject(ViewContainerRef);

  /** Whether there are loading resources, etc. */
  protected loadingManager = new LoadingManager();

  /** View of the node data */
  protected readonly nodesView = loadNodes(this.nodes, this.nodeKeys, undefined, this.loadingManager.createObserver());
  /** View of the edge data */
  protected readonly edgesView = withDataViewDefaultGenerator(
    loadEdges(this.edges, this.edgeKeys, this.loadingManager.createObserver()),
    createEdgeGenerator(
      this.nodesView,
      this.edges,
      this.nodeTargetSelector,
      this.maxEdgeDistance,
      this.loadingManager.createObserver(),
    ),
    EMPTY_EDGES_VIEW,
  );
  /** View of the color map */
  protected readonly colorMapView = withDataViewDefaultGenerator(
    loadColorMap(this.colorMap, this.colorMapKeys, undefined, undefined, this.loadingManager.createObserver()),
    createColorMapGenerator(this.nodesView, this.colorMap),
    EMPTY_COLOR_MAP_VIEW,
  );
  /** Combined metadata */
  protected readonly metadataView = loadMetadata(
    this.metadata,
    {
      title: this.title,
      organ: this.organ,
      technology: this.technology,
      sex: this.sex,
      age: this.age,
      thickness: this.thickness,
      pixelSize: this.pixelSize,
      creationTimestamp: this.creationTimestamp,
      sourceFileName: this.sourceFileName,
      colorMapFileName: this.colorMapFileName,
    },
    this.loadingManager.createObserver(),
  );

  readonly nodeFilterView = signal<NodeFilterView>(new NodeFilterView(undefined, undefined));

  /** List of cell types */
  readonly cellTypes = signal<CellTypeEntry[]>([]);

  /** List of selected cell types */
  readonly cellTypesSelection = signal<string[]>([], { equal: emptyArrayEquals });

  /** Counter for resetting cell types */
  protected readonly cellTypesResetCounter = signal(0);

  /** Computed cell types as color map entries */
  protected readonly cellTypesAsColorMap = computed(
    () => new ColorMapView(this.cellTypes(), { 'Cell Type': 'name', 'Cell Color': 'color' }),
  );

  private readonly edgeTypeAccessor = computed(() => {
    const getNodeType = this.nodesView().getCellTypeAt;
    const getNodeIndex = this.edgesView().getCellIDFor;
    return (edge: AnyDataEntry) => getNodeType(getNodeIndex(edge));
  });

  private readonly nodeCounts = computed(() => this.nodesView().getCounts());
  private readonly edgeCounts = computed(() => this.edgesView().getCounts(this.edgeTypeAccessor()));
  private readonly edgeCountsBySourceNode = computed(() =>
    this.edgesView().getCounts((obj) => `${this.edgesView().getCellIDFor(obj)}`),
  );

  private readonly cellTypesFromNodes = computed(() => {
    const nodeCounts = this.nodeCounts();
    const edgeCounts = this.edgeCounts();
    const colorLookup = this.colorMapView().getColorLookup();

    return Array.from(nodeCounts).map(
      ([name, count]): CellTypeEntry => ({
        name,
        count,
        outgoingEdgeCount: edgeCounts.get(name) ?? 0,
        color: (colorLookup.get(name) as Rgb) ?? [255, 255, 255],
      }),
    );
  });

  readonly countAdjustments = computed(() => {
    const nodes = this.nodesView();
    const edgesCounts = this.edgeCountsBySourceNode();
    const { exclude = [] } = this.nodeFilterView();
    const indices = exclude.filter((entry) => typeof entry === 'number');
    const result: Record<string, { count: number; outgoingEdgeCount: number }> = {};

    for (const index of indices) {
      const key = nodes.getCellTypeAt(index);
      result[key] ??= { count: 0, outgoingEdgeCount: 0 };
      result[key].count += 1;
      result[key].outgoingEdgeCount += edgesCounts.get(`${index}`) ?? 0;
    }

    return result;
  });

  /** Computed selection of cell types from nodes */
  protected readonly cellTypesSelectionFromNodes = computed(() => this.cellTypesFromNodes().map((entry) => entry.name));

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

  /** List of filtered cell types based on selection */
  protected readonly filteredCellTypes = computed(
    () => {
      const selection = new Set(this.cellTypesSelection());
      selection.delete(this.nodeTargetSelector());
      const filtered = this.cellTypes().filter(({ name }) => selection.has(name));
      return filtered.sort((a, b) => b.count - a.count);
    },
    { equal: emptyArrayEquals },
  );

  /** Computed distances between nodes */
  protected readonly distances = computed(() => this.computeDistances(), { equal: emptyArrayEquals });

  /** Data for the histogram visualization */
  readonly filteredDistances = computed(() => this.computeFilteredDistances(), { equal: emptyArrayEquals });

  /** Colors for the histogram visualization */
  protected readonly filteredColors = computed(() => this.computeFilteredColors(), { equal: emptyArrayEquals });

  /** Injected file saver service */
  private readonly fileSaver = inject(FileSaverService);

  /** List of filtered cell types based on selection */
  protected readonly filteredCellTypes = computed(
    () => {
      const selection = new Set(this.cellTypesSelection());
      selection.delete(this.selectedNodeTargetValue());
      const filtered = this.cellTypes().filter(({ name }) => selection.has(name));
      return filtered.sort((a, b) => b.count - a.count);
    },
    { equal: emptyArrayEquals },
  );

  /** Computed distances between nodes */
  protected readonly distances = computed(() => this.computeDistances(), { equal: emptyArrayEquals });

  /** Data for the histogram visualization */
  protected readonly filteredDistances = computed(() => this.computeFilteredDistances(), { equal: emptyArrayEquals });

  /** Colors for the histogram visualization */
  protected readonly filteredColors = computed(() => this.computeFilteredColors(), { equal: emptyArrayEquals });

  /** Setup component */
  constructor() {
    // Workaround for getting ngx-color-picker to attach to the root view
    // Not populated for standalone/custom components so we forcefully insert ourself
    inject(ApplicationRef).componentTypes.splice(0, 0, CdeVisualizationComponent);

    effect(
      () => {
        const selection = this.cellTypesSelection();
        const filter = untracked(this.nodeFilterView);
        this.nodeFilterView.set(new NodeFilterView(selection, filter.exclude));
      },
      { allowSignalWrites: true },
    );

    // Connect outputs
    this.bindDataOutput(this.nodesView, this.nodesChange);
    this.bindDataOutput(this.edgesView, this.edgesChange);
    this.bindDataOutput(this.colorMapView, this.colorMapChange);
  }

  /** Reset cell types */
  resetCellTypes(): void {
    this.cellTypesResetCounter.set(this.cellTypesResetCounter() + 1);
  }

  /** Update the color of a specific cell type entry */
  updateColor(entry: CellTypeEntry, color: Rgb): void {
    const entries = this.cellTypes();
    const index = entries.indexOf(entry);
    const copy = [...entries];

    copy[index] = { ...copy[index], color };
    this.cellTypes.set(copy);
  }

  async downloadNodes(): Promise<void> {
    const nodes = this.nodesView();
    const filter = nodes.createFilter(this.nodeFilterView());
    await this.downloadView(nodes, 'nodes.csv', { filter });
  }

  async downloadEdges(): Promise<void> {
    const nodes = this.nodesView();
    const edges = this.edgesView();
    const filter = edges.createFilter(nodes, this.nodeFilterView());
    const reindex = await nodes.createReindexer(this.nodeFilterView());
    const transform: DataViewEntryTransform = (value, key) => {
      return key === 'Cell ID' || key === 'Target ID' ? reindex[value as number] : value;
    };

    await this.downloadView(edges, 'edges.csv', { filter, transform });
  }

  async downloadColorMap(): Promise<void> {
    const colorMap = this.cellTypesAsColorMap();
    const filter = colorMap.createFilter(this.nodeFilterView());
    await this.downloadView(colorMap, 'color-map.csv', { filter });
  }

  private async downloadView<Entry>(
    view: DataView<Entry>,
    filename: string,
    options: DataViewSerializationOptions,
  ): Promise<void> {
    if (view.length > 0) {
      const data = await toCsv(view, options);
      this.fileSaver.saveData(data, filename);
    }
  }

  /** Compute distances between nodes based on edges */
  private computeDistances(): DistanceEntry[] {
    const nodes = this.nodesView();
    const edges = this.edgesView();
    if (nodes.length === 0 || edges.length === 0) {
      return [];
    }

    const selectedCellType = this.nodeTargetSelector();
    const distances: DistanceEntry[] = [];
    for (const edge of edges) {
      const type = nodes.getCellTypeAt(edges.getCellIDFor(edge));
      if (type !== selectedCellType) {
        distances.push({ edge, type, distance: edges.getDistanceFor(edge) });
      }
    }

    return distances;
  }

  /** Compute data for the violin visualization */
  private computeFilteredDistances(): DistanceEntry[] {
    const distances = this.distances();
    const nodeFilter = this.nodeFilterView();
    const edgeFilterFn = this.edgesView().createFilter(this.nodesView(), this.nodeFilterView());
    if (nodeFilter.isEmpty()) {
      return distances;
    }

    return distances.filter(({ edge }) => edgeFilterFn(edge, -1));
  }

  /** Compute colors for the violin visualization */
  private computeFilteredColors(): string[] {
    return this.filteredCellTypes()
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map(({ color }) => rgbToHex(color));
  }

  private bindDataOutput<V extends AnyDataView>(view: Signal<V>, output: OutputEmitterRef<AnyData>): void {
    effect(() => {
      if (view().length !== 0) {
        output.emit(view().data);
      }
    });
  }
}
