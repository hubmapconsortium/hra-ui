import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { GlobalConfigState, OrganInfo, PanelData } from 'ccf-shared';
import { Observable, Subscription } from 'rxjs';

import { actionAsFn } from '../../../core/store/action-as-fn';
import { SetOrgan, SetSex } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from '../../../core/store/spatial-search-ui/spatial-search-ui.selectors';
import { Sex, SpatialSearchConfigComponent } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiBehaviorComponent } from '../spatial-search-ui-behavior/spatial-search-ui-behavior.component';
import { SpatialSearchUiBehaviorModule } from '../spatial-search-ui-behavior/spatial-search-ui-behavior.module';

@Component({
  selector: 'ccf-spatial-search-config-behavior',
  templateUrl: './spatial-search-config-behavior.component.html',
  imports: [CommonModule, SpatialSearchConfigComponent, MatDialogModule, SpatialSearchUiBehaviorModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchConfigBehaviorComponent implements OnDestroy {
  readonly sex$: Observable<Sex> = inject(Store).select(SpatialSearchUiSelectors.sex);

  readonly selectedOrgan$: Observable<OrganInfo | undefined> = inject(Store).select(SpatialSearchUiSelectors.organ);

  readonly organs$: Observable<OrganInfo[]> = inject(Store).select(SpatialSearchUiSelectors.organs);

  @Dispatch()
  readonly updateSex = actionAsFn(SetSex);

  @Dispatch()
  readonly updateOrgan = actionAsFn(SetOrgan);

  panelData!: PanelData;

  baseHref = '';

  private readonly subscriptions = new Subscription();

  private readonly dialogSubs = new Subscription();

  constructor(
    public dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<SpatialSearchConfigComponent>,
    private readonly spatialSearchDialog: MatDialog,
    private readonly globalConfig: GlobalConfigState<{ baseHref: string }>,
  ) {
    this.globalConfig.getOption('baseHref').subscribe((ref) => {
      this.baseHref = ref;
    });
  }

  buttonClicked(): void {
    this.spatialSearchDialog.open(SpatialSearchUiBehaviorComponent);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
