import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { StartSpatialSearchFlow } from '../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchConfigBehaviorComponent } from '../components/spatial-search-config-behavior/spatial-search-config-behavior.component';

@Injectable({
  providedIn: 'root',
})
export class SpatialSearchFlowService {
  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
  ) {}

  /**
   * Starts spatial search flow
   */
  startSpatialSearchFlow(): void {
    this.store
      .dispatch(new StartSpatialSearchFlow())
      .pipe(
        take(1),
        tap(() => this.dialog.open(SpatialSearchConfigBehaviorComponent, { panelClass: 'spatial-search-config' })),
      )
      .subscribe();
  }
}
