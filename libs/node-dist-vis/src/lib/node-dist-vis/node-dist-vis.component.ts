import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  ErrorHandler,
  inject,
  input,
  numberAttribute,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { DeckProps, OrbitView, OrbitViewState, PickingInfo, View } from '@deck.gl/core/typed';
import {
  AnyData,
  AnyDataEntry,
  AnyDataView,
  ColorMapEntry,
  ColorMapView,
  createColorMapGenerator,
  createEdgeGenerator,
  EdgeKeysInput,
  EdgesInput,
  EMPTY_COLOR_MAP_VIEW,
  EMPTY_EDGES_VIEW,
  KeyMapping,
  loadColorMap,
  loadEdges,
  loadNodeFilter,
  loadNodes,
  NodeFilterInput,
  NodeKeysInput,
  NodesInput,
  ViewMode,
  withDataViewDefaultGenerator,
} from '@hra-ui/node-dist-vis/models';
import { createController } from '../deckgl/controller';
import { createDeck } from '../deckgl/deck';
import { createEdgesLayer } from '../deckgl/edges';
import { createNodesLayer } from '../deckgl/nodes';
import { createScaleBarLayer } from '../deckgl/scale-bar';
import { createSelectionLayer } from '../deckgl/selection';
import { scalePosition } from '../deckgl/utils/position-scaling';

/** CursorState is not exported by deckgl */
type CursorState = Parameters<NonNullable<DeckProps['getCursor']>>[0];

/** OrbitView's constructor is poorly typed */
type OrbitViewProps = ConstructorParameters<typeof OrbitView>[0] &
  ConstructorParameters<typeof View<OrbitViewState>>[0];

/** Options for the `zoomToFit` method */
export interface ZoomToFitOptions {
  /** Margins around the visualization */
  margin?: { x: number; y: number };
  /** Whether to reset camera rotation when zooming */
  resetRotation?: boolean;
  /** Whether to reset camera target when zooming */
  resetTarget?: boolean;
  /** Duration of the transition in milliseconds (default: 0) */
  transitionDuration?: number;
}

/** Node interaction event data */
export interface NodeEvent {
  /** Index of the node in the data */
  index: number;
  /** Screen x-position */
  clientX: number;
  /** Screen y-position */
  clientY: number;
  /** The materialized node object */
  object: object;
  /** The raw node data entry */
  raw: AnyDataEntry;
}

/** Default node target */
export const DEFAULT_NODE_TARGET_SELECTOR = 'Endothelial';
/** Default max edge distance */
export const DEFAULT_MAX_EDGE_DISTANCE = 1000;
/** Default value for zoomToFit margin */
const DEFAULT_ZOOM_TO_FIT_MARGIN = { x: 24, y: 24 };
/** Default transition duration for zoomToFit during resizes */
const DEFAULT_ZOOM_TO_FIT_ON_RESIZE_TRANSITION_DURATION = 200;

/** Initial visualization deckgl state */
const INITIAL_VIEW_STATE = {
  version: 0,
  orbitAxis: 'Y',
  camera: 'orbit',
  zoom: 9,
  minRotationX: -90,
  maxRotationX: 90,
  rotationX: 0,
  rotationOrbit: 0,
  dragMode: 'rotate',
  target: [0.5, 0.5],
};

/** Node distance visualization */
@Component({
  selector: 'hra-node-dist-vis',
  template: '<canvas (contextmenu)="$event.preventDefault()" #canvas></canvas>',
  styles: ':host { display: block; position: relative; width: 100%; height: 100%; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hra-app',
  },
})
export class NodeDistVisComponent {
  /** View mode of the visualization */
  readonly mode = input<ViewMode>('explore');

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
  /** Whether edges are disabled */
  readonly edgesDisabled = input(false, { transform: booleanAttribute });
  /** Max distance to consider when calculating edges */
  readonly maxEdgeDistance = input(DEFAULT_MAX_EDGE_DISTANCE, { transform: numberAttribute });

  /** Color map data */
  readonly colorMap = input<ColorMapView | AnyData | string>();
  /** Color map key mapping data */
  readonly colorMapKeys = input<KeyMapping<ColorMapEntry> | string>();
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

  /** Node filter data */
  readonly nodeFilter = input<NodeFilterInput>();
  /**
   * Node 'Cell Type's to display
   *
   * @deprecated Use `nodeFilter`'s `include` property to specify included nodes instead
   */
  readonly selection = input<string[] | string>();

  // eslint-disable-next-line @angular-eslint/no-output-rename
  readonly nodesChange = output<AnyData>({ alias: 'nodes' });
  // eslint-disable-next-line @angular-eslint/no-output-rename
  readonly edgesChange = output<AnyData>({ alias: 'edges' });
  // eslint-disable-next-line @angular-eslint/no-output-rename
  readonly colorMapChange = output<AnyData>({ alias: 'colorMap' });

  /** Emits when the user clicks on a node */
  readonly nodeClick = output<NodeEvent>();
  /** Emits when the user starts or stops hovering over a node */
  readonly nodeHover = output<NodeEvent | undefined>();
  /** Emits when the user selects one or more nodes in the 'select' view mode */
  readonly nodeSelectionChange = output<NodeEvent[]>();

