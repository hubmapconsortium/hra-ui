import { inject, Injectable } from '@angular/core';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataService, IllustrationMappingItem, Url } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { forkJoin, Observable, tap } from 'rxjs';

import { ClearSelection, HighlightCellType, Load, Reset, SetClicked, SetHover } from './illustrator.actions';

/**
 * interface for the Illustrator Model that contains the url, selected
 * and mapping fields
 */
export interface IllustratorModel {
  /** Illustration URL */
  url?: Url | string;
  /** Selected Illustrator Item on hover */
  selectedOnHover?: IllustrationMappingItem;
  /** Selected Illustrator Item on click */
  selectedOnClick?: IllustrationMappingItem;
  /** Array of Illustrartor Items */
  mapping: IllustrationMappingItem[];
  /** Current hovered cell type id */
  hoveredCellTypeId?: string;
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
  readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS);

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
      tap((result) =>
        patchState({
          ...result,
          url: this.endpoints.baseHref + result.url,
          selectedOnHover: undefined,
          selectedOnClick: undefined,
        })
      )
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

  /**
   * Sets hover id of highlighted cell type from hover label
   */
  @Action(HighlightCellType)
  HighlightCellType({ patchState, getState }: Context, { hoverLabel }: HighlightCellType): void {
    const match = getState().mapping.find((entry) => entry.label.toLowerCase() === hoverLabel?.toLowerCase());
    patchState({ hoveredCellTypeId: match ? match.ontologyId : undefined });
  }
}
