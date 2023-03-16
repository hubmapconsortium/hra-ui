import { Selector } from '@ngxs/store';
import { SourceListModel } from './source-list.model';

/** Selector class for retrieving data from the SourceListState */
export class SourceListSelectors {
  /**
   * Gets the array of data sources from the SourceList object.
   * @param state The current state of the SourceListState
   * @returns array of source objects
   */
  @Selector()
  static getSourceList(state: SourceListModel) {
    return state;
  }
}