  /** Reference to the rendered canvas element */
  readonly canvas = computed(() => this.canvasElementRef().nativeElement);
  /** Reference to the deckgl instance */
  readonly deck = createDeck(this.canvas, {
    controller: true,
    views: new OrbitView({ id: 'orbit', orbitAxis: 'Y' } as OrbitViewProps),
    initialViewState: INITIAL_VIEW_STATE,
    layers: [],
    getCursor: this.getCursor.bind(this),
    onClick: this.onClick.bind(this),
    onHover: this.onHover.bind(this),
    onInteractionStateChange: this.onInteraction.bind(this),
    onViewStateChange: ({ viewState }) => this.viewState.set(viewState),
    onError: (error) => this.errorHandler.handleError(error),
  });

  /** Canvas element wrapped inside an `ElementRef` */
  private readonly canvasElementRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  /** Error handler for the application */
  private readonly errorHandler = inject(ErrorHandler);

  /** Current version value of the deckgl view state */
  private viewStateVersion = INITIAL_VIEW_STATE.version;
  /** Current deckgl view state */
  private readonly viewState = signal<object>(INITIAL_VIEW_STATE);

  /** Node target selector with fallbacks applied */
  private readonly nodeTargetSelectorWithDefault = computed(() => {
    return this.nodeTargetSelector() || this.nodeTargetValue() || DEFAULT_NODE_TARGET_SELECTOR;
  });

  /** View of the node data */
  private readonly nodesView = loadNodes(this.nodes, this.nodeKeys, this.nodeTargetKey);
  /** View of the edge data */
  private readonly edgesView = withDataViewDefaultGenerator(
    loadEdges(this.edges, this.edgeKeys),
    createEdgeGenerator(this.nodesView, this.edges, this.nodeTargetSelectorWithDefault, this.maxEdgeDistance),
    EMPTY_EDGES_VIEW,
    false,
  );
  /** View of the color map */
  private readonly colorMapView = withDataViewDefaultGenerator(
    loadColorMap(this.colorMap, this.colorMapKeys, this.colorMapKey, this.colorMapValue),
    createColorMapGenerator(this.nodesView, this.colorMap),
    EMPTY_COLOR_MAP_VIEW,
  );
  /** View of the node filter */
  private readonly nodeFilterView = loadNodeFilter(this.nodeFilter, this.selection);

  /** Node layer */
  private readonly nodesLayer = createNodesLayer(this.mode, this.nodesView, this.nodeFilterView, this.colorMapView);
  /** Edge layer */
  private readonly edgesLayer = createEdgesLayer(
    this.nodesView,
    this.edgesView,
    this.nodeFilterView,
    this.colorMapView,
    this.edgesDisabled,
  );
  /** Scale bar layer */
  private readonly scaleBarLayer = createScaleBarLayer(this.nodesView, this.canvas, this.viewState);
  /** Selection layer */
  private readonly selectionLayer = createSelectionLayer(this.mode, this.nodesLayer, this.onSelect.bind(this));
  /** All layers as an array */
  private readonly layers = computed(() => [
    this.nodesLayer(),
    this.edgesLayer(),
    this.scaleBarLayer(),
    this.selectionLayer(),
  ]);

  /** Controller options */
  private readonly controller = createController(this.mode);
  /** Deckgl props */
  private readonly props = computed((): DeckProps => {
    return {
      controller: this.controller(),
      layers: this.layers(),
    };
  });

  /** Canvas resize observer */
  private readonly resizeObserver = new ResizeObserver(this.onResize.bind(this));

  /** Whether to call `zoomToFit` on resize events */
  private readonly zoomToFitOnResize = signal(true);

  /** Currently hovered node entry */
  private activeHover: AnyDataEntry | undefined = undefined;

