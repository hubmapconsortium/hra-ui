/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { SpatialSceneNode } from '@hra-api/ng-client';
import { NodeClickEvent } from 'ccf-body-ui';
import { BodyUiComponent, GlobalConfigState } from 'ccf-shared';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { lastValueFrom } from 'rxjs';
import { take, tap } from 'rxjs/operators';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
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

  /** Global config */
  private readonly configState: GlobalConfigState<GlobalConfig> = inject(GlobalConfigState);
  /** Scene service */
  private readonly sceneSource = inject(FilteredSceneService);
  /** Change detector */
  private readonly cdr = inject(ChangeDetectorRef);

  /** Data */
  readonly data$ = this.configState.getOption('data');
  /** Organs */
  organs$ = this.sceneSource.filteredOrgans$;
  /** Scene */
  scene$ = this.sceneSource.filteredScene$.pipe(tap(() => this.reset()));

  /** Resets the body ui */
  private async reset(): Promise<void> {
    const { bodyUI } = this;

    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
    const organs = await lastValueFrom(this.organs$.pipe(take(1)));
    const hasZoomingNode = !!bodyUI.scene?.find((node) => node.zoomToOnLoad);

    bodyUI.rotation = 0;
    bodyUI.rotationX = 0;

    if (!hasZoomingNode) {
      if (organs && organs.length === 1) {
        const { x_dimension: x, y_dimension: y, z_dimension: z } = organs[0];
        bodyUI.bounds = {
          x: (1.25 * x) / 1000,
          y: (1.25 * y) / 1000,
          z: (1.25 * z) / 1000,
        };
        bodyUI.target = [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2];
      } else {
        bodyUI.bounds = { x: 2.2, y: 2, z: 0.4 };
        bodyUI.target = [0, 0, 0];
      }
    }

    this.cdr.detectChanges();
  }
}
