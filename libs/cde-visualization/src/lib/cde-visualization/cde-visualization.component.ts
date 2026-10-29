import { LiveAnnouncer } from '@angular/cdk/a11y';
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
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HraCommonModule } from '@hra-ui/common';
import { Rgb, rgbToHex } from '@hra-ui/design-system/color-picker';
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
  DataViewEntryComputedValueFn,
  DataViewEntryValueTransform,
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
import { debounceTime, distinctUntilChanged, pairwise } from 'rxjs';

import { CellTypesComponent } from '../components/cell-types/cell-types.component';
import { DownloadsComponent } from '../components/downloads/downloads.component';
import { DOWNLOADS_CONTENT, DownloadRequest, UnavailableDownloads } from '../components/downloads/downloads.content';
import {
  EmptyStateContent,
  NO_CELL_TYPES_SELECTED_CONTENT,
  noDistancesContent,
} from '../components/empty-state/empty-state.content';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { MetadataComponent } from '../components/metadata/metadata.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { ViolinComponent } from '../components/violin/violin.component';
import { CellTypeEntry } from '../models/cell-type';
import { loadMetadata, MetadataInput } from '../models/metadata';
import { FileSaverService } from '../services/file-saver/file-saver.service';
import { numberAttribute } from '../shared/attribute-transform';
import { emptyArrayEquals } from '../shared/empty-array-equals';
import { loadingObserver } from '../shared/loading-observer';

/** Interface for representing the distance entry */
export interface DistanceEntry {
  /** Source edge */
  edge: AnyDataEntry;
  /** Type of the entry */
  type: string;
  /** Distance value of the entry */
  distance: number;
}

/** Announced to screen readers once all data has loaded */
const LOADED_ANNOUNCEMENT = 'Visualization loaded';

/** Time in ms that loading must stay finished before the loaded announcement */
const LOADED_ANNOUNCEMENT_DEBOUNCE = 250;

/**
 * CDE Visualization Root Component
 */
@Component({
  selector: 'cde-visualization-root',
  imports: [
    HraCommonModule,
    MatSidenavModule,
    CellTypesComponent,
    DownloadsComponent,
    HistogramComponent,
    MetadataComponent,
    NodeDistVisualizationComponent,
    ViolinComponent,
  ],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hra-app',
  },
})
export class CdeVisualizationComponent {
  /** Link to the home page */
  readonly homeLink = input<string>('/');

  /** Node data */
  readonly nodes = input<NodesInput>();
  /** Node key mapping data */
  readonly nodeKeys = input<NodeKeysInput>();
  /** Node target selector used when calculating edges */
  readonly nodeTargetSelector = input<string>();

  /**
   * Column/property of the node's 'Cell Type' values
   *
   * @deprecated Use `nodeKeys` to specify the column instead
   */
  readonly nodeTargetKey = input<string>();

  /**
   * Node target selector used when calculating edges
   *
   * @deprecated Use `nodeTargetSelector` instead
   */
  readonly nodeTargetValue = input<string>();

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

  /**
   * Column/property of the color map's 'Cell Type' values
   *
   * @deprecated Use `colorMapKeys` to specify the column instead
   */
  readonly colorMapKey = input<string>();

  /**
   * Column/property of the color map's 'Cell Color' values
   *
   * @deprecated Use `colorMapKeys` to specify the column instead
   */
  readonly colorMapValue = input<string>();

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

  /** Name of data source file */
  readonly sourceFileName = input<string>();

  /** Name of color map file */
  readonly colorMapFileName = input<string>();

  /** Event emitted when a node is clicked */
  readonly nodeClick = output<NodeEvent>();

  /** Event emitted when a node is hovered */
  readonly nodeHover = output<NodeEvent | undefined>();

  /** Emits nodes change */
  // eslint-disable-next-line @angular-eslint/no-output-rename -- Backwards compatibility
  readonly nodesChange = output<AnyData>({ alias: 'nodes' });

