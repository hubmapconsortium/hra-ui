import { CdkConnectedOverlay, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OutputEmitterRef,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  input,
  isSignal,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import {
  FullscreenActionsComponent,
  FullscreenPortalComponent,
  FullscreenPortalContentComponent,
} from '@hra-ui/design-system/fullscreen';
import { DataItem, InfoModalComponent } from '@hra-ui/design-system/info-modal';
import '@hra-ui/node-dist-vis';
import { NodeDistVisElement, NodeEvent } from '@hra-ui/node-dist-vis';
import {
  AnyDataEntry,
  ColorMapView,
  EdgesView,
  NodeFilterView,
  NodesView,
  ViewMode,
} from '@hra-ui/node-dist-vis/models';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { NodeDistVisualizationControlsComponent } from './controls/node-dist-visualization-controls.component';
import { NodeDistVisualizationMenuComponent } from './menu/node-dist-visualization-menu.component';

/** Number format for distances */
const DISTANCE_FORMAT = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

/**
 * Component for Node Distribution Visualization
 */
@Component({
  selector: 'cde-node-dist-visualization',
  imports: [
    OverlayModule,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    FullscreenActionsComponent,
    FullscreenPortalComponent,
    FullscreenPortalContentComponent,
    InfoModalComponent,
    NodeDistVisualizationControlsComponent,
    NodeDistVisualizationMenuComponent,
  ],
  templateUrl: './node-dist-visualization.component.html',
  styleUrl: './node-dist-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NodeDistVisualizationComponent {
  /** Input for node data */
  readonly nodes = input.required<NodesView>();

  /** Input for edge data */
  readonly edges = input.required<EdgesView>();

  /** Input for the color map data */
  readonly colorMap = input.required<ColorMapView>();

  /** Node filter */
  readonly nodeFilter = model.required<NodeFilterView>();

  /** Input for the maximum edge distance */
  readonly maxEdgeDistance = input.required<number>();

  /** Output emitter for node click events */
  readonly nodeClick = output<NodeEvent>();

  /** Output emitter for node hover events */
  readonly nodeHover = output<NodeEvent | undefined>();

  /** Flag to check cell links visibility */
  protected readonly edgesDisabled = signal(false);

  /** Current view mode */
  protected readonly viewMode = signal<ViewMode>('explore');

  /** Current node selection */
  protected readonly selection = signal<NodeEvent[]>([]);

  /** If there is a current node selection */
  protected readonly hasSelection = computed(() => {
    return this.viewMode() === 'select' && this.selection().length > 0;
  });

  /** Signal containing node event */
  protected readonly cellInfo = signal<NodeEvent | undefined>(undefined);
  /** Opens cell info panel */
  protected readonly cellInfoOpen = computed(() => this.viewMode() === 'inspect' && !!this.cellInfo());
  /** Position of cell info panel */
  protected readonly cellInfoPosition = computed((): ConnectedPosition[] => [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: this.cellInfo()?.clientX,
      offsetY: this.cellInfo()?.clientY,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: this.cellInfo()?.clientX,
      offsetY: this.cellInfo()?.clientY,
    },
  ]);

  /** Data for cell info panel */
  protected readonly cellInfoContent = computed((): DataItem[] => {
    const info = this.cellInfo();
    if (!info) {
      return [];
    }

    const nodes = this.nodes();
    const edges = this.edges();
    const { index, object: node } = info;
    const edge = this.findClosestEdge(index);
    const type = nodes.getCellTypeFor(node);
    const ontologyId = nodes.getCellOntologyIDFor(node) ?? '-';
    const distance = edge ? DISTANCE_FORMAT.format(edges.getDistanceFor(edge)) + ' µm' : '-';
    const x = DISTANCE_FORMAT.format(nodes.getXFor(node));
    const y = DISTANCE_FORMAT.format(nodes.getYFor(node));
    const z = DISTANCE_FORMAT.format(nodes.getZFor(node) ?? 0);

    return [
      { label: 'Cell Type', value: type },
      { label: 'CL ID', value: ontologyId },
      { label: 'Distance to Closest Anchor Cell', value: distance },
      { label: 'X Coordinate', value: `${x} µm` },
      { label: 'Y Coordinate', value: `${y} µm` },
      { label: 'Z Coordinate', value: `${z} µm` },
    ];
  });

  /** Service to handle file saving */
  private readonly fileSaver = inject(FileSaverService);

  /** Full screen portal element */
  private readonly fullscreenPortal = viewChild.required(FullscreenPortalComponent);

  /** Visualization element */
  private readonly visEl = computed(() => this.fullscreenPortal().rootNodes()[0].childNodes[0] as NodeDistVisElement);

  /** Cell info overlay element */
  private readonly cellInfoOverlay = viewChild.required<CdkConnectedOverlay>('cellInfoOverlay');

  /** Bind data and events to the visualization element */
  constructor() {
    this.bindData('mode', this.viewMode);

    this.bindData('nodes', this.nodes);
    this.bindEvent('nodeClick', this.nodeClick);
    this.bindEvent('nodeClick', this.cellInfo);
    this.bindEvent('nodeHover', this.nodeHover);

    this.bindData('edges', this.edges);
    this.bindData('edgesDisabled', this.edgesDisabled);
    this.bindData('maxEdgeDistance', this.maxEdgeDistance);

    this.bindData('colorMap', this.colorMap);

    this.bindData('nodeFilter', this.nodeFilter);
    this.bindEvent('nodeSelectionChange', this.selection);

    effect(() => {
      if (this.viewMode() === 'select') {
        this.resetOrbit();
      }
    });

    effect(() => {
      // CdkConnectedOverlay only updates the position on changes to 'origin' and 'open'
      // Manually force an update to the position instead
      const info = this.cellInfo();
      const ref = this.cellInfoOverlay().overlayRef;
      if (info && ref) {
        setTimeout(() => ref.updatePosition());
      }
    });
  }

  /** Downloads the visualization as an image */
  async download(): Promise<void> {
    const el = this.visEl().instance;
    const blob = await el?.toBlob();
    if (blob) {
      this.fileSaver.saveData(blob, 'cell-distance-vis.png');
    }
  }

  /** Resets the visualization view */
  resetView(): void {
    this.cellInfo.set(undefined);
    this.visEl().instance?.resetView();
  }

  /** Resets the orbit controls */
  resetOrbit(): void {
    this.visEl().instance?.resetOrbit();
  }

  /** Resets the deleted nodes filter */
  resetDeletedNodes(): void {
    const newFilter = this.nodeFilter().clear(false, true);
    this.nodeFilter.set(newFilter);
  }

  /** Deletes the selected nodes */
  deleteSelection(): void {
    const selection = this.selection();
    if (selection.length > 0) {
      const indices = selection.map((event) => event.index);
      const newFilter = this.nodeFilter().addEntries(undefined, indices);

      this.visEl().instance?.clearSelection();
      this.selection.set([]);
      this.nodeFilter.set(newFilter);
    }
  }

  /** Binds a property from the visualization element to a signal */
  private bindData<K extends keyof NodeDistVisElement>(prop: K, value: Signal<NodeDistVisElement[K]>): void {
    effect(() => {
      const el = this.visEl();
      const data = value();
      el[prop] = data;
    });
  }

  /** Binds an event from the visualization element to an output emitter */
  private bindEvent<T>(type: string, outputRef: OutputEmitterRef<T> | WritableSignal<T>): void {
    const handler = (event: Event) => {
      const { detail: data } = event as CustomEvent;
      if (isSignal(outputRef)) {
        outputRef.set(data);
      } else {
        outputRef.emit(data);
      }
    };

    effect((onCleanup) => {
      const el = this.visEl();
      el.addEventListener(type, handler);
      onCleanup(() => el.removeEventListener(type, handler));
    });
  }

  private findClosestEdge(index: number): AnyDataEntry | undefined {
    const edges = this.edges();
    for (const edge of edges) {
      if (edges.getCellIDFor(edge) === index) {
        return edge;
      }
    }

    return undefined;
  }
}
