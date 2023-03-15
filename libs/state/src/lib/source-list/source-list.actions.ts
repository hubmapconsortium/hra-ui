import { Source } from './source-list.model';

/** action of adding a list of sources to the SourceList state */
export class Add {
  /** Action Type  */
  static readonly type = '[SourceList] Add';
  /**
   * Initializes the payload for the action
   * @param sourceList array of Source objects to be added to the state
   */
  constructor(readonly sourceList: Source[]) {}
}

/** An action that removes all current sources and adds new ones, effectively resetting the state */
export class Set {
  /** Action Type  */
  static readonly type = '[SourceList] Set';
  /**
   * Initializes the payload for the action
   * @param sourceList array of source objects to be set as the new state
   */
  constructor(public sourceList: Source[]) {}
}
