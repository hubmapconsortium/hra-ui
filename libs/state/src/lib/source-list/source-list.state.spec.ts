import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { AddSourceList } from './source-list.actions';
import { SourceListModel, SourceListState } from './source-list.state';

describe('SourceListState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SourceListState])],
    });

    store = TestBed.inject(Store);
  });

  it('should add a source to the sourceList array', () => {
    const source = { title: 'Owner Title', link: 'google.com' };
    store.dispatch(new AddSourceList([source]));
    const state = store.selectSnapshot<SourceListModel>((state) => state.app);
    expect(state).toEqual(1);
    expect(state[0]).toEqual(source);
  });
});