  /** Initialize the visualization */
  constructor() {
    // Connect data to deckgl
    effect(() => this.deck().setProps(this.props()));

    // React to node changes
    effect(() => {
      this.nodesView();
      untracked(() => {
        this.setZoomToFitOnResize(true);
        this.zoomToFit();
      });
    });

    // Watch resize events
    effect((onCleanup) => {
      if (this.zoomToFitOnResize()) {
        const { resizeObserver } = this;
        const el = untracked(this.canvas);
        resizeObserver.observe(el);
        onCleanup(() => resizeObserver.unobserve(el));
      }
    });

    // Connect outputs
    this.bindDataOutput(this.nodesView, this.nodesChange);
    this.bindDataOutput(this.edgesView, this.edgesChange);
    this.bindDataOutput(this.colorMapView, this.colorMapChange);

    // Attach cleanup logic
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => this.resizeObserver.disconnect());
  }

  /**
   * Zooms the visualization to fit all nodes on screen.
   * Has no effect until the nodes have been loaded.
   */
  zoomToFit(options: ZoomToFitOptions = {}): void {
    const view = this.nodesView();
    if (view.length === 0) {
      return;
    }

    const {
      margin: { x: marginX, y: marginY } = DEFAULT_ZOOM_TO_FIT_MARGIN,
      resetRotation = true,
      resetTarget = true,
      transitionDuration = 0,
    } = options;
    const { width, height } = this.deck();
    const pixelRatio = window.devicePixelRatio;
    const target = scalePosition(view.getCenter(), view.getDimensions());
    const scale = view.getScale();
    const [scaleX, scaleY] = view.getScale3D();
    const zoomX = Math.log2((scale * (width - 2 * marginX)) / (pixelRatio * scaleX));
    const zoomY = Math.log2((scale * (height - 2 * marginY)) / (pixelRatio * scaleY));
    const zoom = Math.min(zoomX, zoomY);

    this.deck().setProps({
      initialViewState: {
        ...this.viewState(),
        transitionDuration,
        zoom,
        ...(resetTarget ? { target } : {}),
        ...(resetRotation ? { rotationX: 0, rotationOrbit: 0 } : {}),
        version: ++this.viewStateVersion,
      },
    });
  }

  /**
   * Enable or disable automatic `zoomToFit` calls on resize events.
   *
   * @param enable Whether to enable `zoomToFit`
   */
  setZoomToFitOnResize(enable: boolean): void {
    this.zoomToFitOnResize.set(enable);
  }

  /** Resets the view to the original location and rotation */
  resetView(): void {
    this.deck().setProps({
      initialViewState: {
        ...INITIAL_VIEW_STATE,
        version: ++this.viewStateVersion,
      },
    });
  }

  /** Resets the rotation of the orbit view */
  resetOrbit(): void {
    this.deck().setProps({
      initialViewState: {
        ...this.viewState(),
        rotationX: 0,
        rotationOrbit: 0,
        version: ++this.viewStateVersion,
      },
    });
  }

  /** Clears any active selection */
  clearSelection(): void {
    this.selectionLayer()?.clearSelection();
  }

  /**
   * Creates a blob representing the image in the canvas.
   *
   * @param type Image format (default: image/png)
   * @param quality Image quality, a number between 0 and 1
   * @returns A data blob
   */
  toBlob(type?: string, quality?: number): Promise<Blob | null> {
    return new Promise((resolve) => {
      this.deck().redraw('toDataUrl');
      this.canvas().toBlob(resolve, type, quality);
    });
  }

  /**
   * Get the cursor to display
   *
   * @param state Cursor state
   * @returns Which cursor to display
   */
  private getCursor({ isDragging, isHovering }: CursorState): string {
    if (isDragging) {
      return 'grabbing';
    } else if (isHovering) {
      return 'pointer';
    }
    return 'grab';
  }

  /**
   * Handle a click in deckgl
   *
   * @param info Deckgl picking information
   */
  private onClick(info: PickingInfo): void {
    if (this.mode() === 'select') {
      return;
    } else if (info.picked) {
      this.nodeClick.emit(this.pickingInfoToNodeEvent(info));
    }
  }

  /**
   * Handle hovering in deckgl
   *
   * @param info Deckgl picking information
   */
  private onHover(info: PickingInfo): void {
    if (this.mode() === 'select') {
      return;
    } else if (info.picked) {
      const event = this.pickingInfoToNodeEvent(info);
      if (event.object !== this.activeHover) {
        this.nodeHover.emit(event);
        this.activeHover = event.object;
      }
    } else if (this.activeHover !== undefined) {
      this.nodeHover.emit(undefined);
      this.activeHover = undefined;
    }
  }

  /**
   * Handle node selection in deckgl
   *
   * @param infos Deckgl picking information
   */
  private onSelect(infos: PickingInfo[]): void {
    const events = infos.map((info) => this.pickingInfoToNodeEvent(info));
    this.nodeSelectionChange.emit(events);
  }

  /**
   * Handle visualization interactions in deckgl
   *
   * @param state Current interactions
   */
  private onInteraction(state: Record<string, boolean>): void {
    // Override `inTransition` when checking for interactions
    const values = Object.values({ ...state, inTransition: false });
    const isInteracting = values.some((v) => v);
    if (isInteracting) {
      this.setZoomToFitOnResize(false);
    }
  }

  /**
   * Handle canvas resizing
   */
  private onResize(): void {
    this.zoomToFit({
      resetRotation: false,
      resetTarget: false,
      transitionDuration: DEFAULT_ZOOM_TO_FIT_ON_RESIZE_TRANSITION_DURATION,
    });
  }

  /**
   * Convert deckgl picking information to a node event
   *
   * @param info Deckgl picking information
   * @returns Node event data
   */
  private pickingInfoToNodeEvent(info: PickingInfo): NodeEvent {
    const view = this.nodesView();
    const { index, x, y } = info;
    return {
      index,
      clientX: x,
      clientY: y,
      object: view.materializeAt(index),
      raw: view.at(index),
    };
  }

  /**
   * Listen to view data changes and emit the data when available
   *
   * @param view Data view object
   * @param outputRef Output emitter
   */
  private bindDataOutput<V extends AnyDataView>(view: Signal<V>, outputRef: OutputEmitterRef<AnyData>): void {
    effect(() => {
      if (view().length !== 0) {
        outputRef.emit(view().data);
      }
    });
  }
}
