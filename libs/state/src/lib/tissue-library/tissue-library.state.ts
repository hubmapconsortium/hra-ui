import { inject, Injectable } from '@angular/core';
import { TissueLibraryService } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetActive } from './tissue-library.actions';

@State<void>({ name: 'tissue-library' })
@Injectable()
export class TissueLibraryState {
  private readonly tissue = inject(TissueLibraryService);

  @Action(SetActive)
  setActive(ctx: StateContext<void>): Observable<void> {
    return this.tissue.setActiveTissue();
  }
}
