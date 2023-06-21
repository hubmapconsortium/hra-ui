import { Selector } from '@ngxs/store';
import { Source, SourceListModel } from './source-list.model';
import { SourceListState } from './source-list.state';

/** Selector class for retrieving data from the SourceListState */
export class SourceListSelectors {
  /**
   * Gets the array of data sources from the SourceList object.
   * @param state The current state of the SourceListState
   * @returns array of source objects
   */
  @Selector([SourceListState])
  static getSourceList(state: SourceListModel): Source[] {
    return state;
  }
}
