import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterSexEnum, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';
import { actionAsFn } from '../../../core/store/action-as-fn';
import {
  GenerateSpatialSearch,
  MoveToNode,
  ResetPosition,
  ResetRadius,
  SetOrgan,
  SetPosition,
  SetRadius,
  SetSex,
} from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from '../../../core/store/spatial-search-ui/spatial-search-ui.selectors';
import { Position, RadiusSettings, TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { SpatialSearchConfigBehaviorComponent } from '../spatial-search-config-behavior/spatial-search-config-behavior.component';
import { SpatialSearchUiComponent } from '../spatial-search-ui/spatial-search-ui.component';

/**
 * Behavioral component for Spatial Search UI
 */
@Component({
  selector: 'ccf-spatial-search-ui-behavior',
  templateUrl: './spatial-search-ui-behavior.component.html',
  imports: [AsyncPipe, SpatialSearchUiComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchUiBehaviorComponent {
  /** Organs */
  readonly organs$: Observable<OrganInfo[]> = inject(Store).select(SpatialSearchUiSelectors.organs);

  /** Scene nodes */
  readonly scene$: Observable<SpatialSceneNode[]> = inject(Store).select(SpatialSearchUiSelectors.scene);

  /** Scene bounds */
  readonly sceneBounds$: Observable<Position> = inject(Store).select(SpatialSearchUiSelectors.sceneBounds);

  /** Scene target */
  readonly sceneTarget$: Observable<[number, number, number]> = inject(Store).select(
    SpatialSearchUiSelectors.sceneTarget,
  );

  /** Sex */
  readonly sex$: Observable<FilterSexEnum> = inject(Store).select(SpatialSearchUiSelectors.sex);

  /** Organ */
  readonly organ$: Observable<OrganInfo | undefined> = inject(Store).select(SpatialSearchUiSelectors.organ);

  /** Position */
  readonly position$: Observable<Position> = inject(Store).select(SpatialSearchUiSelectors.position);

  /** Default position */
  readonly defaultPosition$: Observable<Position> = inject(Store).select(SpatialSearchUiSelectors.defaultPosition);

  /** Radius */
  readonly radius$: Observable<number> = inject(Store).select(SpatialSearchUiSelectors.radius);

  /** Radius setting */
  readonly radiusSettings$: Observable<RadiusSettings> = inject(Store).select(SpatialSearchUiSelectors.radiusSettings);

  /** Tissue blocks */
  readonly tissueBlocks$: Observable<TissueBlock[]> = inject(Store).select(SpatialSearchUiSelectors.tissueBlocks);

  /** Anatomical structures */
  readonly anatomicalStructures$: Observable<TermResult[]> = inject(Store).select(
    SpatialSearchUiSelectors.anatomicalStructures,
  );

  /** Cell types */
  readonly cellTypes$: Observable<TermResult[]> = inject(Store).select(SpatialSearchUiSelectors.cellTypes);

  /** Update position */
  @Dispatch()
  readonly updatePosition = actionAsFn(SetPosition);

  /** Reset position */
  @Dispatch()
  readonly resetPosition = actionAsFn(ResetPosition);

  /** Move to node */
  @Dispatch()
  readonly moveToNode = actionAsFn(MoveToNode);

  /** Update radius */
  @Dispatch()
  readonly updateRadius = actionAsFn(SetRadius);

  /** Reset radius */
  @Dispatch()
  readonly resetRadius = actionAsFn(ResetRadius);

  /**
   * Adds a new spatial search and closes the spatial search UI
   * @returns spatial search
   */
  @Dispatch()
  addSpatialSearch(): GenerateSpatialSearch {
    this.close();
    return new GenerateSpatialSearch();
  }

  /** Update sex */
  @Dispatch()
  readonly updateSex = actionAsFn(SetSex);

  /** Update organ */
  @Dispatch()
  readonly updateOrgan = actionAsFn(SetOrgan);

  /** Dialog reference */
  private readonly dialogRef = inject(MatDialogRef<SpatialSearchUiComponent>);

  /** Dialog service */
  readonly dialog = inject(MatDialog);

  /**
   * Closes the spatial search UI and opens spatial search config
   */
  openSpatialSearchConfig(): void {
    this.close();
    this.dialog.open(SpatialSearchConfigBehaviorComponent);
  }

  /**
   * Closes spatial search UI
   */
  close(): void {
    this.dialogRef.close();
  }
}
