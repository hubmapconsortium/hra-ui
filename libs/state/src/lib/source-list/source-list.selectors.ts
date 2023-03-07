import { Selector } from '@ngxs/store';
import { SourceListModel } from './source-list.state';

/** Selector for source list  */
export class SourceListSelectors {
  // Selector for getting array of data sources from the SourceList object
  @Selector()
  static getSourceList(state: SourceListModel): SourceListModel {
    return state;
  }
}
