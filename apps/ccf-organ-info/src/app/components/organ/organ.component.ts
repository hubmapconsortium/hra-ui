import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Filter, SpatialEntity, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { NodeClickEvent } from 'ccf-body-ui';
import { BodyUiComponent, BodyUiModule } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/** Component for displaying organ in 3D using Body UI */
@Component({
  selector: 'ccf-organ',
  imports: [CommonModule, BodyUiModule],
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganComponent implements AfterViewChecked {
  /** Analytics service */
  readonly ga = inject(GoogleAnalyticsService);

  /** Organ */
  readonly organ = input<SpatialEntity>();
  /** Scene */
  readonly scene = input.required<SpatialSceneNode[]>();
  /** Tissue blocks */
  readonly blocks = input.required<TissueBlock[]>();
  /** Data filter */
  readonly filter = input.required<Filter>();

  /** Emits when the user clicks a node */
  readonly nodeClick = output<NodeClickEvent>();

  /** Reference to the body ui */
  readonly bodyUI = viewChild.required<BodyUiComponent>('bodyUI');

  /** Highlighted node */
  highlightedNodeId!: string;
  /** Filtered tissue blocks */
  filteredBlocks!: string[];

  /** Initializes the component */
  constructor() {
    effect(() => {
      if (this.bodyUI() && this.organ()) {
        this.zoomToFitOrgan();
      }
    });
  }

  /** Updates highlighting on dom changes */
  ngAfterViewChecked(): void {
    this.updateHighlighting();
  }

  /** Updates the highlighted block */
  updateHighlighting(): void {
    const providerName = new Set<string>(this.filter()?.tmc ?? []);
    this.filteredBlocks =
      this.blocks()
        ?.filter((block) => providerName.has(block.donor?.providerName ?? ''))
        .map((block) => block['@id']) ?? [];
    this.bodyUI().scene = this.bodyUI().scene.map(
      (node): SpatialSceneNode => ({
        ...node,
        color:
          node.entityId && this.highlightedNodeId === node['@id']
            ? [30, 136, 229, 255]
            : this.filteredBlocks.includes(node.entityId ?? '')
              ? [173, 255, 47, 229.5]
              : [255, 255, 255, 229.5],
      }),
    );
  }

  /** Zoom to fit */
  zoomToFitOrgan(): void {
    const bodyUI = this.bodyUI();
    const organ = this.organ();
    if (organ) {
      const { x_dimension: x, y_dimension: y, z_dimension: z } = organ;
      bodyUI.rotation = bodyUI.rotationX = 0;
      bodyUI.bounds = { x: (1.25 * x) / 1000, y: (1.25 * y) / 1000, z: (1.25 * z) / 1000 };
      bodyUI.target = [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2];
    }
  }

  /** Handles node click events */
  nodeClicked(event: NodeClickEvent): void {
    this.ga.event('node_click', 'organ', event.node['@id']);
    this.highlightedNodeId =
      this.highlightedNodeId && this.highlightedNodeId === event.node['@id'] ? '' : event.node['@id'];
    this.nodeClick.emit(event);
  }
}
