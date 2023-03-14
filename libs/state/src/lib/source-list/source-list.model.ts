import { StateContext } from '@ngxs/store';

/** structure of a source object */
export interface Source {
  /** Title property of the source object  */
  title: string;
  /** Link property of the source object */
  link: string;
}

/** Type alias for the array of source objects */
export type SourceListModel = Source[];

/** Helper alias for action handler's ctx argument */
export type SourceListContext = StateContext<SourceListModel>;
