import { inject, Injectable } from '@angular/core';
import { FtuDataService } from '@hra-ui/services';
import { Action, State } from '@ngxs/store';
import { Observable, switchMap, tap } from 'rxjs';
import { ComputeAggregates, Load, Reset } from './cell-summary.actions';
import { computeAggregate } from './cell-summary.helpers';
import { CellSummaryModel, Context } from './cell-summary.model';

@State<CellSummaryModel>({
  name: 'cellSummary',
  defaults: {
    summaries: [],
    aggregates: [],
  },
})
@Injectable()
export class CellSummaryState {
  private readonly dataService = inject(FtuDataService);

  @Action(Load, { cancelUncompleted: true })
  load({ patchState, dispatch }: Context, { iri }: Load): Observable<unknown> | void {
    return this.dataService.getCellSummaries(iri).pipe(
      tap((summaries) => patchState({ summaries, aggregates: [] })),
      switchMap(() => dispatch(new ComputeAggregates()))
    );
  }

  @Action(ComputeAggregates)
  computeAggregates({ getState, patchState }: Context): void {
    const { summaries } = getState();
    const aggregates = summaries.map(computeAggregate);
    patchState({ aggregates });
  }

  @Action(Reset)
  reset({ patchState }: Context): void {
    patchState({ summaries: [], aggregates: [] });
  }
}
