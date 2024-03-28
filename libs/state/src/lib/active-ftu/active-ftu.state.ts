import { Injectable } from '@angular/core';
import { LinkRegistryActions, LinkType } from '@hra-ui/cdk/state';
import { Iri } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';

import { CellSummaryActions, CellSummaryState } from '../cell-summary';
import { DownloadActions, DownloadState } from '../download';
import { IllustratorActions, IllustratorState } from '../illustrator';
import { Illustration } from '../link-ids';
import { SourceRefsActions, SourceRefsState } from '../source-refs';
import { Clear, Load, Reset, SetIllustrationUrl } from './active-ftu.actions';

/**
 * Interface for ActiveFtuModel */
export interface ActiveFtuModel {
  /** Iri for the current Ftu  */
  iri?: Iri;
}

type Context = StateContext<ActiveFtuModel>;

/**
 * State to handle active FTU selection
 */
@State<ActiveFtuModel>({
  name: 'activeFtu',
  defaults: {},
  children: [CellSummaryState, DownloadState, IllustratorState, SourceRefsState],
})
@Injectable()
export class ActiveFtuState {
  /**
   * loads the Cell summary, Illustrator and Source Refs
   * with the current iri
   * @param { iri } The iri which is in the url
   * @returns load An observable of void
   */
  @Action(Load, { cancelUncompleted: true })
  load({ getState, patchState, dispatch }: Context, { iri }: Load): Observable<void> | void {
    if (getState().iri !== iri) {
      return dispatch([
        new CellSummaryActions.Load(iri),
        new IllustratorActions.Load(iri),
        new DownloadActions.Load(iri),
        new SourceRefsActions.Load(iri),
        new SetIllustrationUrl(iri),
      ]).pipe(tap(() => patchState({ iri })));
    }
  }

  /**
   * This Action computes the url and dispatches the LinkRegistry Action to add
   * the link to the registry for navigation
   */
  @Action(SetIllustrationUrl)
  setIllustrationUrl({ dispatch }: Context, { iri }: SetIllustrationUrl): Observable<void> | void {
    const BASE_URL = 'https://hubmapconsortium.github.io/ccf-releases/v1.4/docs/2d-ftu/';
    const [name] = iri.split('/').slice(-1);
    const url = `${BASE_URL}2d-ftu-${name}.html`;
    return dispatch(new LinkRegistryActions.Add(Illustration, { type: LinkType.External, url }));
  }

  /**
   * Action to clear the iri selections
   */
  @Action([Clear, Reset])
  clear({ patchState }: Context): void {
    patchState({ iri: undefined });
  }

  /**
   * Action to reset the states for
   * Cell summary, Illustrator and Source Refs
   */
  @Action(Reset)
  reset({ dispatch }: Context): Observable<void> {
    return dispatch([
      new CellSummaryActions.Reset(),
      new IllustratorActions.Reset(),
      new SourceRefsActions.Reset(),
      new DownloadActions.ClearEntries(),
    ]);
  }
}
