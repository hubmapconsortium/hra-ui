import { inject, Injectable } from '@angular/core';
import { FtuDataService, SourceReference } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Load, Reset } from './source-refs.actions';

type Context = StateContext<SourceReference[]>;

/**
 * State to handle the source references
 */
@State<SourceReference[]>({
  name: 'sourceReferences',
  defaults: [],
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
  @Action(Load)
  load({ setState }: Context, { iri }: Load): Observable<unknown> {
    return this.dataService.getSourceReferences(iri).pipe(tap(setState));
  }

  /**
   * Resets the current state
   */
  @Action(Reset)
  reset({ setState }: Context): void {
    setState([]);
  }
}
