import { inject, Injectable } from '@angular/core';
import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { FtuDataService } from '@hra-ui/services';
import { Action, State } from '@ngxs/store';
import { Observable, switchMap, tap } from 'rxjs';
import { ActiveFtuActions, ActiveFtuSelectors } from '../active-ftu';
import { ComputeAggregates, Load, Reset, UpdateSummaries } from './cell-summary.actions';
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

  readonly sources = selectSnapshot(ActiveFtuSelectors.sources);

  readonly iri = selectSnapshot(ActiveFtuSelectors.iri);

  readonly setIri = dispatch(ActiveFtuActions.SetIri);

  /**
   * Loads the cell summary data and aggregrated of the current Iri into
   * the state and cancels uncompleted action if any
   */
  @Action(Load, { cancelUncompleted: true })
  load({ patchState, dispatch }: Context, { iri }: Load): Observable<unknown> {
    this.setIri(iri);
    return this.dataService.getCellSummaries(iri, this.sources()!).pipe(
      tap((summaries) => patchState({ summaries, aggregates: [] })),
      switchMap(() => dispatch(new ComputeAggregates())),
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

  @Action(UpdateSummaries)
  updateSummaries({ patchState }: Context, { summaries }: UpdateSummaries): void {
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
