import { Source } from './source-list.state';

/** action of adding a list of sources to the SourceList state */
export class AddSourceList {
  /** Action Type  */
  static readonly type = '[SourceList] Add';
  /**
   * Initializes the payload for the action
   * @param sourceList array of Source objects to be added to the state
   */
  constructor(readonly sourceList: Source[]) {}
}
