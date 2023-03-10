import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { AddSourceList } from './source-list.actions';
import { SourceListModel } from './source-list.state';

describe('SourceListState', () => {
  let store: Store;

  beforeEach(() => {
    store = TestBed.inject(Store);
  });

  it('should add a source to the sourceList array', () => {
    const source = { title: 'Owner Title', link: 'google.com' };
    store.dispatch(new AddSourceList(source));
    const state = store.selectSnapshot<SourceListModel>((state) => state.app);
    expect(state.sourceList.length).toEqual(1);
    expect(state.sourceList[0]).toEqual(source);
  });
});