  /** Emits edges change */
  // eslint-disable-next-line @angular-eslint/no-output-rename -- Backwards compatibility
  readonly edgesChange = output<AnyData>({ alias: 'edges' });

  /** Emits color map change */
  // eslint-disable-next-line @angular-eslint/no-output-rename -- Backwards compatibility
  readonly colorMapChange = output<AnyData>({ alias: 'colorMap' });

  /** View container. Do NOT change the name. It is used by ngx-color-picker! */
  readonly vcRef = inject(ViewContainerRef);

  /** Whether the nodes are loading */
  protected readonly nodesLoading = signal(false);

  /** Whether the edges are loading */
  private readonly edgesLoading = signal(false);

  /** Whether the edges are being generated from the nodes */
  private readonly edgesGenerating = signal(false);

  /** Whether the color map is loading */
  private readonly colorMapLoading = signal(false);

  /** Whether the metadata is loading */
  protected readonly metadataLoading = signal(false);

  /** Whether the cell types are loading. They come from the nodes and the color map. */
  protected readonly cellTypesLoading = computed(() => this.nodesLoading() || this.colorMapLoading());

  /** Whether the distances are loading. They need the nodes and the loaded or generated edges. */
  protected readonly distancesLoading = computed(
    () => this.nodesLoading() || this.edgesLoading() || this.edgesGenerating(),
  );

  /** Whether any data is loading */
  private readonly anyLoading = computed(
    () => this.cellTypesLoading() || this.distancesLoading() || this.metadataLoading(),
  );

  /** Sets the node target selector (uses default if not available) */
  protected readonly nodeTargetSelectorWithDefault = computed(() => {
    return this.nodeTargetSelector() || this.nodeTargetValue() || DEFAULT_NODE_TARGET_SELECTOR;
  });

  /** View of the node data */
  protected readonly nodesView = loadNodes(
    this.nodes,
    this.nodeKeys,
    this.nodeTargetKey,
    loadingObserver(this.nodesLoading),
  );

  /** View of the edge data */
  protected readonly edgesView = withDataViewDefaultGenerator(
    loadEdges(this.edges, this.edgeKeys, loadingObserver(this.edgesLoading)),
    createEdgeGenerator(
      this.nodesView,
      this.edges,
      this.nodeTargetSelectorWithDefault,
      this.maxEdgeDistance,
      loadingObserver(this.edgesGenerating),
    ),
    EMPTY_EDGES_VIEW,
    false,
  );

  /** View of the color map */
  protected readonly colorMapView = withDataViewDefaultGenerator(
    loadColorMap(
      this.colorMap,
      this.colorMapKeys,
      this.colorMapKey,
      this.colorMapValue,
      loadingObserver(this.colorMapLoading),
    ),
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
    loadingObserver(this.metadataLoading),
  );

  /** Filter for node data */
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

  /** Function that gets the node type from an edge */
  private readonly edgeTypeAccessor = computed(() => {
    const getNodeType = this.nodesView().getCellTypeAt;
    const getNodeIndex = this.edgesView().getCellIDFor;
    return (edge: AnyDataEntry) => getNodeType(getNodeIndex(edge));
  });

  /** Gets current node counts */
  private readonly nodeCounts = computed(() => this.nodesView().getCounts());
  /** Gets current edge counts */
  private readonly edgeCounts = computed(() => this.edgesView().getCounts(this.edgeTypeAccessor()));
  /** Gets edge counts by source node */
  private readonly edgeCountsBySourceNode = computed(() =>
    this.edgesView().getCounts((obj) => `${this.edgesView().getCellIDFor(obj)}`),
  );

  /** Gets cell type entries from nodes */
  private readonly cellTypesFromNodes = computed(() => {
    const nodeCounts = this.nodeCounts();
    const edgeCounts = this.edgeCounts();
    const colorLookup = this.colorMapView().getColorLookup();

    return Array.from(nodeCounts).map(([name, count]): CellTypeEntry => ({
      name,
      count,
      outgoingEdgeCount: edgeCounts.get(name) ?? 0,
      color: (colorLookup.get(name) as Rgb) ?? [255, 255, 255],
    }));
  });

