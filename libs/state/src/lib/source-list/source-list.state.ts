import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { AddSourceList } from './source-list.actions';
import { produce } from 'immer';
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
  @Action(AddSourceList)
  add({ setState }: SourceListContext, { sourceList }: AddSourceList) {
    setState(
      produce((draft) => {
        draft.push(...sourceList);
      })
    );
  }
}
