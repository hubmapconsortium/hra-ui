import { inject, Injectable } from '@angular/core';
import { FtuDataService } from '@hra-ui/services';
import { Action, State } from '@ngxs/store';
import { Observable, switchMap, tap } from 'rxjs';
import { SourceRefsActions } from '../source-refs';
import { CombineSummariesByBiomarker, ComputeAggregates, FilterSummaries, Load, Reset } from './cell-summary.actions';
import { combineSummaries, computeAggregate, filterSummaries } from './cell-summary.helpers';
import { BIOMARKER_TYPES, CellSummaryModel, Context } from './cell-summary.model';

/** State handling cell summary data */
@State<CellSummaryModel>({
  name: 'cellSummary',
  defaults: {
    biomarkerTypes: BIOMARKER_TYPES,
    summaries: [],
    filteredSummaries: [],
    summariesByBiomarker: [],
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
  load({ patchState, dispatch }: Context, { iri }: Load): Observable<unknown> {
    return this.dataService.getCellSummaries(iri).pipe(
      tap((summaries) => {
        patchState({ summaries, filteredSummaries: summaries, summariesByBiomarker: [], aggregates: [] });
      }),
      switchMap(() => dispatch(new CombineSummariesByBiomarker())),
    );
  }

  /**
   * Filters summaries by source list and updates filteredSummaries
   */
  @Action([FilterSummaries, SourceRefsActions.SetSelectedSources])
  filterSummaries(
    { getState, patchState, dispatch }: Context,
    { sources }: FilterSummaries | SourceRefsActions.SetSelectedSources,
  ): Observable<void> {
    const { summaries } = getState();
    const filteredSummaries = filterSummaries(summaries, sources);

    patchState({ filteredSummaries });
    return dispatch(new CombineSummariesByBiomarker());
  }

  /**
   * Combines summaries into array of cell summaries grouped by biomarker type, updates summariesByBiomarker
   */
  @Action(CombineSummariesByBiomarker)
  combineSummariesByBiomarker({ getState, patchState, dispatch }: Context): Observable<void> {
    const { filteredSummaries: summaries } = getState();
    const summariesByBiomarker = combineSummaries(summaries);

    patchState({ summariesByBiomarker });
    return dispatch(new ComputeAggregates());
  }

  /**
   * Computes aggregate data and stores in the current state
   */
  @Action(ComputeAggregates)
  computeAggregates({ getState, patchState }: Context): void {
    const { summariesByBiomarker } = getState();
    const aggregates = summariesByBiomarker.map(computeAggregate);

    patchState({ aggregates });
  }

  /**
   * Resets the summaries and aggregates for the current state
   */
  @Action(Reset)
  reset({ patchState }: Context): void {
    patchState({ summaries: [], filteredSummaries: [], summariesByBiomarker: [], aggregates: [] });
  }
}