  /** Adjustments for cell type counts */
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
  readonly cellTypesCreateRef = effect(() => {
    // Grab dependency on the reset counter
    this.cellTypesResetCounter();

    this.cellTypes.set(this.cellTypesFromNodes());
    this.cellTypesSelection.set(this.cellTypesSelectionFromNodes());
  });

  /** List of filtered cell types based on selection */
  protected readonly filteredCellTypes = computed(
    () => {
      const selection = new Set(this.cellTypesSelection());
      selection.delete(this.nodeTargetSelectorWithDefault());
      const filtered = this.cellTypes().filter(({ name }) => selection.has(name));
      return filtered.sort((a, b) => b.count - a.count);
    },
    { equal: emptyArrayEquals },
  );

  /** Whether the cell types have loaded and none of them are selected, so every panel is empty */
  private readonly noCellTypesSelected = computed(
    () => this.cellTypes().length > 0 && this.cellTypesSelection().length === 0,
  );

  /**
   * Whether there are cell types besides the anchor type but none of them are selected.
   * The charts leave the anchor type out, so they have no distances to show.
   */
  private readonly noDistancesSelected = computed(() => {
    const anchor = this.nodeTargetSelectorWithDefault();
    return this.cellTypes().some(({ name }) => name !== anchor) && this.filteredCellTypes().length === 0;
  });

  /** Empty state for the distance visualization */
  protected readonly visualizationEmptyState = computed(() =>
    this.noCellTypesSelected() ? NO_CELL_TYPES_SELECTED_CONTENT : undefined,
  );

  /** Empty state for the violin graph and histogram */
  protected readonly chartsEmptyState = computed((): EmptyStateContent | undefined => {
    if (this.noCellTypesSelected()) {
      return NO_CELL_TYPES_SELECTED_CONTENT;
    } else if (this.noDistancesSelected()) {
      return noDistancesContent(this.nodeTargetSelectorWithDefault());
    }
    return undefined;
  });

  /** Files that would be empty with the current selection, so the downloads drawer disables them */
  protected readonly unavailableDownloads = computed((): UnavailableDownloads | undefined => {
    const { unavailable, groups } = DOWNLOADS_CONTENT;
    if (this.noCellTypesSelected()) {
      const files = groups.flatMap((group) => group.files.map((file) => file.id));
      return { files, notice: unavailable.noCellTypes };
    } else if (this.noDistancesSelected()) {
      const notice = unavailable.noDistances(this.nodeTargetSelectorWithDefault());
      return { files: ['violin-graph', 'histogram'], notice };
    }
    return undefined;
  });

  /** Computed distances between nodes */
  protected readonly distances = computed(() => this.computeDistances(), { equal: emptyArrayEquals });

  /** Data for the histogram visualization */
  readonly filteredDistances = computed(() => this.computeFilteredDistances(), { equal: emptyArrayEquals });

  /** Colors for the histogram visualization */
  protected readonly filteredColors = computed(() => this.computeFilteredColors(), { equal: emptyArrayEquals });

  /** Injected file saver service */
  private readonly fileSaver = inject(FileSaverService);

  /** Announces the charts' empty state to screen readers */
  private readonly liveAnnouncer = inject(LiveAnnouncer);

  /** Whether the downloads drawer is open */
  protected readonly downloadsOpen = signal(false);

  /** Distance visualization panel */
  private readonly nodeDistVisualizationComponent = viewChild.required(NodeDistVisualizationComponent);

  /** Violin graph panel */
  private readonly violinComponent = viewChild.required(ViolinComponent);

  /** Histogram panel */
  private readonly histogramComponent = viewChild.required(HistogramComponent);

