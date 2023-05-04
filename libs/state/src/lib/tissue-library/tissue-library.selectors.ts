import { Iri, TissueItem } from '@hra-ui/services';
import { Selector } from '@ngxs/store';
import { TissueLibraryModel } from './tissue-library.model';
import { TissueLibraryState } from './tissue-library.state';

/** Selector class for retreiving data from the TissueLibraryState */
export class TissueLibrarySelectors {
  /**
   * Gets the tissue data from the TissueLibrary object.
   * @param state the current state of the TissueLibraryState.
   * @returns node data of the type of TisseData.
   */
  @Selector([TissueLibraryState])
  static tissues(state: TissueLibraryModel): Record<Iri, TissueItem> {
    return state.nodes as Record<Iri, TissueItem>;
  }
}
