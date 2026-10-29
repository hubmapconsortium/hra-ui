import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HraCommonModule } from '@hra-ui/common';
import { Rgb, rgbToHex } from '@hra-ui/design-system/color-picker';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
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
  ViewMode,
  withDataViewDefaultGenerator,
} from '@hra-ui/node-dist-vis/models';
import { debounceTime, distinctUntilChanged, pairwise } from 'rxjs';

import { AboutComponent } from '../components/about/about.component';
import { CellTypesComponent } from '../components/cell-types/cell-types.component';
import { DownloadsComponent } from '../components/downloads/downloads.component';
import {
  DOWNLOADS_CONTENT,
  DownloadFileId,
  DownloadRequest,
  UnavailableDownloads,
} from '../components/downloads/downloads.content';
import {
  EmptyStateContent,
  NO_CELL_TYPES_SELECTED_CONTENT,
  noDistancesContent,
} from '../components/empty-state/empty-state.content';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { hasHiddenFields, MetadataComponent } from '../components/metadata/metadata.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { ToolbarSheet } from '../components/toolbar/toolbar.content';
import { ViolinComponent } from '../components/violin/violin.component';
import { CellTypeEntry } from '../models/cell-type';
import { loadMetadata, MetadataInput } from '../models/metadata';
import { loadHiddenPanels, PanelId, parseHiddenPanels, saveHiddenPanels } from '../models/panels';
import { FileSaverService } from '../services/file-saver/file-saver.service';
import { ThemeSwitchService } from '../services/theme-switch/theme-switch.service';
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

/** Action of the snackbars shown after a reset */
const UNDO_ACTION = 'Undo';

/** Snackbar message after the colors are reset */
const RESET_COLORS_MESSAGE = 'Colors reset';

/** Snackbar message after everything is reset */
const RESET_EVERYTHING_MESSAGE = 'Visualization reset';

/** Time in ms the snackbars shown after a reset stay open */
const UNDO_SNACKBAR_DURATION = 10000;

/** Announced after the downloads notice shows all panels */
const ALL_PANELS_SHOWN_ANNOUNCEMENT = 'All panels shown';

/** Image downloads of the panels that can be hidden */
const PANEL_IMAGE_DOWNLOADS: Partial<Record<PanelId, DownloadFileId>> = {
  'distance-visualization': 'visualization',
  'violin-graph': 'violin-graph',
  histogram: 'histogram',
};

/**
 * CDE Visualization Root Component
 */
