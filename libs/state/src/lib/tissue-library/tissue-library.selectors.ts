import { Selector } from '@ngxs/store';
import { TissueLibraryModel } from './tissue-library.model';
import { TissueLibraryState } from './tissue-library.state';
import { TissueData } from '@hra-ui/services';

export class TissueLibrarySelectors {
  @Selector([TissueLibraryState])
  static tissues(state: TissueLibraryModel): Required<TissueData['nodes']> {
    return state.nodes;
  }
}
