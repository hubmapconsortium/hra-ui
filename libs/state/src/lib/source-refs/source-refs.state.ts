import { inject, Injectable } from '@angular/core';
import { FtuDataService, SourceReference } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Load, Reset } from './source-refs.actions';

type Context = StateContext<SourceReference[]>;

@State<SourceReference[]>({
  name: 'sourceReferences',
  defaults: [],
})
@Injectable()
export class SourceRefsState {
  private readonly dataService = inject(FtuDataService);

  @Action(Load)
  load({ setState }: Context, { iri }: Load): Observable<unknown> {
    return this.dataService.getSourceReferences(iri).pipe(tap(setState));
  }

  @Action(Reset)
  reset({ setState }: Context): void {
    setState([]);
  }
}