@Component({
  selector: 'cde-visualization-root',
  imports: [
    HraCommonModule,
    MatSidenavModule,
    AboutComponent,
    CellTypesComponent,
    DownloadsComponent,
    HistogramComponent,
    MetadataComponent,
    NodeDistVisualizationComponent,
    ToolbarComponent,
    ViolinComponent,
  ],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  providers: [ThemeSwitchService],
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

  /** Hides the toolbar's Theme menu, for pages that switch the theme themselves */
  readonly hideThemeMenu = input(false, { transform: booleanAttribute });

  /**
   * Panels hidden at first and after Reset everything, as an array or a comma or space separated list of
   * metadata, distance-visualization, violin-graph and histogram. The cell types panel always shows.
   */
  readonly hiddenPanels = input<PanelId[], unknown>([], { transform: parseHiddenPanels });

  /** Remembers the panels shown and hidden from the toolbar in this browser's local storage */
  readonly rememberPanels = input(false, { transform: booleanAttribute });

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

  /** All cells color picked in the histogram or the toolbar, or undefined to use the theme's color */
  protected readonly allCellsColor = signal<Rgb | undefined>(undefined);

  /** List of selected cell types */
  readonly cellTypesSelection = signal<string[]>([], { equal: emptyArrayEquals });

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

  /**
   * Files that would be empty with the current selection, and images of hidden panels,
   * so the downloads drawer disables them
   */
  protected readonly unavailableDownloads = computed((): UnavailableDownloads | undefined => {
    const { unavailable, groups } = DOWNLOADS_CONTENT;
    if (this.noCellTypesSelected()) {
      const files = groups.flatMap((group) => group.files.map((file) => file.id));
      return { files, notice: unavailable.noCellTypes };
    }

    const files: DownloadFileId[] = [];
    const notices: string[] = [];
    if (this.noDistancesSelected()) {
      files.push('violin-graph', 'histogram');
      notices.push(unavailable.noDistances(this.nodeTargetSelectorWithDefault()));
    }

    const hiddenImages = this.panelsHidden()
      .map((panel) => PANEL_IMAGE_DOWNLOADS[panel])
      .filter((file): file is DownloadFileId => file !== undefined && !files.includes(file));
    if (hiddenImages.length > 0) {
      files.push(...hiddenImages);
      notices.push(unavailable.hiddenPanels);
    }

    return files.length > 0 ? { files, notice: notices.join(' '), showPanels: hiddenImages.length > 0 } : undefined;
  });

  /** Computed distances between nodes */
  protected readonly distances = computed(() => this.computeDistances(), { equal: emptyArrayEquals });

  /** Data for the histogram visualization */
  readonly filteredDistances = computed(() => this.computeFilteredDistances(), { equal: emptyArrayEquals });

  /** Colors for the histogram visualization */
  protected readonly filteredColors = computed(() => this.computeFilteredColors(), { equal: emptyArrayEquals });

  /** Whether the distance visualization hides cell links. Set from the toolbar and the fullscreen menu. */
  protected readonly edgesDisabled = signal(false);

  /** Whether the cell types table shows the cell link columns */
  protected readonly showCellLinkData = signal(true);

  /** Whether the metadata panel shows every field, including empty ones */
  protected readonly showAllMetadata = signal(false);

  /** Distance visualization's view mode */
  protected readonly viewMode = signal<ViewMode>('explore');

  /** Panels hidden from the toolbar, starting from the remembered panels or the hiddenPanels input */
  protected readonly panelsHidden = linkedSignal(() =>
    this.rememberPanels() ? (loadHiddenPanels() ?? this.hiddenPanels()) : this.hiddenPanels(),
  );

  /** Which panels show, and whether the top row and the visualizations column still have a panel showing */
  protected readonly layout = computed(() => {
    const hidden = this.panelsHidden();
    const metadata = !hidden.includes('metadata');
    const distanceVisualization = !hidden.includes('distance-visualization');
    const violinGraph = !hidden.includes('violin-graph');
    const histogram = !hidden.includes('histogram');
    const topRow = distanceVisualization || violinGraph;
    return {
      metadata,
      distanceVisualization,
      violinGraph,
      histogram,
      topRow,
      visualizations: topRow || histogram,
    };
  });

  /** Whether the metadata has fields that only show with all metadata */
  protected readonly hasHiddenMetadata = computed(() => hasHiddenFields(this.metadataView()));

  /** Whether any cells were deleted from the distance visualization */
  protected readonly hasDeletedCells = computed(() => (this.nodeFilterView().exclude?.length ?? 0) > 0);

  /** Sheet that's open in the drawer, if any. The toolbar's Downloads and Info items open it */
  protected readonly openSheet = signal<ToolbarSheet | undefined>(undefined);

  /** Sheet shown in the drawer. Keeps the last open sheet while the drawer closes, so it doesn't vanish mid-animation */
  protected readonly sheet = linkedSignal<ToolbarSheet | undefined, ToolbarSheet>({
    source: this.openSheet,
    computation: (openSheet, previous) => openSheet ?? previous?.value ?? 'downloads',
  });

  /** Injected file saver service */
  private readonly fileSaver = inject(FileSaverService);

  /** Announces the charts' empty state to screen readers */
  private readonly liveAnnouncer = inject(LiveAnnouncer);

  /** Switches the visualization between the page's theme and the light and dark themes */
  protected readonly themeSwitch = inject(ThemeSwitchService);

  /** Downloads sheet, while it's the drawer's sheet */
  private readonly downloadsSheet = viewChild(DownloadsComponent);

  /** About sheet, while it's the drawer's sheet */
  private readonly aboutSheet = viewChild(AboutComponent);

  /** Id of the sheet's title, which labels the drawer */
  protected readonly sheetLabelledBy = computed(() =>
    this.sheet() === 'downloads' ? this.downloadsSheet()?.titleId : this.aboutSheet()?.titleId,
  );

  /** Ids of the elements that describe the drawer */
  protected readonly sheetDescribedBy = computed(() =>
    this.sheet() === 'downloads' ? this.downloadsSheet()?.describedBy() : this.aboutSheet()?.descriptionId,
  );

  /** Distance visualization panel */
  private readonly nodeDistVisualizationComponent = viewChild.required(NodeDistVisualizationComponent);

  /** Violin graph panel */
  private readonly violinComponent = viewChild.required(ViolinComponent);

  /** Histogram panel */
  private readonly histogramComponent = viewChild.required(HistogramComponent);

  /** All cells color in effect, including the theme's color when none is picked */
  protected readonly allCellsDisplayColor = computed(() => this.histogramComponent().totalCellTypeColor());

  /** Shows the snackbars that undo a reset */
  private readonly snackbar = inject(SnackbarService);

  /** Setup component */
  constructor() {
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

    // The charts only resize with the window, so they resize again after panels show or hide
    afterRenderEffect(() => {
      const { violinGraph, histogram } = this.layout();
      untracked(() => {
        if (violinGraph) {
          this.violinComponent().resizeAndSyncView();
        }
        if (histogram) {
          this.histogramComponent().resizeAndSyncView();
        }
      });
    });

    // Connect outputs
    this.bindDataOutput(this.nodesView, this.nodesChange);
    this.bindDataOutput(this.edgesView, this.edgesChange);
    this.bindDataOutput(this.colorMapView, this.colorMapChange);
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

  /** Resets the distance visualization's view */
  resetView(): void {
    this.nodeDistVisualizationComponent().resetView();
  }

  /** Restores the cells deleted from the distance visualization */
  restoreDeletedCells(): void {
    this.nodeFilterView.set(this.nodeFilterView().clear(false, true));
  }

  /**
   * Resets every cell type's color and the all cells color. The cell type selection stays.
   * A snackbar offers to undo the reset, as long as the data hasn't changed since.
   */
  resetColors(): void {
    const cellTypes = this.cellTypes();
    const allCellsColor = this.allCellsColor();
    this.useDefaultColors();

    this.openUndoSnackbar(RESET_COLORS_MESSAGE, () => {
      this.cellTypes.set(cellTypes);
      this.allCellsColor.set(allCellsColor);
    });
  }

  /** Shows and hides panels, and remembers them if rememberPanels is set */
  protected setHiddenPanels(panels: PanelId[]): void {
    this.panelsHidden.set(panels);
    if (this.rememberPanels()) {
      saveHiddenPanels(panels);
    }
  }

  /** Shows every panel from the downloads notice, and announces it since the notice's button goes away */
  protected showAllPanels(): void {
    this.setHiddenPanels([]);
    this.liveAnnouncer.announce(ALL_PANELS_SHOWN_ANNOUNCEMENT);
  }

  /**
   * Resets the view, panels, deleted cells and colors, selects every cell type, restores the default display
   * options, and switches the distance visualization back to explore. Panels go back to the hiddenPanels input.
   * A snackbar offers to undo everything but the view, as long as the data hasn't changed since.
   */
  resetEverything(): void {
    const panelsHidden = this.panelsHidden();
    const cellTypes = this.cellTypes();
    const allCellsColor = this.allCellsColor();
    const cellTypesSelection = this.cellTypesSelection();
    const nodeFilterView = this.nodeFilterView();
    const edgesDisabled = this.edgesDisabled();
    const showCellLinkData = this.showCellLinkData();
    const showAllMetadata = this.showAllMetadata();
    const viewMode = this.viewMode();

    this.resetView();
    this.setHiddenPanels(this.hiddenPanels());
    this.restoreDeletedCells();
    this.useDefaultColors();
    this.selectAllCellTypes();
    this.edgesDisabled.set(false);
    this.showCellLinkData.set(true);
    this.showAllMetadata.set(false);
    this.viewMode.set('explore');

    this.openUndoSnackbar(RESET_EVERYTHING_MESSAGE, () => {
      this.setHiddenPanels(panelsHidden);
      this.cellTypes.set(cellTypes);
      this.allCellsColor.set(allCellsColor);
      this.cellTypesSelection.set(cellTypesSelection);
      this.nodeFilterView.set(nodeFilterView);
      this.edgesDisabled.set(edgesDisabled);
      this.showCellLinkData.set(showCellLinkData);
      this.showAllMetadata.set(showAllMetadata);
      this.viewMode.set(viewMode);
    });
  }

  /** Gives every cell type its default color and the all cells color back to the theme */
  private useDefaultColors(): void {
    this.cellTypes.set(this.cellTypesFromNodes());
    this.allCellsColor.set(undefined);
  }

  /** Opens a snackbar whose Undo action calls `undo`, unless the data has changed since */
  private openUndoSnackbar(message: string, undo: () => void): void {
    const cellTypesFromNodes = this.cellTypesFromNodes();
    this.snackbar
      .open(message, UNDO_ACTION, false, 'end', { duration: UNDO_SNACKBAR_DURATION })
      .onAction()
      .subscribe(() => {
        if (this.cellTypesFromNodes() === cellTypesFromNodes) {
          undo();
        }
      });
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
