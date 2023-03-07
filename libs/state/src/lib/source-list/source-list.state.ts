import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface SourceListModel {
  title: string;
  link: string;
}

/** State handling source list data */
@State<SourceListModel>({
  name: 'sourceList',
  defaults: {
    title: '',
    link: '',
  },
})
@Injectable()
export class SourceListState {}
