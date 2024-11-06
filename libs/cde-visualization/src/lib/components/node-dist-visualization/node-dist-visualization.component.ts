import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
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
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { TooltipContent } from '@hra-ui/design-system/tooltip-card';
import '@hra-ui/node-dist-vis';
import { NodeDistVisElement } from '@hra-ui/node-dist-vis';
import { ColorMapView, EdgesView, NodesView } from '@hra-ui/node-dist-vis/models';
import { NodeEntry } from '../../models/node';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';

/**
 * Component for Node Distribution Visualization
 */
@Component({
  selector: 'cde-node-dist-visualization',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    MicroTooltipDirective,
    IconButtonSizeDirective,
    MatMenuModule,
    MatButtonToggleModule,
    FullscreenPortalComponent,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    FullscreenActionsComponent,
    FullscreenPortalContentComponent,
  ],
  templateUrl: './node-dist-visualization.component.html',
  styleUrl: './node-dist-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allows custom elements in the template
})
export class NodeDistVisualizationComponent {
  readonly nodes = input.required<NodesView>();

  readonly edges = model.required<EdgesView>();

  /** Input for the maximum edge distance */
  readonly maxEdgeDistance = input.required<number>();

  /** Input for the color map data */
  readonly colorMap = input.required<ColorMapView>();

  /** Input for selected cell types */
  readonly cellTypesSelection = input.required<string[]>();

  /** Output emitter for node click events */
  readonly nodeClick = output<NodeEntry>();

  /** Output emitter for node hover events */
  readonly nodeHover = output<NodeEntry | undefined>();

  /** Output event to reset all cells selection */
  readonly resetAllCells = output();

  /** Flag to check cell links visibility */
  readonly cellLinksVisible = signal(false);

  /** Tooltip position constant */
  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Tooltip content */
  readonly tooltipContent: TooltipContent[] = [
    {
      title: 'Zoom Options',
      description: '• Mouse pinwheel \n• Trackpad Pinch',
    },
    {
      title: 'Pan Options',
      description: '• CTRL/CMD + mouse drag \n• Right click + mouse drag \n• Keyboard arrows',
    },
    {
      title: 'Rotation Options for 3D Visualizations',
      description: '• CTRL/CMD + keyboard arrows \n• Mouse Drag',
    },
  ];

  /** Flag to check if the tooltip is open */
  tooltipOpen = false;

  /** Reference to the visualization element */
  // private readonly vis = viewChild.required<ElementRef<NodeDistVisElement>>('vis');

  /**  */
  protected readonly vis = viewChild.required(FullscreenPortalComponent);

  private readonly visEl = computed(() => this.vis().rootNodes()[0].childNodes[0] as NodeDistVisElement);

  /** Service to handle file saving */
  private readonly fileSaver = inject(FileSaverService);

  /** Bind data and events to the visualization element */
  constructor() {
    console.log(NodeDistVisElement);
    this.bindData('nodes', this.nodes);
    this.bindEvent('nodeClicked', this.nodeClick);
    this.bindEvent('nodeHovering', this.nodeHover);

    this.bindData('edges', this.edges);
    this.bindData('maxEdgeDistance', this.maxEdgeDistance);
    // this.bindEvent('edges', this.edges, isNonEmptyArray);

    this.bindData('colorMap', this.colorMap);

    // this.bindData('selection', this.cellTypesSelection);
  }

  /** Downloads the visualization as an image */
  download(): void {
    // const el = this.vis().nativeElement;
    // const url = el.toDataUrl();
    // if (url) {
    //   this.fileSaver.save(url, 'cell-distance-vis.png');
    // }
  }

  /** Resets the visualization view */
  resetView(): void {
    // this.vis().nativeElement.resetView();
  }

  /** Binds a property from the visualization element to a signal */
  private bindData<K extends keyof NodeDistVisElement>(
    prop: K,
    value: Signal<NodeDistVisElement[K]>,
    selector?: (value: NodeDistVisElement[K]) => boolean,
  ): void {
    effect(() => {
      const el = this.visEl();
      const data = value();
      if (selector === undefined || selector(data)) {
        el[prop] = data;
      }
    });
  }

  /** Binds an event from the visualization element to an output emitter */
  private bindEvent<T>(
    type: string,
    outputRef: OutputEmitterRef<T> | WritableSignal<T>,
    selector?: (value: T) => boolean,
  ): void {
    const emit = isSignal(outputRef)
      ? (value: T) => outputRef() !== value && outputRef.set(value)
      : (value: T) => outputRef.emit(value);

    effect((onCleanup) => {
      const el = this.visEl();
      const handler = (event: Event) => {
        const { detail: data } = event as CustomEvent;
        if (selector === undefined || selector(data)) {
          emit(data);
        }
      };

      el.addEventListener(type, handler);
      onCleanup(() => el.removeEventListener(type, handler));
    });
  }

  /** Toggles the visibility of the cell links */
  toggleCellLinks(): void {
    this.cellLinksVisible.set(!this.cellLinksVisible());
  }
}
