import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { Filter, SpatialEntity, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { NodeClickEvent } from 'ccf-body-ui';
import { BodyUiComponent } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/** Organ display */
@Component({
  selector: 'ccf-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrganComponent implements AfterViewChecked, OnChanges {
  /** Analytics service */
  readonly ga = inject(GoogleAnalyticsService);

  /** Organ */
  @Input() organ?: SpatialEntity;
  /** Scene */
  @Input() scene!: SpatialSceneNode[];
  /** Organ iri */
  @Input() organIri!: string;
  /** Model sex */
  @Input() sex?: 'Male' | 'Female' | 'Both';
  /** Organ side */
  @Input() side?: 'Left' | 'Right';
  /** Tissue blocks */
  @Input() blocks?: TissueBlock[];
  /** Data filter */
  @Input() filter?: Filter;

  /** Emits when the user switches the model sex */
  @Output() readonly sexChange = new EventEmitter<'Male' | 'Female'>();
  /** Emits when the user switches organ side */
  @Output() readonly sideChange = new EventEmitter<'Left' | 'Right'>();
  /** Emits when the user clicks a node */
  @Output() readonly nodeClick = new EventEmitter<NodeClickEvent>();

  /** Reference to the body ui */
  @ViewChild('bodyUI', { static: true }) readonly bodyUI!: BodyUiComponent;

  /** Highlighted node */
  highlightedNodeId!: string;
  /** Filtered tissue blocks */
  filteredBlocks!: string[];

  /** Updates highlighting on dom changes */
  ngAfterViewChecked(): void {
    this.updateHighlighting();
  }

  /** Updates the highlighted block */
  updateHighlighting(): void {
    const providerName = new Set<string>(this.filter?.tmc ?? []);
    this.filteredBlocks =
      this.blocks?.filter((block) => providerName.has(block.donor?.providerName ?? '')).map((block) => block['@id']) ??
      [];
    this.bodyUI.scene = this.bodyUI.scene.map(
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

  /** Reacts to input changes */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.bodyUI && 'organ' in changes) {
      this.zoomToFitOrgan();
    }
  }

  /** Update the model sex */
  updateSex(selection?: 'Male' | 'Female'): void {
    this.sex = selection;
    this.sexChange.emit(this.sex);
  }

  /** Update the organ side */
  updateSide(selection?: 'Left' | 'Right'): void {
    this.side = selection;
    this.sideChange.emit(this.side);
  }

  /** Zoom to fit */
  zoomToFitOrgan(): void {
    const { bodyUI, organ } = this;
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
