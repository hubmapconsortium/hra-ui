import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
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
import { Sex } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiComponent } from '../spatial-search-ui/spatial-search-ui.component';

/**
 * Behavioral component for Spatial Search UI
 */
@Component({
  selector: 'ccf-spatial-search-ui-behavior',
  templateUrl: './spatial-search-ui-behavior.component.html',
  imports: [AsyncPipe, SpatialSearchUiComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchUiBehaviorComponent {
  readonly organs$: Observable<OrganInfo[]> = inject(Store).select(SpatialSearchUiSelectors.organs);

  readonly scene$: Observable<SpatialSceneNode[]> = inject(Store).select(SpatialSearchUiSelectors.scene);

  readonly sceneBounds$: Observable<Position> = inject(Store).select(SpatialSearchUiSelectors.sceneBounds);

  readonly sceneTarget$: Observable<[number, number, number]> = inject(Store).select(
    SpatialSearchUiSelectors.sceneTarget,
  );

  readonly sex$: Observable<Sex> = inject(Store).select(SpatialSearchUiSelectors.sex);

  readonly organ$: Observable<OrganInfo | undefined> = inject(Store).select(SpatialSearchUiSelectors.organ);

  readonly position$: Observable<Position> = inject(Store).select(SpatialSearchUiSelectors.position);

  readonly defaultPosition$: Observable<Position> = inject(Store).select(SpatialSearchUiSelectors.defaultPosition);

  readonly radius$: Observable<number> = inject(Store).select(SpatialSearchUiSelectors.radius);

  readonly radiusSettings$: Observable<RadiusSettings> = inject(Store).select(SpatialSearchUiSelectors.radiusSettings);

  readonly tissueBlocks$: Observable<TissueBlock[]> = inject(Store).select(SpatialSearchUiSelectors.tissueBlocks);

  readonly anatomicalStructures$: Observable<TermResult[]> = inject(Store).select(
    SpatialSearchUiSelectors.anatomicalStructures,
  );

  readonly cellTypes$: Observable<TermResult[]> = inject(Store).select(SpatialSearchUiSelectors.cellTypes);

  @Dispatch()
  readonly updatePosition = actionAsFn(SetPosition);

  @Dispatch()
  readonly resetPosition = actionAsFn(ResetPosition);

  @Dispatch()
  readonly moveToNode = actionAsFn(MoveToNode);

  @Dispatch()
  readonly updateRadius = actionAsFn(SetRadius);

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

  @Dispatch()
  readonly updateSex = actionAsFn(SetSex);

  @Dispatch()
  readonly updateOrgan = actionAsFn(SetOrgan);

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchUiComponent>,
    public dialog: MatDialog,
  ) {}

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
