import { inject, Injectable } from '@angular/core';
import { TissueLibraryService } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Load } from './tissue-library.actions';
import { TissueData } from '@hra-ui/services';

@State<void>({ name: 'tissue-library' })
@Injectable()
export class TissueLibraryState {
  private readonly tissue = inject(TissueLibraryService);

  @Action(Load)
  setActive(ctx: StateContext<void>): Observable<TissueData> {
    return this.tissue.getTissues();
  }
}
