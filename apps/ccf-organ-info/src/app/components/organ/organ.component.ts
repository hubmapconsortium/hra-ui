import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { Filter, SpatialEntity, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { BodyUiComponent, NodeClickEvent } from 'ccf-body-ui';

/** Component for displaying organ in 3D using Body UI */
@Component({
  selector: 'ccf-organ',
  imports: [CommonModule, BodyUiComponent],
  templateUrl: './organ.component.html',
  styleUrl: './organ.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganComponent {
  /** Organ spatial entity data */
  readonly organ = input<SpatialEntity>();

  /** Scene nodes to render */
  readonly scene = input.required<SpatialSceneNode[]>();

  /** Tissue blocks for filtering */
  readonly blocks = input.required<TissueBlock[]>();

  /** Data filter configuration */
  readonly filter = input.required<Filter>();

  /** Emits when a node is clicked */
  readonly nodeClick = output<NodeClickEvent>();

  /** Reference to the body UI component */
  private readonly bodyUI = viewChild.required<BodyUiComponent>('bodyUI');

  /** ID of the currently highlighted node */
  private readonly highlightedNodeId = signal<string>('');

  /** Tissue block IDs filtered by provider */
  private readonly filteredBlockIds = computed(() => {
    const providerNames = new Set(this.filter()?.tmc ?? []);
    return (
      this.blocks()
        ?.filter((block) => providerNames.has(block.donor?.providerName ?? ''))
        .map((block) => block['@id']) ?? []
    );
  });

  /** Scene with highlighting and filtering colors applied */
  readonly highlightedScene = computed(() => {
    const scene = this.scene();
    const filteredIds = this.filteredBlockIds();
    const highlightedId = this.highlightedNodeId();

    return scene.map((node): SpatialSceneNode => {
      const isHighlighted = node.entityId && highlightedId === node['@id'];
      const isFiltered = filteredIds.includes(node.entityId ?? '');

      return {
        ...node,
        color: isHighlighted ? [30, 136, 229, 255] : isFiltered ? [173, 255, 47, 229.5] : [255, 255, 255, 229.5],
      };
    });
  });

  /** Zoom bounds calculated from organ dimensions */
  private readonly organBounds = computed(() => {
    const organ = this.organ();
    if (!organ) {
      return undefined;
    }

    const { x_dimension: x, y_dimension: y, z_dimension: z } = organ;
    return {
      x: (1.25 * x) / 1000,
      y: (1.25 * y) / 1000,
      z: (1.25 * z) / 1000,
    };
  });

  /** Camera target position calculated from organ center */
  readonly organTarget = computed(() => {
    const organ = this.organ();
    if (!organ) {
      return [0, 0, 0];
    }

    const { x_dimension: x, y_dimension: y, z_dimension: z } = organ;
    return [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2];
  });

  /** Initialize the component */
  constructor() {
    effect(() => {
      const bodyUI = this.bodyUI();
      const bounds = this.organBounds();

      if (bodyUI && bounds) {
        bodyUI.zoomToBounds(bounds);
      }
    });
  }

  /** Handles node click events and toggles highlighting */
  nodeClicked(event: NodeClickEvent): void {
    const currentId = this.highlightedNodeId();
    const clickedId = event.node['@id'];
    const newId = currentId === clickedId ? '' : clickedId;

    this.highlightedNodeId.set(newId);
    this.nodeClick.emit(event);
  }
}
