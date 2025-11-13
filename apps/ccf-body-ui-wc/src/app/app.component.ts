/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpatialSceneNode } from '@hra-api/ng-client';
import { BodyUiComponent, NodeClickEvent } from 'ccf-body-ui';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { FilteredSceneService } from './core/services/filtered-scene/filtered-scene.service';

/** Config */
export interface GlobalConfig {
  /** Highlight */
  highlightID?: string;
  /** Zoom */
  zoomToID?: string;
  /** Data */
  data?: JsonLdObj[];
}

/** Root component */
@Component({
  selector: 'ccf-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** Reference to the body ui */
  @ViewChild('bodyUI', { static: true }) readonly bodyUI!: BodyUiComponent;

  /** Emits when the user starts hovering a node */
  @Output() readonly onMouseEnter = new EventEmitter<SpatialSceneNode>();
  /** Emits when the user stops hovering a node */
  @Output() readonly onMouseLeave = new EventEmitter<SpatialSceneNode>();
  /** Emits when the user clicks a node */
  @Output() readonly onClick = new EventEmitter<NodeClickEvent>();

  /** Scene service */
  private readonly sceneSource = inject(FilteredSceneService);

  /** Organs */
  protected readonly organs = toSignal(this.sceneSource.filteredOrgans$, { initialValue: [] });
  /** Scene */
  protected readonly scene = toSignal(this.sceneSource.filteredScene$, {
    initialValue: undefined,
  });

  /** Whether the scene has a zooming node */
  private readonly hasZoomingNode = computed(() => !!this.scene()?.some((node) => node.zoomToOnLoad));

  /** Scene bounds */
  protected readonly bounds = computed(() =>
    this.computeFromDimensions(
      (x, y, z) => ({
        x: (1.25 * x) / 1000,
        y: (1.25 * y) / 1000,
        z: (1.25 * z) / 1000,
      }),
      { x: 2.2, y: 2, z: 0.4 },
    ),
  );

  /** Scene target */
  protected readonly target = computed(() =>
    this.computeFromDimensions((x, y, z) => [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2], [0, 0, 0]),
  );

  /** Setup component */
  constructor() {
    effect(() => {
      if (this.scene()) {
        this.reset();
      }
    });
  }

  /** Resets the body ui */
  private async reset(): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    this.bodyUI.resetView();
  }

  /** Perform a computation base on organ dimensions */
  private computeFromDimensions<R>(computation: (x: number, y: number, z: number) => R, defaultValue: R): R {
    const organs = this.organs();
    if (!this.hasZoomingNode() || organs.length !== 1) {
      return defaultValue;
    }

    const { x_dimension: x, y_dimension: y, z_dimension: z } = organs[0];
    return computation(x, y, z);
  }
}
