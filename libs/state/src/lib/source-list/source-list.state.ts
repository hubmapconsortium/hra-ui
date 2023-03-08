import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AddSourceList } from './source-list.actions';

export interface SourceListModel {
  title: string;
  link: string;
}

/** Helper alias for action handler's ctx argument */
type Context = StateContext<SourceListModel>;

/** State handling source list data */
@State<SourceListModel>({
  name: 'sourceList',
  defaults: {
    title: '',
    link: '',
  },
})
@Injectable()
export class SourceListState {
  // Define the action for adding a SourceList object
  @Action(AddSourceList)
  add({ getState, patchState }: Context) {
    const state = getState();
    patchState({
      title: state.title,
      link: state.link,
    });
  }
}
