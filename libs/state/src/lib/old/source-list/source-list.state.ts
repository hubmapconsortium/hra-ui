import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { produce } from 'immer';
import { Add, Set } from './source-list.actions';
import { SourceListContext, SourceListModel } from './source-list.model';

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
  @Action(Add)
  add({ setState }: SourceListContext, { sourceList }: Add) {
    setState(
      produce((draft) => {
        draft.push(...sourceList);
      })
    );
  }

  /**
   * Removes all current sources and adds new ones, effectively resetting the state.
   * @param ctx The state context instance
   * @param sourceList The payload which is an array of source objects to be set as the new state
   */
  @Action(Set)
  set({ setState }: SourceListContext, { sourceList }: Set) {
    setState(sourceList);
  }
}
