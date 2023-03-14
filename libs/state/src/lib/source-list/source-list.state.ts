import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AddSourceList } from './source-list.actions';
import { produce } from 'immer';

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
type Context = StateContext<SourceListModel>;

/** State handling source list data */
@State<SourceListModel>({
  name: 'sourceList',
  defaults: [],
})
@Injectable()
export class SourceListState {
  /**
   * adds a list of sources to the current state
   * @param ctx The state context instance
   * @param sourceList The payload which is an array of source objects to be added to the state
   */
  @Action(AddSourceList)
  add({ setState }: Context, { sourceList }: AddSourceList) {
    setState(
      produce((draft) => {
        draft.push(...sourceList);
      })
    );
  }
}
