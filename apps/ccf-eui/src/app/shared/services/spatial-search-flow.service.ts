import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { StartSpatialSearchFlow } from '../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchConfigBehaviorComponent } from '../../modules/spatial-search/spatial-search-config-behavior/spatial-search-config-behavior.component';

@Injectable({
  providedIn: 'root',
})
export class SpatialSearchFlowService {
  private readonly store = inject(Store);

  private readonly dialog = inject(MatDialog);

  /**
   * Starts spatial search flow
   */
  startSpatialSearchFlow(executeSearch: boolean): void {
    this.store
      .dispatch(new StartSpatialSearchFlow(executeSearch))
      .pipe(
        take(1),
        tap(() => this.dialog.open(SpatialSearchConfigBehaviorComponent, { panelClass: 'spatial-search-config' })),
      )
      .subscribe();
  }
}
