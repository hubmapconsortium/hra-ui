import { inject, Injectable } from '@angular/core';
import { TissueLibraryService } from '@hra-ui/services';
import { Action, State } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Load } from './tissue-library.actions';
import { TissueLibraryContext, TissueLibraryModel } from './tissue-library.model';

@State<TissueLibraryModel>({
  name: 'tissueLibrary',
})
@Injectable()
export class TissueLibraryState {
  private readonly dataService = inject(TissueLibraryService);

  @Action(Load)
  setActive(ctx: TissueLibraryContext): Observable<unknown> {
    return this.dataService.getTissues().pipe(tap((data) => ctx.setState(data)));
  }
}
