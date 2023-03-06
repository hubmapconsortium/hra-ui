import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

/** State handling source list data */
@State<SourceListModel>({
  name: 'sourceList',
  defaults: {
    sourceList: [],
  },
})
@Injectable()
export class SourceListState {}
