import { inject, Injectable } from '@angular/core';
import { TissueLibraryService } from '@hra-ui/services';
import { Action, State } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Load } from './tissue-library.actions';
import { TissueLibraryContext, TissueLibraryModel } from './tissue-library.model';

/** State handling tissue data*/
@State<TissueLibraryModel>({
  name: 'tissueLibrary',
})
@Injectable()
export class TissueLibraryState {
  /** injects the TissueLibraryService into a private readonly property */
  private readonly dataService = inject(TissueLibraryService);
  /**
   * Loads the tissue data into the current state
   * @param ctx The state context instance
   * @returns data The tissue data to be added to the state
   */
  @Action(Load)
  setActive(ctx: TissueLibraryContext): Observable<unknown> {
    return this.dataService.getTissues().pipe(tap((data) => ctx.setState(data)));
  }
}
