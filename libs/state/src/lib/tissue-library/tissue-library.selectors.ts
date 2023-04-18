import { Selector } from '@ngxs/store';
import { TissueLibraryModel } from './tissue-library.model';

export class TissueLibrarySelectors {
  @Selector()
  static getTissueList(state: TissueLibraryModel) {
    return state;
  }
}
