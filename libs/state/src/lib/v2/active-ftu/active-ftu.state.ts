import { Injectable } from '@angular/core';
import { Iri } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { CellSummaryActions } from '../cell-summary';
import { IllustratorActions, IllustratorState } from '../illustrator';
import { SourceRefsActions, SourceRefsState } from '../source-refs';
import { Clear, Load, Reset } from './active-ftu.actions';

export interface ActiveFtuModel {
  iri?: Iri;
}

type Context = StateContext<ActiveFtuModel>;

@State<ActiveFtuModel>({
  name: 'activeFtu',
  defaults: {},
  children: [IllustratorState, SourceRefsState],
})
@Injectable()
export class ActiveFtuState {
  @Action(Load, { cancelUncompleted: true })
  load({ getState, patchState, dispatch }: Context, { iri }: Load): Observable<void> | void {
    if (getState().iri !== iri) {
      return dispatch([
        new CellSummaryActions.Load(iri),
        new IllustratorActions.Load(iri),
        new SourceRefsActions.Load(iri),
        // TODO dispatch url loading, etc.
      ]).pipe(tap(() => patchState({ iri })));
    }
  }

  @Action([Clear, Reset])
  clear({ patchState }: Context): void {
    patchState({ iri: undefined });
  }

  @Action(Reset)
  reset({ dispatch }: Context): Observable<void> {
    return dispatch([
      new CellSummaryActions.Reset(),
      new IllustratorActions.Reset(),
      new SourceRefsActions.Reset(),
      // TODO dispatch reset actions
    ]);
  }
}
