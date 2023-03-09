import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AddSourceList } from './source-list.actions';

export interface Source {
  title: string;
  link: string;
}

export interface SourceListModel {
  sourceList: Source[];
}

/** Helper alias for action handler's ctx argument */
type Context = StateContext<SourceListModel>;

/** State handling source list data */
@State<SourceListModel>({
  name: 'sourceList',
  defaults: {
    sourceList: [],
  },
})
@Injectable()
export class SourceListState {
  // Define the action for adding a SourceList object
  @Action(AddSourceList)
  add({ getState, patchState }: Context, { sourceList }: AddSourceList) {
    const state = getState();
    patchState({
      sourceList: [...state.sourceList, sourceList],
    });
  }
}
