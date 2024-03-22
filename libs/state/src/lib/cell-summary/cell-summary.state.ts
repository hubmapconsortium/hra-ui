import { inject, Injectable } from '@angular/core';
import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { FtuDataService, SourceReference } from '@hra-ui/services';
import { Action, State } from '@ngxs/store';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ActiveFtuActions, ActiveFtuSelectors } from '../active-ftu';
import { ComputeAggregates, Load, Reset, UpdateSources, UpdateSummaries } from './cell-summary.actions';
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

  private readonly sources = selectSnapshot(ActiveFtuSelectors.sources);

  private readonly iri = selectSnapshot(ActiveFtuSelectors.iri);

  private readonly setIri = dispatch(ActiveFtuActions.SetIri);

  readonly setSources = dispatch(ActiveFtuActions.SetSources);

  readonly setIllustrationUrl = dispatch(ActiveFtuActions.SetIllustrationUrl);

  /**
   * Loads the cell summary data and aggregrated of the current Iri into
   * the state and cancels uncompleted action if any
   */
  @Action(Load, { cancelUncompleted: true })
  load({ patchState, dispatch }: Context, { iri }: Load): Observable<unknown> {
    const loadData = () =>
      this.dataService.getCellSummaries(iri, this.sources() ?? []).pipe(
        tap((summaries) => patchState({ summaries, aggregates: [] })),
        switchMap(() => dispatch(new ComputeAggregates())),
      );

    return of(this.setIri(iri)).pipe(switchMap(loadData));
  }

  @Action(UpdateSources, { cancelUncompleted: true })
  updateSources({ patchState }: Context, { sources }: UpdateSources) {
    this.setSources(sources as SourceReference[]);
    const iri = this.iri();
    if (iri) {
      this.dataService.getCellSummaries(iri, sources as SourceReference[]).subscribe((data) => {
        this.setIllustrationUrl(iri);
        const aggregates = data.map(computeAggregate);
        patchState({ aggregates });
      });
    }
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
  updateSummaries({ getState, patchState, setState, dispatch }: Context, { summaries }: UpdateSummaries): void {
    patchState({ summaries });
    this.computeAggregates({ getState, patchState, setState, dispatch });
  }

  /**
   * Resets the summaries and aggregates for the current state
   */
  @Action(Reset)
  reset({ patchState }: Context): void {
    patchState({ summaries: [], aggregates: [] });
  }
}
