import { inject, Injectable } from '@angular/core';
import { FtuDataService } from '@hra-ui/services';
import { Action, State } from '@ngxs/store';
import { Observable, switchMap, tap } from 'rxjs';
import { ComputeAggregates, Load, Reset } from './cell-summary.actions';
import { computeAggregate } from './cell-summary.helpers';
import { CellSummaryModel, Context } from './cell-summary.model';

/** State handling cell summary data */
@State<CellSummaryModel>({
  name: 'cellSummary',
  defaults: {
    summaries: [],
    aggregates: [],
  },
})
@Injectable()
export class CellSummaryState {
  /** Data service to load the FTU data */
  private readonly dataService = inject(FtuDataService);

  /**
   * Loads the cell summary data and aggregrated of the current Iri into
   * the state and cancels uncompleted action if any
   */
  @Action(Load, { cancelUncompleted: true })
  load({ patchState, dispatch }: Context, { iri }: Load): Observable<unknown> | void {
    return this.dataService.getCellSummaries(iri).pipe(
      tap((summaries) => patchState({ summaries, aggregates: [] })),
      switchMap(() => dispatch(new ComputeAggregates()))
    );
  }

  /**
   * computes aggregate data and stores in the current state
   */
  @Action(ComputeAggregates)
  computeAggregates({ getState, patchState }: Context): void {
    const { summaries } = getState();
    const aggregates = summaries.map(computeAggregate);
    patchState({ aggregates });
  }

  /**
   * Resets the summaries and aggregates for the current state
   */
  @Action(Reset)
  reset({ patchState }: Context): void {
    patchState({ summaries: [], aggregates: [] });
  }
}
