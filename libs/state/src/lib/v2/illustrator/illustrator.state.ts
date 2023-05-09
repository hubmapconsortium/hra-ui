import { inject, Injectable } from '@angular/core';
import { FtuDataService, Url } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { ClearSelection, Load, Reset, SetSelection } from './illustrator.actions';

export interface IllustratorModel {
  url?: Url;
  selected?: unknown; // TODO type
  // TODO mapping
}

type Context = StateContext<IllustratorModel>;

@State<IllustratorModel>({
  name: 'illustrator',
  defaults: {},
})
@Injectable()
export class IllustratorState {
  private readonly dataService = inject(FtuDataService);

  @Action(Load, { cancelUncompleted: true })
  load({ patchState }: Context, { iri }: Load): Observable<unknown> {
    return this.dataService.getIllustrationUrl(iri).pipe(tap((url) => patchState({ url, selected: undefined })));
  }

  @Action(SetSelection)
  setSelection({ patchState }: Context, { selected }: SetSelection): void {
    patchState({ selected });
  }

  @Action(ClearSelection)
  clearSelection({ patchState }: Context): void {
    patchState({ selected: undefined });
  }

  @Action(Reset)
  reset({ setState }: Context): void {
    setState({});
  }
}
