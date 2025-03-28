import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FilterSexEnum } from '@hra-api/ng-client';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';
import { actionAsFn } from '../../../core/store/action-as-fn';
import { SetOrgan, SetSex } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from '../../../core/store/spatial-search-ui/spatial-search-ui.selectors';
import { SpatialSearchConfigComponent } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiBehaviorComponent } from '../spatial-search-ui-behavior/spatial-search-ui-behavior.component';

/** Spatial search config */
@Component({
  selector: 'ccf-spatial-search-config-behavior',
  templateUrl: './spatial-search-config-behavior.component.html',
  imports: [CommonModule, SpatialSearchConfigComponent, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchConfigBehaviorComponent {
  /** Sex */
  readonly sex$: Observable<FilterSexEnum> = inject(Store).select(SpatialSearchUiSelectors.sex);

  /** Selected organ */
  readonly selectedOrgan$: Observable<OrganInfo | undefined> = inject(Store).select(SpatialSearchUiSelectors.organ);

  /** Organs */
  readonly organs$: Observable<OrganInfo[]> = inject(Store).select(SpatialSearchUiSelectors.organs);

  /** Update sex */
  @Dispatch()
  readonly updateSex = actionAsFn(SetSex);

  /** Update organ */
  @Dispatch()
  readonly updateOrgan = actionAsFn(SetOrgan);

  /** Default sex */
  protected readonly defaultSex = FilterSexEnum.Female;

  /** Initialize the component */
  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchConfigComponent>,
    private readonly spatialSearchDialog: MatDialog,
  ) {}

  /** Handle button click */
  buttonClicked(): void {
    this.spatialSearchDialog.open(SpatialSearchUiBehaviorComponent, {
      panelClass: 'spatial-search-ui',
      maxWidth: 'calc(100vw - 2rem)',
    });
    this.close();
  }

  /** Close the config */
  close(): void {
    this.dialogRef.close();
  }
}
