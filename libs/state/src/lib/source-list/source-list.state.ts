import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AddSourceList } from './source-list.actions';
import { produce } from 'immer';

export interface Source {
  title: string;
  link: string;
}

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
  /** Define the action for adding a SourceList object */
  @Action(AddSourceList)
  add({ setState }: Context, { sourceList }: AddSourceList) {
    setState(
      produce((draft) => {
        draft.push(...sourceList);
      })
    );
  }
}