  /** Setup component */
  constructor() {
    // Workaround for getting ngx-color-picker to attach to the root view
    // Not populated for standalone/custom components so we forcefully insert ourself
    inject(ApplicationRef).componentTypes.splice(0, 0, CdeVisualizationComponent);

    effect(() => {
      const selection = this.cellTypesSelection();
      const filter = untracked(this.nodeFilterView);
      this.nodeFilterView.set(new NodeFilterView(selection, filter.exclude));
    });

    // Announced once here, not by each panel's empty state
    effect(() => {
      const emptyState = this.chartsEmptyState();
      if (emptyState) {
        this.liveAnnouncer.announce(`${emptyState.heading}. ${emptyState.description}`);
      }
    });

    // Announced once everything has loaded. The debounce skips the short gap between loading the nodes
    // and generating the edges.
    toObservable(this.anyLoading)
      .pipe(debounceTime(LOADED_ANNOUNCEMENT_DEBOUNCE), distinctUntilChanged(), pairwise(), takeUntilDestroyed())
      .subscribe(([wasLoading, isLoading]) => {
        if (wasLoading && !isLoading) {
          this.liveAnnouncer.announce(LOADED_ANNOUNCEMENT);
        }
      });

    // Connect outputs
    this.bindDataOutput(this.nodesView, this.nodesChange);
    this.bindDataOutput(this.edgesView, this.edgesChange);
    this.bindDataOutput(this.colorMapView, this.colorMapChange);
  }

  /** Reset cell types */
  resetCellTypes(): void {
    this.cellTypesResetCounter.set(this.cellTypesResetCounter() + 1);
  }

  /** Selects every cell type, like the cell types table's select all checkbox */
  selectAllCellTypes(): void {
    this.cellTypesSelection.set(this.cellTypes().map((entry) => entry.name));
  }

  /** Update the color of a specific cell type entry */
  updateColor(entry: CellTypeEntry, color: Rgb): void {
    const entries = this.cellTypes();
    const index = entries.indexOf(entry);
    const copy = [...entries];

    copy[index] = { ...copy[index], color };
    this.cellTypes.set(copy);
  }

  /** Downloads the requested file */
  async handleDownload({ file, format }: DownloadRequest): Promise<void> {
    if (this.unavailableDownloads()?.files.includes(file)) {
      return;
    }

    switch (file) {
      case 'cells':
        return this.downloadNodes();
      case 'cell-links':
        return this.downloadEdges();
      case 'color-map':
        return this.downloadColorMap();
      case 'visualization':
        return this.nodeDistVisualizationComponent().download();
      case 'violin-graph':
        return this.violinComponent().download(format);
      case 'histogram':
        return this.histogramComponent().download(format);
    }
  }

  /** Downloads nodes */
  async downloadNodes(): Promise<void> {
    const nodes = this.nodesView();
    const filter = nodes.createFilter(this.nodeFilterView());
    await this.downloadView(nodes, 'nodes.csv', { filter });
  }

  /** Downloads edges */
  async downloadEdges(): Promise<void> {
    const nodes = this.nodesView();
    const edges = this.edgesView();
    const filter = edges.createFilter(nodes, this.nodeFilterView());
    const computedColumns: Record<string, DataViewEntryComputedValueFn> = {
      Distance: edges.getDistanceFor,
    };
    const reindex = await nodes.createReindexer(this.nodeFilterView());
    const transform: DataViewEntryValueTransform = (value, key) => {
      return key === 'Cell ID' || key === 'Target ID' ? reindex[value as number] : value;
    };

    await this.downloadView(edges, 'edges.csv', { filter, computedColumns, transform });
  }

  /** Downloads color map */
  async downloadColorMap(): Promise<void> {
    const colorMap = this.cellTypesAsColorMap();
    const filter = colorMap.createFilter(this.nodeFilterView());
    await this.downloadView(colorMap, 'color-map.csv', { filter });
  }

  /** Downlaods view */
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

    const selectedCellType = this.nodeTargetSelectorWithDefault();
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

  /** Binds data output */
  private bindDataOutput<V extends AnyDataView>(view: Signal<V>, outputRef: OutputEmitterRef<AnyData>): void {
    effect(() => {
      if (view().length !== 0) {
        outputRef.emit(view().data);
      }
    });
  }
}
