import { inject, Injectable } from '@angular/core';
import { FtuDataService, IllustrationMappingItem, Url } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { forkJoin, Observable, tap } from 'rxjs';
import { ClearSelection, Load, Reset, SetClicked, SetHover } from './illustrator.actions';

/**
 * interface for the Illustrator Model that contains the url, selected
 * and mapping fields
 */
export interface IllustratorModel {
  /** Illustration URL */
  url?: Url;
  /** Selected Illustrator Item on hover */
  selectedOnHover?: IllustrationMappingItem;
  /** Selected Illustrator Item on click */
  selectedOnClick?: IllustrationMappingItem;
  /** Array of Illustrartor Items */
  mapping: IllustrationMappingItem[];
}

type Context = StateContext<IllustratorModel>;

/**
 * State handling medical illustrators
 */
@State<IllustratorModel>({
  name: 'illustrator',
  defaults: {
    mapping: [],
  },
})
@Injectable()
export class IllustratorState {
  /**
   * Data service of Ftu
   */
  private readonly dataService = inject(FtuDataService);

  /**
   * Loads the current state with the url and mapping.
   * The url and mapping are forked together using forkJoin.
   * It also cancels any uncompleted actions to the state.
   */
  @Action(Load, { cancelUncompleted: true })
  load({ patchState }: Context, { iri }: Load): Observable<unknown> {
    const url$ = this.dataService.getIllustrationUrl(iri);
    const mapping$ = this.dataService.getIllustrationMapping(iri);
    const result$ = forkJoin({ url: url$, mapping: mapping$ });
    return result$.pipe(
      tap((result) => patchState({ ...result, selectedOnHover: undefined, selectedOnClick: undefined }))
    );
  }

  /**
   * Sets the current selection to the state for SetHover
   */
  @Action(SetHover)
  SetHover({ patchState }: Context, { selectedOnHover }: SetHover): void {
    patchState({ selectedOnHover });
  }

  /**
   * Sets the current selection to the state for SetClicked
   */
  @Action(SetClicked)
  SetClicked({ patchState }: Context, { selectedOnClick }: SetClicked): void {
    patchState({ selectedOnClick });
  }

  /**
   * Clears the current selection from the state
   */
  @Action(ClearSelection)
  clearSelection({ patchState }: Context): void {
    patchState({ selectedOnHover: undefined, selectedOnClick: undefined });
  }

  /**
   * Resets the mapping for the current state
   */
  @Action(Reset)
  reset({ setState }: Context): void {
    setState({ mapping: [] });
  }
}
