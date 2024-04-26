import { inject, Injectable } from '@angular/core';
import { FtuDataService, SourceReference } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';

import { Load, Reset, ResetSelectedSources, SetSelectedSources } from './source-refs.actions';

/**
 * Source refs model interface
 */
export interface SourceRefsModel {
  /** Current source list */
  sources: SourceReference[];
  /** Selected sources */
  selected: SourceReference[];
}

type Context = StateContext<SourceRefsModel>;

/**
 * State to handle the source references
 */
@State<SourceRefsModel>({
  name: 'sourceReferences',
  defaults: {
    sources: [],
    selected: [],
  },
})
@Injectable()
export class SourceRefsState {
  /**
   * Data service of Ftu
   */
  private readonly dataService = inject(FtuDataService);

  /**
   * Loads the current state with the source references
   */
  @Action(Load, { cancelUncompleted: true })
  load({ setState }: Context, { iri }: Load): Observable<unknown> {
    return this.dataService.getSourceReferences(iri).pipe(tap((sources) => setState({ sources, selected: sources })));
  }

  /**
   * Sets selected source references
   */
  @Action(SetSelectedSources)
  setSelectedSources({ patchState }: Context, { sources }: SetSelectedSources): void {
    patchState({ selected: sources });
  }

  /**
   * Resets selected source references
   */
  @Action(ResetSelectedSources)
  resetSelectedSources({ getState, dispatch }: Context): Observable<void> {
    return dispatch(new SetSelectedSources(getState().sources));
  }

  /**
   * Resets the current state
   */
  @Action(Reset)
  reset({ setState }: Context): void {
    setState({
      sources: [],
      selected: [],
    });
  }
}
