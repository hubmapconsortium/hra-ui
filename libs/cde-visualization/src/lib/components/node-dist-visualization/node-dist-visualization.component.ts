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
import '@hra-ui/node-dist-vis';
import { NodeDistVisElement, NodeEvent } from '@hra-ui/node-dist-vis';
import { ColorMapView, EdgesView, NodeFilter, NodesView, ViewMode } from '@hra-ui/node-dist-vis/models';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { NodeDistVisualizationControlsComponent } from './controls/node-dist-visualization-controls.component';
import { NodeDistVisualizationMenuComponent } from './menu/node-dist-visualization-menu.component';

/**
 * Component for Node Distribution Visualization
 */
@Component({
  selector: 'cde-node-dist-visualization',
  standalone: true,
  imports: [
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    FullscreenActionsComponent,
    FullscreenPortalComponent,
    FullscreenPortalContentComponent,

    NodeDistVisualizationControlsComponent,
    NodeDistVisualizationMenuComponent,
  ],
  templateUrl: './node-dist-visualization.component.html',
  styleUrl: './node-dist-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allows custom elements in the template
})
export class NodeDistVisualizationComponent {
  readonly nodes = input.required<NodesView>();

  readonly edges = input.required<EdgesView>();

  /** Input for the maximum edge distance */
  readonly maxEdgeDistance = input.required<number>();

  /** Input for the color map data */
  readonly colorMap = input.required<ColorMapView>();

  readonly nodeFilter = model<NodeFilter>({});

  /** Input for selected cell types */
  readonly cellTypesSelection = input.required<string[]>();

  /** Output emitter for node click events */
  readonly nodeClick = output<NodeEvent>();

  /** Output emitter for node hover events */
  readonly nodeHover = output<NodeEvent | undefined>();

  /** Output event to reset all cells selection */
  readonly resetAllCells = output<void>();

  /** Flag to check cell links visibility */
  protected readonly edgesDisabled = signal(false);

  protected readonly viewMode = signal<ViewMode>('explore');

  protected readonly selection = signal<NodeEvent[]>([]);

  protected readonly hasSelection = computed(() => {
    return this.viewMode() === 'select' && this.selection().length > 0;
  });

  private readonly fullscreenPortal = viewChild.required(FullscreenPortalComponent);
  private readonly visEl = computed(() => this.fullscreenPortal().rootNodes()[0].childNodes[0] as NodeDistVisElement);

  /** Service to handle file saving */
  private readonly fileSaver = inject(FileSaverService);

  /** Bind data and events to the visualization element */
  constructor() {
    this.bindData('mode', this.viewMode);

    this.bindData('nodes', this.nodes);
    this.bindEvent('nodeClicked', this.nodeClick);
    this.bindEvent('nodeHovering', this.nodeHover);

    this.bindData('edges', this.edges);
    this.bindData('edgesDisabled', this.edgesDisabled);
    this.bindData('maxEdgeDistance', this.maxEdgeDistance);

    this.bindData('colorMap', this.colorMap);

    this.bindData('selection', this.cellTypesSelection);
    this.bindData('nodeFilter', this.nodeFilter);
    this.bindEvent('nodeSelectionChange', this.selection);
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
    this.visEl().instance?.resetView();
  }

  resetDeletedNodes(): void {
    const oldFilter = this.nodeFilter();
    const newFilter = { ...oldFilter, exclude: [] };
    this.nodeFilter.set(newFilter);
  }

  deleteSelection(): void {
    const selection = this.selection();
    if (selection.length > 0) {
      const indices = selection.map((event) => event.index);
      const oldFilter = this.nodeFilter();
      const newFilter = { ...oldFilter, exclude: [...(oldFilter.exclude ?? []), ...indices] };

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
}
